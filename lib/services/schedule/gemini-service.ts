import type { IScheduleService } from "./schedule-service-interface"
import type { RunningSchedule, ScheduleFormData } from "@/lib/types/schedule"

/**
 * Build a structured prompt for Gemini using all schedule form values.
 * No API call is made here; this helper just prepares the input payload.
 */
export function buildGeminiPrompt(formData: ScheduleFormData): string {
  const format = (value: string | number | undefined) =>
    value === undefined || value === "" ? "Onbekend" : value
  const list = (values: string[]) => (values.length ? values.join(", ") : "Geen voorkeur opgegeven")

  const targetTime =
    formData.targetTime && formData.targetTime.trim().length > 0
      ? formData.targetTime
      : "Geen streeftijd"
  const gender = format(formData.gender)
  const ageGroup = format(formData.ageGroup)
  const trainingMethod = format(formData.trainingMethod)
  const selectedDays = list(formData.selectedDays)
  const methodRules: Record<string, string[]> = {
    Gebalanceerd: [
      "Structuur: 1 lange duurloop, 1 kwaliteitsprikkel (tempo/interval), rest rustig.",
      "Verdeling: 65–75% rustig, 15–20% tempo, 10–15% interval.",
      "Lange duurloop max 40% van weekvolume.",
      "Opbouw: weekvolume +5–10%, elke 4e week herstel.",
      "Taper: laatste 2–3 weken, volume −20% tot −40%, intensiteit behouden.",
    ],
    "80/20 (Polarized)": [
      "Verdeling: 80% lage intensiteit, 20% hoge intensiteit; middentempo vermijden.",
      "Max 2 intensieve sessies per week; kort en scherp.",
      "Opbouw: eerst volume, daarna intensiteit toevoegen.",
      "Taper: volume omlaag, intensieve prikkel behouden.",
    ],
    "MAF (lage hartslag)": [
      "Alle trainingen onder MAF-hartslag; geen tempo- of intervaltrainingen.",
      "Tempo ondergeschikt aan hartslag; alleen afstand/tijd opbouwen.",
      "Geen klassieke taper; laatste week lichte volumevermindering.",
    ],
    "Run-Walk (Galloway)": [
      "Alle sessies run/walk; verhouding afhankelijk van ervaring.",
      "Opbouw: eerst langere looptijd, daarna kortere wandelpauzes.",
      "Lange duurloop blijft run-walk; geen volledige doorloop afdwingen.",
      "Taper: zelfde structuur, kortere trainingen.",
    ],
    "Jack Daniels (tempozones)": [
      "Trainingstypes: Easy (E), Threshold (T), Interval (I), Repetition (R), Marathon (M).",
      "Max 2 kwaliteitstrainingen per week; tempo’s strikt berekenen en volgen.",
      "Verdeling: ±70% Easy, ±30% kwaliteit.",
      "Opbouw: eerst Threshold-volume, daarna Interval en Repetition toevoegen.",
      "Taper: volume omlaag, intensiteit behouden.",
    ],
    "Lydiard (fasegericht)": [
      "Fases: aerobe basis → heuvel/kracht → snelheid → wedstrijd; niet mengen.",
      "Intensiteit pas na aerobe basis; alleen voor gevorderd/expert.",
      "Taper geïntegreerd in wedstrijdfase.",
    ],
    Hansons: [
      "Alleen bij ≥5 trainingsdagen per week; hoge frequentie, weinig rustdagen.",
      "Lange duurloop relatief kort (max ~26 km); veel marathonpace.",
      "Vermoeidheid is bewust onderdeel; taper 10–14 dagen, kort en scherp.",
    ],
    Pfitzinger: [
      "Alleen voor gevorderd/expert; hoge weekomvang.",
      "Middellange duurlopen verplicht; lange duurlopen vaak met progressief einde.",
      "Intensiteit vooral marathon- en tempogericht; taper 2–3 weken, volume −30–50%.",
    ],
  }
  const chosenMethodRules =
    typeof formData.trainingMethod === "string" && methodRules[formData.trainingMethod]
      ? methodRules[formData.trainingMethod]
      : ["Gebruik alleen de regels van de gekozen methode. Combineer geen methodes."]

  return [
    "Je bent een digitale hardloopcoach. Genereer een persoonlijk hardloopschema in JSON,",
    "passend bij de velden hieronder. Houd rekening met belastbaarheid, herstel en haalbaarheid.",
    "",
    "Input (gebruik exact deze waarden):",
    `- Doel: ${format(formData.goal)}`,
    `- Doeltype (focus): ${formData.focus}`,
    `- Streeftijd: ${targetTime}`,
    `- Ervaring: ${format(formData.level)}`,
    `- Huidige trainingsfrequentie: ${format(formData.frequency)} sessies per week`,
    `- Blessure / belastbaarheid: ${format(formData.health)}`,
    `- Recente afstand: ${format(formData.recentDistance)}`,
    `- Recente tijd: ${format(formData.recentTime)}`,
    `- Startdatum: ${format(formData.startDate)}`,
    `- Max trainingsdagen per week: ${formData.targetDays}`,
    `- Schema duur (weken): ${formData.trainingWeeks}`,
    `- Inplannen: ${formData.planningMode}`,
    `- Voorkeursdagen: ${selectedDays}`,
    `- Taal: ${formData.language}`,
    `- Geslacht: ${gender}`,
    `- Leeftijdscategorie: ${ageGroup}`,
    `- Gekozen trainingsmethode: ${trainingMethod}`,
    "",
    "Constraints en stijl:",
    "- Output in JSON die matcht met het TypeScript type RunningSchedule:",
    '  { "title": string, "overview": string, "weeks": [ { "weekNumber": number, "focus": string, "days": [ { "day": string, "date"?: string, "type": string, "description": string, "intensity": string, "duration"?: string, "distance"?: string } ] } ] }',
    "- Titel in de gekozen taal; maak het kort maar specifiek voor het doel.",
    "- Overview: korte samenvatting (max 3 zinnen) met de gekozen methode en belangrijkste accenten.",
    "- Houd rekening met herstel bij pijntjes/herstellend/snel vermoeid; vermijd te veel intensiteit.",
    "- Respecteer max aantal dagen per week en totale weken; voorkom overbelasting.",
    "- Pas intensiteit aan op ervaring en doel (Recreatief vs Prestatiegericht).",
    "- Gebruik de gekozen methode als leidraad voor verdeling (bv. 80/20, MAF, Run-Walk, etc.).",
    "- Gebruik de taal-code voor alle tekstuele velden.",
    "",
    "Algemene regels (altijd toepassen):",
    "- Maximaal 2 intensieve trainingen per week.",
    "- Geen intensieve trainingen op opeenvolgende dagen.",
    "- Pas intensiteit en volume aan bij blessurestatus; kies bij twijfel de meest conservatieve variant.",
    "- Schema moet passen binnen het opgegeven aantal trainingsdagen per week.",
    "- Combineer nooit meerdere trainingsmethodes.",
    "",
    "Regels voor de gekozen trainingsmethode:",
    ...chosenMethodRules.map((rule) => `- ${rule}`),
    "",
    "Slot: Gebruik uitsluitend de regels van de gekozen trainingsmethode. Pas volume en intensiteit aan op ervaring, blessurestatus en beschikbare trainingsdagen. Het schema moet realistisch, veilig en uitvoerbaar zijn.",
  ].join("\n")
}

/**
 * Gemini-based schedule generation service
 * SOLAR: Separation of Concerns - handles only schedule generation logic
 */
class GeminiScheduleService implements IScheduleService {
  async generateSchedule(formData: ScheduleFormData): Promise<RunningSchedule> {
    // TODO: Implement actual Gemini API integration
    // For now we only build the prompt and stop; no request is made yet.
    const prompt = buildGeminiPrompt(formData)

    // Placeholder implementation (keeps current behavior non-functional on purpose)
    throw new Error(
      `Gemini service not yet implemented. Generated prompt for future use:\n\n${prompt}`,
    )
  }
}

export const geminiScheduleService = new GeminiScheduleService()

/**
 * Generates a schedule from form data using the Gemini service
 * SOLAR: Orchestration - coordinates the schedule generation process
 */
export async function generateScheduleFromFormData(
  formData: ScheduleFormData,
): Promise<RunningSchedule> {
  return geminiScheduleService.generateSchedule(formData)
}
