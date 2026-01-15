import * as React from "react"
import { cn } from "@/lib/utils"

interface VisualizationPlaceholderProps {
  text: string
  className?: string
}

export function VisualizationPlaceholder({ text, className }: VisualizationPlaceholderProps) {
  return (
    <div
      className={cn(
        "bg-zinc-50 dark:bg-zinc-900 rounded-[3rem] p-8 aspect-video flex items-center justify-center border border-zinc-100 dark:border-zinc-800 shadow-inner",
        className,
      )}
    >
      <div className="text-zinc-400 dark:text-zinc-500 text-sm italic font-medium">{text}</div>
    </div>
  )
}
