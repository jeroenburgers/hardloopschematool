import type { Goal } from "@/lib/types/schedule"

/**
 * Step Goal component
 * SOLAR: Autonomous Component - handles goal selection independently
 */
interface StepGoalProps {
  selectedGoal: Goal
  availableGoals: Goal[]
  socialProofTag: string
  onGoalChange: (goal: Goal) => void
}

export function StepGoal({
  selectedGoal,
  availableGoals,
  socialProofTag,
  onGoalChange,
}: StepGoalProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {availableGoals.map((goal) => (
        <button
          key={goal}
          onClick={() => onGoalChange(goal)}
          className={`p-8 rounded-[2.5rem] border-4 text-left transition-all relative overflow-hidden group ${
            selectedGoal === goal
              ? "bg-zinc-950 dark:bg-zinc-900 border-zinc-950 dark:border-zinc-800 text-white shadow-2xl"
              : "bg-white dark:bg-zinc-900/50 border-zinc-100 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700"
          }`}
        >
          <span className="text-base font-black block relative z-10">{goal}</span>
          <div
            className={`mt-2 text-[10px] font-black uppercase tracking-widest transition-opacity ${
              selectedGoal === goal
                ? "text-orange-500 dark:text-orange-400"
                : "text-zinc-300 dark:text-zinc-600 opacity-0 group-hover:opacity-100"
            }`}
          >
            {socialProofTag}
          </div>
        </button>
      ))}
    </div>
  )
}
