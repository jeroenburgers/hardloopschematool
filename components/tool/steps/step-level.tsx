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
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
      {availableLevels.map((level) => (
        <RadioButton
          key={level.id}
          checked={selectedLevel === level.id}
          onChange={() => onLevelChange(level.id)}
          error={error && selectedLevel !== level.id}
        >
          <div className="text-left">
            <span className="text-xs sm:text-sm font-semibold block mb-0.5 sm:mb-1 leading-tight">
              {level.label}
            </span>
            <p className="text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              {level.desc}
            </p>
          </div>
        </RadioButton>
      ))}
    </div>
  )
}
