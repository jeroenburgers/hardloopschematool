import type { RunningSchedule } from "@/lib/types/schedule"

export const schedule5kmPr: RunningSchedule = {
  title: "Jack Daniels 5K Elite Target: Sub-25",
  overview:
    "Dit schema hanteert de VDOT-filosofie van Jack Daniels om je 5km tijd van 30:00 naar 25:00 te brengen. De focus ligt op het systematisch verhogen van je aerobe drempel en VO2-max via specifieke E, T en I zones.",
  runnerProfile: {
    experience: "Loper met gemiddelde ervaring, klaar voor een gestructureerde methodiek.",
    currentFitness:
      "Actuele 5km tijd van 30:00 (VDOT ~31). Om 25:00 te halen (VDOT ~39) is een significante verbetering van de loop-economie en drempelsnelheid nodig.",
    healthStatus:
      "Topfit en klachtenvrij. Volledige belastbaarheid voor de vereiste intensiteit van Jack Daniels trainingen.",
    trainingHistory:
      "Consistent 3 trainingen per week, wat een solide basis vormt voor kwalitatieve progressie.",
    strengths: ["Consistent trainingsritme", "Goede gezondheidsstatus", "Duidelijk prestatiedoel"],
    considerations: [
      "Groot verschil tussen huidige en streeftijd",
      "Intensiteit van Interval (I) trainingen",
      "Nauwkeurigheid van tempozones",
    ],
    motivation: "Sterk gemotiveerd om de 5km onder de 25 minuten te finishen.",
  },
  summary: {
    goal: "5 kilometer onder de 25 minuten",
    targetDistance: "5 km",
    duration: "12 weken",
    trainingMethod: "Jack Daniels (tempozones)",
    totalWeeks: 12,
    coachStrategy:
      "Het schema is verdeeld in drie fasen. Fase 1 (week 1-4) richt zich op Easy runs en Threshold (T) tempo's om de basis te verstevigen. Fase 2 (week 5-8) introduceert Interval (I) trainingen op 5km-wedstrijdtempo voor VO2-max verbetering. Fase 3 (week 9-12) verhoogt de specifieke loopsnelheid met Repetitions (R) en een zorgvuldige taper voor maximale frisheid.",
  },
  weeks: [
    {
      weekNumber: 1,
      focus: "Fase 1: Basis en Drempel",
      weekSummary: {
        totalDistance: "18.5 km",
        totalDuration: "1 uur 50 min",
        trainingDays: 3,
      },
      days: [
        {
          day: "Dinsdag",
          type: "Easy (E)",
          description: "Rustige duurloop om te wennen aan het schema.",
          intensity: "Licht",
          duration: "35 minuten",
          distance: "5.5 km",
          workoutDetails: {
            technicalData: { rpe: 3, trainingEffect: "Aerobe basis" },
          },
        },
        {
          day: "Donderdag",
          type: "Threshold (T)",
          description: "Cruise Intervals om de drempel op te zoeken.",
          intensity: "Zwaar",
          duration: "45 minuten",
          distance: "7.5 km",
          workoutDetails: {
            warmup: { duration: "15 min", distance: "2.5 km", description: "E-tempo inlopen" },
            interval: {
              reps: 3,
              durationPerRep: "5 min",
              distancePerRep: "1 km",
              targetPace: "05:30 min/km",
              recovery: "1 min wandelen",
            },
            cooldown: { duration: "12 min", distance: "2 km", description: "E-tempo uitlopen" },
            technicalData: { rpe: 7, trainingEffect: "Lactaatdrempel verhogen" },
          },
        },
        {
          day: "Zaterdag",
          type: "Easy (E)",
          description: "Lange E-run voor vetverbranding.",
          intensity: "Licht",
          duration: "30 minuten",
          distance: "5.5 km",
          workoutDetails: {
            technicalData: { rpe: 4, trainingEffect: "Aerobe basis" },
          },
        },
      ],
    },
    {
      weekNumber: 2,
      focus: "Fase 1: Drempel stabiliseren",
      weekSummary: {
        totalDistance: "19.5 km",
        totalDuration: "1 uur 55 min",
        trainingDays: 3,
      },
      days: [
        {
          day: "Dinsdag",
          type: "Easy (E)",
          description: "Herstelloop.",
          intensity: "Licht",
          duration: "35 minuten",
          distance: "5.5 km",
          workoutDetails: {
            technicalData: { rpe: 3, trainingEffect: "Herstel" },
          },
        },
        {
          day: "Donderdag",
          type: "Threshold (T)",
          description: "Continue Threshold run.",
          intensity: "Zwaar",
          duration: "40 minuten",
          distance: "7.5 km",
          workoutDetails: {
            warmup: { duration: "10 min", distance: "2 km", description: "Inlopen" },
            mainBody: {
              duration: "20 min",
              distance: "3.5 km",
              targetPace: "05:35 min/km",
              description: "Drempeltempo",
            },
            cooldown: { duration: "10 min", distance: "2 km", description: "Uitlopen" },
            technicalData: { rpe: 7, trainingEffect: "Lactaatdrempel" },
          },
        },
        {
          day: "Zondag",
          type: "Easy (E)",
          description: "Langere E-run.",
          intensity: "Licht",
          duration: "40 minuten",
          distance: "6.5 km",
          workoutDetails: {
            technicalData: { rpe: 4, trainingEffect: "Basis" },
          },
        },
      ],
    },
    {
      weekNumber: 3,
      focus: "Fase 1: Vergroten E-volume",
      weekSummary: {
        totalDistance: "22 km",
        totalDuration: "2 uur 05 min",
        trainingDays: 3,
      },
      days: [
        {
          day: "Dinsdag",
          type: "Easy (E)",
          description: "Rustige duurloop.",
          intensity: "Licht",
          duration: "40 minuten",
          distance: "6.5 km",
          workoutDetails: {
            technicalData: { rpe: 3, trainingEffect: "Aerobe basis" },
          },
        },
        {
          day: "Donderdag",
          type: "Threshold (T)",
          description: "Cruise Intervals.",
          intensity: "Zwaar",
          duration: "45 minuten",
          distance: "8 km",
          workoutDetails: {
            warmup: { duration: "10 min", distance: "1.5 km", description: "E-pace" },
            interval: {
              reps: 4,
              durationPerRep: "6 min",
              distancePerRep: "1.2 km",
              targetPace: "05:30 min/km",
              recovery: "1 min rust",
            },
            cooldown: { duration: "7 min", distance: "1.7 km", description: "Uitlopen" },
            technicalData: { rpe: 7, trainingEffect: "Drempel" },
          },
        },
        {
          day: "Zaterdag",
          type: "Easy (E)",
          description: "Lange rustige loop.",
          intensity: "Licht",
          duration: "40 minuten",
          distance: "7.5 km",
          workoutDetails: {
            technicalData: { rpe: 4, trainingEffect: "Uithoudingsvermogen" },
          },
        },
      ],
    },
    {
      weekNumber: 4,
      focus: "Fase 1: Consolidatie (Herstel)",
      weekSummary: {
        totalDistance: "17 km",
        totalDuration: "1 uur 40 min",
        trainingDays: 3,
      },
      days: [
        {
          day: "Dinsdag",
          type: "Easy (E)",
          description: "Heel rustig.",
          intensity: "Zeer licht",
          duration: "30 minuten",
          distance: "5 km",
          workoutDetails: {
            technicalData: { rpe: 2, trainingEffect: "Herstel" },
          },
        },
        {
          day: "Donderdag",
          type: "Easy (E)",
          description: "E-run met Strides.",
          intensity: "Licht",
          duration: "35 minuten",
          distance: "6 km",
          workoutDetails: {
            strides: { count: 6, description: "20 sec snel / 40 sec rust" },
            technicalData: { rpe: 4, trainingEffect: "Loopsnelheid" },
          },
        },
        {
          day: "Zondag",
          type: "Easy (E)",
          description: "Korte duurloop.",
          intensity: "Licht",
          duration: "35 minuten",
          distance: "6 km",
          workoutDetails: {
            technicalData: { rpe: 3, trainingEffect: "Onderhoud" },
          },
        },
      ],
    },
    {
      weekNumber: 5,
      focus: "Fase 2: Introductie Interval (I)",
      weekSummary: {
        totalDistance: "21 km",
        totalDuration: "2 uur 05 min",
        trainingDays: 3,
      },
      days: [
        {
          day: "Dinsdag",
          type: "Easy (E)",
          description: "Voorbereidende E-run.",
          intensity: "Licht",
          duration: "40 minuten",
          distance: "6.5 km",
          workoutDetails: {
            technicalData: { rpe: 3, trainingEffect: "Basis" },
          },
        },
        {
          day: "Donderdag",
          type: "Interval (I)",
          description: "VO2-max intervallen.",
          intensity: "Zeer zwaar",
          duration: "45 minuten",
          distance: "7.5 km",
          workoutDetails: {
            warmup: {
              duration: "15 min",
              distance: "2.5 km",
              description: "Inlopen + dynamische stretch",
            },
            interval: {
              reps: 5,
              durationPerRep: "3 min",
              distancePerRep: "0.6 km",
              targetPace: "05:00 min/km",
              recovery: "3 min dribbel",
            },
            cooldown: { duration: "15 min", distance: "2.5 km", description: "Uitlopen" },
            technicalData: { rpe: 8, trainingEffect: "VO2-Max verbetering" },
          },
        },
        {
          day: "Zaterdag",
          type: "Easy (E)",
          description: "Lange rustige loop.",
          intensity: "Licht",
          duration: "40 minuten",
          distance: "7 km",
          workoutDetails: {
            technicalData: { rpe: 4, trainingEffect: "Aerobe basis" },
          },
        },
      ],
    },
    {
      weekNumber: 6,
      focus: "Fase 2: I-tempo uitbreiden",
      weekSummary: {
        totalDistance: "23.5 km",
        totalDuration: "2 uur 15 min",
        trainingDays: 3,
      },
      days: [
        {
          day: "Dinsdag",
          type: "Easy (E)",
          description: "Herstelloop.",
          intensity: "Licht",
          duration: "45 minuten",
          distance: "7.5 km",
          workoutDetails: {
            technicalData: { rpe: 3, trainingEffect: "Herstel" },
          },
        },
        {
          day: "Donderdag",
          type: "Interval (I)",
          description: "1km intervallen.",
          intensity: "Zeer zwaar",
          duration: "50 minuten",
          distance: "8.5 km",
          workoutDetails: {
            warmup: { duration: "15 min", distance: "2.5 km", description: "Grondig inlopen" },
            interval: {
              reps: 4,
              durationPerRep: "4 min",
              distancePerRep: "0.8 km",
              targetPace: "04:55 min/km",
              recovery: "3 min rust",
            },
            cooldown: { duration: "19 min", distance: "2.8 km", description: "Uitlopen" },
            technicalData: { rpe: 9, trainingEffect: "VO2-Max" },
          },
        },
        {
          day: "Zondag",
          type: "Easy (E)",
          description: "Lange E-run.",
          intensity: "Licht",
          duration: "40 minuten",
          distance: "7.5 km",
          workoutDetails: {
            technicalData: { rpe: 4, trainingEffect: "Basis" },
          },
        },
      ],
    },
    {
      weekNumber: 7,
      focus: "Fase 2: Specifieke 5K training",
      weekSummary: {
        totalDistance: "25 km",
        totalDuration: "2 uur 25 min",
        trainingDays: 3,
      },
      days: [
        {
          day: "Dinsdag",
          type: "Easy (E)",
          description: "Rustige duurloop.",
          intensity: "Licht",
          duration: "45 minuten",
          distance: "7.5 km",
          workoutDetails: {
            technicalData: { rpe: 3, trainingEffect: "Basis" },
          },
        },
        {
          day: "Donderdag",
          type: "Interval (I)",
          description: "Hard-Easy blokken.",
          intensity: "Zeer zwaar",
          duration: "55 minuten",
          distance: "9.5 km",
          workoutDetails: {
            warmup: { duration: "15 min", distance: "2.5 km", description: "Inlopen" },
            interval: {
              reps: 6,
              durationPerRep: "3 min",
              distancePerRep: "0.65 km",
              targetPace: "04:55 min/km",
              recovery: "2 min dribbel",
            },
            cooldown: { duration: "10 min", distance: "3.1 km", description: "Uitlopen" },
            technicalData: { rpe: 9, trainingEffect: "Snelheidsuithouding" },
          },
        },
        {
          day: "Zaterdag",
          type: "Easy (E)",
          description: "Lange loop.",
          intensity: "Licht",
          duration: "45 minuten",
          distance: "8 km",
          workoutDetails: {
            technicalData: { rpe: 4, trainingEffect: "Uithoudingsvermogen" },
          },
        },
      ],
    },
    {
      weekNumber: 8,
      focus: "Fase 2: Herstelweek",
      weekSummary: {
        totalDistance: "18.5 km",
        totalDuration: "1 uur 50 min",
        trainingDays: 3,
      },
      days: [
        {
          day: "Dinsdag",
          type: "Easy (E)",
          description: "Heel rustig.",
          intensity: "Zeer licht",
          duration: "30 minuten",
          distance: "5 km",
          workoutDetails: {
            technicalData: { rpe: 2, trainingEffect: "Herstel" },
          },
        },
        {
          day: "Donderdag",
          type: "Threshold (T)",
          description: "Onderhoud van drempel.",
          intensity: "Matig",
          duration: "40 minuten",
          distance: "7 km",
          workoutDetails: {
            warmup: { duration: "10 min", distance: "2 km", description: "Inlopen" },
            mainBody: {
              duration: "15 min",
              distance: "2.5 km",
              targetPace: "05:35 min/km",
              description: "Licht T-tempo",
            },
            cooldown: { duration: "15 min", distance: "2.5 km", description: "Uitlopen" },
            technicalData: { rpe: 6, trainingEffect: "Onderhoud" },
          },
        },
        {
          day: "Zondag",
          type: "Easy (E)",
          description: "Ontspannen duurloop.",
          intensity: "Licht",
          duration: "40 minuten",
          distance: "6.5 km",
          workoutDetails: {
            technicalData: { rpe: 3, trainingEffect: "Basis" },
          },
        },
      ],
    },
    {
      weekNumber: 9,
      focus: "Fase 3: Repetitions (R) en Snelheid",
      weekSummary: {
        totalDistance: "22.5 km",
        totalDuration: "2 uur 10 min",
        trainingDays: 3,
      },
      days: [
        {
          day: "Dinsdag",
          type: "Easy (E)",
          description: "Rustige loop.",
          intensity: "Licht",
          duration: "45 minuten",
          distance: "7.5 km",
          workoutDetails: {
            technicalData: { rpe: 3, trainingEffect: "Basis" },
          },
        },
        {
          day: "Donderdag",
          type: "Repetition (R)",
          description: "Korte snelle intervallen.",
          intensity: "Maximaal",
          duration: "40 minuten",
          distance: "7 km",
          workoutDetails: {
            warmup: {
              duration: "15 min",
              distance: "2.5 km",
              description: "Inlopen + loopscholing",
            },
            interval: {
              reps: 8,
              durationPerRep: "1 min",
              distancePerRep: "0.25 km",
              targetPace: "04:40 min/km",
              recovery: "2 min rust",
            },
            cooldown: {
              duration: "9 min",
              distance: "2.5 km",
              description: "Heel rustig uitlopen",
            },
            technicalData: { rpe: 9, trainingEffect: "Anaerobe capaciteit" },
          },
        },
        {
          day: "Zaterdag",
          type: "Easy (E)",
          description: "Lange E-run.",
          intensity: "Licht",
          duration: "45 minuten",
          distance: "8 km",
          workoutDetails: {
            technicalData: { rpe: 4, trainingEffect: "Uithouding" },
          },
        },
      ],
    },
    {
      weekNumber: 10,
      focus: "Fase 3: Snelheidsuithoudingsvermogen",
      weekSummary: {
        totalDistance: "24 km",
        totalDuration: "2 uur 20 min",
        trainingDays: 3,
      },
      days: [
        {
          day: "Dinsdag",
          type: "Easy (E)",
          description: "Rustige duurloop.",
          intensity: "Licht",
          duration: "45 minuten",
          distance: "7.5 km",
          workoutDetails: {
            technicalData: { rpe: 3, trainingEffect: "Herstel" },
          },
        },
        {
          day: "Donderdag",
          type: "Interval (I)",
          description: "Peak VO2-max training.",
          intensity: "Maximaal",
          duration: "50 minuten",
          distance: "8.5 km",
          workoutDetails: {
            warmup: { duration: "15 min", distance: "2.5 km", description: "Grondig inlopen" },
            interval: {
              reps: 5,
              durationPerRep: "4 min",
              distancePerRep: "0.85 km",
              targetPace: "04:55 min/km",
              recovery: "3 min dribbel",
            },
            cooldown: { duration: "15 min", distance: "1.75 km", description: "Uitlopen" },
            technicalData: { rpe: 10, trainingEffect: "Piekconditie" },
          },
        },
        {
          day: "Zondag",
          type: "Easy (E)",
          description: "Lange loop.",
          intensity: "Licht",
          duration: "45 minuten",
          distance: "8 km",
          workoutDetails: {
            technicalData: { rpe: 4, trainingEffect: "Basis" },
          },
        },
      ],
    },
    {
      weekNumber: 11,
      focus: "Fase 3: Tapering",
      weekSummary: {
        totalDistance: "18.5 km",
        totalDuration: "1 uur 50 min",
        trainingDays: 3,
      },
      days: [
        {
          day: "Dinsdag",
          type: "Easy (E)",
          description: "Verminderen van volume.",
          intensity: "Zeer licht",
          duration: "35 minuten",
          distance: "6 km",
          workoutDetails: {
            technicalData: { rpe: 2, trainingEffect: "Energie sparen" },
          },
        },
        {
          day: "Donderdag",
          type: "Threshold (T)",
          description: "Scherpte behouden.",
          intensity: "Matig",
          duration: "40 minuten",
          distance: "7 km",
          workoutDetails: {
            warmup: { duration: "15 min", distance: "2.5 km", description: "Inlopen" },
            mainBody: {
              duration: "10 min",
              distance: "2 km",
              targetPace: "05:30 min/km",
              description: "Kort drempelblok",
            },
            cooldown: { duration: "15 min", distance: "2.5 km", description: "Uitlopen" },
            technicalData: { rpe: 5, trainingEffect: "Scherpte" },
          },
        },
        {
          day: "Zondag",
          type: "Easy (E)",
          description: "Korte losloop sessie.",
          intensity: "Licht",
          duration: "35 minuten",
          distance: "5.5 km",
          workoutDetails: {
            technicalData: { rpe: 3, trainingEffect: "Activatie" },
          },
        },
      ],
    },
    {
      weekNumber: 12,
      focus: "Fase 3: Race Week",
      weekSummary: {
        totalDistance: "15.5 km",
        totalDuration: "1 uur 25 min",
        trainingDays: 3,
      },
      days: [
        {
          day: "Dinsdag",
          type: "Easy (E)",
          description: "Heel kort loslopen.",
          intensity: "Zeer licht",
          duration: "25 minuten",
          distance: "4 km",
          workoutDetails: {
            technicalData: { rpe: 2, trainingEffect: "Herstel" },
          },
        },
        {
          day: "Donderdag",
          type: "Easy (E)",
          description: "Activatie met strides.",
          intensity: "Licht",
          duration: "20 minuten",
          distance: "3.5 km",
          workoutDetails: {
            strides: { count: 4, description: "15 sec race-pace / 45 sec rust" },
            technicalData: { rpe: 4, trainingEffect: "Neuromusculaire activatie" },
          },
        },
        {
          day: "Zaterdag",
          type: "Race",
          description: "DOEL: 5KM wedstrijd - Sub 25 minuten.",
          intensity: "Maximaal",
          duration: "40 minuten",
          distance: "8 km",
          workoutDetails: {
            warmup: { duration: "10 min", distance: "1.5 km", description: "Inlopen" },
            mainBody: {
              duration: "25 min",
              distance: "5 km",
              targetPace: "05:00 min/km",
              description: "Race tempo!",
            },
            cooldown: {
              duration: "5 min",
              distance: "1.5 km",
              description: "Wandelen/uitdribbelen",
            },
            technicalData: { rpe: 10, trainingEffect: "Maximale prestatie" },
          },
        },
      ],
    },
  ],
}
