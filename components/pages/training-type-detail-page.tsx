"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/components/language-provider"
import { getRoutes } from "@/lib/i18n/routes"
import { translations } from "@/lib/i18n"
import { BackLink } from "@/components/ui/back-link"
import { ProTipCard } from "@/components/ui/pro-tip-card"
import { CheckCircle, Clock } from "lucide-react"

interface TrainingTypeDetailPageProps {
  typeKey: string
}

export function TrainingTypeDetailPage({ typeKey }: TrainingTypeDetailPageProps) {
  const { t, locale } = useLanguage()
  const routes = getRoutes(locale)

  // Get training type data directly from translations
  const trainingTypeData =
    translations[locale]?.pages?.trainingTypes?.types?.[
      typeKey as keyof typeof translations.nl.pages.trainingTypes.types
    ]

  // Check if training type exists
  if (!trainingTypeData || typeof trainingTypeData === "string") {
    return null
  }

  const title = trainingTypeData.title || ""
  const subtitle = trainingTypeData.subtitle || ""
  const description = trainingTypeData.description || ""
  const benefits = trainingTypeData.benefits || []
  const howTo = trainingTypeData.howTo || []
  const proTip = trainingTypeData.proTip || ""

  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-32 pb-24 animate-in fade-in duration-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <BackLink href={routes.trainingTypes}>{t("pages.trainingTypes.back")}</BackLink>

          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-zinc-50 mb-4">
              {title}
            </h1>
            <p className="text-xl text-orange-600 dark:text-orange-500 font-medium">{subtitle}</p>
          </div>

          <div className="prose prose-lg max-w-none text-gray-600 dark:text-zinc-400 mb-16">
            <p className="leading-relaxed mb-8">{description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
              {/* Benefits */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-zinc-50 mb-6 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-emerald-500" />
                  {t("pages.trainingTypes.labels.benefits")}
                </h3>
                <ul className="space-y-4">
                  {benefits.map((benefit: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-600 mt-2.5 flex-shrink-0"></div>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* How To */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-zinc-50 mb-6 flex items-center gap-2">
                  <Clock className="w-6 h-6 text-blue-500" />
                  {t("pages.trainingTypes.labels.howTo")}
                </h3>
                <ul className="space-y-4">
                  {howTo.map((step: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="font-bold text-blue-600 dark:text-blue-500 min-w-[1.5rem]">
                        {index + 1}.
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Pro Tip */}
          {proTip && (
            <ProTipCard title={t("pages.trainingTypes.labels.proTip")}>{proTip}</ProTipCard>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}
