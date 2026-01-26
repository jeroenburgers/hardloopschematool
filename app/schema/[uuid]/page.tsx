import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getScheduleFromPrisma } from "@/lib/prisma/schedule-storage"
import { ExampleSchedulePage } from "@/components/pages/example-schedule-page"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ uuid: string }>
}): Promise<Metadata> {
  const { uuid } = await params
  const schedule = await getScheduleFromPrisma(uuid)

  if (!schedule) {
    return {
      title: "Schema niet gevonden",
      description: "Het opgevraagde schema kon niet worden gevonden.",
    }
  }

  return {
    title: `${schedule.title} | Hardloopschema Tool`,
    description: schedule.overview,
    openGraph: {
      title: schedule.title,
      description: schedule.overview,
      type: "website",
    },
  }
}

export default async function SchedulePage({ params }: { params: Promise<{ uuid: string }> }) {
  const { uuid } = await params
  const schedule = await getScheduleFromPrisma(uuid)

  if (!schedule) {
    notFound()
  }

  return <ExampleSchedulePage schedule={schedule} />
}
