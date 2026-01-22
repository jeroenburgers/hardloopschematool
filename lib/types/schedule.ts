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
  weekSummary: {
    totalDistance: string // Totale afstand van alle trainingen in deze week
    totalDuration: string // Totale duur van alle trainingen in deze week
    trainingDays: number // Aantal trainingsdagen in deze week
  }
}

export interface RunnerProfile {
  experience: string // Ervaring/niveau (bijv. "Starter", "Gemiddeld", "Gevorderd")
  currentFitness: string // Huidige fitheidssituatie gebaseerd op recente prestaties
  healthStatus: string // Blessurestatus en belastbaarheid
  trainingHistory: string // Huidige trainingsfrequentie en achtergrond
  strengths: string[] // Sterke punten van de loper
  considerations: string[] // Aandachtspunten en beperkingen
  motivation: string // Doel en motivatie
}

export interface RunningSchedule {
  title: string
  overview: string
  runnerProfile: RunnerProfile // Profiel van de loper gebaseerd op input
  summary: {
    goal: string // Het doel van het schema (bijv. "10 kilometer", "Marathon")
    targetDistance: string // De doelafstand (bijv. "10 km", "42.2 km")
    duration: string // Aantal weken (bijv. "12 weken")
    trainingMethod: string // De gebruikte trainingsmethode
    totalWeeks: number // Totaal aantal weken
    coachStrategy: string // De strategie achter het schema (opbouw, focus, aanpak)
  }
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
