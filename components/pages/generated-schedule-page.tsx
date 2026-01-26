"use client"

import * as React from "react"
import Link from "next/link"
import type { RunningSchedule } from "@/lib/types/schedule"
import { Clock, MapPin, TrendingUp } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

interface GeneratedSchedulePageProps {
  schedule: RunningSchedule
}

export function GeneratedSchedulePage({ schedule }: GeneratedSchedulePageProps) {
  const hasWorkoutContent = (day: (typeof schedule.weeks)[0]["days"][0]) => {
    return !!(day.description || day.duration || day.distance || day.type || day.intensity)
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950">
      <Header />
      <main className="flex-1 pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 sm:text-4xl lg:text-5xl">
              {schedule.title}
            </h1>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">{schedule.overview}</p>
          </div>

          {/* Schedule View */}
          <div className="space-y-6">
            {schedule.weeks.map((week) => (
              <div
                key={week.weekNumber}
                className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/40"
              >
                {/* Week Header */}
                <div className="border-b border-zinc-200 bg-zinc-50 px-6 py-4 dark:border-zinc-800 dark:bg-zinc-900/60">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                        Week {week.weekNumber}
                      </h2>
                      {week.focus && (
                        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                          {week.focus}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Week Days */}
                <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {week.days.map((day, dayIndex) => {
                    const hasContent = hasWorkoutContent(day)

                    return (
                      <div
                        key={dayIndex}
                        className={`px-6 py-4 ${hasContent ? "border-l-4 border-orange-500" : ""}`}
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30">
                              <span className="text-sm font-bold text-orange-600 dark:text-orange-400">
                                {day.day.charAt(0)}
                              </span>
                            </div>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
                              {day.day}
                            </h3>
                            {hasContent && (
                              <div className="mt-3 space-y-2">
                                {day.type && (
                                  <div className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                                    <TrendingUp className="h-4 w-4 text-orange-500" />
                                    <span className="font-medium">{day.type}</span>
                                  </div>
                                )}
                                {day.description && (
                                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                    {day.description}
                                  </p>
                                )}
                                <div className="flex flex-wrap gap-4 text-sm text-zinc-600 dark:text-zinc-400">
                                  {day.duration && (
                                    <div className="flex items-center gap-1.5">
                                      <Clock className="h-4 w-4 text-orange-500" />
                                      <span>{day.duration}</span>
                                    </div>
                                  )}
                                  {day.distance && (
                                    <div className="flex items-center gap-1.5">
                                      <MapPin className="h-4 w-4 text-orange-500" />
                                      <span>{day.distance}</span>
                                    </div>
                                  )}
                                  {day.intensity && (
                                    <div className="flex items-center gap-1.5">
                                      <span
                                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                                          day.intensity === "Zwaar"
                                            ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                                            : day.intensity === "Matig"
                                              ? "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
                                              : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                        }`}
                                      >
                                        {day.intensity}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Back Button */}
          <div className="mt-8">
            <Link
              href="/schema-maken"
              className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600"
            >
              Nieuw schema maken
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
