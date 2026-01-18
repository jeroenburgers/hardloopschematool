"use client"

import { ScheduleTool } from "@/components/tool/schedule-tool"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolUSPs } from "@/components/tool/tool-usps"
import type { RunningSchedule, ScheduleFormData, Level, Goal } from "@/lib/types/schedule"

/**
 * Tool Page component
 * SOLAR: Separation of Concerns - page wrapper for the schedule tool
 */
interface ToolPageProps {
  initialGoal?: Goal
  initialLevel?: Level
  onGenerated?: (schedule: RunningSchedule, formData: ScheduleFormData) => void
}

export function ToolPage({ initialGoal, initialLevel, onGenerated }: ToolPageProps) {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ToolHeader />

        <div className="bg-white dark:bg-zinc-950 border-[6px] border-zinc-50 dark:border-zinc-900 p-6 sm:p-24 rounded-[4rem] sm:rounded-[6rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] dark:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] relative overflow-hidden animate-in zoom-in-95 duration-1000">
          <div className="absolute top-0 right-0 w-96 h-96 bg-zinc-50/50 dark:bg-zinc-900/50 rounded-full blur-3xl -mr-48 -mt-48" />
          <ScheduleTool
            initialGoal={initialGoal}
            initialLevel={initialLevel}
            onComplete={onGenerated}
          />
        </div>

        <ToolUSPs />
      </div>
    </div>
  )
}
