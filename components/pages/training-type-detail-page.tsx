"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/components/language-provider"
import { getRoutes } from "@/lib/i18n/routes"
import { translations } from "@/lib/i18n"
import Link from "next/link"
import { ArrowLeft, CheckCircle, Clock, Lightbulb } from "lucide-react"

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
          <Link
            href={routes.trainingTypes}
            className="flex items-center gap-2 text-gray-500 dark:text-zinc-400 hover:text-orange-600 dark:hover:text-orange-500 transition-colors mb-12 font-semibold group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            {t("pages.trainingTypes.back")}
          </Link>

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
            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800 p-8 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-200/20 dark:bg-orange-800/20 rounded-full blur-2xl -mr-16 -mt-16"></div>
              <h4 className="text-lg font-bold text-orange-900 dark:text-orange-200 mb-3 flex items-center gap-2 relative z-10">
                <Lightbulb className="w-5 h-5" />
                {t("pages.trainingTypes.labels.proTip")}
              </h4>
              <p className="text-orange-900 dark:text-orange-200 leading-relaxed relative z-10">
                {proTip}
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}
