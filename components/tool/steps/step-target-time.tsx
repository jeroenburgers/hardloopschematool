/**
 * Step Target Time component
 * SOLAR: Autonomous Component - handles target time input independently
 */
interface StepTargetTimeProps {
  value: string // Format: "HH:MM:SS" or empty
  placeholder: string
  onChange: (value: string) => void
  error?: boolean
}

export function StepTargetTime({
  value,
  onChange,
  error = false,
}: Omit<StepTargetTimeProps, "placeholder">) {
  // Parse "HH:MM:SS" format to individual values
  const parseTime = (timeStr: string): { hours: number; minutes: number; seconds: number } => {
    if (!timeStr) return { hours: 0, minutes: 0, seconds: 0 }
    const parts = timeStr.split(":")
    return {
      hours: parseInt(parts[0] || "0", 10) || 0,
      minutes: parseInt(parts[1] || "0", 10) || 0,
      seconds: parseInt(parts[2] || "0", 10) || 0,
    }
  }

  // Format individual values to "HH:MM:SS" format
  const formatTime = (hours: number, minutes: number, seconds: number): string => {
    const h = String(hours).padStart(2, "0")
    const m = String(minutes).padStart(2, "0")
    const s = String(seconds).padStart(2, "0")
    return `${h}:${m}:${s}`
  }

  const { hours, minutes, seconds } = parseTime(value)

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let h = parseInt(e.target.value, 10) || 0
    if (h < 0) h = 0
    if (h > 99) h = 99
    onChange(formatTime(h, minutes, seconds))
  }

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let m = parseInt(e.target.value, 10) || 0
    if (m < 0) m = 0
    if (m > 59) m = 59
    onChange(formatTime(hours, m, seconds))
  }

  const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let s = parseInt(e.target.value, 10) || 0
    if (s < 0) s = 0
    if (s > 59) s = 59
    onChange(formatTime(hours, minutes, s))
  }

  return (
    <div
      className={`relative p-4 bg-white dark:bg-zinc-900/50 border-2 rounded-xl transition-colors ${
        error
          ? "border-red-500 dark:border-red-500 focus-within:border-red-600 dark:focus-within:border-red-400"
          : "border-zinc-200 dark:border-zinc-800 focus-within:border-zinc-950 dark:focus-within:border-zinc-600"
      }`}
    >
      <div className="flex items-center gap-2">
        <div className="flex flex-col items-center">
          <input
            type="number"
            min="0"
            max="99"
            placeholder="0"
            value={hours || ""}
            onChange={handleHoursChange}
            className="w-16 bg-transparent text-center text-lg font-semibold text-zinc-950 dark:text-zinc-50 outline-none placeholder:text-zinc-300 dark:placeholder:text-zinc-700 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <span className="text-xs text-zinc-400 dark:text-zinc-600 mt-1">uren</span>
        </div>
        <span className="text-lg font-semibold text-zinc-400 dark:text-zinc-600 self-start mt-1.5">
          :
        </span>
        <div className="flex flex-col items-center">
          <input
            type="number"
            min="0"
            max="59"
            placeholder="00"
            value={minutes || ""}
            onChange={handleMinutesChange}
            className="w-16 bg-transparent text-center text-lg font-semibold text-zinc-950 dark:text-zinc-50 outline-none placeholder:text-zinc-300 dark:placeholder:text-zinc-700 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <span className="text-xs text-zinc-400 dark:text-zinc-600 mt-1">min</span>
        </div>
        <span className="text-lg font-semibold text-zinc-400 dark:text-zinc-600 self-start mt-1.5">
          :
        </span>
        <div className="flex flex-col items-center">
          <input
            type="number"
            min="0"
            max="59"
            placeholder="00"
            value={seconds || ""}
            onChange={handleSecondsChange}
            className="w-16 bg-transparent text-center text-lg font-semibold text-zinc-950 dark:text-zinc-50 outline-none placeholder:text-zinc-300 dark:placeholder:text-zinc-700 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <span className="text-xs text-zinc-400 dark:text-zinc-600 mt-1">sec</span>
        </div>
      </div>
    </div>
  )
}
