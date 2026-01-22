import type { RunningSchedule } from "@/lib/types/schedule"

export const schedule10km: RunningSchedule = {
  title: "Stapsgewijs naar de 10 Kilometer",
  overview:
    "Dit gebalanceerde schema is ontworpen om je huidige trainingsroutine van drie dagen per week te optimaliseren voor de 10 kilometer. We leggen de nadruk op een sterke aerobe basis gecombineerd met gerichte kwaliteitsprikkels voor een verantwoorde progressie.",
  runnerProfile: {
    experience: "Loper met gemiddelde ervaring, gewend aan een regelmatige trainingsfrequentie.",
    currentFitness:
      "Stabiele basisconditie door 3 trainingen per week, hoewel specifieke tijden onbekend zijn.",
    healthStatus:
      "Topfit en volledig belastbaar. Geen huidige blessures, wat een lineaire opbouw mogelijk maakt.",
    trainingHistory:
      "Consistente historie van 3 sessies per week; het lichaam is gewend aan regelmatige hardloopbelasting.",
    strengths: ["Hoge trainingsdiscipline", "Optimale belastbaarheid", "Ervaring met hardlopen"],
    considerations: [
      "Volume-opbouw naar de 10 km grens",
      "Behoud van plezier (recreatief focus)",
      "Balans tussen intensiteit en herstel",
    ],
    motivation:
      "Streeft naar het voltooien van de eerste of een nieuwe 10 kilometer op een gezonde, recreatieve manier.",
  },
  summary: {
    goal: "10 kilometer",
    targetDistance: "10 km",
    duration: "10 weken",
    trainingMethod: "Gebalanceerd",
    totalWeeks: 10,
    coachStrategy:
      "De strategie focust op de 'Gebalanceerde' aanpak: één lange duurloop, één kwaliteitstraining (interval of tempo) en één rustige herstelloop per week. We bouwen het volume elke drie weken uit met 5-10%, gevolgd door een herstelweek in week 4 en 8. In de laatste twee weken (taper) verlagen we het volume aanzienlijk om maximale frisheid te garanderen voor de 10 km uitdaging.",
  },
  weeks: [
    {
      weekNumber: 1,
      focus: "Basisconditie bevestigen",
      weekSummary: {
        totalDistance: "18.5 km",
        totalDuration: "1 uur 55 min",
        trainingDays: 3,
      },
      days: [
        {
          day: "Dinsdag",
          type: "Duurloop",
          description: "Rustige duurloop op praattempo.",
          intensity: "Licht",
          duration: "35 minuten",
          distance: "5.5 km",
          workoutDetails: {
            technicalData: { rpe: 3, trainingEffect: "Aerobe basis" },
          },
        },
        {
          day: "Donderdag",
          type: "Interval",
          description: "Korte intervallen voor souplesse.",
          intensity: "Matig",
          duration: "35 minuten",
          distance: "6 km",
          workoutDetails: {
            warmup: { duration: "10 min", distance: "1.5 km", description: "Rustig inlopen" },
            interval: {
              reps: 5,
              durationPerRep: "3 min",
              distancePerRep: "0.6 km",
              targetPace: "Vlot",
              recovery: "2 min wandelen",
            },
            cooldown: { duration: "10 min", distance: "1.5 km", description: "Uitwandelen" },
            technicalData: { rpe: 5, trainingEffect: "VO2-Max verbetering", surface: "Weg" },
          },
        },
        {
          day: "Zaterdag",
          type: "Duurloop",
          description: "Lange duurloop voor vetverbranding.",
          intensity: "Licht",
          duration: "45 minuten",
          distance: "7 km",
          workoutDetails: {
            technicalData: { rpe: 4, trainingEffect: "Uithoudingsvermogen" },
          },
        },
      ],
    },
    {
      weekNumber: 2,
      focus: "Lichte volume uitbreiding",
      weekSummary: {
        totalDistance: "20 km",
        totalDuration: "2 uur 05 min",
        trainingDays: 3,
      },
      days: [
        {
          day: "Dinsdag",
          type: "Duurloop",
          description: "Rustige herstelloop.",
          intensity: "Licht",
          duration: "35 minuten",
          distance: "5.5 km",
          workoutDetails: {
            technicalData: { rpe: 3, trainingEffect: "Herstel" },
          },
        },
        {
          day: "Donderdag",
          type: "Tempo",
          description: "Tempotraining op constante intensiteit.",
          intensity: "Matig",
          duration: "40 minuten",
          distance: "7 km",
          workoutDetails: {
            warmup: { duration: "10 min", distance: "1.5 km", description: "Progressief inlopen" },
            mainBody: {
              duration: "20 min",
              distance: "4 km",
              targetPace: "Constant",
              description: "Comfortabel zwaar tempo",
            },
            cooldown: { duration: "10 min", distance: "1.5 km", description: "Uitwandelen" },
            technicalData: { rpe: 6, trainingEffect: "Lactaatdrempel verhogen" },
          },
        },
        {
          day: "Zaterdag",
          type: "Duurloop",
          description: "Lange duurloop.",
          intensity: "Licht",
          duration: "50 minuten",
          distance: "7.5 km",
          workoutDetails: {
            technicalData: { rpe: 4, trainingEffect: "Aerobe basis" },
          },
        },
      ],
    },
    {
      weekNumber: 3,
      focus: "Opbouw naar piek week 3",
      weekSummary: {
        totalDistance: "21.5 km",
        totalDuration: "2 uur 15 min",
        trainingDays: 3,
      },
      days: [
        {
          day: "Dinsdag",
          type: "Duurloop",
          description: "Korte rustige duurloop.",
          intensity: "Licht",
          duration: "35 minuten",
          distance: "5.5 km",
          workoutDetails: {
            technicalData: { rpe: 3, trainingEffect: "Onderhoud" },
          },
        },
        {
          day: "Donderdag",
          type: "Interval",
          description: "Interval op hogere intensiteit.",
          intensity: "Zwaar",
          duration: "45 minuten",
          distance: "8 km",
          workoutDetails: {
            warmup: {
              duration: "10 min",
              distance: "1.5 km",
              description: "Inlopen met knieheffen",
            },
            interval: {
              reps: 6,
              durationPerRep: "4 min",
              distancePerRep: "0.8 km",
              targetPace: "Vlot",
              recovery: "2 min rust",
            },
            cooldown: { duration: "11 min", distance: "1.7 km", description: "Uitwandelen" },
            technicalData: { rpe: 7, trainingEffect: "VO2-Max verbetering" },
          },
        },
        {
          day: "Zaterdag",
          type: "Duurloop",
          description: "Lange duurloop.",
          intensity: "Licht",
          duration: "55 minuten",
          distance: "8 km",
          workoutDetails: {
            technicalData: { rpe: 4, trainingEffect: "Uithoudingsvermogen" },
          },
        },
      ],
    },
    {
      weekNumber: 4,
      focus: "Herstel en assimilatie",
      weekSummary: {
        totalDistance: "16 km",
        totalDuration: "1 uur 45 min",
        trainingDays: 3,
      },
      days: [
        {
          day: "Dinsdag",
          type: "Duurloop",
          description: "Zeer rustig herstel.",
          intensity: "Zeer licht",
          duration: "30 minuten",
          distance: "4.5 km",
          workoutDetails: {
            technicalData: { rpe: 2, trainingEffect: "Herstel" },
          },
        },
        {
          day: "Donderdag",
          type: "Tempo",
          description: "Lichte tempoprikkel.",
          intensity: "Matig",
          duration: "35 minuten",
          distance: "5.5 km",
          workoutDetails: {
            warmup: { duration: "10 min", distance: "1.5 km", description: "Inlopen" },
            mainBody: {
              duration: "15 min",
              distance: "2.5 km",
              targetPace: "Ontspannen tempo",
              description: "Focus op techniek",
            },
            cooldown: { duration: "10 min", distance: "1.5 km", description: "Uitzwaaien" },
            technicalData: { rpe: 5, trainingEffect: "Techniek onderhoud" },
          },
        },
        {
          day: "Zaterdag",
          type: "Duurloop",
          description: "Korte duurloop.",
          intensity: "Licht",
          duration: "40 minuten",
          distance: "6 km",
          workoutDetails: {
            technicalData: { rpe: 3, trainingEffect: "Aerobe basis" },
          },
        },
      ],
    },
    {
      weekNumber: 5,
      focus: "Intensivering van trainingen",
      weekSummary: {
        totalDistance: "23.5 km",
        totalDuration: "2 uur 25 min",
        trainingDays: 3,
      },
      days: [
        {
          day: "Dinsdag",
          type: "Duurloop",
          description: "Rustige duurloop.",
          intensity: "Licht",
          duration: "40 minuten",
          distance: "6 km",
          workoutDetails: {
            technicalData: { rpe: 4, trainingEffect: "Aerobe basis" },
          },
        },
        {
          day: "Donderdag",
          type: "Interval",
          description: "Lange intervallen.",
          intensity: "Zwaar",
          duration: "45 minuten",
          distance: "8.5 km",
          workoutDetails: {
            warmup: { duration: "10 min", distance: "1.5 km", description: "Inlopen" },
            interval: {
              reps: 4,
              durationPerRep: "5 min",
              distancePerRep: "1.1 km",
              targetPace: "Vlot tempo",
              recovery: "2 min rust",
            },
            cooldown: { duration: "7 min", distance: "1.1 km", description: "Uitwandelen" },
            technicalData: { rpe: 7, trainingEffect: "Lactaatdrempel" },
          },
        },
        {
          day: "Zaterdag",
          type: "Duurloop",
          description: "Lange duurloop.",
          intensity: "Licht",
          duration: "60 minuten",
          distance: "9 km",
          workoutDetails: {
            technicalData: { rpe: 4, trainingEffect: "Uithoudingsvermogen" },
          },
        },
      ],
    },
    {
      weekNumber: 6,
      focus: "Specifiek uithoudingsvermogen",
      weekSummary: {
        totalDistance: "25.5 km",
        totalDuration: "2 uur 40 min",
        trainingDays: 3,
      },
      days: [
        {
          day: "Dinsdag",
          type: "Duurloop",
          description: "Standaard duurloop.",
          intensity: "Licht",
          duration: "45 minuten",
          distance: "7 km",
          workoutDetails: {
            technicalData: { rpe: 3, trainingEffect: "Aerobe basis" },
          },
        },
        {
          day: "Donderdag",
          type: "Tempo",
          description: "Langer tempoblok.",
          intensity: "Matig",
          duration: "50 minuten",
          distance: "9 km",
          workoutDetails: {
            warmup: { duration: "10 min", distance: "1.5 km", description: "Inlopen" },
            mainBody: {
              duration: "30 min",
              distance: "6 km",
              targetPace: "Doeltempo",
              description: "Focus op constant ademritme",
            },
            cooldown: { duration: "10 min", distance: "1.5 km", description: "Uitwandelen" },
            technicalData: { rpe: 6, trainingEffect: "Lactaatdrempel" },
          },
        },
        {
          day: "Zaterdag",
          type: "Duurloop",
          description: "De 10km grens aantikken.",
          intensity: "Licht",
          duration: "65 minuten",
          distance: "9.5 km",
          workoutDetails: {
            technicalData: { rpe: 5, trainingEffect: "Uithoudingsvermogen" },
          },
        },
      ],
    },
    {
      weekNumber: 7,
      focus: "Piekbelasting",
      weekSummary: {
        totalDistance: "28 km",
        totalDuration: "3 uur",
        trainingDays: 3,
      },
      days: [
        {
          day: "Dinsdag",
          type: "Duurloop",
          description: "Actieve duurloop.",
          intensity: "Licht",
          duration: "45 minuten",
          distance: "7.5 km",
          workoutDetails: {
            technicalData: { rpe: 4, trainingEffect: "Onderhoud" },
          },
        },
        {
          day: "Donderdag",
          type: "Interval",
          description: "Pyramide training.",
          intensity: "Zwaar",
          duration: "55 minuten",
          distance: "10 km",
          workoutDetails: {
            warmup: { duration: "10 min", distance: "1.5 km", description: "Inlopen" },
            interval: {
              reps: 8,
              durationPerRep: "3 min",
              distancePerRep: "0.7 km",
              targetPace: "Snel",
              recovery: "2 min rust",
            },
            cooldown: {
              duration: "5 min",
              distance: "0.5 km",
              description: "Heel rustig uitwandelen",
            },
            technicalData: { rpe: 8, trainingEffect: "VO2-Max verbetering" },
          },
        },
        {
          day: "Zaterdag",
          type: "Duurloop",
          description: "Over-distance loop.",
          intensity: "Licht",
          duration: "80 minuten",
          distance: "10.5 km",
          workoutDetails: {
            technicalData: { rpe: 5, trainingEffect: "Maximale uithouding" },
          },
        },
      ],
    },
    {
      weekNumber: 8,
      focus: "Herstel en voorbereiding finale",
      weekSummary: {
        totalDistance: "20 km",
        totalDuration: "2 uur 05 min",
        trainingDays: 3,
      },
      days: [
        {
          day: "Dinsdag",
          type: "Duurloop",
          description: "Rustig herstel.",
          intensity: "Zeer licht",
          duration: "35 minuten",
          distance: "5.5 km",
          workoutDetails: {
            technicalData: { rpe: 2, trainingEffect: "Herstel" },
          },
        },
        {
          day: "Donderdag",
          type: "Tempo",
          description: "Onderhoudstraining.",
          intensity: "Matig",
          duration: "40 minuten",
          distance: "7 km",
          workoutDetails: {
            warmup: { duration: "10 min", distance: "1.5 km", description: "Inlopen" },
            mainBody: {
              duration: "20 min",
              distance: "4 km",
              targetPace: "Constant",
              description: "Niet forceren",
            },
            cooldown: { duration: "10 min", distance: "1.5 km", description: "Uitwandelen" },
            technicalData: { rpe: 5, trainingEffect: "Conditiebehoud" },
          },
        },
        {
          day: "Zaterdag",
          type: "Duurloop",
          description: "Korte lange duurloop.",
          intensity: "Licht",
          duration: "50 minuten",
          distance: "7.5 km",
          workoutDetails: {
            technicalData: { rpe: 3, trainingEffect: "Aerobe basis" },
          },
        },
      ],
    },
    {
      weekNumber: 9,
      focus: "Tapering fase",
      weekSummary: {
        totalDistance: "17 km",
        totalDuration: "1 uur 45 min",
        trainingDays: 3,
      },
      days: [
        {
          day: "Dinsdag",
          type: "Duurloop",
          description: "Heel rustig.",
          intensity: "Zeer licht",
          duration: "30 minuten",
          distance: "5 km",
          workoutDetails: {
            technicalData: { rpe: 2, trainingEffect: "Frisheid behouden" },
          },
        },
        {
          day: "Donderdag",
          type: "Interval",
          description: "Scherpte behouden met strides.",
          intensity: "Matig",
          duration: "35 minuten",
          distance: "6 km",
          workoutDetails: {
            warmup: { duration: "15 min", distance: "2.5 km", description: "Inlopen" },
            strides: {
              count: 6,
              description: "80m versnellingen op 90% kracht voor neuromusculaire activatie",
            },
            cooldown: {
              duration: "20 min",
              distance: "3.5 km",
              description: "Heel rustig uitdribbelen",
            },
            technicalData: { rpe: 4, trainingEffect: "Neuromusculaire activatie" },
          },
        },
        {
          day: "Zaterdag",
          type: "Duurloop",
          description: "Ontspannen loslopen.",
          intensity: "Licht",
          duration: "40 minuten",
          distance: "6 km",
          workoutDetails: {
            technicalData: { rpe: 3, trainingEffect: "Energie sparen" },
          },
        },
      ],
    },
    {
      weekNumber: 10,
      focus: "Event week: 10 KM",
      weekSummary: {
        totalDistance: "18.5 km",
        totalDuration: "1 uur 55 min",
        trainingDays: 3,
      },
      days: [
        {
          day: "Dinsdag",
          type: "Duurloop",
          description: "Activatie run.",
          intensity: "Licht",
          duration: "25 minuten",
          distance: "4 km",
          workoutDetails: {
            technicalData: { rpe: 3, trainingEffect: "Bloedsomloop stimuleren" },
          },
        },
        {
          day: "Donderdag",
          type: "Duurloop",
          description: "Heel kort loslopen.",
          intensity: "Zeer licht",
          duration: "20 minuten",
          distance: "3 km",
          workoutDetails: {
            technicalData: { rpe: 2, trainingEffect: "Benen losmaken" },
          },
        },
        {
          day: "Zaterdag",
          type: "Event",
          description: "DOEL: 10 kilometer!",
          intensity: "Zwaar",
          duration: "70 minuten",
          distance: "11.5 km",
          workoutDetails: {
            warmup: { duration: "5 min", distance: "0.75 km", description: "Heel licht dribbelen" },
            mainBody: {
              duration: "60 min",
              distance: "10 km",
              targetPace: "Recreatief tempo",
              description: "Focus op voltooien en genieten",
            },
            cooldown: { duration: "5 min", distance: "0.75 km", description: "Herstel wandelen" },
            technicalData: { rpe: 8, trainingEffect: "Maximale prestatie", surface: "Weg" },
          },
        },
      ],
    },
  ],
}
