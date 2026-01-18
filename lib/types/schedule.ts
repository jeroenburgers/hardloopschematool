export type Level = "Starter" | "Beginner" | "Gemiddeld" | "Gevorderd" | "Expert"

export type Goal =
  | "5 kilometer"
  | "10 kilometer"
  | "15 kilometer"
  | "10 mijl (16,1 kilometer)"
  | "Halve marathon (21,1 kilometer)"
  | "30 kilometer"
  | "Marathon (42,2 kilometer)"
  | "Conditie / Gezondheid"

export interface TrainingDay {
  day: string
  date?: string
  type: string
  description: string
  intensity: string
  duration?: string
  distance?: string
}

export interface TrainingWeek {
  weekNumber: number
  focus: string
  days: TrainingDay[]
}

export interface RunningSchedule {
  title: string
  overview: string
  weeks: TrainingWeek[]
}

export interface PersonalInfo {
  firstName: string
  lastName: string
  email: string
  address: string
  city: string
}

export interface ScheduleFormData {
  goal: Goal | ""
  focus: "Recreatief" | "Prestatiegericht"
  targetTime?: string
  level: Level | ""
  frequency: string
  health: string
  recentDistance: string
  recentTime: string
  startDate: string
  targetDays: number
  planningMode: "Automatisch" | "Zelf inplannen"
  selectedDays: string[]
  language: "nl" | "en" | "de"
  gender?: "Man" | "Vrouw" | "Geen voorkeur"
  ageGroup?: string
}
