import { prisma } from "./client"
import type { RunningSchedule, ScheduleFormData } from "@/lib/types/schedule"

export async function saveScheduleToPrisma(
  schedule: RunningSchedule,
  formData?: ScheduleFormData,
): Promise<string> {
  const result = await prisma.schedule.create({
    data: {
      title: schedule.title,
      overview: schedule.overview,
      weeks: schedule.weeks as unknown as object,
      // Store runnerProfile and summary from Gemini response
      runnerProfile: schedule.runnerProfile ? (schedule.runnerProfile as unknown as object) : null,
      summary: schedule.summary ? (schedule.summary as unknown as object) : null,
      // Store metadata from form data for querying
      goal: formData?.goal || null,
      focus: formData?.focus || null,
      targetTime: formData?.targetTime || null,
      level: formData?.level || null,
      frequency: formData?.frequency || null,
      health: formData?.health || null,
      recentDistance: formData?.recentDistance || null,
      recentTime: formData?.recentTime || null,
      startDate: formData?.startDate || null,
      targetDays: formData?.targetDays || null,
      trainingWeeks: formData?.trainingWeeks || null,
      planningMode: formData?.planningMode || null,
      selectedDays: formData?.selectedDays ? (formData.selectedDays as unknown as object) : null,
      language: formData?.language || null,
      gender: formData?.gender || null,
      ageGroup: formData?.ageGroup || null,
      trainingMethod: formData?.trainingMethod || null,
    },
  })

  // Invalidate cache for this specific schedule when it's created/updated
  // Only if Accelerate is available
  try {
    const prismaWithAccelerate = prisma as typeof prisma & {
      $accelerate?: { invalidate: (options: { tags: string[] }) => Promise<void> }
    }
    if (prismaWithAccelerate.$accelerate?.invalidate) {
      await prismaWithAccelerate.$accelerate.invalidate({
        tags: [`schedule-${result.id}`],
      })
    }
  } catch (error) {
    // Cache invalidation is optional, don't fail if it errors
    console.warn("Cache invalidation failed:", error)
  }

  return result.id
}

export async function getScheduleFromPrisma(scheduleId: string): Promise<RunningSchedule | null> {
  // Build query with optional cache strategy (only if Accelerate is available)
  const dbUrl = process.env.DATABASE_URL || ""
  const hasAccelerate = dbUrl.startsWith("prisma://") || dbUrl.startsWith("prisma+postgres://")

  // Build query - use type assertion to handle Accelerate extension types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const schedule = await (prisma.schedule.findUnique as any)({
    where: {
      id: scheduleId,
    },
    ...(hasAccelerate && {
      cacheStrategy: {
        swr: 60, // Serve stale data for 60 seconds while revalidating
        ttl: 3600, // Cache for 1 hour (3600 seconds)
        tags: [`schedule-${scheduleId}`],
      },
    }),
  })

  if (!schedule) {
    return null
  }

  // Ensure weeks have weekSummary
  const weeks = (schedule.weeks as unknown as RunningSchedule["weeks"]).map((week) => ({
    ...week,
    weekSummary: week.weekSummary || {
      totalDistance: "",
      totalDuration: "",
      trainingDays: week.days?.length || 0,
    },
  }))

  return {
    title: schedule.title,
    overview: schedule.overview,
    runnerProfile: schedule.runnerProfile
      ? (schedule.runnerProfile as unknown as RunningSchedule["runnerProfile"])
      : {
          experience: "",
          currentFitness: "",
          healthStatus: "",
          trainingHistory: "",
          strengths: [],
          considerations: [],
          motivation: "",
        },
    summary: schedule.summary
      ? (schedule.summary as unknown as RunningSchedule["summary"])
      : {
          goal: "",
          targetDistance: "",
          duration: "",
          trainingMethod: "",
          totalWeeks: 0,
          coachStrategy: "",
        },
    weeks,
  }
}

/**
 * Query schedules by metadata filters
 * Useful for finding similar schedules or filtering by criteria
 */
export async function querySchedulesByMetadata(filters: {
  goal?: string
  level?: string
  trainingMethod?: string
  language?: string
  trainingWeeks?: number
  targetDays?: number
  limit?: number
}) {
  const where: Record<string, unknown> = {}

  if (filters.goal) {
    where.goal = filters.goal
  }
  if (filters.level) {
    where.level = filters.level
  }
  if (filters.trainingMethod) {
    where.trainingMethod = filters.trainingMethod
  }
  if (filters.language) {
    where.language = filters.language
  }
  if (filters.trainingWeeks !== undefined) {
    where.trainingWeeks = filters.trainingWeeks
  }
  if (filters.targetDays !== undefined) {
    where.targetDays = filters.targetDays
  }

  const dbUrl = process.env.DATABASE_URL || ""
  const hasAccelerate = dbUrl.startsWith("prisma://") || dbUrl.startsWith("prisma+postgres://")

  // Use type assertion to handle Accelerate extension types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result = await (prisma.schedule.findMany as any)({
    where,
    orderBy: {
      createdAt: "desc",
    },
    take: filters.limit || 10,
    ...(hasAccelerate && {
      cacheStrategy: {
        swr: 60,
        ttl: 1800, // Cache for 30 minutes
        tags: ["schedule-queries"],
      },
    }),
  })
  return result
}
