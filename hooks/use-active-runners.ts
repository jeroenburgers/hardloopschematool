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

  // Calculate time slot synchronously to avoid layout shift
  const timeSlotData = useMemo(() => {
    const now = new Date()
    const hour = now.getHours()
    const timeSlotKey = getTimeSlotKey(hour)
    const timeSlotRanges = getTimeSlotRanges(timeSlotKey)
    const timeSlotTranslations = translations[locale].hero.activeRunners[timeSlotKey]

    return {
      timeSlotKey,
      timeSlotRanges,
      timeSlotTranslations,
    }
  }, [locale])

  // Initialize state with pre-calculated values to prevent layout shift
  // Use function initializer to calculate random values only once
  // All calculations are synchronous, so we can mark as ready immediately
  const [currentCount, setCurrentCount] = useState<number>(() =>
    generateCount(timeSlotData.timeSlotRanges.min, timeSlotData.timeSlotRanges.max),
  )
  const [selectedMessageIndex] = useState<number>(() =>
    Math.floor(Math.random() * timeSlotData.timeSlotTranslations.messages.length),
  )
  const isReady = true // All data is calculated synchronously, so ready immediately

  // Update count periodically
  useEffect(() => {
    // Update count every 30-60 seconds with small variation
    const interval = setInterval(
      () => {
        setCurrentCount((prev) => {
          const variation = Math.floor(Math.random() * 7) - 3 // -3 to +3
          const newCount = prev + variation
          // Keep within bounds
          return Math.max(
            timeSlotData.timeSlotRanges.min - 3,
            Math.min(timeSlotData.timeSlotRanges.max + 3, newCount),
          )
        })
      },
      30000 + Math.random() * 30000,
    ) // 30-60 seconds

    return () => clearInterval(interval)
  }, [timeSlotData.timeSlotRanges.min, timeSlotData.timeSlotRanges.max])

  // Select message based on selected index
  const message = useMemo(() => {
    const selectedMessage =
      timeSlotData.timeSlotTranslations.messages[selectedMessageIndex] ||
      timeSlotData.timeSlotTranslations.messages[0]
    return selectedMessage.replace("{aantal}", currentCount.toString())
  }, [timeSlotData.timeSlotTranslations.messages, selectedMessageIndex, currentCount])

  return {
    emoji: timeSlotData.timeSlotTranslations.emoji,
    message,
    count: currentCount,
    isReady,
  }
}
