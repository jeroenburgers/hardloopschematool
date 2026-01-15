import * as React from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

interface BackLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

export function BackLink({ href, children, className }: BackLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 text-gray-500 dark:text-zinc-400 hover:text-orange-600 dark:hover:text-orange-500 transition-colors mb-12 font-semibold group",
        className,
      )}
    >
      <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
      {children}
    </Link>
  )
}
