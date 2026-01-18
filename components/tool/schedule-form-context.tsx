"use client"

import { createContext, useContext, type ReactNode } from "react"
import { useScheduleForm } from "@/hooks/use-schedule-form"
import type { ScheduleFormData, Level, Goal as GoalType, PersonalInfo } from "@/lib/types/schedule"

/**
 * Schedule Form Context
 * SOLAR: Dependency Inversion - provides form state via context instead of props
 */
interface ScheduleFormContextValue {
  formData: ScheduleFormData
  personalInfo: PersonalInfo
  planningOptions: number[]
  nextMondays: Array<{ val: string; label: string }>
  updateFormData: (updates: Partial<ScheduleFormData>) => void
  updatePersonalInfo: (updates: Partial<PersonalInfo>) => void
  isValidStep: (step: number) => boolean
}

const ScheduleFormContext = createContext<ScheduleFormContextValue | undefined>(undefined)

interface ScheduleFormProviderProps {
  children: ReactNode
  initialGoal?: GoalType
  initialLevel?: Level
}

export function ScheduleFormProvider({
  children,
  initialGoal,
  initialLevel,
}: ScheduleFormProviderProps) {
  const formState = useScheduleForm({ initialGoal, initialLevel })

  return <ScheduleFormContext.Provider value={formState}>{children}</ScheduleFormContext.Provider>
}

export function useScheduleFormContext() {
  const context = useContext(ScheduleFormContext)
  if (!context) {
    throw new Error("useScheduleFormContext must be used within ScheduleFormProvider")
  }
  return context
}
