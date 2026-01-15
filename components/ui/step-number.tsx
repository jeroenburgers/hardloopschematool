import * as React from "react"
import { cn } from "@/lib/utils"

interface StepNumberProps {
  number: string | number
  variant?: "default" | "orange" | "emerald"
  className?: string
}

export function StepNumber({ number, variant = "default", className }: StepNumberProps) {
  const variantStyles = {
    default:
      "bg-zinc-100 dark:bg-zinc-800 text-zinc-950 dark:text-zinc-50 border-zinc-200 dark:border-zinc-700",
    orange:
      "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-500 border-orange-200 dark:border-orange-800",
    emerald:
      "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-500 border-emerald-200 dark:border-emerald-800",
  }

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center w-12 h-12 rounded-2xl font-bold text-xl border shadow-sm",
        variantStyles[variant],
        className,
      )}
    >
      {number}
    </div>
  )
}
