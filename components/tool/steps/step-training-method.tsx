"use client"

import { useMemo, useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { translations } from "@/lib/i18n"
import type { TrainingMethod, Goal, Level } from "@/lib/types/schedule"
import { RadioButton } from "@/components/ui/radio-button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

/**
 * Step Training Method Selection
 * SOLAR: Autonomous Component - determines which training methods are available based on user input
 */
interface TrainingMethodOption {
  value: TrainingMethod
  enabled: boolean
  reasonDisabled?: string
  recommended?: boolean
}

interface StepTrainingMethodProps {
  selectedMethod: TrainingMethod | ""
  goal: Goal | ""
  focus: string
  targetTime: string
  level: Level | ""
  health: string
  targetDays: number
  trainingWeeks: number
  onMethodChange: (method: TrainingMethod) => void
  showValidation?: boolean
}

export function StepTrainingMethod({
  selectedMethod,
  goal,
  focus,
  targetTime,
  level,
  health,
  targetDays,
  trainingWeeks,
  onMethodChange,
  showValidation = false,
}: StepTrainingMethodProps) {
  const { locale } = useLanguage()
  const toolTranslations = translations[locale].tool

  // Determine which methods are enabled based on user input
  const methodOptions = useMemo((): TrainingMethodOption[] => {
    const allMethods: TrainingMethod[] = [
      "Gebalanceerd",
      "80/20 (Polarized)",
      "MAF (lage hartslag)",
      "Run-Walk (Galloway)",
      "Jack Daniels (tempozones)",
      "Lydiard (fasegericht)",
      "Hansons",
      "Pfitzinger",
    ]

    const focusOptions = toolTranslations.focusOptions || ["Recreatief", "Prestatiegericht"]
    const recreationalLabel = focusOptions[0] || "Recreatief"
    const performanceLabel = focusOptions[1] || "Prestatiegericht"

    const isShortDistance =
      goal.includes("5 kilometer") || goal.includes("10 kilometer") || goal.includes("15 kilometer")
    const isHalfMarathon = goal.includes("Halve marathon")
    const isLongDistance = goal.includes("30 kilometer") || goal.includes("Marathon")
    const isFitnessGoal = goal === "Conditie / Gezondheid" || goal.includes("Conditie / Gezondheid")
    const isRecreational = focus === recreationalLabel
    const isPerformance = focus === performanceLabel
    const isStarter = level === "Starter" || level === "Beginner"
    const isIntermediate = level === "Gemiddeld"
    const isAdvanced = level === "Gevorderd" || level === "Expert"
    const hasInjuries = health.includes("pijntjes") || health.includes("snel vermoeid")
    const isRecovering = health.includes("herstellend")
    const hasTargetTime = !!targetTime && targetTime.length >= 5

    return allMethods.map((method): TrainingMethodOption => {
      let enabled = true
      let reasonDisabled: string | undefined
      let recommended = false

      // Gebalanceerd - always available, recommended for starters/beginners
      if (method === "Gebalanceerd") {
        recommended = isStarter || isIntermediate || isRecreational || isFitnessGoal
        return { value: method, enabled, recommended }
      }

      // 80/20 (Polarized) - available for most, but not for recovering
      if (method === "80/20 (Polarized)") {
        if (isRecovering) {
          enabled = false
          reasonDisabled = toolTranslations.trainingMethod?.disabled?.recovering || ""
        }
        recommended = isIntermediate || isAdvanced
        return { value: method, enabled, reasonDisabled, recommended }
      }

      // MAF (lage hartslag) - good for beginners, recovering, injuries
      if (method === "MAF (lage hartslag)") {
        recommended = isStarter || hasInjuries || isRecovering || isFitnessGoal
        return { value: method, enabled, recommended }
      }

      // Run-Walk (Galloway) - mainly for starters/beginners, especially for long distances
      if (method === "Run-Walk (Galloway)") {
        if (isAdvanced && !isLongDistance) {
          enabled = false
          reasonDisabled = toolTranslations.trainingMethod?.disabled?.tooAdvanced || ""
        }
        recommended = isStarter && (isLongDistance || isHalfMarathon)
        return { value: method, enabled, reasonDisabled, recommended }
      }

      // Jack Daniels (tempozones) - requires intermediate+ and performance focus
      if (method === "Jack Daniels (tempozones)") {
        if (isStarter) {
          enabled = false
          reasonDisabled = toolTranslations.trainingMethod?.disabled?.tooBeginner || ""
        }
        if (hasInjuries || isRecovering) {
          enabled = false
          reasonDisabled = toolTranslations.trainingMethod?.disabled?.tooIntense || ""
        }
        if (!isPerformance && !hasTargetTime) {
          enabled = false
          reasonDisabled = toolTranslations.trainingMethod?.disabled?.needsPerformance || ""
        }
        recommended = isIntermediate && isPerformance && hasTargetTime
        return { value: method, enabled, reasonDisabled, recommended }
      }

      // Lydiard (fasegericht) - requires advanced and long distance
      if (method === "Lydiard (fasegericht)") {
        if (isShortDistance) {
          enabled = false
          reasonDisabled = toolTranslations.trainingMethod?.disabled?.tooShortDistance || ""
        }
        if (isStarter || isIntermediate) {
          enabled = false
          reasonDisabled = toolTranslations.trainingMethod?.disabled?.tooBeginner || ""
        }
        if (hasInjuries || isRecovering) {
          enabled = false
          reasonDisabled = toolTranslations.trainingMethod?.disabled?.tooIntense || ""
        }
        recommended = isAdvanced && isLongDistance
        return { value: method, enabled, reasonDisabled, recommended }
      }

      // Hansons - requires advanced for half marathon, intermediate+ for marathon
      if (method === "Hansons") {
        if (isShortDistance) {
          enabled = false
          reasonDisabled = toolTranslations.trainingMethod?.disabled?.tooShortDistance || ""
        }
        if (isHalfMarathon && !isAdvanced) {
          enabled = false
          reasonDisabled = toolTranslations.trainingMethod?.disabled?.tooBeginner || ""
        }
        if (isStarter) {
          enabled = false
          reasonDisabled = toolTranslations.trainingMethod?.disabled?.tooBeginner || ""
        }
        if (hasInjuries || isRecovering) {
          enabled = false
          reasonDisabled = toolTranslations.trainingMethod?.disabled?.tooIntense || ""
        }
        if (targetDays < 4 || trainingWeeks < 12) {
          enabled = false
          reasonDisabled = toolTranslations.trainingMethod?.disabled?.needsMoreDays || ""
        }
        recommended = isAdvanced && isLongDistance && targetDays >= 4 && trainingWeeks >= 12
        return { value: method, enabled, reasonDisabled, recommended }
      }

      // Pfitzinger - requires advanced and long distance, very intensive
      if (method === "Pfitzinger") {
        if (isShortDistance || isHalfMarathon) {
          enabled = false
          reasonDisabled = toolTranslations.trainingMethod?.disabled?.tooShortDistance || ""
        }
        if (!isAdvanced) {
          enabled = false
          reasonDisabled = toolTranslations.trainingMethod?.disabled?.tooBeginner || ""
        }
        if (hasInjuries || isRecovering) {
          enabled = false
          reasonDisabled = toolTranslations.trainingMethod?.disabled?.tooIntense || ""
        }
        if (targetDays < 5 || trainingWeeks < 16) {
          enabled = false
          reasonDisabled = toolTranslations.trainingMethod?.disabled?.needsMoreDays || ""
        }
        recommended = isAdvanced && isLongDistance && targetDays >= 5 && trainingWeeks >= 16
        return { value: method, enabled, reasonDisabled, recommended }
      }

      return { value: method, enabled, recommended }
    })
  }, [
    goal,
    focus,
    targetTime,
    level,
    health,
    targetDays,
    trainingWeeks,
    toolTranslations.focusOptions,
    toolTranslations.trainingMethod,
  ])

  // Sort: recommended first, then enabled, then disabled
  const sortedOptions = useMemo(() => {
    return [...methodOptions].sort((a, b) => {
      if (a.recommended && !b.recommended) return -1
      if (!a.recommended && b.recommended) return 1
      if (a.enabled && !b.enabled) return -1
      if (!a.enabled && b.enabled) return 1
      return 0
    })
  }, [methodOptions])

  const error = showValidation && !selectedMethod
  const [selectedMethodForModal, setSelectedMethodForModal] = useState<TrainingMethod | null>(null)

  const methods = toolTranslations.trainingMethod?.methods || {}

  const getMethodKey = (method: TrainingMethod) => {
    return method
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "")
      .replace(/^80/, "eighty")
      .replace(/^maf/, "maf")
      .replace(/^runwalk/, "runwalk")
      .replace(/^jackdaniels/, "jackdaniels")
      .replace(/^lydiard/, "lydiard")
      .replace(/^hansons/, "hansons")
      .replace(/^pfitzinger/, "pfitzinger")
      .replace(/^gebalanceerd/, "gebalanceerd")
  }

  const openMethodModal = (method: TrainingMethod, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedMethodForModal(method)
  }

  const selectedMethodInfo = selectedMethodForModal
    ? methods[getMethodKey(selectedMethodForModal) as keyof typeof methods]
    : null

  return (
    <>
      <div className="space-y-3 sm:space-y-4">
        <label className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-4 sm:mb-6 block">
          {toolTranslations.trainingMethod?.question || "Welke trainingsmethode wil je volgen?"}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          {sortedOptions.map((option) => {
            const methodKey = getMethodKey(option.value)
            const methodInfo = methods[methodKey as keyof typeof methods]
            const methodLabel = methodInfo?.name || option.value
            const isSelected = selectedMethod === option.value
            const moreInfoLabel = toolTranslations.trainingMethod?.moreInfo || "Meer info"
            const moreInfoAriaLabel =
              toolTranslations.trainingMethod?.moreInfoAriaLabel || "Meer info over {method}"

            return (
              <RadioButton
                key={option.value}
                checked={isSelected}
                onChange={() => {
                  if (option.enabled) {
                    onMethodChange(option.value)
                  }
                }}
                error={error && !selectedMethod}
                className={!option.enabled ? "opacity-50 cursor-not-allowed grayscale" : ""}
              >
                <div className="flex flex-col items-start justify-center w-full min-h-[72px] sm:min-h-[80px] md:min-h-[85px] min-w-0">
                  <div className="w-full min-w-0 overflow-hidden">
                    <span className="block text-[11px] min-[375px]:text-xs sm:text-xs md:text-sm font-semibold leading-tight break-words">
                      {methodLabel}
                    </span>
                  </div>
                  {option.recommended && (
                    <span
                      className={`text-[8px] min-[375px]:text-[9px] sm:text-[9px] md:text-[10px] font-medium uppercase tracking-wide mt-1 sm:mt-1.5 flex-shrink-0 ${
                        isSelected ? "text-orange-400" : "text-zinc-400 dark:text-zinc-600"
                      }`}
                    >
                      {toolTranslations.trainingMethod?.recommended || "Aanbevolen"}
                    </span>
                  )}
                  {!option.enabled && option.reasonDisabled && (
                    <span className="text-[8px] min-[375px]:text-[9px] sm:text-[9px] md:text-[10px] text-red-600 dark:text-red-400 font-medium mt-1 sm:mt-1.5 break-words w-full min-w-0 overflow-hidden">
                      {option.reasonDisabled}
                    </span>
                  )}
                  {option.enabled && (
                    <button
                      type="button"
                      onClick={(e) => openMethodModal(option.value, e)}
                      className={`mt-1 sm:mt-1.5 text-[10px] min-[375px]:text-[11px] sm:text-[11px] md:text-xs font-semibold underline underline-offset-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/60 focus-visible:ring-offset-2 whitespace-nowrap flex-shrink-0 transition-colors ${
                        isSelected
                          ? "text-zinc-300 hover:text-white dark:text-zinc-300 dark:hover:text-white decoration-zinc-500 dark:decoration-zinc-500 hover:decoration-zinc-300 dark:hover:decoration-zinc-300"
                          : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50 decoration-zinc-300 dark:decoration-zinc-700 hover:decoration-zinc-600 dark:hover:decoration-zinc-500"
                      }`}
                      aria-label={moreInfoAriaLabel.replace("{method}", methodLabel)}
                    >
                      {moreInfoLabel}
                    </button>
                  )}
                </div>
              </RadioButton>
            )
          })}
        </div>

        {error && (
          <div className="flex items-start gap-2 mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-600 dark:text-red-400 font-medium">
              {toolTranslations.trainingMethod?.error || "Selecteer een trainingsmethode"}
            </p>
          </div>
        )}
      </div>

      {/* Method Info Modal */}
      <Dialog
        open={!!selectedMethodForModal}
        onOpenChange={(open) => !open && setSelectedMethodForModal(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedMethodForModal &&
                methods[getMethodKey(selectedMethodForModal) as keyof typeof methods]?.name}
            </DialogTitle>
            {selectedMethodInfo?.description && (
              <DialogDescription>{selectedMethodInfo.description}</DialogDescription>
            )}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}
