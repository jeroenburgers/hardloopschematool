import { RadioButton } from "@/components/ui/radio-button"

/**
 * Step Focus component
 * SOLAR: Autonomous Component - handles focus selection independently
 */
interface StepFocusProps {
  selectedFocus: "Recreatief" | "Prestatiegericht"
  availableOptions: string[]
  onFocusChange: (focus: "Recreatief" | "Prestatiegericht") => void
  error?: boolean
}

export function StepFocus({
  selectedFocus,
  availableOptions,
  onFocusChange,
  error = false,
}: StepFocusProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {availableOptions.map((option) => (
        <RadioButton
          key={option}
          checked={selectedFocus === option}
          onChange={() => onFocusChange(option as "Recreatief" | "Prestatiegericht")}
          error={error && selectedFocus !== option}
        >
          <span className="text-sm font-semibold">{option}</span>
        </RadioButton>
      ))}
    </div>
  )
}
