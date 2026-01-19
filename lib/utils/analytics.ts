/**
 * Analytics utility
 * Tracks user interactions in the schedule tool
 * Supports Google Analytics 4 (gtag) and console logging for development
 */

type AnalyticsEvent = {
  action: string
  category: string
  label?: string
  value?: number
}

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: {
        event_category?: string
        event_label?: string
        value?: number
      },
    ) => void
  }
}

// Check if gtag is available (Google Analytics 4)
function isGtagAvailable(): boolean {
  return typeof window !== "undefined" && typeof window.gtag === "function"
}

/**
 * Track an analytics event
 * @param event - The event to track
 */
export function trackEvent(event: AnalyticsEvent): void {
  const { action, category, label, value } = event

  // Track in Google Analytics 4 if available
  if (isGtagAvailable() && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }

  // Always log to console in development
  if (process.env.NODE_ENV === "development") {
    console.log("[Analytics]", {
      action,
      category,
      label,
      value,
    })
  }
}

/**
 * Track step navigation in the schedule tool
 * @param stepNumber - The step number (1-7)
 * @param stepName - The name of the step
 * @param isSkipped - Whether this step was skipped
 */
export function trackStepReached(stepNumber: number, stepName: string, isSkipped = false): void {
  trackEvent({
    action: "step_reached",
    category: "schedule_tool",
    label: `${stepNumber}_${stepName}${isSkipped ? "_skipped" : ""}`,
    value: stepNumber,
  })
}

/**
 * Track when the preview modal is opened
 */
export function trackPreviewModalOpened(): void {
  trackEvent({
    action: "preview_modal_opened",
    category: "schedule_tool",
    label: "preview_modal",
  })
}

/**
 * Track when the preview modal is closed
 * @param method - How the modal was closed (button_primary, button_secondary, backdrop)
 */
export function trackPreviewModalClosed(
  method: "button_primary" | "button_secondary" | "backdrop",
): void {
  trackEvent({
    action: "preview_modal_closed",
    category: "schedule_tool",
    label: method,
  })
}

/**
 * Track when a user completes the entire form (reaches checkout step)
 */
export function trackFormCompleted(): void {
  trackEvent({
    action: "form_completed",
    category: "schedule_tool",
    label: "checkout_reached",
  })
}

/**
 * Track when a user starts the tool
 * @param initialGoal - The goal selected when starting (if any)
 */
export function trackToolStarted(initialGoal?: string): void {
  trackEvent({
    action: "tool_started",
    category: "schedule_tool",
    label: initialGoal || "no_initial_goal",
  })
}
