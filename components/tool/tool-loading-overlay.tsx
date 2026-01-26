"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { translations } from "@/lib/i18n"

/**
 * Loading Overlay for Schedule Tool
 * SOLAR: Separation of Concerns - handles loading state display
 */
interface ToolLoadingOverlayProps {
  loading: boolean
}

function formatDuration(seconds: number): string {
  if (seconds < 60) {
    return `${seconds} seconde${seconds !== 1 ? "n" : ""}`
  }
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  if (remainingSeconds === 0) {
    return `${minutes} minuut${minutes !== 1 ? "en" : ""}`
  }
  return `${minutes} minuut${minutes !== 1 ? "en" : ""} ${remainingSeconds} seconde${remainingSeconds !== 1 ? "n" : ""}`
}

export function ToolLoadingOverlay({ loading }: ToolLoadingOverlayProps) {
  const { locale } = useLanguage()
  const toolTranslations = translations[locale].tool
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  // Handle visibility separately to avoid setState in effect
  useEffect(() => {
    setIsVisible(loading)
  }, [loading])

  // Handle timer separately
  useEffect(() => {
    if (!loading) {
      setElapsedSeconds(0)
      return
    }

    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [loading])

  if (!loading) return null

  // Estimate based on elapsed time (Gemini typically takes 10-30 seconds)
  const estimatedTotal = Math.max(15, elapsedSeconds + 5) // At least 15 seconds, or current + 5
  const progress = Math.min(95, (elapsedSeconds / estimatedTotal) * 100) // Cap at 95% until done

  return (
    <div
      className={`fixed inset-0 bg-white/98 dark:bg-zinc-950/98 backdrop-blur-xl z-[9999] flex flex-col items-center justify-center text-center p-8 transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 via-white to-orange-50/30 dark:from-orange-950/10 dark:via-zinc-950 dark:to-orange-950/10 animate-pulse" />

      <div className="max-w-md w-full relative z-10">
        {/* Spinner with pulse effect */}
        <div className="relative mb-8 mx-auto w-24 h-24">
          {/* Outer pulsing ring */}
          <div className="absolute inset-0 rounded-full bg-orange-600/20 dark:bg-orange-500/20 animate-ping" />
          {/* Middle pulsing ring */}
          <div className="absolute inset-2 rounded-full bg-orange-600/30 dark:bg-orange-500/30 animate-pulse" />
          {/* Spinning loader */}
          <div className="relative w-24 h-24 border-4 border-zinc-100 dark:border-zinc-800 border-t-orange-600 dark:border-t-orange-500 rounded-full animate-spin">
            <div
              className="absolute inset-0 rounded-full border-4 border-transparent border-r-orange-400 dark:border-r-orange-600 animate-spin"
              style={{ animationDuration: "0.8s" }}
            />
          </div>
        </div>

        {/* Title with fade-in animation */}
        <h3 className="text-2xl font-black text-zinc-950 dark:text-zinc-50 mb-3 animate-fade-in-up">
          Schema genereren...
        </h3>

        {/* Description with staggered animation */}
        <p
          className="text-zinc-600 dark:text-zinc-400 font-medium text-sm mb-8 animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          {toolTranslations.coachLoading ||
            "Onze AI coach analyseert jouw input en genereert een persoonlijk schema."}
        </p>

        {/* Progress bar with gradient animation */}
        <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-3 mb-6 overflow-hidden shadow-inner">
          <div
            className="relative h-3 rounded-full bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 transition-all duration-700 ease-out shadow-lg"
            style={{ width: `${progress}%` }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            {/* Glow effect */}
            <div className="absolute inset-0 bg-orange-400/50 blur-sm animate-pulse" />
          </div>
        </div>

        {/* Time info with counter animation */}
        <div className="flex items-center justify-center gap-4 text-xs text-zinc-500 dark:text-zinc-400 mb-6">
          <span className="font-medium transition-all duration-300 hover:text-orange-600 dark:hover:text-orange-400">
            Verstreken:{" "}
            <span className="font-black text-zinc-700 dark:text-zinc-300">
              {formatDuration(elapsedSeconds)}
            </span>
          </span>
          <span className="opacity-50">•</span>
          <span className="font-medium transition-all duration-300 hover:text-orange-600 dark:hover:text-orange-400">
            Geschat:{" "}
            <span className="font-black text-zinc-700 dark:text-zinc-300">
              ~{formatDuration(estimatedTotal)}
            </span>
          </span>
        </div>

        {/* Bottom message with subtle animation */}
        <p
          className="text-xs text-zinc-400 dark:text-zinc-500 animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          Dit kan even duren, we genereren een volledig gepersonaliseerd schema voor jou...
        </p>

        {/* Dots animation */}
        <div className="flex items-center justify-center gap-1.5 mt-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-orange-600 dark:bg-orange-500 animate-bounce"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: "1.4s",
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  )
}
