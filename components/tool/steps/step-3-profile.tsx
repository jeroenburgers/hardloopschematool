"use client"

import { useLanguage } from "@/components/language-provider"
import { translations } from "@/lib/i18n"
import { useScheduleFormContext } from "../schedule-form-context"
import { StepHeader } from "../step-header"
import { StepProfile } from "./step-profile"

/**
 * Step 3: Profile Information
 * SOLAR: Autonomous Component - fully self-contained step rendering
 */
interface Step3ProfileProps {
  showValidation?: boolean
}

export function Step3Profile({ showValidation = false }: Step3ProfileProps) {
  const { locale } = useLanguage()
  const toolTranslations = translations[locale].tool
  const { formData, updateFormData } = useScheduleFormContext()

  // Get validation errors for step 3
  const errors = {
    gender: showValidation && !formData.gender,
    ageGroup: showValidation && !formData.ageGroup,
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <StepHeader locale={locale} titleKey="coachProfile" />
      <StepProfile
        formData={formData}
        genders={toolTranslations.genders}
        ageGroups={toolTranslations.ageGroups}
        genderLabel={toolTranslations.gender}
        ageGroupLabel={toolTranslations.ageGroup}
        onGenderChange={(gender) => updateFormData({ gender })}
        onAgeGroupChange={(ageGroup) => updateFormData({ ageGroup })}
        errorGender={errors.gender}
        errorAgeGroup={errors.ageGroup}
      />
    </div>
  )
}
