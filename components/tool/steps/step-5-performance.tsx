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
export function Step5Performance() {
  const { locale } = useLanguage()
  const toolTranslations = translations[locale].tool
  const { formData, updateFormData } = useScheduleFormContext()

  return (
    <div className="grid grid-cols-1 gap-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <StepHeader locale={locale} titleKey="coachRecent" subtitleKey="stepRecentSubtitle" />
      <StepPerformance
        recentDistance={formData.recentDistance}
        recentTime={formData.recentTime}
        availableGoals={toolTranslations.goals as GoalType[]}
        recentDistLabel={toolTranslations.recentDist}
        recentTimeLabel={toolTranslations.recentTime}
        onDistanceChange={(distance) => updateFormData({ recentDistance: distance })}
        onTimeChange={(time) => updateFormData({ recentTime: time })}
      />
    </div>
  )
}
