import type { Metadata } from "next"
import type { Locale } from "../i18n/types"

/**
 * Interface for metadata content
 */
export interface MetadataContent {
  title: string
  description: string
  url: string
  appName: string
  locale: Locale
  type?: "website" | "article"
}

/**
 * Interface for building metadata
 */
export interface IMetadataBuilder {
  build(content: MetadataContent): Metadata
}

/**
 * Metadata builder implementing common metadata structure
 */
export class MetadataBuilder implements IMetadataBuilder {
  build(content: MetadataContent): Metadata {
    return {
      title: content.title,
      description: content.description,
      openGraph: this.buildOpenGraph(content),
      twitter: this.buildTwitter(content),
      alternates: this.buildAlternates(content),
      robots: this.buildRobots(),
    }
  }

  protected buildOpenGraph(content: MetadataContent): Metadata["openGraph"] {
    return {
      title: content.title,
      description: content.description,
      url: content.url,
      siteName: content.appName,
      locale: this.getOpenGraphLocale(content.locale),
      type: content.type || "website",
    }
  }

  protected buildTwitter(content: MetadataContent): Metadata["twitter"] {
    return {
      card: "summary_large_image",
      title: content.title,
      description: content.description,
    }
  }

  protected buildAlternates(content: MetadataContent): Metadata["alternates"] {
    return {
      canonical: content.url,
    }
  }

  protected buildRobots(): Metadata["robots"] {
    return {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    }
  }

  protected getOpenGraphLocale(locale: Locale): string {
    const openGraphLocaleMap: Record<Locale, string> = {
      nl: "nl_NL",
      en: "en_US",
      de: "de_DE",
    }
    return openGraphLocaleMap[locale]
  }
}
