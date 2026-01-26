import { PrismaClient } from "@prisma/client"
import { withAccelerate } from "@prisma/extension-accelerate"

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined
}

function createPrismaClient() {
  const baseClient = new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  })

  // Only extend with Accelerate if DATABASE_URL starts with prisma://
  // This allows the code to work with both Accelerate and direct connections
  try {
    const dbUrl = process.env.DATABASE_URL || ""
    if (dbUrl.startsWith("prisma://") || dbUrl.startsWith("prisma+postgres://")) {
      return baseClient.$extends(withAccelerate())
    }
  } catch (error) {
    console.warn("Failed to extend Prisma with Accelerate, using base client:", error)
  }

  return baseClient
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
