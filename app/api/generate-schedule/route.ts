import { NextRequest, NextResponse } from "next/server"
import { generateScheduleFromFormData } from "@/lib/services/schedule/gemini-service"
import { saveScheduleToPrisma } from "@/lib/prisma/schedule-storage"
import type { ScheduleFormData } from "@/lib/types/schedule"

export async function POST(request: NextRequest) {
  try {
    const formData: ScheduleFormData = await request.json()

    // Generate schedule using Gemini
    const schedule = await generateScheduleFromFormData(formData)

    // Save to Prisma/PostgreSQL with form data metadata
    const scheduleId = await saveScheduleToPrisma(schedule, formData)

    if (!scheduleId) {
      throw new Error("Failed to save schedule to database")
    }

    return NextResponse.json(
      {
        success: true,
        scheduleId,
        schedule,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error generating schedule:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
    console.error("Full error details:", error)
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 },
    )
  }
}
