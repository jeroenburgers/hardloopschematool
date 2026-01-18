"use client"

import { AlertCircle } from "lucide-react"
import { useMemo } from "react"
import { useLanguage } from "@/components/language-provider"
import { translations } from "@/lib/i18n"
import type { Level } from "@/lib/types/schedule"
import { useScheduleFormContext } from "../schedule-form-context"
import { StepHeader } from "../step-header"
import { StepLevel } from "./step-level"
import { StepFrequency } from "./step-frequency"

/**
 * Step 2: Level Selection and Frequency
 * SOLAR: Autonomous Component - fully self-contained step rendering
 */
interface Step2LevelProps {
  showValidation?: boolean
}

export function Step2Level({ showValidation = false }: Step2LevelProps) {
  const { locale } = useLanguage()
  const toolTranslations = translations[locale].tool
  const { formData, updateFormData } = useScheduleFormContext()

  // Get validation errors for step 2
  const errors = {
    level: showValidation && !formData.level,
    frequency: showValidation && formData.level !== "Starter" && !formData.frequency,
  }

  // Filter frequency options based on level
  const availableFrequencyOptions = useMemo(() => {
    const allOptions = toolTranslations.frequencyOptions || []

    // Starter: don't show frequency question
    if (formData.level === "Starter") {
      return []
    }

    // Beginner or Gemiddeld: exclude "4 dagen" and higher
    if (formData.level === "Beginner" || formData.level === "Gemiddeld") {
      return allOptions.filter(
        (opt) => opt === "Onregelmatig" || opt === "2 dagen" || opt === "3 dagen",
      )
    }

    // Gevorderd or Expert: exclude "Onregelmatig"
    if (formData.level === "Gevorderd" || formData.level === "Expert") {
      return allOptions.filter((opt) => opt !== "Onregelmatig")
    }

    return allOptions
  }, [formData.level, toolTranslations.frequencyOptions])

  return (
    <div className="space-y-6">
      <StepHeader locale={locale} titleKey="coachLevel" subtitleKey="stepLevelSubtitle" />

      <div className="space-y-6">
        <div className="space-y-4">
          <label className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-6 block">
            {toolTranslations.coachLevel}
          </label>
          <StepLevel
            selectedLevel={formData.level}
            availableLevels={
              toolTranslations.levels as Array<{
                id: Level
                label: string
                desc: string
              }>
            }
            error={errors.level}
            onLevelChange={(level) => {
              updateFormData({
                level,
                // Reset frequency if level changes to Starter
                frequency: level === "Starter" ? "" : formData.frequency,
              })
            }}
          />
          {errors.level && (
            <div className="flex items-start gap-2 mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                Selecteer een niveau om door te gaan.
              </p>
            </div>
          )}
        </div>

        {formData.level && formData.level !== "Starter" && availableFrequencyOptions.length > 0 && (
          <div className="space-y-4">
            <label className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-6 block">
              {toolTranslations.frequency}
            </label>
            <StepFrequency
              selectedFrequency={formData.frequency}
              availableOptions={availableFrequencyOptions}
              error={errors.frequency}
              onFrequencyChange={(frequency) => updateFormData({ frequency })}
            />
            {errors.frequency && (
              <div className="flex items-start gap-2 mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                  Selecteer een frequentie om door te gaan.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
