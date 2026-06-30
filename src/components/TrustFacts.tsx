import type { Locale } from "@/lib/i18n";

// Visible product-facts block. Keeps the page's human-readable claims in sync
// with the SoftwareApplication JSON-LD (src/lib/structured-data.ts) and gives
// crawlers / LLMs concrete, extractable trust signals: free, no signup, no
// watermark, client-side, multi-device, ES/PT.

type Fact = { title: string; description: string };

const FACTS: Record<Locale, Fact[]> = {
  es: [
    { title: "100% gratis", description: "Sin suscripción, sin pruebas que caducan ni costos ocultos." },
    { title: "Sin registro", description: "No pedimos cuenta, email ni tarjeta para firmar." },
    { title: "Sin marca de agua", description: "Tu PDF queda limpio y profesional, sin logos." },
    { title: "Tus archivos no se suben", description: "Todo se procesa en tu navegador; el PDF nunca sale de tu dispositivo." },
    { title: "Celular y computadora", description: "Funciona en iPhone, Android, Windows y Mac, sin instalar apps." },
    { title: "Español y portugués", description: "Pensado para los trámites de América Latina." },
  ],
  pt: [
    { title: "100% grátis", description: "Sem assinatura, sem testes que expiram nem custos ocultos." },
    { title: "Sem cadastro", description: "Não pedimos conta, email nem cartão para assinar." },
    { title: "Sem marca d'água", description: "Seu PDF fica limpo e profissional, sem logos." },
    { title: "Seus arquivos não são enviados", description: "Tudo é processado no navegador; o PDF nunca sai do seu dispositivo." },
    { title: "Celular e computador", description: "Funciona no iPhone, Android, Windows e Mac, sem instalar apps." },
    { title: "Espanhol e português", description: "Feito para os trâmites da América Latina." },
  ],
};

export function TrustFacts({ lang }: { lang: Locale }) {
  const facts = FACTS[lang];
  const heading =
    lang === "es" ? "Por qué confiar en Firmalo" : "Por que confiar no Firmalo";

  return (
    <section className="py-12 sm:py-16 bg-surface-alt">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-text">
          {heading}
        </h2>
        <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {facts.map((fact, i) => (
            <li
              key={i}
              className="flex items-start gap-3 p-5 bg-surface rounded-xl border border-border"
            >
              <svg
                className="w-5 h-5 text-success shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <div>
                <p className="text-sm font-semibold text-text">{fact.title}</p>
                <p className="mt-1 text-sm text-text-secondary leading-relaxed">
                  {fact.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
