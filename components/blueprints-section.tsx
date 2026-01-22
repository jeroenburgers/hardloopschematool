"use client"

import { useRouter } from "next/navigation"
import { useCallback } from "react"
import { useLanguage } from "@/components/language-provider"
import { routeSlugs } from "@/lib/i18n/routes"
import type { Goal, Level } from "@/lib/types/schedule"
import { schedule5km } from "@/lib/data/example-schedules/5km-schedule"
import { schedule10km } from "@/lib/data/example-schedules/10km-schedule"
import { schedule5kmPr } from "@/lib/data/example-schedules/5km-pr-schedule"
import { scheduleMarathon } from "@/lib/data/example-schedules/marathon-schedule"

type BlueprintPreset = {
  goal: Goal
  level: Level
  trainingWeeks: number
  trainingMethod?: string
}

function applyBlueprintPreset(preset: BlueprintPreset) {
  if (typeof window === "undefined") return
  sessionStorage.setItem("initialGoal", preset.goal)
  sessionStorage.setItem("initialLevel", preset.level)
  sessionStorage.setItem("initialTrainingWeeks", String(preset.trainingWeeks))
  if (preset.trainingMethod) {
    sessionStorage.setItem("initialTrainingMethod", preset.trainingMethod)
  }
}

export function BlueprintsSection() {
  const router = useRouter()
  const { t, locale } = useLanguage()

  const createScheduleHref = `/${routeSlugs[locale].createSchedule}`

  const blueprints = [
    {
      key: "startToRun5k",
      tag: t("home.blueprints.tagMostChosen"),
      level: "Starter" as Level,
      title: schedule5km.title,
      usps: [
        "Gebalanceerde methode voor beginners",
        "3 trainingen per week",
        "10 weken gestructureerde opbouw",
      ],
      weeks: schedule5km.summary.totalWeeks,
      success: t("home.blueprints.items.startToRun5k.success"),
      preset: {
        goal: "5 kilometer" as Goal,
        level: "Starter" as Level,
        trainingWeeks: schedule5km.summary.totalWeeks,
        trainingMethod: "Gebalanceerd",
      },
      showDetails: true,
      schemaHref: "/5km-hardloopschema",
    },
    {
      key: "fast5kPr",
      tag: undefined,
      level: "Gevorderd" as Level,
      title: schedule5kmPr.title,
      usps: [
        "Jack Daniels tempozones methodiek",
        "12 weken gerichte PR-training",
        "Systematische VO2-max verbetering",
      ],
      weeks: schedule5kmPr.summary.totalWeeks,
      success: t("home.blueprints.items.fast5kPr.success"),
      preset: {
        goal: "5 kilometer" as Goal,
        level: "Gevorderd" as Level,
        trainingWeeks: schedule5kmPr.summary.totalWeeks,
        trainingMethod: "Jack Daniels (tempozones)",
      },
      showDetails: true,
      schemaHref: "/5km-pr-hardloopschema",
    },
    {
      key: "debut10k",
      tag: t("home.blueprints.tagMostChosen"),
      level: "Gemiddeld" as Level,
      title: schedule10km.title,
      usps: [
        "Gebalanceerde progressieve opbouw",
        "10 weken naar je eerste 10km",
        "3 trainingen per week",
      ],
      weeks: schedule10km.summary.totalWeeks,
      success: t("home.blueprints.items.debut10k.success"),
      preset: {
        goal: "10 kilometer" as Goal,
        level: "Gemiddeld" as Level,
        trainingWeeks: schedule10km.summary.totalWeeks,
        trainingMethod: "Gebalanceerd",
      },
      showDetails: true,
      schemaHref: "/10km-hardloopschema",
    },
    {
      key: "fullMarathon",
      tag: undefined,
      level: "Expert" as Level,
      title: scheduleMarathon.title,
      usps: [
        "16 weken complete voorbereiding",
        "4-5 trainingen per week",
        "Gebalanceerde volume-opbouw",
      ],
      weeks: scheduleMarathon.summary.totalWeeks,
      success: t("home.blueprints.items.fullMarathon.success"),
      preset: {
        goal: "Marathon (42,2 kilometer)" as Goal,
        level: "Expert" as Level,
        trainingWeeks: scheduleMarathon.summary.totalWeeks,
        trainingMethod: "Gebalanceerd",
      },
      showDetails: true,
      schemaHref: "/marathon-hardloopschema",
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
          <p className="text-lg text-zinc-500 dark:text-zinc-300 max-w-xl mx-auto font-medium">
            {t("home.blueprints.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {blueprints.map((bp) => (
            <div
              key={bp.key}
              className="bg-zinc-50 dark:bg-zinc-900/50 rounded-[2.5rem] p-8 border border-zinc-200/70 dark:border-zinc-800/80 hover:bg-white dark:hover:bg-zinc-900/70 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors duration-300 group flex flex-col relative overflow-hidden"
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

              <h3 className="text-xl font-bold text-zinc-950 dark:text-zinc-50 mb-4 leading-tight">
                {bp.title}
              </h3>
              <ul className="space-y-2 mb-6 flex-1 min-h-[72px]">
                {bp.usps.map((usp, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-300"
                  >
                    <span className="text-orange-600 dark:text-orange-500 mt-0.5 flex-shrink-0">
                      •
                    </span>
                    <span className="font-medium">{usp}</span>
                  </li>
                ))}
              </ul>

              <div className="space-y-3 mb-8">
                <div className="flex justify-between items-center text-[10px] font-semibold tracking-wide text-zinc-500 dark:text-zinc-300 border-b border-zinc-200/70 dark:border-zinc-800/70 pb-2">
                  <span>{t("home.blueprints.meta.duration")}</span>
                  <span className="text-zinc-950 dark:text-zinc-50">
                    {bp.weeks} {t("home.blueprints.meta.weeks")}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-semibold tracking-wide text-zinc-500 dark:text-zinc-300">
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
                  className="w-full py-4 bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-950 rounded-2xl font-semibold text-sm hover:bg-orange-600 dark:hover:bg-orange-500 transition-colors active:scale-[0.99] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-950"
                >
                  {t("home.blueprints.primaryCta")}
                </button>
                {bp.showDetails && bp.schemaHref && (
                  <a
                    href={bp.schemaHref}
                    className="block w-full text-center py-4 bg-white dark:bg-zinc-950 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 rounded-2xl font-semibold text-sm hover:text-zinc-950 dark:hover:text-zinc-50 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-950"
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
