import Link from "next/link";
import type { Locale } from "@/lib/i18n";

// In-content contextual links from the homepage (the site's highest-authority
// page) to cluster landing pages. Carries keyword-rich anchors and passes
// authority down to pages still "Discovered - currently not indexed".
function L({ lang, slug, children }: { lang: Locale; slug: string; children: string }) {
  return (
    <Link
      href={`/${lang}/${slug}`}
      className="text-primary underline underline-offset-2 hover:no-underline"
    >
      {children}
    </Link>
  );
}

export function HomeSeoIntro({ lang }: { lang: Locale }) {
  return (
    <section className="py-12 sm:py-16 bg-surface">
      <div className="max-w-3xl mx-auto px-4 space-y-5">
        {lang === "es" ? (
          <>
            <h2 className="text-xl sm:text-2xl font-bold text-text">
              Firma cualquier PDF online, gratis y sin registro
            </h2>
            <p className="text-text-secondary leading-relaxed">
              Firmalo es la forma más rápida de{" "}
              <L lang={lang} slug="firmar-pdf-online-gratis">firmar un PDF online gratis</L>{" "}
              desde tu navegador. No tienes que instalar nada ni{" "}
              <L lang={lang} slug="firmar-pdf-sin-registro">crear una cuenta</L>: subes tu
              documento, colocas tu firma y lo descargas en segundos. Tu archivo se procesa
              localmente y nunca se sube a un servidor, así que mantienes el control total
              de tus documentos.
            </p>
            <p className="text-text-secondary leading-relaxed">
              Puedes{" "}
              <L lang={lang} slug="crear-firma-online">crear tu firma online</L>{" "}
              de tres formas —dibujándola, escribiéndola o subiendo una imagen— y luego{" "}
              <L lang={lang} slug="anadir-firma-a-pdf">añadirla a tu PDF</L>{" "}
              en la posición exacta que necesites. El resultado queda{" "}
              <L lang={lang} slug="firmar-pdf-sin-marca-de-agua">limpio y sin marca de agua</L>,
              listo para enviar. Y si estás fuera de casa, también puedes{" "}
              <L lang={lang} slug="firmar-pdf-desde-celular">firmar desde el celular</L>,
              sin descargar ninguna app.
            </p>
            <p className="text-text-secondary leading-relaxed">
              Es ideal para los trámites del día a día: desde{" "}
              <L lang={lang} slug="firmar-contrato-alquiler-pdf">firmar un contrato de alquiler</L>{" "}
              hasta los{" "}
              <L lang={lang} slug="firmar-pdf-para-visa">documentos para tu visa</L>. Y como
              alternativa gratuita a las herramientas de pago, funciona como reemplazo de{" "}
              <L lang={lang} slug="alternativa-smallpdf-firmar-pdf">SmallPDF</L>{" "}o de{" "}
              <L lang={lang} slug="alternativa-docusign-gratis">DocuSign</L>{" "}
              para uso personal.
            </p>
          </>
        ) : (
          <>
            <h2 className="text-xl sm:text-2xl font-bold text-text">
              Assine qualquer PDF online, grátis e sem cadastro
            </h2>
            <p className="text-text-secondary leading-relaxed">
              O Firmalo é a forma mais rápida de{" "}
              <L lang={lang} slug="assinar-pdf-online-gratis">assinar um PDF online grátis</L>{" "}
              direto do navegador. Você não precisa instalar nada nem{" "}
              <L lang={lang} slug="assinar-pdf-sem-cadastro">criar uma conta</L>: envia seu
              documento, coloca sua assinatura e baixa em segundos. Seu arquivo é processado
              localmente e nunca é enviado para um servidor, então você mantém o controle
              total dos seus documentos.
            </p>
            <p className="text-text-secondary leading-relaxed">
              Você pode{" "}
              <L lang={lang} slug="criar-assinatura-online">criar sua assinatura online</L>{" "}
              de três formas —desenhando, digitando ou enviando uma imagem— e depois{" "}
              <L lang={lang} slug="adicionar-assinatura-no-pdf">adicioná-la ao seu PDF</L>{" "}
              na posição exata que precisar. O resultado fica{" "}
              <L lang={lang} slug="assinar-pdf-sem-marca-dagua">limpo e sem marca d'água</L>,
              pronto para enviar. E se você estiver na rua, também dá para{" "}
              <L lang={lang} slug="assinar-pdf-no-celular">assinar pelo celular</L>,
              sem baixar nenhum app.
            </p>
            <p className="text-text-secondary leading-relaxed">
              É ideal para os trâmites do dia a dia: desde{" "}
              <L lang={lang} slug="assinar-contrato-pdf-online">assinar um contrato</L>{" "}
              até os{" "}
              <L lang={lang} slug="assinar-pdf-para-visto">documentos para o seu visto</L>. E
              como alternativa gratuita às ferramentas pagas, funciona como substituto do{" "}
              <L lang={lang} slug="alternativa-smallpdf-assinar-pdf">SmallPDF</L>{" "}ou do{" "}
              <L lang={lang} slug="alternativa-docusign-gratis">DocuSign</L>{" "}
              para uso pessoal.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
