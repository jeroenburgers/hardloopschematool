"use client"

import { useState, useEffect, useMemo } from "react"
import { useLanguage } from "@/components/language-provider"
import { translations } from "@/lib/i18n"

/**
 * Generate a random number within the range, avoiding round numbers
 */
function generateCount(min: number, max: number): number {
  const base = Math.floor(Math.random() * (max - min + 1)) + min
  // Add small random variation to avoid round numbers (±3-6)
  const variation = Math.floor(Math.random() * 7) - 3 // -3 to +3
  const count = base + variation
  // Ensure count stays within reasonable bounds
  return Math.max(min - 3, Math.min(max + 3, count))
}

/**
 * Get time slot configuration based on hour
 */
function getTimeSlotKey(hour: number): "morning" | "daytime" | "evening" | "night" {
  if (hour >= 6 && hour < 9) return "morning"
  if (hour >= 9 && hour < 17) return "daytime"
  if (hour >= 17 && hour < 22) return "evening"
  return "night"
}

/**
 * Get time slot ranges
 */
function getTimeSlotRanges(slot: "morning" | "daytime" | "evening" | "night"): {
  min: number
  max: number
} {
  switch (slot) {
    case "morning":
      return { min: 8, max: 28 }
    case "daytime":
      return { min: 15, max: 45 }
    case "evening":
      return { min: 35, max: 95 }
    case "night":
      return { min: 3, max: 14 }
  }
}

/**
 * Hook for generating dynamic "active runners" message based on time of day
 * Uses Kahneman System 1: Creates realistic, time-based social proof
 * Uses Cialdini Social Proof: Shows others are using the tool
 */
export function useActiveRunners() {
  const { locale } = useLanguage()

  // IMPORTANT (Hydration): first render must be deterministic and identical on server + client.
  // So we start with a static, translated fallback and only compute the dynamic message after mount.
  const staticFallbackMessage = useMemo(() => translations[locale].hero.active, [locale])

  const [currentCount, setCurrentCount] = useState<number | null>(null)
  const [emoji, setEmoji] = useState<string>("")
  const [message, setMessage] = useState<string>(staticFallbackMessage)

  useEffect(() => {
    const now = new Date()
    const hour = now.getHours()
    const timeSlotKey = getTimeSlotKey(hour)
    const { min, max } = getTimeSlotRanges(timeSlotKey)
    const timeSlotTranslations = translations[locale].hero.activeRunners[timeSlotKey]

    const initialCount = generateCount(min, max)
    const selectedMessageIndex = Math.floor(Math.random() * timeSlotTranslations.messages.length)
    const selectedMessage =
      timeSlotTranslations.messages[selectedMessageIndex] || timeSlotTranslations.messages[0]

    // Avoid setState synchronously in effect body (eslint react-hooks/set-state-in-effect)
    const kickoff = setTimeout(() => {
      setEmoji(timeSlotTranslations.emoji)
      setCurrentCount(initialCount)
      setMessage(selectedMessage.replace("{aantal}", initialCount.toString()))
    }, 0)

    // Update count every 30-60 seconds with small variation
    const interval = setInterval(
      () => {
        setCurrentCount((prev) => {
          const basePrev = prev ?? initialCount
          const variation = Math.floor(Math.random() * 7) - 3 // -3 to +3
          const next = basePrev + variation
          const bounded = Math.max(min - 3, Math.min(max + 3, next))
          setMessage(selectedMessage.replace("{aantal}", bounded.toString()))
          return bounded
        })
      },
      30000 + Math.random() * 30000,
    )

    return () => {
      clearTimeout(kickoff)
      clearInterval(interval)
    }
  }, [locale])

  return {
    emoji,
    message,
    count: currentCount ?? undefined,
    isReady: true,
  }
}
