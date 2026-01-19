/**
 * Analytics hook
 * Provides easy access to analytics tracking functions
 */

import { useCallback } from "react"
import {
  trackStepReached,
  trackPreviewModalOpened,
  trackPreviewModalClosed,
  trackFormCompleted,
  trackToolStarted,
} from "@/lib/utils/analytics"

export function useAnalytics() {
  const trackStep = useCallback((stepNumber: number, stepName: string, isSkipped = false) => {
    trackStepReached(stepNumber, stepName, isSkipped)
  }, [])

  const trackModalOpened = useCallback(() => {
    trackPreviewModalOpened()
  }, [])

  const trackModalClosed = useCallback(
    (method: "button_primary" | "button_secondary" | "backdrop") => {
      trackPreviewModalClosed(method)
    },
    [],
  )

  const trackCompleted = useCallback(() => {
    trackFormCompleted()
  }, [])

  const trackStarted = useCallback((initialGoal?: string) => {
    trackToolStarted(initialGoal)
  }, [])

  return {
    trackStep,
    trackModalOpened,
    trackModalClosed,
    trackCompleted,
    trackStarted,
  }
}
