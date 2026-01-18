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
export function Step7Checkout() {
  const { locale } = useLanguage()
  const toolTranslations = translations[locale].tool
  const { personalInfo, updatePersonalInfo } = useScheduleFormContext()

  return (
    <div className="grid grid-cols-1 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="lg:col-span-12">
        <StepHeader locale={locale} titleKey="coachCheckout" subtitleKey="stepCheckoutSubtitle" />
      </div>
      <StepCheckout
        personalInfo={personalInfo}
        translations={toolTranslations.checkout}
        onPersonalInfoChange={updatePersonalInfo}
      />
    </div>
  )
}
