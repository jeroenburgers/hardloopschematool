import { GoogleGenAI } from "@google/genai"
import type { IScheduleService } from "./schedule-service-interface"
import type { RunningSchedule, ScheduleFormData } from "@/lib/types/schedule"

const GEMINI_API_KEY = "AIzaSyAsL1FU40_hJmA46FhjzSvt-2PGBIHEPX4"
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY })

/**
 * Build a structured prompt for Gemini using all schedule form values.
 * This is the comprehensive prompt builder from the remote commit.
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
      "Max 2 kwaliteitstrainingen per week; tempo's strikt berekenen en volgen.",
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
    "  {",
    '    "title": string,',
    '    "overview": string,',
    '    "runnerProfile": {',
    '      "experience": string,',
    '      "currentFitness": string,',
    '      "healthStatus": string,',
    '      "trainingHistory": string,',
    '      "strengths": string[],',
    '      "considerations": string[],',
    '      "motivation": string',
    "    },",
    '    "summary": {',
    '      "goal": string,',
    '      "targetDistance": string,',
    '      "duration": string,',
    '      "trainingMethod": string,',
    '      "totalWeeks": number,',
    '      "coachStrategy": string',
    "    },",
    '    "weeks": [',
    "      {",
    '        "weekNumber": number (1 tot en met totalWeeks, ALLE weken verplicht),',
    '        "focus": string,',
    '        "weekSummary": {',
    '          "totalDistance": string,',
    '          "totalDuration": string,',
    '          "trainingDays": number',
    "        },",
    '        "days": [ { "day": string, "date"?: string, "type": string, "description": string, "intensity": string, "duration": string, "distance": string, "workoutDetails"?: WorkoutDetails } ]',
    "      }",
    "    ]",
    "  }",
    "",
    "BELANGRIJK - Verplichte velden:",
    "- Elke training MOET altijd zowel 'duration' als 'distance' bevatten.",
    "- Deze velden zijn essentieel voor gebruikers om hun route uit te stippelen.",
    "- Geef altijd een concrete waarde (bijv. '45 minuten', '8 kilometer') of een range (bijv. '40-50 minuten', '7-9 km').",
    "- Voor intervaltrainingen: geef de totale duur en totale afstand van de hele training (inclusief warmup en cooldown).",
    "",
    "KRITIEK - Intensity waarden (VERPLICHT):",
    "- De 'intensity' veld MOET exact één van deze waarden zijn (in logische volgorde): 'Zeer licht', 'Licht', 'Matig', 'Zwaar', 'Zeer zwaar', 'Piek'.",
    "- Gebruik GEEN andere waarden zoals 'lauw', 'laag', 'gemiddeld', 'hoog', 'maximaal', etc.",
    "- Mapping richtlijnen (in oplopende intensiteit):",
    "  * Zeer licht: Actief herstel, zeer rustige wandel/loop, RPE 1-2",
    "  * Licht: Rustige duurloop, Zone 1-2, praattempo, RPE 3-4",
    "  * Matig: Gematigde inspanning, tempo-run, Zone 3, RPE 5-6",
    "  * Zwaar: Intensieve training, interval, tempo, Zone 4, RPE 7-8",
    "  * Zeer zwaar: Zeer intensieve training, zware intervallen, Zone 5, RPE 9",
    "  * Piek: Maximale inspanning, wedstrijd, all-out, RPE 10",
    "- Controleer ALTIJD dat je exact één van de 6 toegestane waarden gebruikt.",
    "",
    "KRITIEK - Consistentie tussen duration/distance en workoutDetails:",
    "- De 'duration' en 'distance' op trainingniveau MOETEN overeenkomen met de som van alle duration/distance waarden in workoutDetails.",
    "- Als workoutDetails warmup (5 min), interval (20 min), en cooldown (5 min) bevat, dan moet duration = '30 minuten' (5+20+5).",
    "- Als workoutDetails warmup (1 km), mainBody (5 km), en cooldown (1 km) bevat, dan moet distance = '7 km' (1+5+1).",
    "- Controleer ALTIJD dat de totale duration en distance op trainingniveau gelijk zijn aan de som van alle onderdelen in workoutDetails.",
    "- Als er geen workoutDetails zijn (bijv. bij een simpele duurloop), dan is duration/distance op trainingniveau de enige waarde.",
    "- Als er wel workoutDetails zijn, dan MOET de som van alle duration/distance waarden in workoutDetails exact overeenkomen met duration/distance op trainingniveau.",
    "",
    "WorkoutDetails structuur (gebruik waar relevant, vooral bij interval, tempo en kwaliteitstrainingen):",
    "  {",
    '    "warmup"?: { "distance"?: string, "duration"?: string, "description": string },',
    '    "interval"?: { "reps": number, "distancePerRep"?: string, "durationPerRep"?: string, "targetPace": string, "recovery": string },',
    '    "mainBody"?: { "distance"?: string, "duration"?: string, "targetPace"?: string, "description": string },',
    '    "strides"?: { "count": number, "description": string },',
    '    "cooldown"?: { "distance"?: string, "duration"?: string, "description": string },',
    '    "technicalData": { "rpe": number (1-10), "trainingEffect": string }',
    "  }",
    "",
    "WorkoutDetails instructies:",
    "- Voeg workoutDetails toe aan trainingen die dat nodig hebben (interval, tempo, fartlek, etc.).",
    "- Voor rustige duurlopen: alleen technicalData met lage RPE (3-5) en trainingEffect.",
    "- Voor intervaltrainingen: warmup, interval (met reps, targetPace, recovery), cooldown, technicalData.",
    "- Voor tempotrainingen: warmup, mainBody (met targetPace), cooldown, technicalData.",
    "- Voor lange duurlopen: warmup (optioneel), mainBody, cooldown (optioneel), technicalData.",
    "- RPE schaal: 1-2 (zeer licht), 3-4 (licht), 5-6 (matig), 7-8 (zwaar), 9-10 (maximaal).",
    "- TrainingEffect: beschrijf het doel (bijv. 'Aerobe basis', 'VO2-Max verbetering', 'Lactaatdrempel verhogen', 'Herstel').",
    "- Surface: alleen toevoegen als relevant (bijv. 'Baan' voor intervallen, 'Bos' voor trail, 'Weg' voor asfalt).",
    "",
    "HERINNERING - Duration/Distance consistentie:",
    "- Wanneer je workoutDetails gebruikt, ZORG ERVOOR dat de duration en distance op trainingniveau de SOM zijn van alle duration/distance in workoutDetails.",
    "- Voorbeeld: warmup (5 min, 1 km) + interval (20 min, 4 km) + cooldown (5 min, 1 km) = duration: '30 minuten', distance: '6 km'.",
    "- Bereken altijd eerst de workoutDetails, tel dan alles op, en gebruik die som voor duration en distance op trainingniveau.",
    "- Titel in de gekozen taal; maak het kort maar specifiek voor het doel.",
    "- Overview: korte samenvatting (max 3 zinnen) met de gekozen methode en belangrijkste accenten.",
    "",
    "RunnerProfile sectie (verplicht - maak een persoonlijk profiel gebaseerd op alle input):",
    '- "experience": beschrijf het niveau/ervaring (bijv. "Starter met beperkte hardloopervaring" of "Gevorderde loper met jarenlange ervaring").',
    '- "currentFitness": beoordeel de huidige fitheid gebaseerd op recente prestaties (recente afstand en tijd). Beschrijf wat dit zegt over het huidige niveau.',
    '- "healthStatus": beschrijf de blessurestatus en belastbaarheid. Geef aan wat dit betekent voor het trainingsschema (bijv. "Geen blessures, volledige belastbaarheid" of "Herstellend van blessure, voorzichtig opbouwen").',
    '- "trainingHistory": beschrijf de huidige trainingsfrequentie en achtergrond. Wat zegt dit over de trainingsgewoonten?',
    '- "strengths": array van 2-4 sterke punten van de loper (bijv. ["Consistente trainingsfrequentie", "Geen blessuregeschiedenis", "Duidelijk doel"]).',
    '- "considerations": array van 2-4 aandachtspunten of beperkingen (bijv. ["Herstellend van blessure", "Beperkte tijd beschikbaar", "Startend met hardlopen"]).',
    '- "motivation": beschrijf het doel en de motivatie van de loper (bijv. "Streeft naar eerste 10 kilometer binnen 50 minuten" of "Wil marathon uitlopen met focus op voltooien").',
    "- Maak het profiel persoonlijk, accuraat en motiverend. Gebruik de gekozen taal.",
    "",
    "Summary sectie (verplicht):",
    '- "goal": het doel uit de input (bijv. "10 kilometer", "Marathon (42,2 kilometer)").',
    '- "targetDistance": de doelafstand in leesbare vorm (bijv. "10 km", "42.2 km", "21.1 km").',
    '- "duration": aantal weken als tekst (bijv. "12 weken", "16 weken").',
    '- "trainingMethod": de gekozen trainingsmethode uit de input.',
    '- "totalWeeks": het totale aantal weken als nummer.',
    '- "coachStrategy": een duidelijke strategische uitleg van de aanpak (3-5 zinnen). Beschrijf:',
    "  * Hoe het schema is opgebouwd (bijv. eerst basis opbouwen, dan intensiteit toevoegen)",
    "  * De focus per fase (bijv. eerste weken aerobe basis, midden intensiteit, einde taper)",
    "  * Waarom deze aanpak past bij het doel en de trainingsmethode",
    "  * Belangrijke aandachtspunten of accenten in het schema",
    "  * Maak het persoonlijk en motiverend, gebruik de gekozen taal.",
    "",
    "BELANGRIJK - Weeks array (KRITIEK):",
    "- Je MOET ALLE weken genereren van week 1 tot en met week [totalWeeks].",
    "- Geen enkele week mag worden overgeslagen.",
    "- Als totalWeeks 12 is, moet je exact 12 weken genereren (week 1, 2, 3, ..., 12).",
    "- Als totalWeeks 16 is, moet je exact 16 weken genereren (week 1, 2, 3, ..., 16).",
    "- WeekNumber moet sequentieel zijn: 1, 2, 3, 4, ... tot en met totalWeeks.",
    "- Geen samenvattingen of voorbeelden - genereer elke week volledig met alle dagen.",
    "",
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
    "",
    "KRITIEKE HERINNERING: Genereer ALLE weken van 1 tot totalWeeks. Geen enkele week mag ontbreken. Controleer dat je exact [totalWeeks] weken hebt gegenereerd voordat je de response aflevert.",
  ].join("\n")
}

/**
 * Gemini-based schedule generation service
 * SOLAR: Separation of Concerns - handles only schedule generation logic
 */
class GeminiScheduleService implements IScheduleService {
  async generateSchedule(formData: ScheduleFormData, retryCount = 0): Promise<RunningSchedule> {
    const prompt = buildGeminiPrompt(formData)
    const maxRetries = 3

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      })

      const generatedText = response.text || ""

      if (!generatedText) {
        // Retry if no content generated
        if (retryCount < maxRetries - 1) {
          console.warn(
            `No content generated from Gemini API, retrying... (attempt ${retryCount + 1}/${maxRetries})`,
          )
          // Wait a bit before retrying (exponential backoff)
          await new Promise((resolve) => setTimeout(resolve, 1000 * (retryCount + 1)))
          return this.generateSchedule(formData, retryCount + 1)
        }
        throw new Error("No content generated from Gemini API after multiple attempts")
      }

      // Parse the JSON response from Gemini
      const schedule = this.parseScheduleResponse(generatedText)
      return schedule
    } catch (error) {
      // Retry on error if we haven't exceeded max retries
      if (retryCount < maxRetries - 1 && error instanceof Error) {
        console.warn(
          `Error calling Gemini API, retrying... (attempt ${retryCount + 1}/${maxRetries}):`,
          error.message,
        )
        // Wait a bit before retrying (exponential backoff)
        await new Promise((resolve) => setTimeout(resolve, 1000 * (retryCount + 1)))
        return this.generateSchedule(formData, retryCount + 1)
      }
      console.error("Error calling Gemini API after all retries:", error)
      throw error
    }
  }

  private parseScheduleResponse(text: string): RunningSchedule {
    // Try to extract JSON from the response
    // Gemini might wrap JSON in markdown code blocks or add extra text
    let jsonText = text.trim()

    // Remove markdown code blocks if present
    jsonText = jsonText.replace(/```json\n?/g, "").replace(/```\n?/g, "")

    // Try to find JSON object in the text
    const jsonMatch = jsonText.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      jsonText = jsonMatch[0]
    }

    try {
      const parsed = JSON.parse(jsonText) as RunningSchedule

      // Validate the structure
      if (!parsed.title || !parsed.overview || !Array.isArray(parsed.weeks)) {
        throw new Error("Invalid schedule structure from Gemini")
      }

      // Ensure runnerProfile exists and has correct structure
      if (!parsed.runnerProfile) {
        parsed.runnerProfile = {
          experience: "",
          currentFitness: "",
          healthStatus: "",
          trainingHistory: "",
          strengths: [],
          considerations: [],
          motivation: "",
        }
      } else {
        parsed.runnerProfile = {
          experience: parsed.runnerProfile.experience || "",
          currentFitness: parsed.runnerProfile.currentFitness || "",
          healthStatus: parsed.runnerProfile.healthStatus || "",
          trainingHistory: parsed.runnerProfile.trainingHistory || "",
          strengths: Array.isArray(parsed.runnerProfile.strengths)
            ? parsed.runnerProfile.strengths
            : [],
          considerations: Array.isArray(parsed.runnerProfile.considerations)
            ? parsed.runnerProfile.considerations
            : [],
          motivation: parsed.runnerProfile.motivation || "",
        }
      }

      // Ensure summary exists and has correct structure
      if (!parsed.summary) {
        parsed.summary = {
          goal: "",
          targetDistance: "",
          duration: "",
          trainingMethod: "",
          totalWeeks: parsed.weeks.length || 0,
          coachStrategy: "",
        }
      } else {
        parsed.summary = {
          goal: parsed.summary.goal || "",
          targetDistance: parsed.summary.targetDistance || "",
          duration: parsed.summary.duration || "",
          trainingMethod: parsed.summary.trainingMethod || "",
          totalWeeks: parsed.summary.totalWeeks || parsed.weeks.length || 0,
          coachStrategy: parsed.summary.coachStrategy || "",
        }
      }

      // Normalize intensity values to standardized values
      const normalizeIntensity = (intensity: string): string => {
        const lower = intensity.toLowerCase().trim()
        // Map common variations to standardized values (in logische volgorde)
        if (
          lower.includes("zeer laag") ||
          lower.includes("zeer licht") ||
          lower === "actief herstel"
        ) {
          return "Zeer licht"
        }
        if (
          lower.includes("laag") ||
          lower.includes("licht") ||
          lower.includes("lauw") ||
          lower.includes("rustig") ||
          lower === "easy"
        ) {
          return "Licht"
        }
        if (
          lower.includes("gemiddeld") ||
          lower.includes("matig") ||
          lower.includes("moderate") ||
          lower.includes("tempo")
        ) {
          return "Matig"
        }
        if (
          lower.includes("hoog") ||
          lower.includes("zwaar") ||
          lower.includes("intensief") ||
          lower.includes("hard")
        ) {
          return "Zwaar"
        }
        if (
          lower.includes("zeer hoog") ||
          lower.includes("zeer zwaar") ||
          lower.includes("maximaal") ||
          lower.includes("extreem")
        ) {
          return "Zeer zwaar"
        }
        if (
          lower.includes("piek") ||
          lower.includes("wedstrijd") ||
          lower.includes("race") ||
          lower === "max"
        ) {
          return "Piek"
        }
        // Default fallback based on common patterns
        if (lower.includes("interval") || lower.includes("sprint")) {
          return "Zwaar"
        }
        if (lower.includes("duurloop") || lower.includes("long run")) {
          return "Licht"
        }
        // If we can't determine, default to "Matig"
        return "Matig"
      }

      // Ensure all weeks have the correct structure
      parsed.weeks = parsed.weeks.map((week, index) => ({
        weekNumber: week.weekNumber ?? index + 1,
        focus: week.focus || `Week ${index + 1}`,
        days: (week.days || []).map((day) => ({
          ...day,
          intensity: normalizeIntensity(day.intensity || "Gemiddeld"),
        })),
        weekSummary: week.weekSummary || {
          totalDistance: "",
          totalDuration: "",
          trainingDays: week.days?.length || 0,
        },
      })) as RunningSchedule["weeks"]

      return parsed
    } catch (error) {
      console.error("Error parsing Gemini response:", error)
      console.error("Response text:", text)
      throw new Error(
        `Failed to parse schedule from Gemini response: ${error instanceof Error ? error.message : "Unknown error"}`,
      )
    }
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
