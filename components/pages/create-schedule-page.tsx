"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ToolPage } from "./tool-page"
import type { RunningSchedule, ScheduleFormData } from "@/lib/types/schedule"

/**
 * Create Schedule Page
 * SOLAR: Separation of Concerns - page wrapper that includes header/footer
 */
export function CreateSchedulePage() {
  const handleGenerated = (schedule: RunningSchedule, formData: ScheduleFormData) => {
    // TODO: Handle schedule generation completion
    console.log("Schedule generated:", schedule, formData)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Header />
      <ToolPage onGenerated={handleGenerated} />
      <Footer />
    </div>
  )
}
