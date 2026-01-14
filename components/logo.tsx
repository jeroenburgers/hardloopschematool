"use client"

import Link from "next/link"
import { useLanguage } from "./language-provider"
import { Zap } from "lucide-react"

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  const { t } = useLanguage()
  const appName = t("common.appName")

  // Split appName on "Tool" or "tool" to highlight the last part
  // Handles: "Running Schedule Tool", "Laufplan-Tool", "Hardloopschematool"
  const toolRegex = /(.*?)([Tt]ool)$/
  const match = appName.match(toolRegex)

  const renderText = () => {
    if (match) {
      const beforeTool = match[1]
      const toolPart = match[2]
      return (
        <>
          {beforeTool}
          <span className="text-orange-600">{toolPart}</span>
        </>
      )
    }
    // Fallback: if no match, show full name
    return appName
  }

  return (
    <Link
      href="/"
      className={`flex items-center gap-2 hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm ${className || ""}`}
    >
      <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center shadow-sm">
        <Zap className="w-5 h-5 text-white" fill="currentColor" strokeWidth={2.5} />
      </div>
      <span className="text-base font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
        {renderText()}
      </span>
    </Link>
  )
}
