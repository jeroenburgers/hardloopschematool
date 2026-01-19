"use client"

import { useLanguage } from "@/components/language-provider"
import { translations } from "@/lib/i18n"
import { useScheduleFormContext } from "../schedule-form-context"
import { StepHeader } from "../step-header"
import { StepCheckout } from "./step-checkout"

/**
 * Step 7: Checkout
 * SOLAR: Autonomous Component - fully self-contained step rendering
 */
interface Step7CheckoutProps {
  showValidation?: boolean
}

export function Step7Checkout({ showValidation = false }: Step7CheckoutProps) {
  const { locale } = useLanguage()
  const toolTranslations = translations[locale].tool
  const { personalInfo, formData, nextMondays, updatePersonalInfo } = useScheduleFormContext()

  // Get validation errors for step 7
  const errors = {
    firstName: showValidation && !personalInfo.firstName,
    lastName: showValidation && !personalInfo.lastName,
    email: showValidation && (!personalInfo.email || !personalInfo.email.includes("@")),
    address: showValidation && !personalInfo.address,
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <StepHeader locale={locale} titleKey="coachCheckout" subtitleKey="stepCheckoutSubtitle" />
      <StepCheckout
        personalInfo={personalInfo}
        formData={formData}
        translations={toolTranslations.checkout}
        toolTranslations={{
          goals: toolTranslations.goals as string[],
          levels: toolTranslations.levels as Array<{ id: string; label: string }>,
          frequencyOptions: toolTranslations.frequencyOptions as string[],
          planningModeOptions: toolTranslations.planningModeOptions as string[],
          daysOfWeek: toolTranslations.daysOfWeek as string[],
          focusOptions: toolTranslations.focusOptions as string[],
          healthOptions: toolTranslations.healthOptions as string[],
          genders: toolTranslations.genders as string[],
          ageGroups: toolTranslations.ageGroups as string[],
        }}
        nextMondays={nextMondays}
        errorFirstName={errors.firstName}
        errorLastName={errors.lastName}
        errorEmail={errors.email}
        errorAddress={errors.address}
        onPersonalInfoChange={updatePersonalInfo}
      />
    </div>
  )
}
