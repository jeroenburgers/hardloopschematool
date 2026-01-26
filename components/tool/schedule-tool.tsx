"use client"

import { useState, useMemo, useEffect, useRef, useCallback } from "react"
import { Goal, BarChart3, User, Heart, TrendingUp, Calendar, CreditCard } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { translations } from "@/lib/i18n"
import type { Level, Goal as GoalType } from "@/lib/types/schedule"
import { ScheduleFormProvider, useScheduleFormContext } from "./schedule-form-context"
import { ProgressTracker } from "./progress-tracker"
import { ToolLoadingOverlay } from "./tool-loading-overlay"
import { ToolNavigation } from "./tool-navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Step1Goal } from "./steps/step-1-goal"
import { Step2Level } from "./steps/step-2-level"
import { Step3Profile } from "./steps/step-3-profile"
import { Step4Health } from "./steps/step-4-health"
import { Step5Performance } from "./steps/step-5-performance"
import { Step6Planning } from "./steps/step-6-planning"
import { Step7Checkout } from "./steps/step-7-checkout"
import { useAnalytics } from "@/hooks/use-analytics"

/**
 * Schedule Tool Orchestrator
 * SOLAR: Orchestration over Logic - coordinates workflow, delegates logic to step components
 */
interface ScheduleToolProps {
  initialGoal?: GoalType
  initialLevel?: Level
}

function ScheduleToolContent() {
  const { locale } = useLanguage()
  const toolTranslations = translations[locale].tool
  const { formData, isValidStep } = useScheduleFormContext()
  const { trackStep, trackModalClosed, trackCompleted } = useAnalytics()

  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [showValidation, setShowValidation] = useState(false)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const trackedStepsRef = useRef<Set<number>>(new Set())

  // Determine if step 5 (Performance) should be skipped
  const shouldSkipStep5 = useMemo(() => {
    const isFitnessGoal =
      formData.goal === "Conditie / Gezondheid" || formData.goal?.includes("Conditie / Gezondheid")
    const isRecreationalFocus = formData.focus === "Recreatief"
    return isFitnessGoal || isRecreationalFocus
  }, [formData.goal, formData.focus])

  const steps = useMemo(() => {
    const allSteps = [
      { name: toolTranslations.steps?.[0] || "Doel", icon: Goal, logicalStep: 1 },
      { name: toolTranslations.steps?.[1] || "Niveau", icon: BarChart3, logicalStep: 2 },
      { name: toolTranslations.steps?.[2] || "Profiel", icon: User, logicalStep: 3 },
      { name: toolTranslations.steps?.[3] || "Gezondheid", icon: Heart, logicalStep: 4 },
      { name: toolTranslations.steps?.[4] || "Prestaties", icon: TrendingUp, logicalStep: 5 },
      { name: toolTranslations.steps?.[5] || "Planning", icon: Calendar, logicalStep: 6 },
      { name: toolTranslations.steps?.[6] || "Afronding", icon: CreditCard, logicalStep: 7 },
    ]
    // Filter out step 5 if it should be skipped
    return shouldSkipStep5 ? allSteps.filter((step) => step.logicalStep !== 5) : allSteps
  }, [toolTranslations.steps, shouldSkipStep5])

  // Map physical step (1-based index in visible steps) to logical step (1-7)
  const getLogicalStep = useCallback(
    (physicalStep: number): number => {
      if (!shouldSkipStep5) return physicalStep
      // If step 5 is skipped, map physical steps to logical steps
      if (physicalStep <= 4) return physicalStep
      return physicalStep + 1 // Skip logical step 5
    },
    [shouldSkipStep5],
  )

  const isValid = useMemo(() => {
    const logicalStep = getLogicalStep(currentStep)
    return isValidStep(logicalStep)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep, isValidStep, shouldSkipStep5, getLogicalStep])

  // Track step navigation
  useEffect(() => {
    const logicalStep = getLogicalStep(currentStep)
    const stepName = steps.find((s) => s.logicalStep === logicalStep)?.name || `Step ${logicalStep}`

    // Only track each step once per session
    if (!trackedStepsRef.current.has(logicalStep)) {
      trackedStepsRef.current.add(logicalStep)
      const isSkipped = shouldSkipStep5 && logicalStep === 5
      trackStep(logicalStep, stepName, isSkipped)

      // Track form completion when reaching checkout (step 7)
      if (logicalStep === 7) {
        trackCompleted()
      }
    }
  }, [currentStep, getLogicalStep, steps, shouldSkipStep5, trackStep, trackCompleted])

  const handleGenerate = async () => {
    if (!isValid) {
      setShowValidation(true)
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/generate-schedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || "Failed to generate schedule")
      }

      const data = await response.json()
      if (data.success && data.scheduleId) {
        // Redirect to the schedule page
        window.location.href = `/schema/${data.scheduleId}`
      } else {
        throw new Error("Invalid response from server")
      }
    } catch (error) {
      console.error("Error generating schedule:", error)
      setLoading(false)
      // Show error to user
      alert(
        error instanceof Error
          ? error.message
          : "Er is een fout opgetreden bij het genereren van het schema.",
      )
    }
  }

  const handleNext = () => {
    const maxStep = shouldSkipStep5 ? 6 : 7
    if (currentStep < maxStep) {
      if (isValid) {
        setShowValidation(false)
        const nextPhysicalStep = currentStep + 1
        const nextLogicalStep = getLogicalStep(nextPhysicalStep)
        // If next step is logical step 5 (which should be skipped), skip to step 6
        if (shouldSkipStep5 && nextLogicalStep === 5) {
          setCurrentStep(nextPhysicalStep + 1)
        } else {
          setCurrentStep(nextPhysicalStep)
        }
      } else {
        setShowValidation(true)
      }
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      const prevPhysicalStep = currentStep - 1
      const prevLogicalStep = getLogicalStep(prevPhysicalStep)
      // If previous step is logical step 5 (which should be skipped), skip to step 4
      if (shouldSkipStep5 && prevLogicalStep === 5) {
        setCurrentStep(prevPhysicalStep - 1)
      } else {
        setCurrentStep(prevPhysicalStep)
      }
    }
  }

  return (
    <div className="w-full">
      <ProgressTracker
        steps={steps}
        currentStep={currentStep}
        celebrationTexts={toolTranslations.celebration}
        getLogicalStep={getLogicalStep}
      />

      <div className="relative min-h-[400px]">
        <ToolLoadingOverlay loading={loading} />

        <div className="space-y-6">
          {(() => {
            const logicalStep = getLogicalStep(currentStep)
            switch (logicalStep) {
              case 1:
                return <Step1Goal showValidation={showValidation} />
              case 2:
                return <Step2Level showValidation={showValidation} />
              case 3:
                return <Step3Profile showValidation={showValidation} />
              case 4:
                return <Step4Health />
              case 5:
                return <Step5Performance showValidation={showValidation} />
              case 6:
                return <Step6Planning showValidation={showValidation} />
              case 7:
                return <Step7Checkout showValidation={showValidation} />
              default:
                return null
            }
          })()}
        </div>

        <Dialog
          open={isPreviewOpen}
          onOpenChange={(open) => {
            setIsPreviewOpen(open)
            if (!open) {
              // Track when modal is closed via backdrop/ESC
              trackModalClosed("backdrop")
            }
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{toolTranslations.previewModal.title}</DialogTitle>
              <DialogDescription>{toolTranslations.previewModal.lead}</DialogDescription>
            </DialogHeader>

            <div className="mt-5 space-y-4">
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/40">
                <div className="text-xs font-black uppercase tracking-[0.2em] text-zinc-800 dark:text-zinc-200">
                  {toolTranslations.previewModal.whatWorksTitle}
                </div>
                <ul className="mt-3 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                  {toolTranslations.previewModal.whatWorksBullets.map((item: string) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-orange-500 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
                <div className="text-xs font-black uppercase tracking-[0.2em] text-zinc-800 dark:text-zinc-200">
                  {toolTranslations.previewModal.whatNextTitle}
                </div>
                <ul className="mt-3 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                  {toolTranslations.previewModal.whatNextBullets.map((item: string) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <DialogFooter>
              <button
                type="button"
                onClick={() => {
                  setIsPreviewOpen(false)
                  trackModalClosed("button_secondary")
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 text-zinc-950 dark:text-zinc-50 bg-white dark:bg-zinc-950 font-black text-xs sm:text-sm uppercase tracking-[0.1em] hover:border-zinc-950 dark:hover:border-zinc-600 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-950"
              >
                {toolTranslations.previewModal.ctaSecondary}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsPreviewOpen(false)
                  trackModalClosed("button_primary")
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-orange-600 dark:bg-orange-500 text-white font-black text-xs sm:text-sm uppercase tracking-[0.1em] hover:bg-orange-700 dark:hover:bg-orange-600 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-950"
              >
                {toolTranslations.previewModal.ctaPrimary}
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <ToolNavigation
          currentStep={currentStep}
          steps={steps}
          isValid={isValid}
          loading={loading}
          onBack={handleBack}
          onNext={handleNext}
          onGenerate={handleGenerate}
        />
      </div>
    </div>
  )
}

export function ScheduleTool({ initialGoal, initialLevel }: ScheduleToolProps) {
  const { trackStarted } = useAnalytics()

  // Track when tool is started
  useEffect(() => {
    trackStarted(initialGoal)
  }, [initialGoal, trackStarted])

  return (
    <ScheduleFormProvider initialGoal={initialGoal} initialLevel={initialLevel}>
      <ScheduleToolContent />
    </ScheduleFormProvider>
  )
}
