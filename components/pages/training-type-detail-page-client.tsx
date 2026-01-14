"use client"

import * as React from "react"
import { notFound } from "next/navigation"
import { getRouteKeyFromSlug, getTrainingTypeKeyFromSlug } from "@/lib/i18n/routes"
import { translations } from "@/lib/i18n"
import { TrainingTypeDetailPage } from "@/components/pages/training-type-detail-page"

export function TrainingTypeDetailPageClient({
  params,
}: {
  params: Promise<{ slug: string; trainingType: string }>
}) {
  const { slug, trainingType } = React.use(params)

  // Check if this is the training types page
  const routeKey = getRouteKeyFromSlug(slug)
  if (routeKey !== "trainingTypes") {
    notFound()
  }

  // Get the training type key from the slug (checks all locales)
  const typeKey = getTrainingTypeKeyFromSlug(trainingType, translations)

  if (!typeKey) {
    notFound()
  }

  return <TrainingTypeDetailPage typeKey={typeKey} />
}
