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
    <div className="pt-16 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ToolHeader />

        <div className="bg-white dark:bg-zinc-950 border-2 sm:border-4 lg:border-[6px] border-zinc-50 dark:border-zinc-900 p-4 sm:p-6 md:p-12 lg:p-24 rounded-2xl sm:rounded-3xl lg:rounded-[4rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] dark:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-zinc-50/50 dark:bg-zinc-900/50 rounded-full blur-3xl -mr-32 sm:-mr-48 -mt-32 sm:-mt-48" />
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
