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

export function CreateSchedulePage({
  initialGoal: propInitialGoal,
  initialLevel: propInitialLevel,
}: CreateSchedulePageProps = {}) {
  // Pass propInitialGoal directly - useScheduleForm will read from sessionStorage if needed
  // This avoids setState in useEffect and lets useScheduleForm handle the sessionStorage logic

  const handleGenerated = (schedule: RunningSchedule, formData: ScheduleFormData) => {
    // TODO: Handle schedule generation completion
    console.log("Schedule generated:", schedule, formData)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Header />
      <ToolPage
        initialGoal={propInitialGoal}
        initialLevel={propInitialLevel}
        onGenerated={handleGenerated}
      />
      <Footer />
    </div>
  )
}
