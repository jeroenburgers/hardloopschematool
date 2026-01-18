"use client"

import { useLanguage } from "@/components/language-provider"
import { translations } from "@/lib/i18n"
import type { Level } from "@/lib/types/schedule"
import { useScheduleFormContext } from "../schedule-form-context"
import { StepHeader } from "../step-header"
import { StepLevel } from "./step-level"

/**
 * Step 2: Level Selection
 * SOLAR: Autonomous Component - fully self-contained step rendering
 */
export function Step2Level() {
  const { locale } = useLanguage()
  const toolTranslations = translations[locale].tool
  const { formData, updateFormData } = useScheduleFormContext()

  return (
    <div className="grid grid-cols-1 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <StepHeader locale={locale} titleKey="coachLevel" subtitleKey="stepLevelSubtitle" />
      <StepLevel
        selectedLevel={formData.level}
        availableLevels={
          toolTranslations.levels as Array<{
            id: Level
            label: string
            desc: string
          }>
        }
        onLevelChange={(level) => updateFormData({ level })}
      />
    </div>
  )
}
