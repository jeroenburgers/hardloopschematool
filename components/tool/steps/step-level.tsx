import type { Level } from "@/lib/types/schedule"
import { RadioButton } from "@/components/ui/radio-button"

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
  selectedLevel: Level | ""
  availableLevels: LevelOption[]
  onLevelChange: (level: Level) => void
  error?: boolean
}

export function StepLevel({
  selectedLevel,
  availableLevels,
  onLevelChange,
  error = false,
}: StepLevelProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-3">
      {availableLevels.map((level) => (
        <RadioButton
          key={level.id}
          checked={selectedLevel === level.id}
          onChange={() => onLevelChange(level.id)}
          error={error && selectedLevel !== level.id}
        >
          <div className="flex flex-col items-start justify-center w-full min-h-[50px] sm:min-h-[60px] md:min-h-[65px] text-left">
            <span className="text-xs sm:text-sm md:text-sm font-semibold block mb-0.5 sm:mb-1 leading-tight">
              {level.label}
            </span>
            <p className="text-[10px] sm:text-[10px] md:text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              {level.desc}
            </p>
          </div>
        </RadioButton>
      ))}
    </div>
  )
}
