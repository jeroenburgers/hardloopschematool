import { Activity } from "lucide-react"

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
    <div className="flex flex-col gap-4 w-full group">
      <div className="flex items-center gap-2">
        <div className="text-orange-600">
          <Activity className="w-6 h-6" />
        </div>
        <label className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400 group-focus-within:text-orange-600 dark:group-focus-within:text-orange-500 transition-colors">
          {label}
        </label>
      </div>
      <div className="relative">
        <input
          type="text"
          placeholder="00:00:00"
          value={value}
          onChange={handleChange}
          className="w-full bg-white dark:bg-zinc-900/50 border-2 border-zinc-200 dark:border-zinc-800 rounded-3xl px-8 py-6 text-4xl sm:text-6xl font-black text-zinc-950 dark:text-zinc-50 focus:border-zinc-950 dark:focus:border-zinc-600 outline-none transition-all placeholder:text-zinc-100 dark:placeholder:text-zinc-800 shadow-sm"
        />
      </div>
    </div>
  )
}
