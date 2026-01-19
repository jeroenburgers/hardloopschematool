"use client"

import { useRouter } from "next/navigation"
import { useCallback } from "react"
import { useLanguage } from "@/components/language-provider"
import { routeSlugs } from "@/lib/i18n/routes"
import type { Goal, Level } from "@/lib/types/schedule"

type BlueprintPreset = {
  goal: Goal
  level: Level
  trainingWeeks: number
}

function applyBlueprintPreset(preset: BlueprintPreset) {
  if (typeof window === "undefined") return
  sessionStorage.setItem("initialGoal", preset.goal)
  sessionStorage.setItem("initialLevel", preset.level)
  sessionStorage.setItem("initialTrainingWeeks", String(preset.trainingWeeks))
}

export function BlueprintsSection() {
  const router = useRouter()
  const { t, locale } = useLanguage()

  const createScheduleHref = `/${routeSlugs[locale].createSchedule}`
  const methodHref = `/${routeSlugs[locale].method}`

  const blueprints = [
    {
      key: "startToRun5k",
      tag: t("home.blueprints.tagMostChosen"),
      level: "Starter" as Level,
      title: t("home.blueprints.items.startToRun5k.title"),
      description: t("home.blueprints.items.startToRun5k.description"),
      weeks: 10,
      success: t("home.blueprints.items.startToRun5k.success"),
      preset: { goal: "5 kilometer" as Goal, level: "Starter" as Level, trainingWeeks: 10 },
      showDetails: true,
    },
    {
      key: "fast5kPr",
      tag: undefined,
      level: "Gevorderd" as Level,
      title: t("home.blueprints.items.fast5kPr.title"),
      description: t("home.blueprints.items.fast5kPr.description"),
      weeks: 8,
      success: t("home.blueprints.items.fast5kPr.success"),
      preset: { goal: "5 kilometer" as Goal, level: "Gevorderd" as Level, trainingWeeks: 8 },
      showDetails: true,
    },
    {
      key: "debut10k",
      tag: t("home.blueprints.tagMostChosen"),
      level: "Gemiddeld" as Level,
      title: t("home.blueprints.items.debut10k.title"),
      description: t("home.blueprints.items.debut10k.description"),
      weeks: 12,
      success: t("home.blueprints.items.debut10k.success"),
      preset: { goal: "10 kilometer" as Goal, level: "Gemiddeld" as Level, trainingWeeks: 12 },
      showDetails: true,
    },
    {
      key: "fullMarathon",
      tag: undefined,
      level: "Expert" as Level,
      title: t("home.blueprints.items.fullMarathon.title"),
      description: t("home.blueprints.items.fullMarathon.description"),
      weeks: 16,
      success: t("home.blueprints.items.fullMarathon.success"),
      preset: {
        goal: "Marathon (42,2 kilometer)" as Goal,
        level: "Expert" as Level,
        trainingWeeks: 16,
      },
      showDetails: true,
    },
  ] as const

  const handleStart = useCallback(
    (preset: BlueprintPreset) => {
      applyBlueprintPreset(preset)
      router.push(createScheduleHref)
    },
    [router, createScheduleHref],
  )

  return (
    <section className="py-24 bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-zinc-950 dark:text-zinc-50 tracking-tighter mb-4">
            {t("home.blueprints.title")}
          </h2>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto font-medium">
            {t("home.blueprints.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {blueprints.map((bp) => (
            <div
              key={bp.key}
              className="bg-zinc-50 dark:bg-zinc-900/40 rounded-[2.5rem] p-8 border border-zinc-200/70 dark:border-zinc-800/70 hover:bg-white dark:hover:bg-zinc-900/60 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors duration-300 group flex flex-col relative overflow-hidden"
            >
              {bp.tag && (
                <div className="absolute top-0 right-0 bg-orange-600 text-white text-[9px] font-semibold px-4 py-1.5 tracking-wide rounded-bl-2xl">
                  {bp.tag}
                </div>
              )}

              <div className="flex justify-between items-start mb-8">
                <span className="px-3 py-1 bg-white dark:bg-zinc-950 text-zinc-600 dark:text-zinc-300 text-[10px] font-semibold tracking-wide rounded-lg border border-zinc-200 dark:border-zinc-800">
                  {bp.level}
                </span>
              </div>

              <h3 className="text-xl font-bold text-zinc-950 dark:text-zinc-50 mb-2 leading-tight">
                {bp.title}
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed mb-6 flex-1">
                {bp.description}
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex justify-between items-center text-[10px] font-semibold tracking-wide text-zinc-500 dark:text-zinc-400 border-b border-zinc-200/70 dark:border-zinc-800/70 pb-2">
                  <span>{t("home.blueprints.meta.duration")}</span>
                  <span className="text-zinc-950 dark:text-zinc-50">
                    {bp.weeks} {t("home.blueprints.meta.weeks")}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-semibold tracking-wide text-zinc-500 dark:text-zinc-400">
                  <span>{t("home.blueprints.meta.success")}</span>
                  <span className="text-emerald-600 dark:text-emerald-500 font-semibold">
                    {bp.success}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => handleStart(bp.preset)}
                  className="w-full py-4 bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-950 rounded-2xl font-semibold text-sm hover:bg-orange-600 dark:hover:bg-orange-500 transition-colors active:scale-[0.99]"
                >
                  {t("home.blueprints.primaryCta")}
                </button>
                {bp.showDetails && (
                  <a
                    href={methodHref}
                    className="block w-full text-center py-4 bg-white dark:bg-zinc-950 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 rounded-2xl font-semibold text-sm hover:text-zinc-950 dark:hover:text-zinc-50 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
                  >
                    {t("home.blueprints.secondaryCta")}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
