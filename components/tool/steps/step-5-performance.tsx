"use client"

import { useLanguage } from "@/components/language-provider"
import { translations } from "@/lib/i18n"
import type { Goal as GoalType } from "@/lib/types/schedule"
import { useScheduleFormContext } from "../schedule-form-context"
import { StepHeader } from "../step-header"
import { StepPerformance } from "./step-performance"

/**
 * Step 5: Recent Performance
 * SOLAR: Autonomous Component - fully self-contained step rendering
 */
interface Step5PerformanceProps {
  showValidation?: boolean
}

export function Step5Performance({ showValidation = false }: Step5PerformanceProps) {
  const { locale } = useLanguage()
  const toolTranslations = translations[locale].tool
  const { formData, updateFormData } = useScheduleFormContext()

  // Get validation errors for step 5
  const errors = {
    recentDistance: showValidation && !formData.recentDistance,
    recentTime: showValidation && (!formData.recentTime || formData.recentTime.length < 5),
  }

  return (
    <div className="space-y-6">
      <StepHeader locale={locale} titleKey="coachRecent" subtitleKey="stepRecentSubtitle" />
      <StepPerformance
        recentDistance={formData.recentDistance}
        recentTime={formData.recentTime}
        availableGoals={toolTranslations.goals as GoalType[]}
        recentDistLabel={toolTranslations.recentDist}
        recentTimeLabel={toolTranslations.recentTime}
        errorDistance={errors.recentDistance}
        errorTime={errors.recentTime}
        onDistanceChange={(distance) => updateFormData({ recentDistance: distance })}
        onTimeChange={(time) => updateFormData({ recentTime: time })}
      />
    </div>
  )
}
