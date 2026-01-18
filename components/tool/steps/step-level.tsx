import type { Level } from "@/lib/types/schedule"

/**
 * Step Level component
 * SOLAR: Autonomous Component - handles level selection independently
 */
interface LevelOption {
  id: Level
  label: string
  desc: string
}

interface StepLevelProps {
  selectedLevel: Level
  availableLevels: LevelOption[]
  onLevelChange: (level: Level) => void
}

export function StepLevel({ selectedLevel, availableLevels, onLevelChange }: StepLevelProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {availableLevels.map((level) => (
        <button
          key={level.id}
          onClick={() => onLevelChange(level.id)}
          className={`p-8 rounded-[2.5rem] border-4 text-left transition-all relative group ${
            selectedLevel === level.id
              ? "bg-zinc-950 dark:bg-zinc-900 border-zinc-950 dark:border-zinc-800 text-white shadow-2xl"
              : "bg-white dark:bg-zinc-900/50 border-zinc-100 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700"
          }`}
        >
          <span className="text-xl font-black block mb-2">{level.label}</span>
          <p
            className={`text-xs font-bold leading-relaxed ${
              selectedLevel === level.id ? "text-zinc-400" : "text-zinc-400"
            }`}
          >
            {level.desc}
          </p>
        </button>
      ))}
    </div>
  )
}
