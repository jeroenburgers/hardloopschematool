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
  onSkip: () => void
}

export function Step3Profile({ onSkip }: Step3ProfileProps) {
  const { locale } = useLanguage()
  const toolTranslations = translations[locale].tool
  const { formData, updateFormData } = useScheduleFormContext()

  return (
    <div className="grid grid-cols-1 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <StepHeader locale={locale} titleKey="coachProfile" />
      <StepProfile
        formData={formData}
        optionalNote={toolTranslations.optionalNote}
        genders={toolTranslations.genders}
        ageGroups={toolTranslations.ageGroups}
        genderLabel={toolTranslations.gender}
        ageGroupLabel={toolTranslations.ageGroup}
        profileSubtitle={toolTranslations.profileSubtitle || ""}
        skipStepLabel={toolTranslations.skipStep}
        onGenderChange={(gender) => updateFormData({ gender })}
        onAgeGroupChange={(ageGroup) => updateFormData({ ageGroup })}
        onSkip={onSkip}
      />
    </div>
  )
}
