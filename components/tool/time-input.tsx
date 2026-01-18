import { Clock } from "lucide-react"

/**
 * Time Input component
 * SOLAR: Separation of Concerns - handles time input formatting
 */
interface TimeInputProps {
  value: string
  onChange: (value: string) => void
  label: string
}

export function TimeInput({ value, onChange, label }: TimeInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/[^0-9]/g, "")
    if (v.length > 6) v = v.slice(0, 6)
    let formatted = ""
    if (v.length > 0) formatted += v.slice(0, 2)
    if (v.length > 2) formatted += ":" + v.slice(2, 4)
    if (v.length > 4) formatted += ":" + v.slice(4, 6)
    onChange(formatted)
  }

  return (
    <div className="space-y-3">
      <label className="text-base font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 mb-6">
        <Clock className="w-5 h-5 text-orange-600" />
        {label}
      </label>
      <div className="relative p-4 bg-white dark:bg-zinc-900/50 border-2 border-zinc-200 dark:border-zinc-800 rounded-xl focus-within:border-zinc-950 dark:focus-within:border-zinc-600 transition-colors">
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-zinc-400 dark:text-zinc-600 flex-shrink-0" />
          <input
            type="text"
            placeholder="00:00:00"
            value={value}
            onChange={handleChange}
            className="flex-1 bg-transparent text-2xl font-semibold text-zinc-950 dark:text-zinc-50 outline-none placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
          />
        </div>
      </div>
    </div>
  )
}
