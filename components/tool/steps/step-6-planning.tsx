"use client"

import { AlertCircle } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { translations } from "@/lib/i18n"
import { useScheduleFormContext } from "../schedule-form-context"
import { StepHeader } from "../step-header"
import { StepTrainingMethod } from "./step-training-method"
import { StepPlanning } from "./step-planning"
import { StepTrainingWeeks } from "./step-training-weeks"
import { StepPlanningMode } from "./step-planning-mode"
import { StepDaySelection } from "./step-day-selection"

/**
 * Step 6: Planning
 * SOLAR: Autonomous Component - fully self-contained step rendering
 */
interface Step6PlanningProps {
  showValidation?: boolean
}

export function Step6Planning({ showValidation = false }: Step6PlanningProps) {
  const { locale } = useLanguage()
  const toolTranslations = translations[locale].tool
  const {
    formData,
    planningOptions,
    recommendedDays,
    trainingWeeksOptions,
    recommendedWeeks,
    nextMondays,
    updateFormData,
  } = useScheduleFormContext()

  // Get validation errors for step 6
  const errors = {
    trainingMethod: showValidation && !formData.trainingMethod,
    startDate: showValidation && !formData.startDate,
    targetDays: showValidation && !formData.targetDays,
    trainingWeeks: showValidation && !formData.trainingWeeks,
    selectedDays:
      showValidation &&
      formData.planningMode === "Zelf inplannen" &&
      formData.selectedDays.length !== formData.targetDays,
  }

  const handleDayToggle = (day: string) => {
    const newDays = formData.selectedDays.includes(day)
      ? formData.selectedDays.filter((d) => d !== day)
      : [...formData.selectedDays, day]
    updateFormData({ selectedDays: newDays })
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <StepHeader locale={locale} titleKey="coachPlanning" subtitleKey="stepPlanningSubtitle" />

      <div className="space-y-4 sm:space-y-6">
        <StepPlanning
          startDate={formData.startDate}
          targetDays={formData.targetDays}
          mondayOptions={nextMondays}
          planningOptions={planningOptions}
          recommendedDays={recommendedDays}
          startDateLabel={toolTranslations.startDate}
          targetDaysLabel={toolTranslations.targetDays}
          errorStartDate={errors.startDate}
          errorTargetDays={errors.targetDays}
          onStartDateChange={(date) => updateFormData({ startDate: date })}
          onTargetDaysChange={(days) => updateFormData({ targetDays: days })}
        />
        <StepTrainingWeeks
          selectedWeeks={formData.trainingWeeks}
          availableOptions={trainingWeeksOptions}
          recommendedWeeks={recommendedWeeks}
          label={toolTranslations.trainingWeeks}
          goal={formData.goal}
          startDate={formData.startDate}
          locale={locale}
          error={errors.trainingWeeks}
          onWeeksChange={(weeks) => updateFormData({ trainingWeeks: weeks })}
        />
      </div>

      <div className="space-y-4 sm:space-y-6">
        <div className="space-y-3 sm:space-y-4">
          <label className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-4 sm:mb-6 block">
            {toolTranslations.planningMode}
          </label>
          <StepPlanningMode
            selectedMode={formData.planningMode}
            availableOptions={toolTranslations.planningModeOptions}
            onModeChange={(mode) => {
              updateFormData({
                planningMode: mode,
                selectedDays: mode === "Automatisch" ? [] : formData.selectedDays,
              })
            }}
          />
        </div>

        {formData.planningMode === "Zelf inplannen" && formData.targetDays > 0 && (
          <div className="space-y-3 sm:space-y-4">
            <label className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-4 sm:mb-6 block">
              {toolTranslations.selectDays}
            </label>
            <StepDaySelection
              selectedDays={formData.selectedDays}
              availableDays={toolTranslations.daysOfWeek}
              maxSelections={formData.targetDays}
              onDayToggle={handleDayToggle}
            />
            {errors.selectedDays && (
              <div className="flex items-start gap-2 mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                  {toolTranslations.selectDays}: {formData.targetDays}{" "}
                  {formData.targetDays === 1 ? toolTranslations.day : toolTranslations.days}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Training Method Selection - Last in step */}
      <div className="space-y-4 sm:space-y-6">
        <StepTrainingMethod
          selectedMethod={formData.trainingMethod || ""}
          goal={formData.goal}
          focus={formData.focus}
          targetTime={formData.targetTime || ""}
          level={formData.level}
          health={formData.health}
          targetDays={formData.targetDays}
          trainingWeeks={formData.trainingWeeks}
          onMethodChange={(method) => updateFormData({ trainingMethod: method })}
          showValidation={showValidation}
        />
      </div>
    </div>
  )
}
