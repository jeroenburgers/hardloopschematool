import { Check, Goal } from "lucide-react"

/**
 * Progress Tracker component
 * SOLAR: Separation of Concerns - displays multi-step progress
 */
interface Step {
  name: string
  icon: typeof Goal
}

interface ProgressTrackerProps {
  steps: Step[]
  currentStep: number
  celebrationTexts: string[]
  getLogicalStep?: (physicalStep: number) => number
}

export function ProgressTracker({
  steps,
  currentStep,
  celebrationTexts,
  getLogicalStep,
}: ProgressTrackerProps) {
  return (
    <div className="mb-8 sm:mb-12 md:mb-24 relative px-1 sm:px-4 md:px-12">
      <div className="h-1.5 sm:h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full absolute top-1/2 -translate-y-1/2 left-0 overflow-hidden">
        <div
          className="h-full bg-zinc-950 dark:bg-zinc-700 transition-all duration-1000 ease-in-out rounded-full shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          style={{
            width: `${((currentStep - 0.5) / steps.length) * 100}%`,
          }}
        />
      </div>
      <div className="relative flex justify-between items-center">
        {steps.map((step, i) => {
          const Icon = step.icon
          const isActive = currentStep === i + 1
          const isCompleted = currentStep > i + 1
          return (
            <div key={i} className="flex flex-col items-center relative group">
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 rounded-xl sm:rounded-[1.2rem] md:rounded-[1.5rem] border-2 sm:border-3 md:border-4 flex items-center justify-center z-20 transition-all duration-500 ${
                  isActive || isCompleted
                    ? "bg-zinc-950 dark:bg-zinc-900 border-zinc-950 dark:border-zinc-800 text-white shadow-xl sm:shadow-2xl scale-105 sm:scale-110"
                    : "bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 text-zinc-300 dark:text-zinc-600"
                }`}
              >
                {isCompleted ? (
                  <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                ) : (
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                )}
              </div>
              {isActive &&
                (() => {
                  const logicalStep = getLogicalStep ? getLogicalStep(currentStep) : currentStep
                  const celebrationIndex = logicalStep - 1
                  return celebrationIndex >= 0 && celebrationIndex < celebrationTexts.length ? (
                    <div className="hidden lg:flex absolute -top-14 flex-col items-center animate-bounce z-30">
                      <div className="px-5 py-2 bg-orange-600 text-white text-[9px] font-black rounded-full shadow-xl whitespace-nowrap border-2 border-white">
                        {celebrationTexts[celebrationIndex]}
                      </div>
                    </div>
                  ) : null
                })()}
              <span
                className={`absolute -bottom-8 sm:-bottom-10 text-[7px] sm:text-[8px] font-black uppercase tracking-widest hidden md:block ${
                  isActive ? "text-zinc-950 dark:text-zinc-50" : "text-zinc-300 dark:text-zinc-600"
                }`}
              >
                {step.name}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
