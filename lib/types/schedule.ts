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

export type TrainingMethod =
  | "Gebalanceerd"
  | "80/20 (Polarized)"
  | "MAF (lage hartslag)"
  | "Run-Walk (Galloway)"
  | "Jack Daniels (tempozones)"
  | "Lydiard (fasegericht)"
  | "Hansons"
  | "Pfitzinger"

export interface WorkoutDetails {
  warmup?: { distance?: string; duration?: string; description: string }
  interval?: {
    reps: number
    distancePerRep?: string
    durationPerRep?: string
    targetPace: string
    recovery: string
  }
  mainBody?: {
    distance?: string
    duration?: string
    targetPace?: string
    description: string
  }
  strides?: { count: number; description: string }
  cooldown?: { distance?: string; duration?: string; description: string }

  // De finishing touches:
  technicalData: {
    rpe: number // Schaal 1-10 (gevoelswaarde)
    trainingEffect: string // bijv. "VO2-Max verbetering"
    surface?: string // bijv. "Baan", "Weg", "Bos"
  }
}

export interface TrainingDay {
  day: string
  date?: string
  type: string
  description: string
  intensity: string
  duration: string // Always required for route planning
  distance: string // Always required for route planning
  workoutDetails?: WorkoutDetails
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
  trainingWeeks: number
  planningMode: "Automatisch" | "Zelf inplannen"
  selectedDays: string[]
  language: "nl" | "en" | "de"
  gender?: "Man" | "Vrouw" | "Geen voorkeur"
  ageGroup?: string
  trainingMethod?: TrainingMethod | ""
}
