"use client"

import { AlertCircle } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { translations } from "@/lib/i18n"
import type { Goal as GoalType } from "@/lib/types/schedule"
import { useScheduleFormContext } from "../schedule-form-context"
import { StepHeader } from "../step-header"
import { StepGoal } from "./step-goal"
import { StepFocus } from "./step-focus"
import { StepTargetTime } from "./step-target-time"

/**
 * Step 1: Goal Selection, Focus, and Target Time
 * SOLAR: Autonomous Component - fully self-contained step rendering
 */
interface Step1GoalProps {
  showValidation?: boolean
}

export function Step1Goal({ showValidation = false }: Step1GoalProps) {
  const { locale } = useLanguage()
  const toolTranslations = translations[locale].tool
  const { formData, updateFormData } = useScheduleFormContext()

  // Get validation errors for step 1
  const isFitnessGoal =
    formData.goal === "Conditie / Gezondheid" || formData.goal?.includes("Conditie / Gezondheid")
  const errors = {
    goal: showValidation && !formData.goal,
    focus: showValidation && !isFitnessGoal && !formData.focus,
    targetTime: showValidation && formData.focus === "Prestatiegericht" && !formData.targetTime,
  }

  return (
    <div className="space-y-6">
      <StepHeader locale={locale} titleKey="coachIntro" showExpertTag />

      <div className="space-y-4">
        <label className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-6 block">
          {toolTranslations.coachIntro}
        </label>
        <StepGoal
          selectedGoal={formData.goal}
          availableGoals={toolTranslations.goals as GoalType[]}
          goalPercentages={toolTranslations.goalPercentages as Record<string, number>}
          socialProofText={toolTranslations.socialProofText}
          error={errors.goal}
          onGoalChange={(goal) => {
            // Automatically set focus to "Recreatief" when "Conditie / Gezondheid" is selected
            const isFitnessGoal =
              goal === "Conditie / Gezondheid" || goal.includes("Conditie / Gezondheid")
            updateFormData({
              goal,
              focus: isFitnessGoal ? "Recreatief" : formData.focus,
              targetTime: isFitnessGoal ? "" : formData.targetTime,
            })
          }}
        />
        {errors.goal && (
          <div className="flex items-start gap-2 mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-600 dark:text-red-400 font-medium">
              Selecteer een doel om door te gaan.
            </p>
          </div>
        )}
      </div>

      {formData.goal &&
        formData.goal !== "Conditie / Gezondheid" &&
        !formData.goal.includes("Conditie / Gezondheid") && (
          <div className="space-y-4">
            <label className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-6 block">
              {toolTranslations.focus}
            </label>
            <StepFocus
              selectedFocus={formData.focus}
              availableOptions={toolTranslations.focusOptions}
              error={errors.focus}
              onFocusChange={(focus) =>
                updateFormData({
                  focus,
                  targetTime: focus === "Recreatief" ? "" : formData.targetTime,
                })
              }
            />
            {errors.focus && (
              <div className="flex items-start gap-2 mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                  Selecteer een focus om door te gaan.
                </p>
              </div>
            )}
          </div>
        )}

      {formData.focus === "Prestatiegericht" && (
        <div className="space-y-4">
          <label className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-6 block">
            {toolTranslations.targetTime}
          </label>
          <StepTargetTime
            value={formData.targetTime || ""}
            placeholder={toolTranslations.targetTimePlaceholder}
            error={errors.targetTime}
            onChange={(targetTime) => updateFormData({ targetTime })}
          />
          {errors.targetTime && (
            <div className="flex items-start gap-2 mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                Vul een streeftijd in om door te gaan.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
