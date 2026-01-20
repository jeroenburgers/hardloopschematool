import { RadioButton } from "@/components/ui/radio-button"

/**
 * Step Planning Mode component
 * SOLAR: Autonomous Component - handles planning mode selection independently
 */
interface StepPlanningModeProps {
  selectedMode: "Automatisch" | "Zelf inplannen"
  availableOptions: string[]
  onModeChange: (mode: "Automatisch" | "Zelf inplannen") => void
}

export function StepPlanningMode({
  selectedMode,
  availableOptions,
  onModeChange,
}: StepPlanningModeProps) {
  return (
    <div
      className="grid gap-2 sm:gap-3 grid-cols-1 sm:grid-cols-2"
      style={{
        gridTemplateColumns:
          availableOptions.length <= 2
            ? undefined
            : `repeat(${availableOptions.length}, minmax(0, 1fr))`,
      }}
    >
      {availableOptions.map((option) => (
        <RadioButton
          key={option}
          checked={selectedMode === option}
          onChange={() => onModeChange(option as "Automatisch" | "Zelf inplannen")}
        >
          <div className="flex items-center justify-start w-full min-h-[50px] sm:min-h-[55px] md:min-h-[60px]">
            <span className="text-xs sm:text-xs md:text-sm font-semibold text-left break-words">
              {option}
            </span>
          </div>
        </RadioButton>
      ))}
    </div>
  )
}
