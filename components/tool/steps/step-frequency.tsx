import { RadioButton } from "@/components/ui/radio-button"

/**
 * Step Frequency component
 * SOLAR: Autonomous Component - handles frequency selection independently
 */
interface StepFrequencyProps {
  selectedFrequency: string
  availableOptions: string[]
  onFrequencyChange: (frequency: string) => void
  error?: boolean
}

export function StepFrequency({
  selectedFrequency,
  availableOptions,
  onFrequencyChange,
  error = false,
}: StepFrequencyProps) {
  return (
    <div
      className="grid gap-3"
      style={{ gridTemplateColumns: `repeat(${availableOptions.length}, minmax(0, 1fr))` }}
    >
      {availableOptions.map((option) => (
        <RadioButton
          key={option}
          checked={selectedFrequency === option}
          onChange={() => onFrequencyChange(option)}
          error={error && selectedFrequency !== option}
        >
          <span className="text-sm font-semibold">{option}</span>
        </RadioButton>
      ))}
    </div>
  )
}
