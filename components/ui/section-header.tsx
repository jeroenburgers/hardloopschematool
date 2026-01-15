import * as React from "react"
import { Badge } from "./badge"
import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  badge?: string
  title: React.ReactNode
  description?: string
  className?: string
  titleClassName?: string
}

export function SectionHeader({
  badge,
  title,
  description,
  className,
  titleClassName,
}: SectionHeaderProps) {
  return (
    <div className={cn("text-center mb-20", className)}>
      {badge && (
        <Badge variant="orange" className="mb-6">
          {badge}
        </Badge>
      )}
      <h1
        className={cn(
          "text-4xl md:text-6xl font-black text-zinc-950 dark:text-zinc-50 mb-6",
          titleClassName,
        )}
      >
        {title}
      </h1>
      {description && (
        <p className="text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed font-medium">
          {description}
        </p>
      )}
    </div>
  )
}
