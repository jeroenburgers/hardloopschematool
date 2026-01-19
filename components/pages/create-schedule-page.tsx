"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ToolPage } from "./tool-page"
import type { Goal, Level } from "@/lib/types/schedule"

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
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Header />
      <ToolPage initialGoal={propInitialGoal} initialLevel={propInitialLevel} />
      <Footer />
    </div>
  )
}
