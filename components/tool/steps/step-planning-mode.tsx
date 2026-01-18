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
      className="grid gap-3"
      style={{ gridTemplateColumns: `repeat(${availableOptions.length}, minmax(0, 1fr))` }}
    >
      {availableOptions.map((option) => (
        <RadioButton
          key={option}
          checked={selectedMode === option}
          onChange={() => onModeChange(option as "Automatisch" | "Zelf inplannen")}
        >
          <span className="text-sm font-semibold">{option}</span>
        </RadioButton>
      ))}
    </div>
  )
}
