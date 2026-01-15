import * as React from "react"
import { cn } from "@/lib/utils"

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "orange" | "dark"
  size?: "sm" | "md" | "lg"
}

export function Badge({
  className,
  variant = "default",
  size = "md",
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    default:
      "bg-zinc-100 dark:bg-zinc-800 text-zinc-950 dark:text-zinc-50 border-zinc-200 dark:border-zinc-700",
    orange:
      "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-500 border-orange-200 dark:border-orange-800",
    dark: "bg-zinc-950 dark:bg-zinc-900 text-white border-zinc-800 dark:border-zinc-700",
  }

  const sizeStyles = {
    sm: "px-3 py-1 text-[9px]",
    md: "px-3 py-1 text-[9px]",
    lg: "px-5 py-2.5 text-[10px]",
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full font-black uppercase tracking-widest border shadow-sm",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
