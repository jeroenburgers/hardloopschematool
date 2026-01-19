"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ToolPage } from "./tool-page"
import type { RunningSchedule, ScheduleFormData, Goal, Level } from "@/lib/types/schedule"

/**
 * Create Schedule Page
 * SOLAR: Separation of Concerns - page wrapper that includes header/footer
 */
interface CreateSchedulePageProps {
  initialGoal?: Goal
  initialLevel?: Level
}

/**
 * Read initial goal from sessionStorage
 */
function getInitialGoalFromStorage(propInitialGoal?: Goal): Goal | undefined {
  if (propInitialGoal) return propInitialGoal
  if (typeof window === "undefined") return undefined
  const storedGoal = sessionStorage.getItem("initialGoal")
  if (storedGoal) {
    sessionStorage.removeItem("initialGoal")
    return storedGoal as Goal
  }
  return undefined
}

export function CreateSchedulePage({
  initialGoal: propInitialGoal,
  initialLevel: propInitialLevel,
}: CreateSchedulePageProps = {}) {
  // Read from sessionStorage synchronously during initialization
  const initialGoal = getInitialGoalFromStorage(propInitialGoal)

  const handleGenerated = (schedule: RunningSchedule, formData: ScheduleFormData) => {
    // TODO: Handle schedule generation completion
    console.log("Schedule generated:", schedule, formData)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Header />
      <ToolPage
        initialGoal={initialGoal}
        initialLevel={propInitialLevel}
        onGenerated={handleGenerated}
      />
      <Footer />
    </div>
  )
}
