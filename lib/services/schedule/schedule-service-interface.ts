import type { RunningSchedule, ScheduleFormData } from "@/lib/types/schedule"

/**
 * Interface for schedule generation service
 * SOLAR: Loose Coupling - defines contract, not implementation
 */
export interface IScheduleService {
  /**
   * Generates a running schedule from form data
   * @param formData - The form data containing user preferences
   * @returns Promise resolving to a RunningSchedule
   */
  generateSchedule(formData: ScheduleFormData): Promise<RunningSchedule>
}
