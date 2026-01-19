import { AlertCircle } from "lucide-react"
import type { ScheduleFormData } from "@/lib/types/schedule"
import { RadioButton } from "@/components/ui/radio-button"

/**
 * Step Profile component
 * SOLAR: Autonomous Component - handles profile information independently
 */
interface StepProfileProps {
  formData: ScheduleFormData
  optionalNote: string
  genders: string[]
  ageGroups: string[]
  genderLabel: string
  ageGroupLabel: string
  profileSubtitle: string
  skipStepLabel: string
  onGenderChange: (gender: ScheduleFormData["gender"]) => void
  onAgeGroupChange: (ageGroup: string) => void
  onSkip: () => void
  errorGender?: boolean
  errorAgeGroup?: boolean
}

export function StepProfile({
  formData,
  genders,
  ageGroups,
  genderLabel,
  ageGroupLabel,
  onGenderChange,
  onAgeGroupChange,
  errorGender = false,
  errorAgeGroup = false,
}: StepProfileProps) {
  const genderColsClass =
    genders.length >= 4 ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2 sm:grid-cols-3"
  const ageColsClass =
    ageGroups.length >= 8
      ? "grid-cols-2 sm:grid-cols-4 lg:grid-cols-8"
      : ageGroups.length >= 6
        ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
        : "grid-cols-2 sm:grid-cols-3"

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="space-y-3 sm:space-y-4">
        <label className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-4 sm:mb-6 block">
          {genderLabel}
        </label>
        <div className={`grid gap-2 sm:gap-3 ${genderColsClass}`}>
          {genders.map((gender) => (
            <RadioButton
              key={gender}
              checked={formData.gender === gender}
              onChange={() => onGenderChange(gender as ScheduleFormData["gender"])}
              error={errorGender && formData.gender !== gender}
            >
              <span className="text-xs sm:text-sm font-semibold">{gender}</span>
            </RadioButton>
          ))}
        </div>
        {errorGender && (
          <div className="flex items-start gap-2 mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-600 dark:text-red-400 font-medium">
              Selecteer een geslacht om door te gaan.
            </p>
          </div>
        )}
      </div>

      <div className="space-y-3 sm:space-y-4">
        <label className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-4 sm:mb-6 block">
          {ageGroupLabel}
        </label>
        <div className={`grid gap-2 sm:gap-3 ${ageColsClass}`}>
          {ageGroups.map((age) => (
            <RadioButton
              key={age}
              checked={formData.ageGroup === age}
              onChange={() => onAgeGroupChange(age)}
              error={errorAgeGroup && formData.ageGroup !== age}
            >
              <span className="text-xs sm:text-sm font-semibold">{age}</span>
            </RadioButton>
          ))}
        </div>
        {errorAgeGroup && (
          <div className="flex items-start gap-2 mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-600 dark:text-red-400 font-medium">
              Selecteer een leeftijdsgroep om door te gaan.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
