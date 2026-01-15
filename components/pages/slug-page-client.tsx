"use client"

import * as React from "react"
import { notFound } from "next/navigation"
import { getRouteKeyBySlug, routeComponents } from "@/lib/i18n/routes"

export function SlugPageClient({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params)

  // Find the route key from the slug (checks all locales)
  const routeKey = getRouteKeyBySlug(slug)

  if (!routeKey) {
    notFound()
  }

  // Get the component for this route
  const Component = routeComponents[routeKey]

  if (!Component) {
    notFound()
  }

  return <Component />
}
