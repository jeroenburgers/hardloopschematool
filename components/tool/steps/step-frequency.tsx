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
  const colsClass =
    availableOptions.length >= 5
      ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-5"
      : availableOptions.length === 4
        ? "grid-cols-2 sm:grid-cols-4"
        : "grid-cols-2 sm:grid-cols-3"

  return (
    <div className={`grid gap-2 sm:gap-3 ${colsClass}`}>
      {availableOptions.map((option) => (
        <RadioButton
          key={option}
          checked={selectedFrequency === option}
          onChange={() => onFrequencyChange(option)}
          error={error && selectedFrequency !== option}
        >
          <span className="text-xs sm:text-sm font-semibold">{option}</span>
        </RadioButton>
      ))}
    </div>
  )
}
