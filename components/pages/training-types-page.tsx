"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/components/language-provider"
import { getRoutes } from "@/lib/i18n/routes"
import { translations } from "@/lib/i18n"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const trainingTypes = [
  {
    key: "progressionRun",
    icon: "📈",
    bgColor: "bg-zinc-50",
    textColor: "text-zinc-950",
  },
  {
    key: "ladderWorkout",
    icon: "🪜",
    bgColor: "bg-orange-50",
    textColor: "text-orange-600",
  },
  {
    key: "tempoRun",
    icon: "⚡",
    bgColor: "bg-zinc-950",
    textColor: "text-white",
  },
  {
    key: "aerobicThreshold",
    icon: "🫀",
    bgColor: "bg-zinc-50",
    textColor: "text-zinc-950",
  },
  {
    key: "fartlek",
    icon: "🎭",
    bgColor: "bg-orange-50",
    textColor: "text-orange-600",
  },
  {
    key: "steadyState",
    icon: "⚖️",
    bgColor: "bg-zinc-950",
    textColor: "text-white",
  },
  {
    key: "yasso800s",
    icon: "🏁",
    bgColor: "bg-zinc-50",
    textColor: "text-zinc-950",
  },
  {
    key: "hillRepeats",
    icon: "⛰️",
    bgColor: "bg-orange-50",
    textColor: "text-orange-600",
  },
  {
    key: "baseRun",
    icon: "🧱",
    bgColor: "bg-zinc-950",
    textColor: "text-white",
  },
]

export function TrainingTypesPage() {
  const { t, locale } = useLanguage()
  const routes = getRoutes(locale)
  const trainingTypesData = translations[locale]?.pages?.trainingTypes

  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-32 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-6xl font-extrabold text-zinc-950 dark:text-zinc-50 mb-6">
              {t("pages.trainingTypes.title")}{" "}
              <span className="text-orange-600 dark:text-orange-500">
                {t("pages.trainingTypes.titleHighlight")}
              </span>
            </h1>
            <p className="text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              {t("pages.trainingTypes.description")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainingTypes.map((type) => {
              const typeData =
                trainingTypesData?.types?.[type.key as keyof typeof trainingTypesData.types]
              const slug = (typeData as { slug?: string })?.slug || type.key
              return (
                <Link
                  key={type.key}
                  href={`${routes.trainingTypes}/${slug}`}
                  className="group p-8 bg-white dark:bg-zinc-800 border-2 border-zinc-100 dark:border-zinc-700 rounded-[2.5rem] text-left hover:border-zinc-950 dark:hover:border-zinc-50 transition-all duration-300 relative overflow-hidden"
                >
                  <div
                    className={`w-14 h-14 ${type.bgColor} dark:bg-zinc-700 ${type.textColor} dark:text-zinc-50 border border-zinc-200 dark:border-zinc-600 rounded-2xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform shadow-sm`}
                  >
                    {type.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-950 dark:text-zinc-50 mb-3">
                    {typeData?.title || ""}
                  </h3>
                  <p className="text-zinc-500 dark:text-zinc-400 mb-8 font-medium leading-relaxed line-clamp-2">
                    {typeData?.subtitle || ""}
                  </p>
                  <div className="flex items-center gap-2 text-orange-600 dark:text-orange-500 font-bold text-xs uppercase tracking-widest">
                    {t("pages.trainingTypes.viewDetails")}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
