import { AlertCircle } from "lucide-react"
import type { PersonalInfo, ScheduleFormData } from "@/lib/types/schedule"
import { calculatePrice, formatPrice } from "@/lib/utils/pricing"
import { useLanguage } from "@/components/language-provider"

/**
 * Step Checkout component
 * SOLAR: Autonomous Component - handles checkout information independently
 */
interface CheckoutTranslations {
  firstName: string
  lastName: string
  email: string
  address: string
  summary: string
  product: string
  anchorPrice: string
  price: string
  vat: string
  investment: string
  comparison: string
  summaryGoal: string
  summaryFocus: string
  summaryTargetTime: string
  summaryLevel: string
  summaryFrequency: string
  summaryHealth: string
  summaryRecentPerformance: string
  summaryDays: string
  summaryStartDate: string
  summaryPlanningMode: string
}

interface StepCheckoutProps {
  personalInfo: PersonalInfo
  formData: ScheduleFormData
  translations: CheckoutTranslations
  toolTranslations: {
    goals: string[]
    levels: Array<{ id: string; label: string }>
    frequencyOptions: string[]
    planningModeOptions: string[]
    daysOfWeek: string[]
    focusOptions: string[]
    healthOptions: string[]
    genders: string[]
    ageGroups: string[]
    dayAbbreviations: string[]
    checkout: {
      perWeek: string
      placeholders: {
        firstName: string
        lastName: string
        email: string
        address: string
      }
      errorAllFields: string
    }
  }
  nextMondays: Array<{ val: string; label: string }>
  errorFirstName?: boolean
  errorLastName?: boolean
  errorEmail?: boolean
  errorAddress?: boolean
  onPersonalInfoChange: (info: Partial<PersonalInfo>) => void
}

export function StepCheckout({
  personalInfo,
  formData,
  translations,
  toolTranslations,
  nextMondays,
  errorFirstName = false,
  errorLastName = false,
  errorEmail = false,
  errorAddress = false,
  onPersonalInfoChange,
}: StepCheckoutProps) {
  const { locale } = useLanguage()
  const dayAbbreviations = toolTranslations.dayAbbreviations
  const perWeekLabel = toolTranslations.checkout.perWeek
  const placeholders = toolTranslations.checkout.placeholders
  const errorAllFields = toolTranslations.checkout.errorAllFields

  // Calculate dynamic price based on goal and training weeks
  const calculatedPrice = calculatePrice(formData.goal, formData.trainingWeeks)
  const formattedPrice = formatPrice(
    calculatedPrice,
    locale === "nl" ? "nl-NL" : locale === "de" ? "de-DE" : "en-US",
  )
  const displayPrice = formattedPrice || translations.price // Fallback to static price if calculation fails

  // Helper to get display value from formData
  const getGoalDisplay = () => {
    if (!formData.goal) return "-"
    return formData.goal
  }

  const getLevelDisplay = () => {
    if (!formData.level) return "-"
    const level = toolTranslations.levels.find((l) => l.id === formData.level)
    return level?.label || formData.level
  }

  const getFrequencyDisplay = () => {
    if (!formData.frequency) return "-"
    return formData.frequency
  }

  const getFocusDisplay = () => {
    if (!formData.focus) return "-"
    return formData.focus
  }

  const getTargetTimeDisplay = () => {
    if (!formData.targetTime) return "-"
    return formData.targetTime
  }

  const getHealthDisplay = () => {
    if (!formData.health) return "-"
    return formData.health
  }

  const getRecentPerformanceDisplay = () => {
    if (!formData.recentDistance || !formData.recentTime) return "-"
    return `${formData.recentDistance} in ${formData.recentTime}`
  }

  const getPlanningModeDisplay = () => {
    if (!formData.planningMode) return "-"
    return formData.planningMode
  }

  const getDaysDisplay = () => {
    const planningModeAuto = toolTranslations.planningModeOptions[0]
    const planningModeManual = toolTranslations.planningModeOptions[1]

    if (formData.planningMode === planningModeAuto) {
      const mondayOption = nextMondays.find((m) => m.val === formData.startDate)
      const dateLabel =
        mondayOption?.label ||
        (formData.startDate
          ? new Date(formData.startDate).toLocaleDateString(
              locale === "nl" ? "nl-NL" : locale === "de" ? "de-DE" : "en-US",
              {
                day: "numeric",
                month: "short",
              },
            )
          : "-")
      return `${formData.targetDays}${perWeekLabel} (${dateLabel})`
    }
    if (formData.planningMode === planningModeManual && formData.selectedDays.length > 0) {
      const daysAbbr = formData.selectedDays
        .map((day) => {
          const idx = toolTranslations.daysOfWeek.indexOf(day)
          if (idx < 0) return day
          return dayAbbreviations[idx] || day
        })
        .join(", ")
      return `${formData.targetDays}${perWeekLabel} (${daysAbbr})`
    }
    return `${formData.targetDays}${perWeekLabel}`
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="space-y-3 sm:space-y-4">
        <div className="space-y-2">
          <label className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-4 sm:mb-6 block">
            {translations.firstName}
          </label>
          <div
            className={`relative p-3 sm:p-4 bg-white dark:bg-zinc-900/50 border-2 rounded-xl transition-colors ${
              errorFirstName
                ? "border-red-500 dark:border-red-500 focus-within:border-red-600 dark:focus-within:border-red-400"
                : "border-zinc-200 dark:border-zinc-800 focus-within:border-zinc-950 dark:focus-within:border-zinc-600"
            }`}
          >
            <input
              type="text"
              placeholder={placeholders.firstName}
              value={personalInfo.firstName}
              onChange={(e) => onPersonalInfoChange({ firstName: e.target.value })}
              className="w-full bg-transparent text-sm outline-none text-zinc-950 dark:text-zinc-50 placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-4 sm:mb-6 block">
            {translations.lastName}
          </label>
          <div
            className={`relative p-3 sm:p-4 bg-white dark:bg-zinc-900/50 border-2 rounded-xl transition-colors ${
              errorLastName
                ? "border-red-500 dark:border-red-500 focus-within:border-red-600 dark:focus-within:border-red-400"
                : "border-zinc-200 dark:border-zinc-800 focus-within:border-zinc-950 dark:focus-within:border-zinc-600"
            }`}
          >
            <input
              type="text"
              placeholder={placeholders.lastName}
              value={personalInfo.lastName}
              onChange={(e) => onPersonalInfoChange({ lastName: e.target.value })}
              className="w-full bg-transparent text-sm outline-none text-zinc-950 dark:text-zinc-50 placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-4 sm:mb-6 block">
            {translations.email}
          </label>
          <div
            className={`relative p-3 sm:p-4 bg-white dark:bg-zinc-900/50 border-2 rounded-xl transition-colors ${
              errorEmail
                ? "border-red-500 dark:border-red-500 focus-within:border-red-600 dark:focus-within:border-red-400"
                : "border-zinc-200 dark:border-zinc-800 focus-within:border-zinc-950 dark:focus-within:border-zinc-600"
            }`}
          >
            <input
              type="email"
              placeholder={placeholders.email}
              value={personalInfo.email}
              onChange={(e) => onPersonalInfoChange({ email: e.target.value })}
              className="w-full bg-transparent text-sm outline-none text-zinc-950 dark:text-zinc-50 placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-4 sm:mb-6 block">
            {translations.address}
          </label>
          <div
            className={`relative p-3 sm:p-4 bg-white dark:bg-zinc-900/50 border-2 rounded-xl transition-colors ${
              errorAddress
                ? "border-red-500 dark:border-red-500 focus-within:border-red-600 dark:focus-within:border-red-400"
                : "border-zinc-200 dark:border-zinc-800 focus-within:border-zinc-950 dark:focus-within:border-zinc-600"
            }`}
          >
            <input
              type="text"
              placeholder={placeholders.address}
              value={personalInfo.address}
              onChange={(e) => onPersonalInfoChange({ address: e.target.value })}
              className="w-full bg-transparent text-sm outline-none text-zinc-950 dark:text-zinc-50 placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
            />
          </div>
        </div>

        {(errorFirstName || errorLastName || errorEmail || errorAddress) && (
          <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-600 dark:text-red-400 font-medium">{errorAllFields}</p>
          </div>
        )}
      </div>

      <div className="p-4 sm:p-6 bg-zinc-950 dark:bg-zinc-900 text-white rounded-xl shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-orange-600/10 dark:bg-orange-500/10 blur-2xl rounded-full -mr-12 -mt-12" />
        <div className="relative space-y-4 sm:space-y-6">
          <h3 className="text-base sm:text-lg font-bold border-b border-white/10 pb-2 sm:pb-3">
            {translations.summary}
          </h3>

          {/* Form Summary */}
          <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between items-center">
              <span className="text-zinc-400">{translations.summaryGoal}:</span>
              <span className="text-zinc-200 font-semibold">{getGoalDisplay()}</span>
            </div>
            {formData.focus &&
              formData.goal !== toolTranslations.goals[toolTranslations.goals.length - 1] && (
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">{translations.summaryFocus}:</span>
                  <span className="text-zinc-200 font-semibold">{getFocusDisplay()}</span>
                </div>
              )}
            {formData.targetTime && formData.focus === toolTranslations.focusOptions[1] && (
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">{translations.summaryTargetTime}:</span>
                <span className="text-zinc-200 font-semibold">{getTargetTimeDisplay()}</span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-zinc-400">{translations.summaryLevel}:</span>
              <span className="text-zinc-200 font-semibold">{getLevelDisplay()}</span>
            </div>
            {formData.frequency && (
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">{translations.summaryFrequency}:</span>
                <span className="text-zinc-200 font-semibold">{getFrequencyDisplay()}</span>
              </div>
            )}
            {formData.health && (
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">{translations.summaryHealth}:</span>
                <span className="text-zinc-200 font-semibold">{getHealthDisplay()}</span>
              </div>
            )}
            {formData.recentDistance && formData.recentTime && (
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">{translations.summaryRecentPerformance}:</span>
                <span className="text-zinc-200 font-semibold">{getRecentPerformanceDisplay()}</span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-zinc-400">{translations.summaryPlanningMode}:</span>
              <span className="text-zinc-200 font-semibold">{getPlanningModeDisplay()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-400">{translations.summaryDays}:</span>
              <span className="text-zinc-200 font-semibold">{getDaysDisplay()}</span>
            </div>
          </div>

          <div className="pt-3 border-t border-white/10">
            <div className="flex justify-between items-center">
              <span className="text-xs text-zinc-400 font-medium uppercase">
                {translations.product}
              </span>
              <span className="text-sm font-semibold line-through text-zinc-600">
                {translations.anchorPrice}
              </span>
            </div>
            <div className="flex justify-between items-end mt-3 sm:mt-4">
              <span className="text-xs sm:text-sm text-zinc-200 font-medium">
                {translations.investment}
              </span>
              <div className="flex flex-col items-end">
                <span className="text-xl sm:text-2xl font-bold text-orange-500 leading-none">
                  {displayPrice}
                </span>
                <span className="text-[9px] sm:text-[10px] font-medium text-zinc-500 mt-0.5 sm:mt-1 uppercase">
                  {translations.vat}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-2 sm:pt-3 border-t border-white/10">
            <p className="text-[10px] sm:text-xs text-zinc-300 leading-relaxed">
              {calculatedPrice
                ? translations.comparison.replace(/€[\d,\.]+/, displayPrice)
                : translations.comparison}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
