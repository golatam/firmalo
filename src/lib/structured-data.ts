import type { Locale } from "@/lib/i18n";

// Single source of truth for the Firmalo app schema, shared by the homepage and
// every SEO landing page so the JSON-LD never drifts or duplicates. Modeled as
// SoftwareApplication + WebApplication (WebApplication is a SoftwareApplication
// subtype, so listing both is valid and maximally explicit for crawlers/LLMs).
//
// Every field below mirrors content that is actually visible on the page
// (TrustFacts, Security, Benefits). No reviews, ratings, or sameAs are emitted
// here: those require real external corroboration we don't have yet.

const BASE_URL = "https://firmalo.io";

const APP_DESCRIPTION: Record<Locale, string> = {
  es: "Firmalo es una herramienta gratuita para firmar documentos PDF online. Todo el procesamiento ocurre en tu navegador: tus archivos nunca se suben a un servidor. Sin registro, sin marca de agua y sin límite de documentos.",
  pt: "O Firmalo é uma ferramenta gratuita para assinar documentos PDF online. Todo o processamento acontece no seu navegador: seus arquivos nunca são enviados para um servidor. Sem cadastro, sem marca d'água e sem limite de documentos.",
};

const FEATURE_LIST: Record<Locale, string[]> = {
  es: [
    "Firmar PDF online sin registro",
    "Crear firma dibujando, escribiendo o subiendo una imagen",
    "Sin marca de agua en el documento firmado",
    "Procesamiento 100% en el navegador: los archivos no se suben a ningún servidor",
    "Funciona en celular y computadora (iPhone, Android, Windows, Mac)",
    "Gratis y sin límite de documentos",
  ],
  pt: [
    "Assinar PDF online sem cadastro",
    "Criar assinatura desenhando, digitando ou enviando uma imagem",
    "Sem marca d'água no documento assinado",
    "Processamento 100% no navegador: os arquivos não são enviados para nenhum servidor",
    "Funciona no celular e no computador (iPhone, Android, Windows, Mac)",
    "Grátis e sem limite de documentos",
  ],
};

/**
 * SoftwareApplication / WebApplication JSON-LD for Firmalo, localized.
 * Use on any page where Firmalo itself is the subject (home + SEO pages).
 */
export function softwareApplicationJsonLd(lang: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": ["SoftwareApplication", "WebApplication"],
    name: "Firmalo",
    url: `${BASE_URL}/${lang}`,
    description: APP_DESCRIPTION[lang],
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web browser (iOS, Android, Windows, macOS, Linux)",
    browserRequirements: "Requires JavaScript. Runs in any modern web browser.",
    inLanguage: lang === "pt" ? "pt-BR" : "es",
    availableLanguage: ["es", "pt-BR"],
    isAccessibleForFree: true,
    // Free tool, no paid tier. Mirrors the visible "100% gratis" claim.
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    // Privacy / security facts, also stated visibly in the Security + TrustFacts blocks.
    featureList: FEATURE_LIST[lang],
  };
}
