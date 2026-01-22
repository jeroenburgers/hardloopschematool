import type { RunningSchedule } from "@/lib/types/schedule"

export const schedule5km: RunningSchedule = {
  title: "Starten met Hardlopen: Jouw Weg naar de 5 KM",
  overview:
    "Dit gebalanceerde schema is ontworpen om je op een verantwoorde manier van nul naar 5 kilometer te begeleiden. We focussen op het opbouwen van een sterke aerobe basis met drie sessies per week, waarbij herstel centraal staat.",
  runnerProfile: {
    experience: "Starter zonder specifieke hardloopervaring.",
    currentFitness:
      "Huidige fitheid is onbekend wegens gebrek aan recente prestaties; we gaan uit van een basisniveau waarbij we de belastbaarheid voorzichtig testen.",
    healthStatus:
      "Topfit en vrij van klachten. Dit biedt een uitstekende basis voor een gestage en volledige opbouw zonder extra beperkingen.",
    trainingHistory: "Geen structurele hardloopervaring bekend; startend vanaf een blanco blad.",
    strengths: [
      "Optimale gezondheidsstatus",
      "Jonge leeftijdscategorie (26-35)",
      "Gemotiveerd voor een eerste 5 km doel",
    ],
    considerations: [
      "Lichaam moet wennen aan impactbelasting",
      "Risico op overbelasting door enthousiasme",
      "Geen referentietijden beschikbaar",
    ],
    motivation:
      "Recreatief de eerste 5 kilometer voltooien zonder tijdsdruk, met focus op plezier en gezondheid.",
  },
  summary: {
    goal: "5 kilometer",
    targetDistance: "5 km",
    duration: "10 weken",
    trainingMethod: "Gebalanceerd",
    totalWeeks: 10,
    coachStrategy:
      "De aanpak volgt de gebalanceerde methode: één rustige duurloop, één kwaliteitstraining (interval of tempo) en één kortere herstelloop. We bouwen het volume elke drie weken met 5-10% uit, gevolgd door een herstelweek. In de laatste fase (taper) verlagen we het volume zodat je uitgerust aan de 5 km uitdaging begint. De focus ligt op 'tijd op de voeten' in plaats van snelheid.",
  },
  weeks: [
    {
      weekNumber: 1,
      focus: "Gewenning aan belasting",
      weekSummary: {
        totalDistance: "7.5 km",
        totalDuration: "60 minuten",
        trainingDays: 3,
      },
      days: [
        {
          day: "Maandag",
          type: "Duurloop",
          description: "Heel rustige wisselduurloop (hardlopen/wandelen).",
          intensity: "Licht",
          duration: "20 minuten",
          distance: "2.5 km",
          workoutDetails: {
            technicalData: { rpe: 3, trainingEffect: "Aerobe basis", surface: "Asfalt" },
          },
        },
        {
          day: "Woensdag",
          type: "Interval",
          description: "Korte intervallen om de hartslag licht te prikkel.",
          intensity: "Matig",
          duration: "20 minuten",
          distance: "2.5 km",
          workoutDetails: {
            warmup: { duration: "5 minuten", description: "Rustig dribbelen" },
            interval: {
              reps: 5,
              durationPerRep: "1 minuut",
              targetPace: "Vlot",
              recovery: "2 minuten wandelen",
            },
            cooldown: { duration: "5 minuten", description: "Uitwandelen" },
            technicalData: { rpe: 5, trainingEffect: "VO2-Max verbetering" },
          },
        },
        {
          day: "Zaterdag",
          type: "Duurloop",
          description: "Lange rustige duurloop op praattempo.",
          intensity: "Licht",
          duration: "20 minuten",
          distance: "2.5 km",
          workoutDetails: {
            technicalData: { rpe: 3, trainingEffect: "Aerobe basis" },
          },
        },
      ],
    },
    {
      weekNumber: 2,
      focus: "Basis uithoudingsvermogen",
      weekSummary: {
        totalDistance: "8.5 km",
        totalDuration: "66 minuten",
        trainingDays: 3,
      },
      days: [
        {
          day: "Maandag",
          type: "Duurloop",
          description: "Rustige herstelloop.",
          intensity: "Zeer licht",
          duration: "20 minuten",
          distance: "2.5 km",
          workoutDetails: {
            technicalData: { rpe: 2, trainingEffect: "Herstel" },
          },
        },
        {
          day: "Woensdag",
          type: "Tempo",
          description: "Korte tempoblokken.",
          intensity: "Matig",
          duration: "22 minuten",
          distance: "3 km",
          workoutDetails: {
            warmup: { duration: "6 minuten", description: "Warmdraaien" },
            mainBody: {
              duration: "10 minuten",
              targetPace: "Constant",
              description: "Tempo op 70% van max",
            },
            cooldown: { duration: "6 minuten", description: "Afkoelen" },
            technicalData: { rpe: 6, trainingEffect: "Lactaatdrempel verhogen" },
          },
        },
        {
          day: "Zaterdag",
          type: "Duurloop",
          description: "Lange duurloop, rustig opbouwen.",
          intensity: "Licht",
          duration: "24 minuten",
          distance: "3 km",
          workoutDetails: {
            technicalData: { rpe: 4, trainingEffect: "Aerobe basis" },
          },
        },
      ],
    },
    {
      weekNumber: 3,
      focus: "Volume uitbreiden",
      weekSummary: {
        totalDistance: "9.5 km",
        totalDuration: "75 minuten",
        trainingDays: 3,
      },
      days: [
        {
          day: "Maandag",
          type: "Duurloop",
          description: "Rustige sessie.",
          intensity: "Licht",
          duration: "22 minuten",
          distance: "2.8 km",
          workoutDetails: {
            technicalData: { rpe: 3, trainingEffect: "Aerobe basis" },
          },
        },
        {
          day: "Woensdag",
          type: "Interval",
          description: "Iets langere intervalblokken.",
          intensity: "Zwaar",
          duration: "25 minuten",
          distance: "3.2 km",
          workoutDetails: {
            warmup: { duration: "5 min", description: "Dribbelpas" },
            interval: {
              reps: 4,
              durationPerRep: "2 min",
              targetPace: "Vlot",
              recovery: "2 min wandelen",
            },
            cooldown: { duration: "5 min", description: "Wandelen" },
            technicalData: { rpe: 7, trainingEffect: "Conditieverbetering" },
          },
        },
        {
          day: "Zaterdag",
          type: "Duurloop",
          description: "De langste loop tot nu toe.",
          intensity: "Licht",
          duration: "28 minuten",
          distance: "3.5 km",
          workoutDetails: {
            technicalData: { rpe: 4, trainingEffect: "Uithoudingsvermogen" },
          },
        },
      ],
    },
    {
      weekNumber: 4,
      focus: "Herstel en consolidatie",
      weekSummary: {
        totalDistance: "7 km",
        totalDuration: "55 minuten",
        trainingDays: 3,
      },
      days: [
        {
          day: "Maandag",
          type: "Duurloop",
          description: "Heel rustig.",
          intensity: "Zeer licht",
          duration: "15 minuten",
          distance: "2 km",
          workoutDetails: {
            technicalData: { rpe: 2, trainingEffect: "Herstel" },
          },
        },
        {
          day: "Woensdag",
          type: "Interval",
          description: "Korte speelse intervallen.",
          intensity: "Licht",
          duration: "20 minuten",
          distance: "2.5 km",
          workoutDetails: {
            interval: {
              reps: 10,
              durationPerRep: "30 sec",
              targetPace: "Vlot",
              recovery: "1 min wandelen",
            },
            technicalData: { rpe: 4, trainingEffect: "Techniek" },
          },
        },
        {
          day: "Zaterdag",
          type: "Duurloop",
          description: "Korte duurloop.",
          intensity: "Licht",
          duration: "20 minuten",
          distance: "2.5 km",
          workoutDetails: {
            technicalData: { rpe: 3, trainingEffect: "Onderhoud" },
          },
        },
      ],
    },
    {
      weekNumber: 5,
      focus: "Kracht en uithouding",
      weekSummary: {
        totalDistance: "10.5 km",
        totalDuration: "82 minuten",
        trainingDays: 3,
      },
      days: [
        {
          day: "Maandag",
          type: "Duurloop",
          description: "Standaard rustige duurloop.",
          intensity: "Licht",
          duration: "25 minuten",
          distance: "3.2 km",
          workoutDetails: {
            technicalData: { rpe: 4, trainingEffect: "Aerobe basis" },
          },
        },
        {
          day: "Woensdag",
          type: "Tempo",
          description: "Langer tempoblok.",
          intensity: "Matig",
          duration: "27 minuten",
          distance: "3.5 km",
          workoutDetails: {
            warmup: { duration: "7 min", description: "Progressief dribbelen" },
            mainBody: {
              duration: "12 min",
              targetPace: "Vast tempo",
              description: "Zo min mogelijk wandelen",
            },
            cooldown: { duration: "8 min", description: "Uitwandelen" },
            technicalData: { rpe: 6, trainingEffect: "Lactaatdrempel" },
          },
        },
        {
          day: "Zaterdag",
          type: "Duurloop",
          description: "Uitbouw lange duurloop.",
          intensity: "Licht",
          duration: "30 minuten",
          distance: "3.8 km",
          workoutDetails: {
            technicalData: { rpe: 4, trainingEffect: "Uithoudingsvermogen" },
          },
        },
      ],
    },
    {
      weekNumber: 6,
      focus: "Intensiteit verhogen",
      weekSummary: {
        totalDistance: "12 km",
        totalDuration: "95 minuten",
        trainingDays: 3,
      },
      days: [
        {
          day: "Maandag",
          type: "Duurloop",
          description: "Rustige duurloop met strides.",
          intensity: "Licht",
          duration: "30 minuten",
          distance: "3.8 km",
          workoutDetails: {
            strides: { count: 3, description: "Korte versnellingen van 15 seconden aan het eind" },
            technicalData: { rpe: 4, trainingEffect: "Aerobe basis & Techniek" },
          },
        },
        {
          day: "Woensdag",
          type: "Interval",
          description: "Piramide interval.",
          intensity: "Zwaar",
          duration: "30 minuten",
          distance: "3.7 km",
          workoutDetails: {
            interval: {
              reps: 6,
              durationPerRep: "90 sec",
              targetPace: "Vlot",
              recovery: "90 sec wandelen",
            },
            technicalData: { rpe: 7, trainingEffect: "Snelheidsuithoudingsvermogen" },
          },
        },
        {
          day: "Zaterdag",
          type: "Duurloop",
          description: "Richting de 5km grens.",
          intensity: "Licht",
          duration: "35 minuten",
          distance: "4.5 km",
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
        totalDistance: "13.5 km",
        totalDuration: "105 minuten",
        trainingDays: 3,
      },
      days: [
        {
          day: "Maandag",
          type: "Duurloop",
          description: "Herstel na de lange week.",
          intensity: "Licht",
          duration: "30 minuten",
          distance: "3.8 km",
          workoutDetails: {
            technicalData: { rpe: 3, trainingEffect: "Actief herstel" },
          },
        },
        {
          day: "Woensdag",
          type: "Tempo",
          description: "Langste tempotraining.",
          intensity: "Zwaar",
          duration: "35 minuten",
          distance: "4.7 km",
          workoutDetails: {
            warmup: { duration: "10 min", description: "Lichte opbouw" },
            mainBody: {
              duration: "15 min",
              targetPace: "Stevig",
              description: "Focus op volhouden",
            },
            cooldown: { duration: "10 min", description: "Rustig uitlopen" },
            technicalData: { rpe: 8, trainingEffect: "Lactaatdrempel" },
          },
        },
        {
          day: "Zaterdag",
          type: "Duurloop",
          description: "De 5 km grens aantikken.",
          intensity: "Matig",
          duration: "40 minuten",
          distance: "5 km",
          workoutDetails: {
            technicalData: { rpe: 6, trainingEffect: "Uithoudingsvermogen" },
          },
        },
      ],
    },
    {
      weekNumber: 8,
      focus: "Herstel voor de finale",
      weekSummary: {
        totalDistance: "9.5 km",
        totalDuration: "75 minuten",
        trainingDays: 3,
      },
      days: [
        {
          day: "Maandag",
          type: "Duurloop",
          description: "Kort en makkelijk.",
          intensity: "Zeer licht",
          duration: "20 minuten",
          distance: "2.5 km",
          workoutDetails: {
            technicalData: { rpe: 2, trainingEffect: "Herstel" },
          },
        },
        {
          day: "Woensdag",
          type: "Interval",
          description: "Korte intervallen op snelheid.",
          intensity: "Matig",
          duration: "25 minuten",
          distance: "3.5 km",
          workoutDetails: {
            interval: {
              reps: 4,
              durationPerRep: "1 min",
              targetPace: "Vlot",
              recovery: "2 min wandelen",
            },
            technicalData: { rpe: 5, trainingEffect: "Onderhoud" },
          },
        },
        {
          day: "Zaterdag",
          type: "Duurloop",
          description: "Rustige duurloop.",
          intensity: "Licht",
          duration: "30 minuten",
          distance: "3.5 km",
          workoutDetails: {
            technicalData: { rpe: 4, trainingEffect: "Aerobe basis" },
          },
        },
      ],
    },
    {
      weekNumber: 9,
      focus: "Tapering",
      weekSummary: {
        totalDistance: "8 km",
        totalDuration: "60 minuten",
        trainingDays: 3,
      },
      days: [
        {
          day: "Maandag",
          type: "Duurloop",
          description: "Licht herstel.",
          intensity: "Zeer licht",
          duration: "20 minuten",
          distance: "2.5 km",
          workoutDetails: {
            technicalData: { rpe: 2, trainingEffect: "Frisheid behouden" },
          },
        },
        {
          day: "Woensdag",
          type: "Tempo",
          description: "Korte scherpte-prikkel.",
          intensity: "Matig",
          duration: "20 minuten",
          distance: "3 km",
          workoutDetails: {
            mainBody: { duration: "8 min", description: "Vlot tempo, benen losdraaien" },
            technicalData: { rpe: 5, trainingEffect: "Scherpte" },
          },
        },
        {
          day: "Zaterdag",
          type: "Duurloop",
          description: "Heel ontspannen.",
          intensity: "Licht",
          duration: "20 minuten",
          distance: "2.5 km",
          workoutDetails: {
            technicalData: { rpe: 3, trainingEffect: "Energie sparen" },
          },
        },
      ],
    },
    {
      weekNumber: 10,
      focus: "Doelstelling: 5 km voltooien",
      weekSummary: {
        totalDistance: "8.5 km",
        totalDuration: "65 minuten",
        trainingDays: 3,
      },
      days: [
        {
          day: "Maandag",
          type: "Duurloop",
          description: "Activatie-sessie.",
          intensity: "Zeer licht",
          duration: "15 minuten",
          distance: "2 km",
          workoutDetails: {
            technicalData: { rpe: 2, trainingEffect: "Activatie" },
          },
        },
        {
          day: "Woensdag",
          type: "Duurloop",
          description: "Heel kort dribbelen.",
          intensity: "Zeer licht",
          duration: "10 minuten",
          distance: "1.5 km",
          workoutDetails: {
            technicalData: { rpe: 2, trainingEffect: "Loslopen" },
          },
        },
        {
          day: "Zaterdag",
          type: "Event",
          description: "DE DAG: Je eerste 5 kilometer hardlopen!",
          intensity: "Zwaar",
          duration: "40 minuten",
          distance: "5 km",
          workoutDetails: {
            mainBody: { duration: "40 min", description: "Loop op gevoel, geniet van het moment." },
            technicalData: { rpe: 8, trainingEffect: "Voltooiing doel", surface: "Weg" },
          },
        },
      ],
    },
  ],
}
