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

  const steps = useMemo(
    () => [
      { name: toolTranslations.steps?.[0] || "Doel", icon: Goal },
      { name: toolTranslations.steps?.[1] || "Niveau", icon: BarChart3 },
      { name: toolTranslations.steps?.[2] || "Profiel", icon: User },
      { name: toolTranslations.steps?.[3] || "Gezondheid", icon: Heart },
      { name: toolTranslations.steps?.[4] || "Prestaties", icon: TrendingUp },
      { name: toolTranslations.steps?.[5] || "Planning", icon: Calendar },
      { name: toolTranslations.steps?.[6] || "Afronding", icon: CreditCard },
    ],
    [toolTranslations.steps],
  )

  const isValid = useMemo(() => isValidStep(currentStep), [currentStep, isValidStep])

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
    if (currentStep < 7 && isValid) {
      setCurrentStep((s) => s + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((s) => s - 1)
    }
  }

  return (
    <div className="w-full">
      <ProgressTracker
        steps={steps}
        currentStep={currentStep}
        celebrationTexts={toolTranslations.celebration}
      />

      <div className="relative min-h-[500px]">
        <ToolLoadingOverlay loading={loading} />

        <div className="space-y-12">
          {currentStep === 1 && <Step1Goal />}
          {currentStep === 2 && <Step2Level />}
          {currentStep === 3 && <Step3Profile onSkip={handleNext} />}
          {currentStep === 4 && <Step4Health />}
          {currentStep === 5 && <Step5Performance />}
          {currentStep === 6 && <Step6Planning />}
          {currentStep === 7 && <Step7Checkout />}
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
