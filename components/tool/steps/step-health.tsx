import { RadioButton } from "@/components/ui/radio-button"

/**
 * Step Health component
 * SOLAR: Autonomous Component - handles health status selection independently
 */
interface StepHealthProps {
  selectedHealth: string
  availableOptions: string[]
  onHealthChange: (health: string) => void
}

export function StepHealth({ selectedHealth, availableOptions, onHealthChange }: StepHealthProps) {
  return (
    <div
      className="grid gap-3"
      style={{ gridTemplateColumns: `repeat(${availableOptions.length}, minmax(0, 1fr))` }}
    >
      {availableOptions.map((option) => (
        <RadioButton
          key={option}
          checked={selectedHealth === option}
          onChange={() => onHealthChange(option)}
        >
          <span className="text-sm font-semibold">{option}</span>
        </RadioButton>
      ))}
    </div>
  )
}
