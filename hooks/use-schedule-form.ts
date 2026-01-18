"use client"

import { useState, useMemo, useEffect } from "react"
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

  const defaultHealth = toolTranslations.healthOptions?.[0] || "Topfit (geen klachten)"

  const [formData, setFormData] = useState<ScheduleFormData>(() => ({
    goal: initialGoal || "",
    focus: "Recreatief",
    targetTime: "",
    level: initialLevel || "",
    frequency: "",
    health: defaultHealth,
    recentDistance: "",
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
    } else if (goal.includes("30 kilometer")) {
      min = 3
      max = 5
    } else if (goal.includes("Marathon")) {
      min = 3
      max = 5
    } else if (goal.includes("Conditie / Gezondheid")) {
      min = 2
      max = 4
    }
    const options = []
    for (let i = min; i <= max; i++) options.push(i)
    return options
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.goal])

  const recommendedDays = useMemo(() => {
    const { goal } = formData
    if (goal.includes("5 kilometer")) {
      return 2
    } else if (goal.includes("10 kilometer")) {
      return 3
    } else if (goal.includes("Halve marathon")) {
      return 3
    } else if (goal.includes("30 kilometer")) {
      return 4
    } else if (goal.includes("Marathon")) {
      return 5
    }
    return 3 // Default
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.goal])

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

  // Set startDate to first Monday if not set
  useEffect(() => {
    if (!formData.startDate && nextMondays.length > 0) {
      updateFormData({ startDate: nextMondays[0].val })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextMondays])

  // Set targetDays to recommendedDays when goal changes
  useEffect(() => {
    if (formData.goal && planningOptions.includes(recommendedDays)) {
      // Only update if targetDays is not already set to recommendedDays
      // or if it's not within the valid planning options
      if (
        formData.targetDays !== recommendedDays ||
        !planningOptions.includes(formData.targetDays)
      ) {
        updateFormData({ targetDays: recommendedDays })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.goal, recommendedDays, planningOptions])

  const isValidStep = (step: number): boolean => {
    if (step === 1) {
      // Goal is required
      if (!formData.goal) return false
      // Focus is required unless goal is "Conditie / Gezondheid"
      const isFitnessGoal =
        formData.goal === "Conditie / Gezondheid" || formData.goal.includes("Conditie / Gezondheid")
      if (!isFitnessGoal && !formData.focus) return false
      // targetTime required if Prestatiegericht
      if (formData.focus === "Prestatiegericht" && !formData.targetTime) return false
      return true
    }
    if (step === 2) {
      // Level is required, frequency required if not Starter
      if (!formData.level) return false
      if (formData.level !== "Starter" && !formData.frequency) return false
      return true
    }
    if (step === 3) {
      // Gender and ageGroup are required
      if (!formData.gender || !formData.ageGroup) return false
      return true
    }
    if (step === 4) return !!formData.health
    if (step === 5) return !!formData.recentDistance && formData.recentTime.length >= 5
    if (step === 6) {
      // StartDate and targetDays required, selectedDays required if Zelf inplannen
      if (!formData.startDate || !formData.targetDays) return false
      if (
        formData.planningMode === "Zelf inplannen" &&
        formData.selectedDays.length !== formData.targetDays
      ) {
        return false
      }
      return true
    }
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
    recommendedDays,
    nextMondays,
    updateFormData,
    updatePersonalInfo,
    isValidStep,
  }
}
