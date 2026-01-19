import type { ReactNode } from "react"

/**
 * Radio Button component with physical radio button appearance
 * SOLAR: Separation of Concerns - reusable radio button UI
 */
interface RadioButtonProps {
  checked: boolean
  onChange: () => void
  children: ReactNode
  icon?: ReactNode
  className?: string
  error?: boolean
}

export function RadioButton({
  checked,
  onChange,
  children,
  icon,
  className = "",
  error = false,
}: RadioButtonProps) {
  return (
    <button
      type="button"
      onClick={onChange}
      role="radio"
      aria-checked={checked}
      aria-invalid={error && !checked ? true : undefined}
      className={`group relative flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-950 ${
        error && !checked
          ? "bg-white dark:bg-zinc-900/50 border-red-500 dark:border-red-500 text-zinc-700 dark:text-zinc-300 hover:border-red-600 dark:hover:border-red-400 hover:bg-red-50 dark:hover:bg-red-900/10"
          : checked
            ? "bg-zinc-950 dark:bg-zinc-900 border-zinc-950 dark:border-zinc-800 text-white shadow-md"
            : "bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-900"
      } ${className}`}
    >
      {/* Physical radio button */}
      <div className="flex-shrink-0">
        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
            checked
              ? "border-zinc-950 dark:border-zinc-800 bg-zinc-950 dark:bg-zinc-900"
              : "border-zinc-400 dark:border-zinc-600 bg-white dark:bg-zinc-900 group-hover:border-zinc-600 dark:group-hover:border-zinc-500"
          }`}
        >
          {checked && <div className="w-2.5 h-2.5 rounded-full bg-white dark:bg-zinc-50" />}
        </div>
      </div>

      {/* Icon */}
      {icon && (
        <div
          className={`flex-shrink-0 transition-colors ${
            checked ? "text-white" : "text-zinc-400 dark:text-zinc-600"
          }`}
        >
          {icon}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">{children}</div>
    </button>
  )
}
