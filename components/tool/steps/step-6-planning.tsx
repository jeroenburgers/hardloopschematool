"use client"

import { useLanguage } from "@/components/language-provider"
import { translations } from "@/lib/i18n"
import { useScheduleFormContext } from "../schedule-form-context"
import { StepHeader } from "../step-header"
import { StepPlanning } from "./step-planning"

/**
 * Step 6: Planning
 * SOLAR: Autonomous Component - fully self-contained step rendering
 */
export function Step6Planning() {
  const { locale } = useLanguage()
  const toolTranslations = translations[locale].tool
  const { formData, planningOptions, nextMondays, updateFormData } = useScheduleFormContext()

  return (
    <div className="grid grid-cols-1 gap-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <StepHeader locale={locale} titleKey="coachPlanning" subtitleKey="stepPlanningSubtitle" />
      <StepPlanning
        startDate={formData.startDate}
        targetDays={formData.targetDays}
        mondayOptions={nextMondays}
        planningOptions={planningOptions}
        startDateLabel={toolTranslations.startDate}
        targetDaysLabel={toolTranslations.targetDays}
        onStartDateChange={(date) => updateFormData({ startDate: date })}
        onTargetDaysChange={(days) => updateFormData({ targetDays: days })}
      />
    </div>
  )
}
