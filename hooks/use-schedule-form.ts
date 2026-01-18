"use client"

import { useState, useMemo } from "react"
import { useLanguage } from "@/components/language-provider"
import { translations } from "@/lib/i18n"
import type { ScheduleFormData, Level, Goal as GoalType, PersonalInfo } from "@/lib/types/schedule"

/**
 * Custom hook for managing schedule form state
 * SOLAR: Separation of Concerns - centralizes form state management
 */
interface UseScheduleFormOptions {
  initialGoal?: GoalType
  initialLevel?: Level
}

export function useScheduleForm({ initialGoal, initialLevel }: UseScheduleFormOptions = {}) {
  const { locale } = useLanguage()
  const toolTranslations = translations[locale].tool

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
  })

  const defaultGoal = (toolTranslations.goals?.[0] as GoalType) || "5 kilometer"
  const defaultHealth = toolTranslations.healthOptions?.[0] || "Topfit"

  const [formData, setFormData] = useState<ScheduleFormData>(() => ({
    goal: initialGoal || defaultGoal,
    focus: "Recreatief",
    targetTime: "",
    level: initialLevel || "Beginner",
    frequency: "2 dagen per week",
    health: defaultHealth,
    recentDistance: defaultGoal,
    recentTime: "",
    startDate: "",
    targetDays: 3,
    planningMode: "Automatisch",
    selectedDays: [],
    language: locale,
    gender: undefined,
    ageGroup: undefined,
  }))

  const updateFormData = (updates: Partial<ScheduleFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }))
  }

  const updatePersonalInfo = (updates: Partial<PersonalInfo>) => {
    setPersonalInfo((prev) => ({ ...prev, ...updates }))
  }

  const planningOptions = useMemo(() => {
    const { goal } = formData
    let min = 2,
      max = 5
    if (goal.includes("5 kilometer")) {
      min = 2
      max = 3
    } else if (goal.includes("10 kilometer")) {
      min = 2
      max = 4
    } else if (goal.includes("Halve marathon")) {
      min = 3
      max = 5
    } else if (goal.includes("Marathon")) {
      min = 3
      max = 5
    }
    const options = []
    for (let i = min; i <= max; i++) options.push(i)
    return options
  }, [formData])

  const nextMondays = useMemo(() => {
    const mondays = []
    const d = new Date()
    d.setDate(d.getDate() + ((1 + 7 - d.getDay()) % 7))
    for (let i = 0; i < 6; i++) {
      mondays.push({
        val: d.toISOString().split("T")[0],
        label: d.toLocaleDateString(locale, { day: "numeric", month: "short" }),
      })
      d.setDate(d.getDate() + 7)
    }
    return mondays
  }, [locale])

  const isValidStep = (step: number): boolean => {
    if (step === 1) return !!formData.goal
    if (step === 2) return !!formData.level
    if (step === 3) return true
    if (step === 4) return !!formData.health
    if (step === 5) return !!formData.recentDistance && formData.recentTime.length >= 5
    if (step === 6) return !!formData.startDate && !!formData.targetDays
    if (step === 7)
      return (
        !!personalInfo.firstName &&
        !!personalInfo.lastName &&
        !!personalInfo.email &&
        !!personalInfo.address &&
        personalInfo.email.includes("@")
      )
    return false
  }

  return {
    formData,
    personalInfo,
    planningOptions,
    nextMondays,
    updateFormData,
    updatePersonalInfo,
    isValidStep,
  }
}
