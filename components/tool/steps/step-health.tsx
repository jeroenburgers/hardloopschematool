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
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {availableOptions.map((option) => (
        <button
          key={option}
          onClick={() => onHealthChange(option)}
          className={`p-10 rounded-[2.5rem] border-4 text-left transition-all ${
            selectedHealth === option
              ? "bg-zinc-950 dark:bg-zinc-900 border-zinc-950 dark:border-zinc-800 text-white shadow-2xl"
              : "bg-white dark:bg-zinc-900/50 border-zinc-100 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700"
          }`}
        >
          <span className="text-xl font-black">{option}</span>
        </button>
      ))}
    </div>
  )
}
