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
    <div className="space-y-4 sm:space-y-6">
      <StepHeader locale={locale} titleKey="coachHealth" subtitleKey="stepHealthSubtitle" />
      <div className="space-y-3 sm:space-y-4">
        <label className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-4 sm:mb-6 block">
          {toolTranslations.coachHealth}
        </label>
        <StepHealth
          selectedHealth={formData.health}
          availableOptions={toolTranslations.healthOptions}
          onHealthChange={(health) => updateFormData({ health })}
        />
      </div>
    </div>
  )
}
