/**
 * Step Day Selection component
 * SOLAR: Autonomous Component - handles day selection independently
 */
interface StepDaySelectionProps {
  selectedDays: string[]
  availableDays: string[]
  maxSelections: number
  onDayToggle: (day: string) => void
}

export function StepDaySelection({
  selectedDays,
  availableDays,
  maxSelections,
  onDayToggle,
}: StepDaySelectionProps) {
  // Map full day names to abbreviations
  const getDayAbbreviation = (day: string): string => {
    const abbreviations: Record<string, string> = {
      Maandag: "Ma",
      Dinsdag: "Di",
      Woensdag: "Wo",
      Donderdag: "Do",
      Vrijdag: "Vr",
      Zaterdag: "Za",
      Zondag: "Zo",
    }
    return abbreviations[day] || day
  }

  const handleToggle = (day: string) => {
    if (selectedDays.includes(day)) {
      // Remove day
      onDayToggle(day)
    } else if (selectedDays.length < maxSelections) {
      // Add day if under limit
      onDayToggle(day)
    }
  }

  const isDisabled = (day: string) =>
    !selectedDays.includes(day) && selectedDays.length >= maxSelections

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300">
          {maxSelections} {maxSelections === 1 ? "dag" : "dagen"}
        </span>
        <span className="px-2 py-0.5 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-[10px] sm:text-xs font-bold rounded-full border border-orange-200 dark:border-orange-800">
          {selectedDays.length}/{maxSelections}
        </span>
      </div>
      <div className="grid gap-2 sm:gap-3 grid-cols-3 md:grid-cols-7">
        {availableDays.map((day) => {
          const isSelected = selectedDays.includes(day)
          const disabled = isDisabled(day)

          return (
            <button
              key={day}
              type="button"
              onClick={() => !disabled && handleToggle(day)}
              disabled={disabled}
              className={`group relative flex items-center gap-2 sm:gap-4 p-3 sm:p-4 rounded-xl border-2 text-left transition-all ${
                isSelected
                  ? "bg-zinc-950 dark:bg-zinc-900 border-zinc-950 dark:border-zinc-800 text-white shadow-md"
                  : "bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-900"
              } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <div className="flex-shrink-0">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    isSelected
                      ? "border-zinc-950 dark:border-zinc-800 bg-zinc-950 dark:bg-zinc-900"
                      : "border-zinc-400 dark:border-zinc-600 bg-white dark:bg-zinc-900 group-hover:border-zinc-600 dark:group-hover:border-zinc-500"
                  }`}
                >
                  {isSelected && (
                    <div className="w-2.5 h-2.5 rounded-full bg-white dark:bg-zinc-50" />
                  )}
                </div>
              </div>
              <div className="flex-1 min-w-0 text-center">
                <span className="text-xs sm:text-sm font-semibold">{getDayAbbreviation(day)}</span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
