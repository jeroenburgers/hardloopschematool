"use client"

import { useLanguage } from "@/components/language-provider"
import { translations } from "@/lib/i18n"
import { useScheduleFormContext } from "../schedule-form-context"
import { StepHeader } from "../step-header"
import { StepHealth } from "./step-health"

/**
 * Step 4: Health Status
 * SOLAR: Autonomous Component - fully self-contained step rendering
 */
export function Step4Health() {
  const { locale } = useLanguage()
  const toolTranslations = translations[locale].tool
  const { formData, updateFormData } = useScheduleFormContext()

  return (
    <div className="grid grid-cols-1 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <StepHeader locale={locale} titleKey="coachHealth" subtitleKey="stepHealthSubtitle" />
      <StepHealth
        selectedHealth={formData.health}
        availableOptions={toolTranslations.healthOptions}
        onHealthChange={(health) => updateFormData({ health })}
      />
    </div>
  )
}
