import * as React from "react"
import { Lightbulb } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProTipCardProps {
  title: string
  children: React.ReactNode
  className?: string
}

export function ProTipCard({ title, children, className }: ProTipCardProps) {
  return (
    <div
      className={cn(
        "bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800 p-8 rounded-3xl relative overflow-hidden",
        className,
      )}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-200/20 dark:bg-orange-800/20 rounded-full blur-2xl -mr-16 -mt-16"></div>
      <h4 className="text-lg font-bold text-orange-900 dark:text-orange-200 mb-3 flex items-center gap-2 relative z-10">
        <Lightbulb className="w-5 h-5" />
        {title}
      </h4>
      <p className="text-orange-900 dark:text-orange-200 leading-relaxed relative z-10">
        {children}
      </p>
    </div>
  )
}
