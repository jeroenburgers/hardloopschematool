import type { IScheduleService } from "./schedule-service-interface"
import type { RunningSchedule, ScheduleFormData } from "@/lib/types/schedule"

/**
 * Gemini-based schedule generation service
 * SOLAR: Separation of Concerns - handles only schedule generation logic
 */
class GeminiScheduleService implements IScheduleService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async generateSchedule(_formData: ScheduleFormData): Promise<RunningSchedule> {
    // TODO: Implement actual Gemini API integration
    // For now, return a placeholder schedule
    // This will be implemented when the Gemini service is ready

    // Placeholder implementation
    throw new Error(
      "Gemini service not yet implemented. This is a placeholder for future integration.",
    )
  }
}

export const geminiScheduleService = new GeminiScheduleService()

/**
 * Generates a schedule from form data using the Gemini service
 * SOLAR: Orchestration - coordinates the schedule generation process
 */
export async function generateScheduleFromFormData(
  formData: ScheduleFormData,
): Promise<RunningSchedule> {
  return geminiScheduleService.generateSchedule(formData)
}
