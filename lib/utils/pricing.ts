import type { Goal } from "@/lib/types/schedule"

/**
 * Pricing utility
 * Calculates price based on goal and training weeks
 */

interface PricingTable {
  [key: string]: {
    [weeks: number]: number
  }
}

// Pricing table based on goal and weeks
const PRICING_TABLE: PricingTable = {
  "Conditie / Gezondheid": {
    4: 9.95,
    6: 12.95,
    8: 14.95,
    10: 14.95,
    12: 14.95,
  },
  "5 kilometer": {
    4: 9.95,
    6: 14.95,
    8: 16.95,
    10: 16.95,
    12: 17.95,
  },
  "10 kilometer": {
    4: 12.95,
    6: 17.95,
    8: 19.95,
    10: 19.95,
    12: 19.95,
  },
  "15 kilometer": {
    8: 19.95,
    10: 21.95,
    12: 22.95,
    14: 22.95,
  },
  "10 mijl (16,1 kilometer)": {
    8: 19.95,
    10: 21.95,
    12: 22.95,
    14: 22.95,
    16: 24.95,
  },
  "Halve marathon (21,1 kilometer)": {
    10: 22.95,
    12: 24.95,
    14: 24.95,
    16: 26.95,
    24: 29.95,
  },
  "30 kilometer": {
    12: 24.95,
    14: 26.95,
    16: 27.95,
    24: 29.95,
  },
  "Marathon (42,2 kilometer)": {
    12: 27.95,
    14: 29.95,
    16: 34.95,
    24: 34.95,
  },
}

/**
 * Calculate price based on goal and training weeks
 * @param goal - The goal/distance of the training schedule
 * @param trainingWeeks - Number of training weeks
 * @returns Price in euros (number) or null if combination is not available
 */
export function calculatePrice(goal: Goal | "", trainingWeeks: number): number | null {
  if (!goal || !trainingWeeks) {
    return null
  }

  const goalPricing = PRICING_TABLE[goal]
  if (!goalPricing) {
    return null
  }

  const price = goalPricing[trainingWeeks]
  return price ?? null
}

/**
 * Format price for display
 * @param price - Price in euros (number)
 * @param locale - Locale for formatting (default: 'nl-NL')
 * @returns Formatted price string (e.g., "€9,95")
 */
export function formatPrice(price: number | null, locale: string = "nl-NL"): string {
  if (price === null) {
    return ""
  }

  // Use Intl.NumberFormat for proper locale formatting
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return formatter.format(price)
}

/**
 * Get the minimum available price for a goal
 * @param goal - The goal/distance of the training schedule
 * @returns Minimum price in euros (number) or null if goal is not available
 */
export function getMinPriceForGoal(goal: Goal | ""): number | null {
  if (!goal) {
    return null
  }

  const goalPricing = PRICING_TABLE[goal]
  if (!goalPricing) {
    return null
  }

  const prices = Object.values(goalPricing)
  return prices.length > 0 ? Math.min(...prices) : null
}
