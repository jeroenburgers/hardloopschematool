# Analytics Setup

Deze applicatie heeft ingebouwde analytics tracking voor de schedule tool. Je kunt zien:

- Hoe ver bezoekers komen in de tool (welke stap bereiken ze)
- Hoeveel mensen de preview modal zien
- Of bezoekers de hele tool voltooien

## Development Mode

In development mode worden alle events gelogd naar de browser console. Je ziet ze als:

```
[Analytics] { action: "step_reached", category: "schedule_tool", label: "1_Doel", value: 1 }
```

## Google Analytics 4 Setup (Optioneel)

Om Google Analytics 4 te gebruiken:

1. Voeg het Google Analytics script toe aan `app/layout.tsx`:

```tsx
import Script from "next/script"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
```

2. Voeg je Google Analytics Measurement ID toe aan `.env.local`:

```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## Tracked Events

### `step_reached`

Wordt getrackt wanneer een gebruiker een stap bereikt.

- **Category**: `schedule_tool`
- **Label**: `{stepNumber}_{stepName}` (bijv. `1_Doel`, `5_Prestaties_skipped`)
- **Value**: Het stapnummer (1-7)

### `preview_modal_opened`

Wordt getrackt wanneer de preview modal wordt geopend.

- **Category**: `schedule_tool`
- **Label**: `preview_modal`

### `preview_modal_closed`

Wordt getrackt wanneer de preview modal wordt gesloten.

- **Category**: `schedule_tool`
- **Label**: `button_primary`, `button_secondary`, of `backdrop`

### `form_completed`

Wordt getrackt wanneer een gebruiker de checkout stap bereikt (stap 7).

- **Category**: `schedule_tool`
- **Label**: `checkout_reached`

### `tool_started`

Wordt getrackt wanneer de tool wordt gestart.

- **Category**: `schedule_tool`
- **Label**: Het initial goal (bijv. `5km`, `10km`) of `no_initial_goal`

## Google Analytics 4 Queries

In Google Analytics 4 kun je deze queries gebruiken:

### Hoeveel bezoekers bereiken elke stap?

```
Event name: step_reached
Group by: event_label
```

### Hoeveel bezoekers zien de preview modal?

```
Event name: preview_modal_opened
```

### Conversie rate (checkout bereikt / tool gestart)

```
Event name: form_completed / tool_started
```

### Drop-off per stap

```
Event name: step_reached
Filter: event_label contains "1_Doel" (of andere stap)
Compare with: event_label contains "2_Niveau"
```
