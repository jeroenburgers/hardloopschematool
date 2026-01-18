"use client"

import { useState, useMemo } from "react"
import { Goal, BarChart3, User, Heart, TrendingUp, Calendar, CreditCard } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { translations } from "@/lib/i18n"
import type {
  ScheduleFormData,
  RunningSchedule,
  Level,
  Goal as GoalType,
} from "@/lib/types/schedule"
import { generateScheduleFromFormData } from "@/lib/services/schedule/gemini-service"
import { ScheduleFormProvider, useScheduleFormContext } from "./schedule-form-context"
import { ProgressTracker } from "./progress-tracker"
import { ToolLoadingOverlay } from "./tool-loading-overlay"
import { ToolNavigation } from "./tool-navigation"
import { Step1Goal } from "./steps/step-1-goal"
import { Step2Level } from "./steps/step-2-level"
import { Step3Profile } from "./steps/step-3-profile"
import { Step4Health } from "./steps/step-4-health"
import { Step5Performance } from "./steps/step-5-performance"
import { Step6Planning } from "./steps/step-6-planning"
import { Step7Checkout } from "./steps/step-7-checkout"

/**
 * Schedule Tool Orchestrator
 * SOLAR: Orchestration over Logic - coordinates workflow, delegates logic to step components
 */
interface ScheduleToolProps {
  initialGoal?: GoalType
  initialLevel?: Level
  onComplete?: (schedule: RunningSchedule, formData: ScheduleFormData) => void
}

function ScheduleToolContent({ onComplete }: { onComplete?: ScheduleToolProps["onComplete"] }) {
  const { locale } = useLanguage()
  const toolTranslations = translations[locale].tool
  const { formData, isValidStep } = useScheduleFormContext()

  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [showValidation, setShowValidation] = useState(false)

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
  const getLogicalStep = (physicalStep: number): number => {
    if (!shouldSkipStep5) return physicalStep
    // If step 5 is skipped, map physical steps to logical steps
    if (physicalStep <= 4) return physicalStep
    return physicalStep + 1 // Skip logical step 5
  }

  const isValid = useMemo(() => {
    const logicalStep = getLogicalStep(currentStep)
    return isValidStep(logicalStep)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep, isValidStep, shouldSkipStep5, getLogicalStep])

  const handleGenerate = async () => {
    setLoading(true)
    try {
      const schedule = await generateScheduleFromFormData({
        ...formData,
        language: locale,
      })
      if (onComplete) {
        onComplete(schedule, formData)
      }
    } catch {
      alert("Er is een fout opgetreden. Probeer het opnieuw.")
    } finally {
      setLoading(false)
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

        <ToolNavigation
          currentStep={currentStep}
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

export function ScheduleTool({ initialGoal, initialLevel, onComplete }: ScheduleToolProps) {
  return (
    <ScheduleFormProvider initialGoal={initialGoal} initialLevel={initialLevel}>
      <ScheduleToolContent onComplete={onComplete} />
    </ScheduleFormProvider>
  )
}
