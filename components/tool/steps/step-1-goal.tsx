"use client"

import { useLanguage } from "@/components/language-provider"
import { translations } from "@/lib/i18n"
import type { Goal as GoalType } from "@/lib/types/schedule"
import { useScheduleFormContext } from "../schedule-form-context"
import { StepGoal } from "./step-goal"

/**
 * Step 1: Goal Selection
 * SOLAR: Autonomous Component - fully self-contained step rendering
 */
export function Step1Goal() {
  const { locale } = useLanguage()
  const toolTranslations = translations[locale].tool
  const { formData, updateFormData } = useScheduleFormContext()

  return (
    <div className="grid grid-cols-1 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="p-10 bg-zinc-50 dark:bg-zinc-900/50 border-2 border-zinc-100 dark:border-zinc-800 rounded-[3rem]">
        <h2 className="text-4xl font-black text-zinc-950 dark:text-zinc-50 mb-3 tracking-tighter">
          {toolTranslations.coachIntro}
        </h2>
        <div className="flex items-center gap-2 text-zinc-400 dark:text-zinc-500 font-black text-[10px] uppercase tracking-widest">
          <span className="w-1.5 h-1.5 bg-orange-600 rounded-full" /> {toolTranslations.expertTag}
        </div>
      </div>
      <StepGoal
        selectedGoal={formData.goal}
        availableGoals={toolTranslations.goals as GoalType[]}
        socialProofTag={toolTranslations.socialProofTag}
        onGoalChange={(goal) => updateFormData({ goal })}
      />
    </div>
  )
}
