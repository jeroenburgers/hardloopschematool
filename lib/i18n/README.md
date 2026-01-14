# Internationalisatie (i18n) Systeem

Dit project gebruikt een type-safe i18n systeem met runtime validatie.

## Ondersteunde Talen

- 🇳🇱 Nederlands (nl) - Standaard
- 🇬🇧 Engels (en)
- 🇩🇪 Duits (de)

## Hoe te Gebruiken

### In een Component

```tsx
import { useLanguage } from "@/components/language-provider"

export function MyComponent() {
  const { t, locale, setLocale } = useLanguage()

  return (
    <div>
      <h1>{t("common.appName")}</h1>
      <p>{t("common.description")}</p>
    </div>
  )
}
```

### Vertalingen Toevoegen

1. Voeg de nieuwe key toe aan `/locales/nl.json` (Nederlands is de bron)
2. Voeg dezelfde key toe aan `/locales/en.json`
3. Voeg dezelfde key toe aan `/locales/de.json`

Voorbeeld:

```json
// nl.json
{
  "common": {
    "appName": "Hardloopschematool",
    "newKey": "Nieuwe vertaling"
  }
}

// en.json
{
  "common": {
    "appName": "Running Schedule Tool",
    "newKey": "New translation"
  }
}

// de.json
{
  "common": {
    "appName": "Laufplan-Tool",
    "newKey": "Neue Übersetzung"
  }
}
```

## Type Safety

Het systeem biedt volledige TypeScript type-safety:

- ✅ Autocomplete voor vertaalsleutels
- ✅ Compileer-tijd fouten bij niet-bestaande keys
- ✅ Type-safe nested keys (bijv. `"common.appName"`)

## Runtime Validatie

Bij development wordt automatisch gevalideerd dat:

1. **Alle talen dezelfde structuur hebben** - geen ontbrekende of extra keys
2. **Alle keys naar strings verwijzen** - geen objecten als eindwaarde
3. **Geneste structuren consistent zijn** - dezelfde hiërarchie in alle talen

### Validatie Fouten

Als een taal ontbrekende of extra keys heeft, krijg je een console error:

```
Translation validation errors for locale "en":
  - Missing keys in en: common.newFeature
```

De app zal een error gooien in development mode om je te waarschuwen.

## Taal Selectie

Gebruikers kunnen de taal wijzigen via de `LanguageToggle` component in de header. De geselecteerde taal wordt opgeslagen in localStorage.

## Standaard Taal per Build

Je kunt verschillende builds maken met verschillende standaard talen via de `NEXT_PUBLIC_DEFAULT_LOCALE` environment variable.

### Lokale Development

Maak een `.env.local` bestand (kopieer van `.env.example`):

```bash
# .env.local
NEXT_PUBLIC_DEFAULT_LOCALE=nl  # of en, of de
```

Of gebruik de specifieke dev scripts:

```bash
pnpm dev       # Gebruikt waarde uit .env.local (standaard: nl)
pnpm dev:nl    # Start dev server met Nederlands als standaard
pnpm dev:en    # Start dev server met Engels als standaard
pnpm dev:de    # Start dev server met Duits als standaard
```

### Production Builds

Maak verschillende builds voor verschillende talen:

```bash
pnpm build:nl  # Build met Nederlands als standaard taal
pnpm build:en  # Build met Engels als standaard taal
pnpm build:de  # Build met Duits als standaard taal
```

### Deployment Scenario's

**Scenario 1: Aparte domeinen per taal**

```bash
# hardloopschematool.nl
NEXT_PUBLIC_DEFAULT_LOCALE=nl pnpm build

# runningscheduletool.com
NEXT_PUBLIC_DEFAULT_LOCALE=en pnpm build

# laufplantool.de
NEXT_PUBLIC_DEFAULT_LOCALE=de pnpm build
```

**Scenario 2: Vercel/Platform environment variables**

```
# In je deployment platform (Vercel, etc.):
# Productie environment: NEXT_PUBLIC_DEFAULT_LOCALE=nl
# Preview branch NL: NEXT_PUBLIC_DEFAULT_LOCALE=nl
# Preview branch EN: NEXT_PUBLIC_DEFAULT_LOCALE=en
# Preview branch DE: NEXT_PUBLIC_DEFAULT_LOCALE=de
```

**Scenario 3: CI/CD Pipeline**

```yaml
# .github/workflows/deploy.yml
- name: Build NL version
  run: pnpm build:nl

- name: Build EN version
  run: pnpm build:en

- name: Build DE version
  run: pnpm build:de
```

### Hoe het werkt

1. De `NEXT_PUBLIC_DEFAULT_LOCALE` wordt gelezen bij build time
2. Als een gebruiker de app voor het eerst bezoekt, krijgt deze de standaard taal
3. Als de gebruiker de taal wijzigt, wordt dit opgeslagen in localStorage
4. Bij volgende bezoeken wordt de opgeslagen taal gebruikt (tenzij localStorage leeg is)

## Implementatie Details

- **Type definitie**: `lib/i18n/types.ts` - bevat alle types
- **Validatie**: `lib/i18n/validate.ts` - runtime checks
- **Configuratie**: `lib/i18n/config.ts` - default locale configuratie
- **Context**: `components/language-provider.tsx` - React Context provider
- **Toggle**: `components/language-toggle.tsx` - UI component voor taal selectie

## Environment Variables

| Variable                     | Beschrijving                          | Standaard | Opties           |
| ---------------------------- | ------------------------------------- | --------- | ---------------- |
| `NEXT_PUBLIC_DEFAULT_LOCALE` | Standaard taal voor nieuwe gebruikers | `nl`      | `nl`, `en`, `de` |
