import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface CheckListItemProps {
  children: React.ReactNode
  className?: string
}

export function CheckListItem({ children, className }: CheckListItemProps) {
  return (
    <li className={cn("flex items-start gap-3", className)}>
      <Check className="w-6 h-6 text-emerald-500 mt-0.5 flex-shrink-0" />
      <span className="text-zinc-700 dark:text-zinc-300 font-bold text-sm">{children}</span>
    </li>
  )
}
