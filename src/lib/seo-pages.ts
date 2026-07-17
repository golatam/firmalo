export interface SeoPageData {
  slug: string;
  lang: "es" | "pt";
  title: string;
  metaDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  sections: {
    title: string;
    content: string;
    bulletPoints?: string[];
  }[];
  faq: { question: string; answer: string }[];
  relatedSlugs: string[];
  /** Above-the-fold CTA + "3 steps" block, shown only when set (action-landing pages). */
  landingCta?: {
    primaryLabel: string;
    secondaryLabel: string;
    steps: { title: string; description: string }[];
  };
  /** Inline CTA cards rendered inside SeoContent, right after the given section index. */
  ctaBlocks?: { afterSectionIndex: number; heading: string; body: string; label: string }[];
  // Optional head-to-head table, used by the "alternativa" pages to compare
  // Firmalo against a paid/cloud tool. Rendered by <ComparisonTable />.
  comparison?: {
    competitor: string;
    caption?: string;
    rows: { feature: string; firmalo: string; competitor: string }[];
  };
}

// ES slug <-> PT slug pairing (same index = same topic)
const ES_SLUGS = [
  "firmar-pdf-online-gratis",
  "firmar-pdf-sin-registro",
  "firmar-pdf-sin-marca-de-agua",
  "anadir-firma-a-pdf",
  "crear-firma-online",
  "firmar-pdf-desde-celular",
  "firmar-contrato-alquiler-pdf",
  "firmar-pdf-para-visa",
  "alternativa-smallpdf-firmar-pdf",
  "alternativa-docusign-gratis",
  "firmar-pdf-sin-imprimir",
  "firmar-pdf-privado-sin-subir-archivos",
  "firmar-contrato-trabajo-pdf",
  "firmar-autorizacion-pdf",
];

const PT_SLUGS = [
  "assinar-pdf-online-gratis",
  "assinar-pdf-sem-cadastro",
  "assinar-pdf-sem-marca-dagua",
  "adicionar-assinatura-no-pdf",
  "criar-assinatura-online",
  "assinar-pdf-no-celular",
  "assinar-contrato-pdf-online",
  "assinar-pdf-para-visto",
  "alternativa-smallpdf-assinar-pdf",
  "alternativa-docusign-gratis",
  "assinar-pdf-sem-imprimir",
  "assinar-pdf-privado-sem-upload",
  "assinar-contrato-trabalho-pdf",
  "assinar-autorizacao-pdf",
];

function getPairedSlug(lang: string, slug: string): string | null {
  const sourceList = lang === "es" ? ES_SLUGS : PT_SLUGS;
  const targetList = lang === "es" ? PT_SLUGS : ES_SLUGS;
  const idx = sourceList.indexOf(slug);
  return idx >= 0 ? targetList[idx] : null;
}

export function getAlternateSlug(lang: string, slug: string): { lang: string; slug: string } | null {
  const paired = getPairedSlug(lang, slug);
  if (!paired) return null;
  return { lang: lang === "es" ? "pt" : "es", slug: paired };
}

// ─── Spanish pages ──────────────────────────────────────────────

const esPages: SeoPageData[] = [
  {
    slug: "firmar-pdf-online-gratis",
    lang: "es",
    title: "Firmar PDF online gratis — Sin registro ni marca de agua | Firmalo",
    metaDescription: "Firma tu PDF online gratis en segundos. Sin registro, sin marca de agua, sin subir archivos a servidores. 100% privado y seguro. Funciona en celular y PC.",
    heroTitle: "Firma tu PDF online gratis",
    heroSubtitle: "La herramienta más simple para firmar documentos PDF. Sin registro, sin marca de agua, sin límites. Tu archivo nunca sale de tu dispositivo.",
    sections: [
      {
        title: "¿Cómo firmar un PDF online gratis?",
        content: "Firmar un PDF en línea nunca fue tan fácil. Con Firmalo, solo necesitas tres pasos: sube tu PDF, crea tu firma (dibujando, escribiendo o subiendo una imagen) y descarga el documento firmado al instante. No necesitas instalar ningún programa ni crear una cuenta.",
        bulletPoints: [
          "Sube tu archivo PDF (máximo 50 MB)",
          "Crea tu firma: dibuja, escribe o sube una imagen",
          "Posiciona la firma donde la necesites",
          "Descarga tu PDF firmado en segundos",
        ],
      },
      {
        title: "Tres formas de crear tu firma",
        content: "Firmalo te deja firmar como prefieras, sin complicaciones. Cada método produce una firma nítida que se incrusta dentro del PDF, no como una capa que se pueda borrar después.",
        bulletPoints: [
          "Dibujar: traza tu firma con el dedo en el celular o con el mouse en la computadora",
          "Escribir: escribe tu nombre y elige entre varios estilos de letra manuscrita",
          "Subir imagen: usa una foto de tu firma en papel (PNG o JPG con fondo transparente)",
        ],
      },
      {
        title: "¿Por qué elegir Firmalo para firmar PDF?",
        content: "A diferencia de otras herramientas online, Firmalo procesa tu documento directamente en tu navegador. Esto significa que tu archivo nunca se sube a ningún servidor — tu privacidad está garantizada. No hay límite de documentos, no hay marcas de agua y no te pedimos correo ni tarjeta. La mayoría de las páginas «gratis» te dejan firmar uno o dos PDF y luego te cobran o estampan su logo; Firmalo es gratis de verdad.",
      },
      {
        title: "¿Es legal firmar un PDF de forma electrónica?",
        content: "Sí. En la mayoría de los países de América Latina y España, una firma electrónica simple como la que creas con Firmalo tiene validez legal para contratos, autorizaciones, recibos y trámites cotidianos. En México la respalda el Código de Comercio, en Argentina la Ley 25.506, en Colombia la Ley 527 y en España el Reglamento eIDAS. Para actos que exigen firma electrónica avanzada o certificada (escrituras, ciertos trámites ante notario) consulta los requisitos específicos de tu país, pero para el día a día tu PDF firmado es perfectamente válido.",
      },
      {
        title: "Funciona en cualquier dispositivo",
        content: "Firmalo está diseñado para funcionar perfectamente en celulares, tablets y computadoras. No importa si usas iPhone, Android, Windows o Mac — simplemente abre tu navegador y firma tu PDF. La interfaz táctil está optimizada para que dibujar tu firma con el dedo sea natural y preciso, y puedes mover, agrandar o reducir la firma antes de descargar el documento.",
      },
      {
        title: "Firmar PDF gratis vs. herramientas de pago",
        content: "No necesitas pagar una suscripción de DocuSign, Adobe o Smallpdf para firmar un documento. Esas plataformas son útiles para flujos empresariales con múltiples firmantes, pero para firmar tú mismo un contrato, un formulario o una carta resultan caras y lentas. Firmalo cubre ese caso en segundos, sin cuenta y sin enviar tu archivo a la nube.",
      },
    ],
    faq: [
      { question: "¿Puedo firmar un PDF gratis sin crear cuenta?", answer: "Sí. Firmalo no requiere registro ni cuenta de ningún tipo. Simplemente abre la página, sube tu PDF y firma." },
      { question: "¿Mi PDF firmado tendrá marca de agua?", answer: "No. Tu documento firmado queda completamente limpio y profesional, sin logos ni marcas de agua." },
      { question: "¿Es seguro firmar mi PDF aquí?", answer: "Totalmente. Tu archivo se procesa en tu navegador y nunca se sube a ningún servidor. Nadie tiene acceso a tu documento." },
      { question: "¿Funciona en celular?", answer: "Sí. Firmalo funciona en cualquier navegador moderno, tanto en celular como en computadora." },
      { question: "¿La firma electrónica de Firmalo tiene validez legal?", answer: "Para la mayoría de contratos y trámites cotidianos, sí. Una firma electrónica simple es válida en casi toda América Latina y España. Para trámites que exigen firma certificada, verifica los requisitos de tu país." },
      { question: "¿Hay un límite de documentos que puedo firmar?", answer: "No. Puedes firmar tantos PDF como necesites, sin límites diarios ni mensuales y sin costo." },
      { question: "¿Puedo añadir más de una firma al mismo PDF?", answer: "Sí. Puedes colocar varias firmas en distintas páginas o posiciones del mismo documento antes de descargarlo." },
      { question: "¿En qué formato se descarga el documento firmado?", answer: "Se descarga como un archivo PDF estándar, con tu firma incrustada en el documento, listo para enviar por correo o imprimir." },
    ],
    relatedSlugs: ["firmar-pdf-sin-registro", "firmar-pdf-sin-marca-de-agua", "firmar-pdf-desde-celular"],
  },
  {
    slug: "firmar-pdf-sin-registro",
    lang: "es",
    title: "Firmar PDF sin registro gratis — sin cuenta ni email | Firmalo",
    metaDescription: "Firma tu PDF sin necesidad de crear una cuenta ni proporcionar tu email. Herramienta 100% privada que funciona directamente en tu navegador.",
    heroTitle: "Firmar PDF online gratis sin registro",
    heroSubtitle: "Firma y descarga tu PDF en segundos. Sin cuenta, sin email y sin subir tu archivo a un servidor.",
    landingCta: {
      primaryLabel: "Firmar mi PDF ahora",
      secondaryLabel: "Cómo funciona",
      steps: [
        { title: "1. Sube tu PDF", description: "Arrástralo o selecciónalo. No se sube a ningún servidor." },
        { title: "2. Firma", description: "Dibuja, escribe o sube una imagen de tu firma." },
        { title: "3. Descarga", description: "Tu PDF firmado queda listo al instante." },
      ],
    },
    ctaBlocks: [
      {
        afterSectionIndex: 1,
        heading: "Firma tu PDF ahora",
        body: "Sin cuenta, sin email y sin subir tu archivo a un servidor.",
        label: "Firmar mi PDF ahora",
      },
      {
        afterSectionIndex: 4,
        heading: "¿Listo para firmar?",
        body: "Sube tu PDF, firma y descarga en segundos.",
        label: "Firmar mi PDF ahora",
      },
    ],
    sections: [
      {
        title: "¿Por qué firmar sin registro es mejor?",
        content: "Muchas herramientas para firmar PDF te obligan a crear una cuenta, verificar tu email y aceptar términos extensos antes de poder firmar un simple documento. Con Firmalo, eliminamos todas esas barreras. Tu tiempo es valioso — no lo pierdas llenando formularios.",
        bulletPoints: [
          "Sin formularios de registro",
          "Sin verificación de email",
          "Sin datos personales requeridos",
          "Listo para firmar en segundos",
        ],
      },
      {
        title: "Privacidad real, no solo promesas",
        content: "Cuando una herramienta te pide crear una cuenta, almacena tus datos y puede acceder a tus documentos. Firmalo funciona diferente: todo el procesamiento ocurre en tu navegador. No tenemos servidores que almacenen archivos, no recopilamos datos y no existe la posibilidad técnica de acceder a tus documentos.",
      },
      {
        title: "Ideal para documentos sensibles",
        content: "Contratos laborales, documentos médicos, acuerdos legales — cuando firmas documentos sensibles, la privacidad no es opcional. Al no requerir registro y procesar todo localmente, Firmalo es la opción más segura para firmar documentos confidenciales.",
      },
      {
        title: "Cómo firmar sin cuenta en tres pasos",
        content: "Firmar sin registrarte no significa renunciar a nada: tienes la herramienta completa desde el primer segundo. El proceso es idéntico en celular y computadora.",
        bulletPoints: [
          "Abre Firmalo y arrastra tu PDF (no se sube a ningún servidor)",
          "Dibuja, escribe o sube tu firma y colócala donde la necesites",
          "Descarga el PDF firmado al instante, sin pasar por ningún correo de confirmación",
        ],
      },
      {
        title: "Una firma sin registro, ¿es válida legalmente?",
        content: "Sí. La validez legal de una firma electrónica no depende de que te registres en una plataforma, sino de que exista consentimiento y se pueda atribuir la firma a una persona. Una firma electrónica simple es válida para la mayoría de contratos y trámites cotidianos en América Latina y España. Registrarte en un servicio no añade valor jurídico — solo añade fricción y entrega tus datos a un tercero.",
      },
    ],
    faq: [
      { question: "¿Realmente no necesito crear una cuenta?", answer: "Correcto. Firmalo funciona sin ningún tipo de registro. No te pedimos email, nombre ni contraseña." },
      { question: "¿Cómo gana dinero Firmalo si es gratis?", answer: "Firmalo es un proyecto orientado a la comunidad latinoamericana. No monetizamos tus datos ni tu actividad." },
      { question: "¿Mis documentos quedan almacenados en algún servidor?", answer: "No. Todo se procesa en tu navegador. Cuando cierras la página, no queda ningún rastro de tu documento." },
      { question: "¿Firmar sin registro es seguro?", answer: "Sí, es incluso más seguro. Al no haber cuenta ni servidor que almacene tu documento, no existe ningún punto donde tus datos puedan filtrarse o ser hackeados." },
      { question: "¿Una firma hecha sin cuenta tiene validez legal?", answer: "Sí. La validez de una firma electrónica no depende del registro en una plataforma, sino del consentimiento. Para la mayoría de contratos y trámites es perfectamente válida." },
      { question: "¿Puedo usar Firmalo sin registro tantas veces como quiera?", answer: "Sí. No hay límite de uso ni de documentos, y nunca se te pedirá crear una cuenta." },
    ],
    relatedSlugs: ["firmar-pdf-privado-sin-subir-archivos", "firmar-pdf-online-gratis", "firmar-pdf-sin-marca-de-agua"],
  },
  {
    slug: "firmar-pdf-sin-marca-de-agua",
    lang: "es",
    title: "Firmar PDF sin marca de agua — 100% limpio y profesional | Firmalo",
    metaDescription: "Firma tu PDF sin que aparezcan marcas de agua ni logos. Tu documento queda limpio y profesional. Gratis, sin registro y sin límites.",
    heroTitle: "Firma tu PDF sin marca de agua",
    heroSubtitle: "Tu documento firmado queda limpio y profesional. Sin logos, sin textos superpuestos, sin marcas de ningún tipo.",
    ctaBlocks: [
      {
        afterSectionIndex: 4,
        heading: "Firma tu PDF sin marca de agua",
        body: "Prueba Firmalo ahora: tu documento queda limpio, sin logos ni marcas, listo para enviar.",
        label: "Firmar mi PDF ahora",
      },
    ],
    sections: [
      {
        title: "El problema de las marcas de agua",
        content: "La mayoría de herramientas gratuitas para firmar PDF agregan una marca de agua visible al documento — un logo, un texto o una marca que arruina la presentación profesional. Esto es inaceptable cuando envías contratos, propuestas o documentos oficiales.",
      },
      {
        title: "Con Firmalo, tu PDF queda impecable",
        content: "Firmalo nunca agrega marcas de agua, logos ni textos adicionales a tu documento. Lo que descargas es exactamente tu PDF original con tu firma añadida — nada más, nada menos. Esto aplica tanto para la versión gratuita como para cualquier uso, sin importar cuántos documentos firmes.",
        bulletPoints: [
          "Cero marcas de agua en cualquier documento",
          "Sin logos ni branding superpuestos",
          "Sin límite de documentos firmados",
          "Calidad profesional siempre",
        ],
      },
      {
        title: "Comparación con otras herramientas",
        content: "Herramientas como SmallPDF, iLovePDF o Adobe limitan sus versiones gratuitas con marcas de agua o restringen el número de documentos. Firmalo ofrece la experiencia completa sin restricciones, porque tu documento se procesa localmente — no necesitamos servidores costosos.",
      },
      {
        title: "Por qué una marca de agua arruina tu documento",
        content: "Un contrato, una factura o una propuesta con el logo de una herramienta gratuita encima transmite descuido y poca profesionalidad ante la otra parte. Peor aún, algunas marcas de agua se colocan sobre el texto y dificultan la lectura. Cuando envías un documento firmado, lo único que debe verse es tu contenido y tu firma — nada de publicidad ajena.",
      },
      {
        title: "Documento limpio en cualquier dispositivo",
        content: "Da igual si firmas desde el celular camino al trabajo o desde la computadora en la oficina: el resultado es siempre un PDF limpio, sin marcas ni compresión. Puedes firmar, revisar el resultado y, si algo no te convence, repetir el proceso las veces que necesites sin que aparezca ninguna marca.",
        bulletPoints: [
          "Mismo resultado profesional en iPhone, Android, Windows y Mac",
          "Sin marca de agua aunque firmes decenas de documentos",
          "El PDF conserva su resolución y formato originales",
        ],
      },
    ],
    faq: [
      { question: "¿Firmalo agrega algún tipo de marca a mi PDF?", answer: "No. Tu PDF firmado es exactamente igual al original, solo con tu firma añadida. No agregamos marcas de agua, logos ni textos." },
      { question: "¿Hay un límite de documentos que puedo firmar?", answer: "No. Puedes firmar todos los documentos que necesites, sin límites ni restricciones." },
      { question: "¿El PDF firmado mantiene la misma calidad?", answer: "Sí. No comprimimos ni alteramos la calidad de tu documento. Solo añadimos tu firma en la posición que elijas." },
      { question: "¿Por qué otras herramientas gratuitas ponen marca de agua?", answer: "Suelen usarla como publicidad o para empujarte a pagar la versión de pago. Firmalo no necesita hacerlo porque procesa todo en tu navegador, sin costos de servidor." },
      { question: "¿Tendré que pagar para quitar la marca de agua?", answer: "No. En Firmalo nunca hay marca de agua, así que no hay nada que pagar para quitarla. Es gratis y limpio desde el primer documento." },
    ],
    relatedSlugs: ["firmar-pdf-online-gratis", "alternativa-smallpdf-firmar-pdf", "alternativa-docusign-gratis"],
  },
  {
    slug: "anadir-firma-a-pdf",
    lang: "es",
    title: "Añadir firma a PDF — Guía paso a paso | Firmalo",
    metaDescription: "Aprende cómo añadir tu firma a cualquier documento PDF en 3 simples pasos. Dibuja, escribe o sube una imagen de tu firma. Gratis y sin registro.",
    heroTitle: "Añadir firma a PDF en 3 pasos",
    heroSubtitle: "Guía completa para agregar tu firma a cualquier documento PDF. Dibuja con el dedo, escribe tu nombre o sube una imagen.",
    sections: [
      {
        title: "Paso 1: Sube tu documento PDF",
        content: "Arrastra tu archivo PDF a la zona de carga o haz clic para seleccionarlo desde tu dispositivo. Firmalo acepta archivos de hasta 50 MB y funciona con cualquier PDF estándar. Tu archivo no se sube a ningún servidor — se procesa directamente en tu navegador.",
      },
      {
        title: "Paso 2: Crea tu firma",
        content: "Firmalo te ofrece tres formas de crear tu firma, adaptándose a tu preferencia y situación.",
        bulletPoints: [
          "Dibujar: Usa el dedo en tu celular o el mouse en tu computadora para dibujar tu firma real",
          "Escribir: Escribe tu nombre y elige entre varios estilos de caligrafía profesional",
          "Subir imagen: Sube una foto o escaneo de tu firma manuscrita (PNG, JPG)",
        ],
      },
      {
        title: "Paso 3: Posiciona y descarga",
        content: "Una vez creada tu firma, aparecerá sobre tu PDF. Arrástrala a la posición exacta donde la necesitas y ajusta el tamaño. Si tu PDF tiene varias páginas, navega hasta la página correcta. Cuando estés satisfecho, presiona 'Descargar' y tu PDF firmado se guardará en tu dispositivo.",
      },
      {
        title: "¿Dónde colocar la firma según el documento?",
        content: "El lugar de la firma cambia según el tipo de documento. Saber dónde va evita tener que rehacer el trámite.",
        bulletPoints: [
          "Contratos: al final del texto, junto al nombre y, si lo hay, sobre la línea de firma",
          "Formularios oficiales: en el recuadro o campo marcado como «firma»",
          "Cartas y autorizaciones: debajo del cierre, antes o sobre tu nombre escrito",
          "Documentos de varias páginas: en la última página y, si se pide, una rúbrica en cada hoja",
        ],
      },
      {
        title: "Tu firma queda incrustada en el PDF",
        content: "Cuando descargas el documento, la firma no es una nota adhesiva que se pueda mover o borrar después: queda incrustada dentro del propio PDF como parte de la página. Eso significa que quien reciba el archivo verá tu firma exactamente donde la pusiste, en cualquier lector de PDF y en cualquier dispositivo, sin necesidad de Firmalo ni de ningún programa especial.",
      },
    ],
    faq: [
      { question: "¿Puedo añadir mi firma a un PDF de varias páginas?", answer: "Sí. Firmalo soporta PDFs de cualquier número de páginas. Navega hasta la página donde necesitas la firma y posiciónala." },
      { question: "¿Puedo cambiar el tamaño de mi firma?", answer: "Sí. Una vez colocada la firma sobre el PDF, puedes arrastrar la esquina para ajustar el tamaño." },
      { question: "¿Qué formatos de imagen acepta para subir firma?", answer: "Puedes subir tu firma en formato PNG, JPG o WebP. Recomendamos PNG con fondo transparente para el mejor resultado." },
      { question: "¿Puedo añadir varias firmas en el mismo documento?", answer: "Sí. Puedes colocar tu firma en distintas páginas o posiciones del mismo PDF antes de descargarlo, útil cuando un documento pide firmar en varios puntos." },
      { question: "¿La firma se puede borrar o mover después de descargar el PDF?", answer: "No. La firma queda incrustada dentro del PDF como parte de la página, así que se mantiene fija en cualquier lector y dispositivo." },
      { question: "¿Necesito instalar algún programa para añadir la firma?", answer: "No. Todo el proceso ocurre en tu navegador, tanto en celular como en computadora. No hay que instalar ni configurar nada." },
    ],
    relatedSlugs: ["crear-firma-online", "firmar-pdf-online-gratis", "firmar-pdf-sin-registro"],
  },
  {
    slug: "crear-firma-online",
    lang: "es",
    title: "Crear firma online gratis — Dibuja, escribe o sube imagen | Firmalo",
    metaDescription: "Crea tu firma digital online gratis. Dibuja con el mouse o el dedo, escribe tu nombre en caligrafía o sube una imagen. Sin registro.",
    heroTitle: "Crea tu firma online gratis",
    heroSubtitle: "Tres formas de crear tu firma perfecta: dibuja a mano, escribe con estilo o sube una imagen de tu firma.",
    sections: [
      {
        title: "Dibuja tu firma a mano",
        content: "El modo de dibujo te permite crear una firma manuscrita auténtica. En celular, dibuja con el dedo directamente en la pantalla. En computadora, usa el mouse o trackpad. El resultado es una firma natural que luce como si hubieras firmado con tinta sobre el papel.",
      },
      {
        title: "Escribe tu nombre en caligrafía",
        content: "Si prefieres una firma más formal, escribe tu nombre y elige entre varios estilos de caligrafía profesional. Firmalo genera instantáneamente una firma elegante con fuentes cursivas diseñadas para verse como escritura a mano. Ideal para documentos formales y profesionales.",
      },
      {
        title: "Sube una imagen de tu firma",
        content: "¿Ya tienes tu firma escaneada o fotografiada? Sube la imagen directamente. Firmalo acepta archivos PNG, JPG y WebP. Para mejores resultados, usa una imagen PNG con fondo transparente — así tu firma se integrará perfectamente con el documento.",
        bulletPoints: [
          "PNG con fondo transparente (recomendado)",
          "JPG o WebP también funcionan",
          "Firma sobre papel blanco y fotografía con buena luz",
          "Recorta la imagen para incluir solo la firma",
        ],
      },
      {
        title: "Consejos para una firma que luzca profesional",
        content: "Una firma digital bien hecha marca la diferencia en un documento formal. Si dibujas, hazlo despacio y con trazo firme; si la pantalla es pequeña, usa el celular en horizontal para tener más espacio. Si subes una foto, asegúrate de que el fondo sea blanco y la luz pareja, para que al recortarla no queden sombras. Y si escribes tu nombre, elige un estilo de caligrafía sobrio: las letras demasiado decorativas se leen mal en documentos oficiales.",
      },
      {
        title: "Usa tu firma en cualquier documento",
        content: "La firma que creas en Firmalo sirve para todo: contratos, formularios, autorizaciones escolares, recibos o cartas. Una vez creada, la colocas sobre el PDF, la ajustas de tamaño y la descargas incrustada en el documento. Como todo ocurre en tu navegador, puedes repetir el proceso las veces que quieras, sin límites ni costo.",
      },
    ],
    faq: [
      { question: "¿Cuál es la mejor forma de crear mi firma?", answer: "Depende del contexto. Para documentos informales, dibujar es la opción más rápida. Para documentos formales, la firma escrita en caligrafía o una imagen escaneada lucen más profesionales." },
      { question: "¿La firma se guarda para usarla después?", answer: "No almacenamos tu firma. Por privacidad, cada sesión comienza desde cero. Si necesitas reutilizar tu firma, guarda la imagen en tu dispositivo." },
      { question: "¿Puedo cambiar el color de la firma?", answer: "Actualmente la firma se dibuja en color oscuro (azul marino), que es el estándar para firmas profesionales." },
      { question: "¿Es gratis crear mi firma online?", answer: "Sí, completamente gratis y sin límite. Puedes crear y usar tu firma tantas veces como necesites, sin registro ni costo." },
      { question: "¿La firma que creo tiene validez legal?", answer: "Una firma electrónica simple es válida para la mayoría de contratos y trámites cotidianos en América Latina y España. Para actos que exigen firma certificada, verifica los requisitos de tu país." },
      { question: "¿Puedo crear mi firma desde el celular?", answer: "Sí. Dibujar con el dedo en la pantalla del celular es, de hecho, la forma más natural de lograr una firma manuscrita auténtica." },
    ],
    relatedSlugs: ["anadir-firma-a-pdf", "firmar-pdf-online-gratis", "firmar-pdf-desde-celular"],
  },
  {
    slug: "firmar-pdf-desde-celular",
    lang: "es",
    title: "Firmar PDF desde celular — iPhone y Android | Firmalo",
    metaDescription: "Firma tu PDF directamente desde tu celular iPhone o Android. Dibuja tu firma con el dedo, sin instalar apps. Gratis y privado.",
    heroTitle: "Firma tu PDF desde el celular",
    heroSubtitle: "Firma documentos directamente desde tu iPhone o Android. Sin descargar apps, sin registro. Dibuja tu firma con el dedo.",
    sections: [
      {
        title: "Firma con tu dedo, sin apps",
        content: "No necesitas descargar ninguna aplicación. Firmalo funciona directamente en el navegador de tu celular — Safari, Chrome o cualquier otro. Simplemente abre la página, sube tu PDF y dibuja tu firma con el dedo. La interfaz táctil está optimizada para pantallas pequeñas.",
      },
      {
        title: "Optimizado para pantallas táctiles",
        content: "Firmalo está diseñado desde cero para funcionar en móvil. La zona de firma se adapta al tamaño de tu pantalla, los botones son grandes y fáciles de tocar, y puedes arrastrar la firma sobre el PDF con gestos naturales.",
        bulletPoints: [
          "Botones y controles optimizados para dedos",
          "Zona de firma adaptada a pantalla táctil",
          "Arrastra y redimensiona la firma con gestos",
          "Funciona en orientación vertical y horizontal",
        ],
      },
      {
        title: "Ideal para firmar sobre la marcha",
        content: "¿Te enviaron un contrato por WhatsApp o email y necesitas firmarlo ya? Con Firmalo puedes firmar desde donde estés — en el bus, en una reunión o en la calle. Abre el PDF, firma y envía el documento firmado de vuelta en menos de un minuto.",
      },
      {
        title: "Cómo firmar un PDF en iPhone",
        content: "En iPhone no hace falta la app Archivos ni Markup. Abre el PDF en Safari o Chrome, súbelo a Firmalo y firma con el dedo.",
        bulletPoints: [
          "Abre firmalo.io en Safari o Chrome",
          "Sube el PDF (desde Archivos, Mail o el chat donde lo recibiste)",
          "Dibuja tu firma con el dedo y colócala sobre el documento",
          "Toca «Descargar»: el PDF firmado queda en tu app Archivos",
        ],
      },
      {
        title: "Cómo firmar un PDF en Android",
        content: "En Android el proceso es idéntico. Abre el documento desde Chrome, Firefox o tu gestor de archivos, súbelo a Firmalo y firma directamente en la pantalla. El PDF firmado se guarda en la carpeta de Descargas, listo para reenviar por WhatsApp, Gmail o cualquier app. No necesitas instalar Adobe ni ninguna aplicación de firma.",
      },
    ],
    faq: [
      { question: "¿Funciona en iPhone?", answer: "Sí. Firmalo funciona perfectamente en Safari y Chrome para iOS. No necesitas descargar ninguna app." },
      { question: "¿Funciona en Android?", answer: "Sí. Funciona en Chrome, Firefox y cualquier navegador moderno para Android." },
      { question: "¿El PDF firmado se guarda en mi celular?", answer: "Sí. Al presionar 'Descargar', el PDF firmado se guarda en la carpeta de descargas de tu celular." },
      { question: "¿Necesito internet para firmar?", answer: "Necesitas internet solo para abrir la página. Una vez cargada, el procesamiento es local y no requiere conexión." },
      { question: "¿Tengo que instalar alguna app para firmar desde el celular?", answer: "No. Firmalo funciona dentro del navegador. No ocupa espacio, no pide permisos y no hay nada que instalar." },
      { question: "¿Puedo firmar un PDF que recibí por WhatsApp?", answer: "Sí. Guarda el PDF desde WhatsApp, súbelo a Firmalo, fírmalo y reenvía el documento firmado por el mismo chat." },
    ],
    relatedSlugs: ["firmar-pdf-online-gratis", "anadir-firma-a-pdf", "firmar-pdf-sin-registro"],
  },
  {
    slug: "firmar-contrato-alquiler-pdf",
    lang: "es",
    title: "Firmar contrato de alquiler PDF — Rápido y gratis | Firmalo",
    metaDescription: "Firma tu contrato de alquiler en PDF online. Sin imprimir, sin escáner. Firma directamente desde tu celular o computadora. Gratis y privado.",
    heroTitle: "Firma tu contrato de alquiler en PDF",
    heroSubtitle: "Sin imprimir, sin escáner. Firma tu contrato de arriendo directamente desde tu dispositivo y envíalo de vuelta en minutos.",
    sections: [
      {
        title: "Firma contratos de alquiler sin imprimir",
        content: "Ya no necesitas imprimir el contrato, firmarlo a mano y escanearlo. Con Firmalo, firmas directamente sobre el PDF digital. El proceso toma menos de un minuto y el resultado es un documento profesional listo para enviar.",
      },
      {
        title: "¿Qué verificar antes de firmar?",
        content: "Antes de firmar cualquier contrato de alquiler, asegúrate de revisar estos puntos importantes.",
        bulletPoints: [
          "Verifica los datos del propietario y el inmueble",
          "Revisa el monto del alquiler y forma de pago",
          "Confirma la duración del contrato y condiciones de renovación",
          "Lee las cláusulas sobre depósito y garantías",
          "Verifica las condiciones de terminación anticipada",
        ],
      },
      {
        title: "Validez legal de la firma visual",
        content: "Firmalo coloca una firma visual en tu PDF. En la mayoría de países de Latinoamérica, una firma visual en un contrato de alquiler es aceptada como muestra de voluntad. Sin embargo, para contratos de alto valor, consulta la legislación de tu país sobre firma electrónica certificada.",
      },
      {
        title: "Que firmen ambas partes, sin imprimir",
        content: "Un contrato de alquiler necesita la firma del propietario y la del inquilino. Con Firmalo no hace falta juntarse ni imprimir: cada parte abre el PDF, coloca su firma y reenvía el documento. Lo habitual es que una persona firme primero, descargue el PDF ya firmado y se lo pase a la otra para que añada su firma sobre el mismo archivo. Así queda un único documento con ambas firmas, sin papel de por medio.",
      },
      {
        title: "Sirve para arriendos de vivienda y temporales",
        content: "Funciona igual para un contrato de arrendamiento de vivienda, un alquiler temporal o de temporada, un subarriendo o la renovación de uno existente. Mientras el documento esté en PDF, puedes firmarlo en segundos desde el celular o la computadora, revisarlo antes de enviar y guardar una copia para ti.",
      },
    ],
    faq: [
      { question: "¿Puedo firmar un contrato de alquiler con esta herramienta?", answer: "Sí. Firmalo te permite colocar tu firma visual en cualquier contrato en formato PDF. Es la forma más rápida de firmar sin imprimir." },
      { question: "¿La firma tiene validez legal?", answer: "Firmalo coloca una firma visual. Su validez depende de la legislación de tu país y del acuerdo entre las partes. Para la mayoría de contratos de alquiler, es aceptada como muestra de voluntad." },
      { question: "¿Puedo firmar si el contrato tiene varias páginas?", answer: "Sí. Navega hasta la página donde necesitas firmar y coloca tu firma. Firmalo soporta PDFs de cualquier extensión." },
      { question: "¿Cómo hacemos para que firmen el propietario y el inquilino?", answer: "Una parte firma primero y descarga el PDF; luego se lo envía a la otra, que abre ese mismo archivo en Firmalo y añade su firma. El resultado es un único PDF con ambas firmas." },
      { question: "¿Necesito imprimir y escanear el contrato?", answer: "No. Ese es justamente el paso que Firmalo elimina: firmas directamente sobre el PDF digital, sin impresora ni escáner." },
      { question: "¿Puedo guardar una copia del contrato firmado?", answer: "Sí. Al descargar, el PDF firmado queda en tu dispositivo. Guárdalo o reenvíalo por correo o WhatsApp como cualquier archivo." },
    ],
    relatedSlugs: ["firmar-contrato-trabajo-pdf", "firmar-pdf-sin-imprimir", "anadir-firma-a-pdf", "firmar-pdf-para-visa"],
  },
  {
    slug: "firmar-pdf-para-visa",
    lang: "es",
    title: "Firmar PDF para visa — Formularios y documentos | Firmalo",
    metaDescription: "Firma formularios y documentos PDF para tu trámite de visa. Sin imprimir, desde tu celular o PC. Gratis, sin registro y privado.",
    heroTitle: "Firma documentos PDF para tu visa",
    heroSubtitle: "Firma formularios, declaraciones juradas y documentos de soporte para tu trámite de visa. Sin imprimir, sin escáner.",
    sections: [
      {
        title: "Firma formularios de visa rápidamente",
        content: "Los trámites de visa requieren firmar múltiples documentos: formularios de solicitud, declaraciones juradas, autorizaciones de verificación de antecedentes y más. Con Firmalo, puedes firmar todos estos documentos directamente en formato digital, sin necesidad de imprimirlos.",
      },
      {
        title: "Documentos comunes que requieren firma",
        content: "Estos son los tipos de documentos que típicamente necesitas firmar para un trámite de visa.",
        bulletPoints: [
          "Formulario de solicitud de visa",
          "Declaraciones juradas",
          "Carta de invitación firmada",
          "Autorización de verificación de antecedentes",
          "Consentimiento para procesamiento de datos",
        ],
      },
      {
        title: "Consejos para firmar documentos de visa",
        content: "Usa siempre tu firma consistente — la misma que aparece en tu pasaporte o documento de identidad. Firma en el espacio indicado del formulario. Algunos consulados prefieren firma manuscrita original; verifica los requisitos específicos antes de enviar documentos con firma digital.",
      },
      {
        title: "Privacidad para documentos con datos sensibles",
        content: "Los trámites de visa incluyen información delicada: número de pasaporte, datos bancarios, dirección y antecedentes. Como Firmalo procesa todo en tu navegador y nunca sube tu archivo a un servidor, esos datos no quedan en manos de terceros. Es una diferencia importante frente a herramientas que suben tus documentos a la nube para firmarlos.",
      },
      {
        title: "Útil para cualquier tipo de visa",
        content: "Sirve igual para los documentos de soporte de una visa de turista, de estudiante, de trabajo o de residencia, y para trámites ante consulados de Estados Unidos, Canadá, España, la zona Schengen u otros países. Recuerda que el formulario principal de cada país suele firmarse en su portal oficial; Firmalo es ideal para todo el resto: cartas, declaraciones juradas, autorizaciones y comprobantes en PDF.",
      },
    ],
    faq: [
      { question: "¿Los consulados aceptan documentos firmados digitalmente?", answer: "Depende del consulado y del tipo de documento. Muchos aceptan firma digital para documentos de soporte, pero algunos exigen firma manuscrita original para el formulario principal. Verifica con tu consulado." },
      { question: "¿Puedo firmar el formulario DS-160 con Firmalo?", answer: "El DS-160 se firma electrónicamente en el sitio oficial del gobierno. Firmalo es ideal para documentos de soporte como cartas, declaraciones y otros PDFs." },
      { question: "¿Mi documento firmado es seguro?", answer: "Sí. Tu documento nunca sale de tu dispositivo. Es la forma más privada de firmar documentos con información sensible como datos de pasaporte." },
      { question: "¿Sirve para visas de Estados Unidos, Canadá o Schengen?", answer: "Sí, para los documentos de soporte en PDF de cualquier país. El formulario principal de cada visa suele firmarse en el portal oficial; el resto de documentos los puedes firmar con Firmalo." },
      { question: "¿Puedo firmar una declaración jurada o una carta de invitación?", answer: "Sí. Son documentos PDF como cualquier otro: súbelos, coloca tu firma en el lugar indicado y descárgalos firmados." },
      { question: "¿Debo usar la misma firma de mi pasaporte?", answer: "Es lo recomendable. Mantener una firma consistente con la de tu pasaporte y documento de identidad evita problemas de coincidencia en el trámite." },
    ],
    relatedSlugs: ["firmar-autorizacion-pdf", "firmar-pdf-privado-sin-subir-archivos", "firmar-contrato-alquiler-pdf"],
  },
  {
    slug: "alternativa-smallpdf-firmar-pdf",
    lang: "es",
    title: "Alternativa a SmallPDF para firmar PDF — Gratis y sin límites | Firmalo",
    metaDescription: "¿Buscas una alternativa gratuita a SmallPDF? Firmalo te permite firmar PDFs sin límites, sin marca de agua y sin registro. 100% privado.",
    heroTitle: "La alternativa gratuita a SmallPDF",
    heroSubtitle: "Firma PDFs sin los límites de SmallPDF. Sin marca de agua, sin restricciones diarias, sin suscripción. 100% gratis, siempre.",
    sections: [
      {
        title: "¿Por qué buscar una alternativa a SmallPDF?",
        content: "SmallPDF es una herramienta popular, pero su versión gratuita tiene limitaciones significativas: solo permite 2 documentos por día, agrega marca de agua en algunos casos y requiere crear una cuenta. Además, tus archivos se suben a sus servidores para procesarse.",
      },
      {
        title: "Firmalo vs SmallPDF — Comparación",
        content: "Estas son las diferencias clave entre ambas herramientas.",
        bulletPoints: [
          "Documentos por día: SmallPDF limita a 2, Firmalo no tiene límite",
          "Marca de agua: SmallPDF la agrega en versión gratuita, Firmalo nunca",
          "Registro: SmallPDF requiere cuenta, Firmalo no",
          "Privacidad: SmallPDF sube archivos a servidores, Firmalo procesa todo localmente",
          "Costo: SmallPDF Pro cuesta ~$12/mes, Firmalo es 100% gratis",
        ],
      },
      {
        title: "La ventaja de la privacidad",
        content: "La diferencia más importante es la privacidad. SmallPDF necesita subir tu archivo a sus servidores para procesarlo. Firmalo funciona completamente en tu navegador — tu PDF nunca sale de tu dispositivo. Para documentos sensibles como contratos o documentos legales, esto marca una gran diferencia.",
      },
      {
        title: "Cambiar de SmallPDF a Firmalo en 30 segundos",
        content: "No hay nada que instalar ni configurar para hacer el cambio. El flujo es exactamente el que ya conoces, pero sin los límites.",
        bulletPoints: [
          "Abre firmalo.io (no se pide cuenta ni correo)",
          "Sube el mismo PDF que ibas a firmar en SmallPDF",
          "Crea tu firma: dibújala, escríbela o sube una imagen",
          "Descarga el PDF firmado, sin marca de agua y sin contar documentos",
        ],
      },
      {
        title: "¿Para qué sigue sirviendo SmallPDF?",
        content: "Seamos justos: SmallPDF es una buena suite si necesitas comprimir, convertir, unir o dividir PDFs con frecuencia. En esas tareas ofrece más que Firmalo. Pero si lo que buscas es concretamente firmar un PDF sin límites diarios, sin marca de agua y sin subir tu archivo a un servidor, Firmalo cubre ese caso mejor y gratis.",
      },
    ],
    faq: [
      { question: "¿Firmalo hace todo lo que hace SmallPDF?", answer: "Firmalo se especializa en firmar PDFs. Para otras funciones como comprimir, convertir o fusionar PDFs, SmallPDF ofrece más herramientas. Pero para firmar, Firmalo ofrece una experiencia superior y sin limitaciones." },
      { question: "¿Firmalo es realmente gratis para siempre?", answer: "Sí. No hay planes premium, pruebas gratuitas ni funciones bloqueadas. La herramienta completa es gratuita." },
      { question: "¿Puedo migrar de SmallPDF a Firmalo?", answer: "No hay nada que migrar. Simplemente abre Firmalo, sube tu PDF y firma. No necesitas cuenta ni configuración." },
      { question: "¿SmallPDF gratis pone marca de agua al firmar?", answer: "Su versión gratuita tiene límites de uso diario y, según la función, puede añadir marcas. Firmalo nunca pone marca de agua, sin importar cuántos documentos firmes." },
      { question: "¿Cuántos documentos puedo firmar gratis en Firmalo?", answer: "Los que quieras. No hay límite diario ni mensual, a diferencia del tope de documentos de la versión gratuita de SmallPDF." },
      { question: "¿Mis archivos se suben a algún servidor como en SmallPDF?", answer: "No. SmallPDF procesa en sus servidores; Firmalo procesa todo en tu navegador, así que el PDF nunca sale de tu dispositivo." },
    ],
    relatedSlugs: ["alternativa-docusign-gratis", "firmar-pdf-sin-marca-de-agua", "firmar-pdf-sin-registro"],
    comparison: {
      competitor: "SmallPDF",
      caption: "Comparación rápida para firmar PDF de uso personal. SmallPDF es una suite completa de PDF; Firmalo se enfoca solo en firmar, sin límites ni nube.",
      rows: [
        { feature: "Precio", firmalo: "Gratis siempre", competitor: "Gratis limitado · Pro ~$12/mes" },
        { feature: "Documentos por día", firmalo: "Sin límite", competitor: "2 al día en la versión gratis" },
        { feature: "Marca de agua", firmalo: "Nunca", competitor: "En algunas funciones de la versión gratis" },
        { feature: "Registro", firmalo: "No requiere", competitor: "Requiere cuenta" },
        { feature: "Privacidad", firmalo: "Se procesa en tu navegador; el archivo no se sube", competitor: "Sube tus archivos a la nube" },
        { feature: "Instalación", firmalo: "Ninguna (web)", competitor: "Ninguna (web)" },
      ],
    },
  },
  {
    slug: "alternativa-docusign-gratis",
    lang: "es",
    title: "Alternativa gratuita a DocuSign para firmar PDF | Firmalo",
    metaDescription: "¿Buscas una alternativa gratis a DocuSign? Firmalo te permite firmar PDFs sin costo, sin cuenta y con total privacidad. Ideal para uso personal.",
    heroTitle: "Alternativa gratuita a DocuSign",
    heroSubtitle: "Firma tus PDFs sin el costo ni la complejidad de DocuSign. Gratis, sin cuenta, con total privacidad.",
    sections: [
      {
        title: "DocuSign vs Firmalo: ¿Cuándo usar cada uno?",
        content: "DocuSign es una plataforma de firma electrónica empresarial con funciones avanzadas: firma múltiple, flujos de aprobación, certificación legal. Pero para uso personal — firmar un contrato, un formulario o un documento — su complejidad y costo ($10-25/mes) son innecesarios. Firmalo ofrece una solución simple y gratuita para estos casos.",
      },
      {
        title: "Ventajas de Firmalo para uso personal",
        content: "Para firmar documentos del día a día, Firmalo tiene ventajas claras sobre DocuSign.",
        bulletPoints: [
          "Gratis vs $10-25/mes de DocuSign",
          "Sin necesidad de crear cuenta",
          "Proceso en 30 segundos vs minutos de configuración",
          "Privacidad total — sin servidores intermediarios",
          "Sin emails ni notificaciones innecesarias",
        ],
      },
      {
        title: "¿Cuándo sí usar DocuSign?",
        content: "DocuSign es la mejor opción cuando necesitas: firma de múltiples personas en un documento, flujos de aprobación empresariales, firma electrónica avanzada con validez legal certificada, o integración con sistemas empresariales. Para todo lo demás, Firmalo es más rápido, más simple y gratuito.",
      },
      {
        title: "Sin suscripción y sin período de prueba",
        content: "DocuSign trabaja por suscripción: incluso su plan más básico ronda los 10 dólares al mes y las pruebas gratuitas caducan a los pocos días o documentos. Firmalo no tiene planes, ni tarjeta, ni fecha de vencimiento. Si solo necesitas firmar tus propios documentos de vez en cuando, pagar una mensualidad por ello no tiene sentido.",
      },
      {
        title: "Firma en segundos, sin curva de aprendizaje",
        content: "DocuSign está pensado para equipos y tiene paneles, plantillas, roles y configuraciones que toman tiempo en entender. Para firmar un solo documento eso es un estorbo. Con Firmalo abres el PDF, firmas y descargas — sin tutoriales, sin configurar nada y sin crear una cuenta.",
      },
    ],
    faq: [
      { question: "¿La firma de Firmalo tiene la misma validez que DocuSign?", answer: "Firmalo coloca una firma visual en el PDF. DocuSign ofrece firma electrónica certificada con mayor validez legal. Para uso personal y documentos simples, la firma visual es suficiente. Para contratos empresariales importantes, DocuSign puede ser más apropiado." },
      { question: "¿Puedo enviar un PDF para que otra persona lo firme?", answer: "Actualmente Firmalo es una herramienta de firma individual. Si necesitas que otra persona firme, envíale el PDF y que use Firmalo también. Para flujos de firma múltiple, DocuSign es más adecuado." },
      { question: "¿Firmalo se integrará con otras herramientas?", answer: "Firmalo se enfoca en ser la herramienta más simple para firmar PDFs. No planeamos integraciones empresariales complejas — esa es la fortaleza de DocuSign." },
      { question: "¿Necesito tarjeta de crédito para usar Firmalo?", answer: "No. No pedimos tarjeta, ni cuenta, ni correo. A diferencia de las pruebas de DocuSign, no hay nada que caduque ni que se cobre después." },
      { question: "¿Firmalo sirve para uso personal y no empresarial?", answer: "Exacto. Está pensado para firmar tus propios documentos —contratos, formularios, cartas— de forma rápida y gratuita. Para flujos empresariales con varios firmantes, DocuSign sigue siendo más adecuado." },
      { question: "¿Es complicado de usar como DocuSign?", answer: "No. No hay paneles, plantillas ni configuración. Subes el PDF, colocas tu firma y descargas; todo el proceso toma menos de un minuto." },
    ],
    relatedSlugs: ["alternativa-smallpdf-firmar-pdf", "firmar-pdf-online-gratis", "firmar-pdf-sin-registro"],
    comparison: {
      competitor: "DocuSign",
      caption: "DocuSign es ideal para flujos empresariales con varios firmantes. Para firmar tú mismo un documento, esta es la diferencia frente a Firmalo.",
      rows: [
        { feature: "Precio", firmalo: "Gratis siempre", competitor: "Desde ~$10–25/mes" },
        { feature: "Registro", firmalo: "No requiere", competitor: "Requiere cuenta" },
        { feature: "Privacidad", firmalo: "Procesamiento local en tu navegador", competitor: "Documentos almacenados en la nube" },
        { feature: "Tiempo de configuración", firmalo: "Segundos", competitor: "Minutos (plantillas, roles)" },
        { feature: "Varios firmantes / flujos", firmalo: "Firma individual", competitor: "Sí (empresarial)" },
        { feature: "Ideal para", firmalo: "Uso personal y trámites", competitor: "Equipos y flujos empresariales" },
      ],
    },
  },

  {
    slug: "firmar-pdf-sin-imprimir",
    lang: "es",
    title: "Firmar PDF sin imprimir — Sin escáner ni apps | Firmalo",
    metaDescription: "Firma un PDF sin imprimir ni escanear. Añade tu firma online desde el navegador, descarga el documento firmado y envíalo en segundos. Gratis y privado.",
    heroTitle: "Firma tu PDF sin imprimir",
    heroSubtitle: "Olvídate de imprimir, firmar a mano y escanear. Con Firmalo colocas tu firma directamente sobre el PDF y descargas el documento listo para enviar.",
    sections: [
      {
        title: "Cómo firmar un PDF sin imprimir",
        content: "El proceso reemplaza por completo el ciclo de impresora y escáner. Abre Firmalo, selecciona tu PDF, crea la firma y colócala en la página correcta. Todo ocurre dentro del navegador, así que no necesitas instalar programas ni convertir el archivo a otro formato.",
        bulletPoints: [
          "Sube o arrastra el PDF desde tu celular o computadora",
          "Dibuja tu firma, escríbela en caligrafía o sube una imagen",
          "Mueve la firma hasta la línea correspondiente y ajusta el tamaño",
          "Descarga el PDF firmado sin imprimir ninguna hoja",
        ],
      },
      {
        title: "Ideal para contratos, formularios y autorizaciones",
        content: "Firmar sin imprimir sirve para documentos cotidianos: contratos de alquiler o trabajo, formularios de trámites, autorizaciones, cartas, recibos y anexos. Mientras el archivo esté en PDF, puedes añadir una firma visual en el lugar exacto y enviarlo de vuelta por email o WhatsApp.",
      },
      {
        title: "Sin escáner y sin perder calidad",
        content: "Cuando imprimes y escaneas, el documento suele quedar pesado, borroso o torcido. Firmalo conserva el PDF original y solo añade la firma encima. El resultado se ve limpio, mantiene el formato y es más profesional que una foto del papel firmada a mano.",
      },
      {
        title: "Privacidad: tu PDF no se sube a servidores",
        content: "El archivo se procesa localmente en tu navegador. Esto es especialmente importante si firmas contratos, documentos de identidad, información médica o trámites con datos personales. No hay cola de procesamiento en la nube ni copias temporales en servidores de terceros.",
      },
    ],
    faq: [
      { question: "¿Puedo firmar un PDF sin imprimirlo?", answer: "Sí. Firmalo permite colocar una firma visual directamente sobre el PDF y descargarlo firmado, sin impresora ni escáner." },
      { question: "¿Necesito instalar Adobe u otra aplicación?", answer: "No. Funciona en el navegador, tanto en celular como en computadora." },
      { question: "¿El documento firmado queda en PDF?", answer: "Sí. Descargas un archivo PDF estándar, listo para enviar o guardar." },
      { question: "¿Puedo firmar desde el celular?", answer: "Sí. Puedes dibujar la firma con el dedo y colocarla sobre el documento desde iPhone o Android." },
      { question: "¿Firmar sin imprimir tiene validez legal?", answer: "Para muchos trámites cotidianos y acuerdos entre partes, una firma electrónica simple es válida. Si el trámite exige firma certificada, revisa los requisitos específicos." },
    ],
    relatedSlugs: ["firmar-pdf-online-gratis", "firmar-contrato-alquiler-pdf", "firmar-contrato-trabajo-pdf", "firmar-autorizacion-pdf"],
  },
  {
    slug: "firmar-pdf-privado-sin-subir-archivos",
    lang: "es",
    title: "Firmar PDF privado sin subir archivos | Firmalo",
    metaDescription: "Firma PDFs privados sin subirlos a servidores. El documento se procesa en tu navegador: ideal para contratos, datos personales y archivos sensibles.",
    heroTitle: "Firma PDFs privados sin subir archivos",
    heroSubtitle: "Tu documento no sale de tu dispositivo. Firmalo añade la firma en el navegador, sin cuentas, sin nube y sin copias en servidores.",
    sections: [
      {
        title: "Qué significa firmar sin subir archivos",
        content: "En muchas herramientas online, el PDF se envía a servidores externos para procesarlo. Firmalo funciona de otra manera: la edición ocurre localmente en tu navegador. Eso reduce exposición, evita copias temporales en la nube y mantiene tus documentos bajo tu control.",
      },
      {
        title: "Para documentos con información sensible",
        content: "Usa este flujo cuando el PDF contiene datos personales, contratos, documentos laborales, información médica, pasaportes, declaraciones o acuerdos confidenciales. Si no quieres que un tercero reciba el archivo, lo correcto es usar una herramienta con procesamiento local.",
        bulletPoints: [
          "Contratos y anexos con datos de las partes",
          "Formularios con números de documento o dirección",
          "Autorizaciones, cartas y declaraciones privadas",
          "PDFs que no deberían quedar almacenados en otra plataforma",
        ],
      },
      {
        title: "Sin registro y sin historial de documentos",
        content: "Firmalo no te pide crear cuenta para firmar. Al no haber cuenta, tampoco hay panel con historial de documentos, archivos recientes o datos asociados a tu email. Abres la página, firmas y cierras: el documento queda contigo.",
      },
      {
        title: "Privacidad sin sacrificar facilidad",
        content: "La experiencia sigue siendo simple: subes el PDF al navegador, creas la firma, la colocas y descargas el resultado. La diferencia es dónde ocurre el procesamiento: en tu dispositivo, no en servidores externos.",
      },
    ],
    faq: [
      { question: "¿Mi PDF se sube a Firmalo?", answer: "No. El procesamiento ocurre localmente en tu navegador; el archivo no se envía a nuestros servidores." },
      { question: "¿Firmalo guarda mis documentos?", answer: "No. No hay almacenamiento de documentos ni historial de archivos firmados." },
      { question: "¿Puedo firmar documentos confidenciales?", answer: "Sí, es uno de los casos principales: contratos, formularios y PDFs con datos sensibles." },
      { question: "¿Necesito registrarme para mayor seguridad?", answer: "No. Para este caso, no registrarse reduce la cantidad de datos personales entregados a una plataforma." },
      { question: "¿El resultado tiene marca de agua?", answer: "No. Descargas el PDF firmado sin logos ni marcas de agua." },
    ],
    relatedSlugs: ["firmar-pdf-sin-registro", "firmar-pdf-online-gratis", "firmar-pdf-sin-imprimir", "firmar-pdf-para-visa"],
  },
  {
    slug: "firmar-contrato-trabajo-pdf",
    lang: "es",
    title: "Firmar contrato de trabajo PDF online | Firmalo",
    metaDescription: "Firma un contrato de trabajo en PDF sin imprimir. Añade tu firma desde el navegador, conserva la privacidad del documento y descárgalo listo para enviar.",
    heroTitle: "Firma tu contrato de trabajo en PDF",
    heroSubtitle: "Para contratos laborales, anexos y acuerdos de empleo: firma el PDF online sin imprimir, sin escáner y sin subir el archivo a servidores.",
    sections: [
      {
        title: "Firma contratos laborales sin imprimir",
        content: "Si recibiste un contrato de trabajo por email, no necesitas imprimirlo, firmarlo a mano y escanearlo. Con Firmalo puedes abrir el PDF, colocar tu firma en la página indicada y devolver el archivo firmado en minutos.",
      },
      {
        title: "Qué revisar antes de firmar",
        content: "Antes de añadir tu firma, revisa los puntos básicos del contrato. Firmalo facilita la firma, pero la decisión legal y laboral sigue siendo tuya.",
        bulletPoints: [
          "Nombre legal de la empresa y del trabajador",
          "Cargo, funciones y lugar de prestación del servicio",
          "Salario, moneda, beneficios y frecuencia de pago",
          "Jornada, modalidad remota/presencial y fecha de inicio",
          "Cláusulas de confidencialidad, exclusividad y terminación",
        ],
      },
      {
        title: "También sirve para anexos y acuerdos internos",
        content: "Además del contrato principal, puedes firmar anexos, renovaciones, acuerdos de confidencialidad, autorizaciones de tratamiento de datos, recibos y comunicaciones laborales en PDF. El flujo es el mismo para cualquier documento que necesite una firma visual.",
      },
      {
        title: "Privacidad para información laboral",
        content: "Los contratos de trabajo contienen datos personales, salario y condiciones privadas. Firmalo procesa el archivo en tu navegador, por lo que el PDF no se sube a una nube de terceros para añadir la firma.",
      },
    ],
    faq: [
      { question: "¿Puedo firmar un contrato de trabajo en PDF?", answer: "Sí. Puedes colocar tu firma visual en el PDF y descargar el documento firmado." },
      { question: "¿Sirve para anexos laborales?", answer: "Sí. Funciona para contratos, anexos, acuerdos de confidencialidad, recibos y otros documentos laborales en PDF." },
      { question: "¿Necesito imprimir el contrato?", answer: "No. La firma se añade directamente sobre el PDF digital." },
      { question: "¿El contrato se sube a servidores?", answer: "No. El procesamiento se realiza en tu navegador." },
      { question: "¿Tiene validez legal?", answer: "Una firma electrónica simple suele ser válida para muchos acuerdos laborales, pero verifica la normativa aplicable y las exigencias de tu empleador o país." },
    ],
    relatedSlugs: ["firmar-pdf-sin-imprimir", "firmar-contrato-alquiler-pdf", "firmar-pdf-privado-sin-subir-archivos", "firmar-autorizacion-pdf"],
  },
  {
    slug: "firmar-autorizacion-pdf",
    lang: "es",
    title: "Firmar autorización en PDF online | Firmalo",
    metaDescription: "Firma una autorización en PDF desde el navegador. Sin imprimir, sin escáner, sin registro y con procesamiento privado en tu dispositivo.",
    heroTitle: "Firma una autorización en PDF online",
    heroSubtitle: "Añade tu firma a autorizaciones, consentimientos y permisos en PDF sin imprimir ni instalar aplicaciones.",
    sections: [
      {
        title: "Para autorizaciones y consentimientos cotidianos",
        content: "Las autorizaciones suelen pedirse para trámites escolares, médicos, laborales, bancarios o de viaje. Si te enviaron el documento en PDF, puedes firmarlo con Firmalo y devolverlo como archivo firmado sin pasar por papel.",
        bulletPoints: [
          "Autorizaciones escolares o de menores",
          "Consentimientos para trámites o tratamiento de datos",
          "Permisos de viaje, entrega o representación",
          "Cartas simples que requieren firma",
        ],
      },
      {
        title: "Firma rápida desde celular o computadora",
        content: "Abre el PDF, crea tu firma y colócala en el espacio indicado. Si recibiste el archivo por WhatsApp o email, puedes hacerlo desde el mismo celular y reenviar el PDF firmado en pocos minutos.",
      },
      {
        title: "Sin subir documentos sensibles",
        content: "Muchas autorizaciones incluyen nombres, documentos de identidad, direcciones o datos de menores. Firmalo procesa el archivo en el navegador, sin enviar el PDF a servidores externos para firmarlo.",
      },
      {
        title: "Resultado limpio y listo para enviar",
        content: "La firma queda incorporada en el PDF, sin marca de agua ni cambios de formato. Puedes guardar una copia y enviarla por email, mensajería o plataforma de trámites.",
      },
    ],
    faq: [
      { question: "¿Puedo firmar una autorización en PDF?", answer: "Sí. Sube el PDF, coloca tu firma en el campo correspondiente y descarga el documento firmado." },
      { question: "¿Sirve para permisos escolares o de viaje?", answer: "Sí, siempre que el documento esté en PDF y el trámite acepte firma electrónica simple." },
      { question: "¿Puedo hacerlo desde el celular?", answer: "Sí. Firmalo funciona en navegadores móviles y permite dibujar la firma con el dedo." },
      { question: "¿El PDF queda con marca de agua?", answer: "No. El documento firmado queda limpio, sin logos ni marcas." },
      { question: "¿Firmalo guarda la autorización?", answer: "No. El archivo se procesa localmente en tu navegador y no se almacena en servidores." },
    ],
    relatedSlugs: ["firmar-pdf-sin-imprimir", "firmar-pdf-privado-sin-subir-archivos", "firmar-pdf-para-visa", "firmar-contrato-trabajo-pdf"],
  },
];

// ─── Portuguese pages ───────────────────────────────────────────

const ptPages: SeoPageData[] = [
  {
    slug: "assinar-pdf-online-gratis",
    lang: "pt",
    title: "Assinar PDF online grátis — Sem cadastro nem marca d'água | Firmalo",
    metaDescription: "Assine seu PDF online grátis em segundos. Sem cadastro, sem marca d'água, sem enviar arquivos para servidores. 100% privado e seguro.",
    heroTitle: "Assine seu PDF online grátis",
    heroSubtitle: "A ferramenta mais simples para assinar documentos PDF. Sem cadastro, sem marca d'água, sem limites. Seu arquivo nunca sai do seu dispositivo.",
    ctaBlocks: [
      {
        afterSectionIndex: 5,
        heading: "Assine seu PDF agora",
        body: "Grátis, sem cadastro e sem marca d'água. Comece agora mesmo.",
        label: "Assinar meu PDF agora",
      },
    ],
    sections: [
      {
        title: "Como assinar um PDF online grátis?",
        content: "Assinar um PDF online nunca foi tão fácil. Com o Firmalo, você só precisa de três passos: envie seu PDF, crie sua assinatura (desenhando, digitando ou enviando uma imagem) e baixe o documento assinado instantaneamente. Não precisa instalar nenhum programa nem criar uma conta.",
        bulletPoints: [
          "Envie seu arquivo PDF (máximo 50 MB)",
          "Crie sua assinatura: desenhe, digite ou envie uma imagem",
          "Posicione a assinatura onde precisar",
          "Baixe seu PDF assinado em segundos",
        ],
      },
      {
        title: "Três formas de criar sua assinatura",
        content: "O Firmalo deixa você assinar do jeito que preferir, sem complicação. Cada método gera uma assinatura nítida que fica incorporada dentro do PDF, e não como uma camada que possa ser apagada depois.",
        bulletPoints: [
          "Desenhar: trace sua assinatura com o dedo no celular ou com o mouse no computador",
          "Digitar: escreva seu nome e escolha entre vários estilos de letra manuscrita",
          "Enviar imagem: use uma foto da sua assinatura no papel (PNG ou JPG com fundo transparente)",
        ],
      },
      {
        title: "Por que escolher o Firmalo?",
        content: "Diferente de outras ferramentas online, o Firmalo processa seu documento diretamente no navegador. Isso significa que seu arquivo nunca é enviado para nenhum servidor — sua privacidade está garantida. Não há limite de documentos, não há marca d'água e não pedimos e-mail nem cartão. A maioria dos sites \"grátis\" deixa você assinar um ou dois PDF e depois cobra ou carimba o logo; o Firmalo é grátis de verdade.",
      },
      {
        title: "Assinar um PDF eletronicamente tem validade jurídica?",
        content: "Sim. No Brasil, a assinatura eletrônica simples como a que você cria no Firmalo tem validade jurídica para contratos, autorizações, recibos e a maioria dos trâmites do dia a dia, conforme a Medida Provisória 2.200-2/2001 e a Lei 14.063/2020. O Código Civil reconhece que um contrato é válido independentemente da forma, salvo quando a lei exigir forma específica. Para atos que exigem assinatura avançada ou qualificada (como certos registros e escrituras) verifique os requisitos com um certificado ICP-Brasil, mas para o uso cotidiano seu PDF assinado é perfeitamente válido.",
      },
      {
        title: "Funciona em qualquer dispositivo",
        content: "O Firmalo foi projetado para funcionar perfeitamente em celulares, tablets e computadores. Não importa se você usa iPhone, Android, Windows ou Mac — simplesmente abra seu navegador e assine seu PDF. A interface touch foi otimizada para que desenhar sua assinatura com o dedo seja natural e preciso, e você pode mover, aumentar ou reduzir a assinatura antes de baixar o documento.",
      },
      {
        title: "Assinar PDF grátis vs. ferramentas pagas",
        content: "Você não precisa pagar uma assinatura do DocuSign, Adobe ou Smallpdf para assinar um documento. Essas plataformas são úteis para fluxos empresariais com vários signatários, mas, para assinar você mesmo um contrato, um formulário ou uma carta, são caras e lentas. O Firmalo resolve esse caso em segundos, sem conta e sem enviar seu arquivo para a nuvem.",
      },
    ],
    faq: [
      { question: "Posso assinar um PDF grátis sem criar conta?", answer: "Sim. O Firmalo não exige cadastro nem conta de nenhum tipo. Simplesmente abra a página, envie seu PDF e assine." },
      { question: "Meu PDF assinado terá marca d'água?", answer: "Não. Seu documento assinado fica completamente limpo e profissional, sem logos nem marcas d'água." },
      { question: "É seguro assinar meu PDF aqui?", answer: "Totalmente. Seu arquivo é processado no navegador e nunca é enviado para nenhum servidor. Ninguém tem acesso ao seu documento." },
      { question: "Funciona no celular?", answer: "Sim. O Firmalo funciona em qualquer navegador moderno, tanto no celular quanto no computador." },
      { question: "A assinatura eletrônica do Firmalo tem validade jurídica?", answer: "Para a maioria dos contratos e trâmites do dia a dia, sim. A assinatura eletrônica simples é válida no Brasil pela MP 2.200-2 e pela Lei 14.063/2020. Para atos que exigem assinatura qualificada, verifique se é necessário um certificado ICP-Brasil." },
      { question: "Há um limite de documentos que posso assinar?", answer: "Não. Você pode assinar quantos PDF precisar, sem limites diários ou mensais e sem custo." },
      { question: "Posso adicionar mais de uma assinatura no mesmo PDF?", answer: "Sim. Você pode colocar várias assinaturas em diferentes páginas ou posições do mesmo documento antes de baixá-lo." },
      { question: "Em qual formato o documento assinado é baixado?", answer: "Ele é baixado como um arquivo PDF padrão, com sua assinatura incorporada no documento, pronto para enviar por e-mail ou imprimir." },
    ],
    relatedSlugs: ["assinar-pdf-sem-cadastro", "assinar-pdf-sem-marca-dagua", "assinar-pdf-no-celular"],
  },
  {
    slug: "assinar-pdf-sem-cadastro",
    lang: "pt",
    title: "Assinar PDF sem cadastro — Sem conta nem email | Firmalo",
    metaDescription: "Assine seu PDF sem precisar criar conta nem fornecer seu email. Ferramenta 100% privada que funciona diretamente no navegador.",
    heroTitle: "Assine seu PDF sem cadastro",
    heroSubtitle: "Não pedimos conta, email nem dados pessoais. Abra o Firmalo, envie seu PDF, assine e baixe. Simples assim.",
    ctaBlocks: [
      {
        afterSectionIndex: 4,
        heading: "Assine seu PDF sem cadastro",
        body: "Sem conta, sem email. Assine agora mesmo, direto no navegador.",
        label: "Assinar meu PDF agora",
      },
    ],
    sections: [
      {
        title: "Por que assinar sem cadastro é melhor?",
        content: "Muitas ferramentas para assinar PDF obrigam você a criar uma conta, verificar o email e aceitar termos extensos antes de poder assinar um simples documento. Com o Firmalo, eliminamos todas essas barreiras. Seu tempo é valioso — não o perca preenchendo formulários.",
        bulletPoints: [
          "Sem formulários de cadastro",
          "Sem verificação de email",
          "Sem dados pessoais necessários",
          "Pronto para assinar em segundos",
        ],
      },
      {
        title: "Privacidade real, não apenas promessas",
        content: "Quando uma ferramenta pede para criar uma conta, ela armazena seus dados e pode acessar seus documentos. O Firmalo funciona diferente: todo o processamento acontece no seu navegador. Não temos servidores que armazenem arquivos, não coletamos dados e não existe a possibilidade técnica de acessar seus documentos.",
      },
      {
        title: "Ideal para documentos sensíveis",
        content: "Contratos trabalhistas, documentos médicos, acordos legais — quando você assina documentos sensíveis, a privacidade não é opcional. Ao não exigir cadastro e processar tudo localmente, o Firmalo é a opção mais segura para assinar documentos confidenciais.",
      },
      {
        title: "Como assinar sem conta em três passos",
        content: "Assinar sem se cadastrar não significa abrir mão de nada: você tem a ferramenta completa desde o primeiro segundo. O processo é idêntico no celular e no computador.",
        bulletPoints: [
          "Abra o Firmalo e arraste seu PDF (ele não é enviado para nenhum servidor)",
          "Desenhe, digite ou envie sua assinatura e posicione onde precisar",
          "Baixe o PDF assinado na hora, sem passar por nenhum email de confirmação",
        ],
      },
      {
        title: "Uma assinatura sem cadastro tem validade jurídica?",
        content: "Sim. A validade jurídica de uma assinatura eletrônica não depende de você se cadastrar em uma plataforma, e sim de haver consentimento e de a assinatura poder ser atribuída a uma pessoa. A assinatura eletrônica simples é válida para a maioria dos contratos e trâmites do dia a dia no Brasil. Cadastrar-se em um serviço não acrescenta valor jurídico — apenas acrescenta fricção e entrega seus dados a terceiros.",
      },
    ],
    faq: [
      { question: "Realmente não preciso criar uma conta?", answer: "Correto. O Firmalo funciona sem nenhum tipo de cadastro. Não pedimos email, nome nem senha." },
      { question: "Como o Firmalo ganha dinheiro se é grátis?", answer: "O Firmalo é um projeto orientado à comunidade. Não monetizamos seus dados nem sua atividade." },
      { question: "Meus documentos ficam armazenados em algum servidor?", answer: "Não. Tudo é processado no navegador. Quando você fecha a página, não fica nenhum rastro do seu documento." },
      { question: "Assinar sem cadastro é seguro?", answer: "Sim, é ainda mais seguro. Como não há conta nem servidor que armazene seu documento, não existe nenhum ponto por onde seus dados possam vazar ou ser hackeados." },
      { question: "Uma assinatura feita sem conta tem validade jurídica?", answer: "Sim. A validade de uma assinatura eletrônica não depende do cadastro em uma plataforma, e sim do consentimento. Para a maioria dos contratos e trâmites ela é perfeitamente válida." },
      { question: "Posso usar o Firmalo sem cadastro quantas vezes quiser?", answer: "Sim. Não há limite de uso nem de documentos, e nunca será pedido para você criar uma conta." },
    ],
    relatedSlugs: ["assinar-pdf-privado-sem-upload", "assinar-pdf-online-gratis", "assinar-pdf-sem-marca-dagua"],
  },
  {
    slug: "assinar-pdf-sem-marca-dagua",
    lang: "pt",
    title: "Assinar PDF sem marca d'água — 100% limpo e profissional | Firmalo",
    metaDescription: "Assine seu PDF sem que apareçam marcas d'água nem logos. Seu documento fica limpo e profissional. Grátis, sem cadastro e sem limites.",
    heroTitle: "Assine seu PDF sem marca d'água",
    heroSubtitle: "Seu documento assinado fica limpo e profissional. Sem logos, sem textos sobrepostos, sem marcas de nenhum tipo.",
    sections: [
      {
        title: "O problema das marcas d'água",
        content: "A maioria das ferramentas gratuitas para assinar PDF adiciona uma marca d'água visível ao documento — um logo, um texto ou uma marca que arruina a apresentação profissional. Isso é inaceitável quando você envia contratos, propostas ou documentos oficiais.",
      },
      {
        title: "Com o Firmalo, seu PDF fica impecável",
        content: "O Firmalo nunca adiciona marcas d'água, logos nem textos adicionais ao seu documento. O que você baixa é exatamente seu PDF original com sua assinatura adicionada — nada mais, nada menos.",
        bulletPoints: [
          "Zero marcas d'água em qualquer documento",
          "Sem logos nem branding sobrepostos",
          "Sem limite de documentos assinados",
          "Qualidade profissional sempre",
        ],
      },
      {
        title: "Comparação com outras ferramentas",
        content: "Ferramentas como SmallPDF, iLovePDF ou Adobe limitam suas versões gratuitas com marcas d'água ou restringem o número de documentos. O Firmalo oferece a experiência completa sem restrições, porque seu documento é processado localmente — não precisamos de servidores caros.",
      },
      {
        title: "Por que uma marca d'água estraga seu documento",
        content: "Um contrato, uma nota fiscal ou uma proposta com o logo de uma ferramenta gratuita por cima passa descuido e pouca seriedade para a outra parte. Pior ainda, algumas marcas d'água ficam sobre o texto e atrapalham a leitura. Quando você envia um documento assinado, só deve aparecer o seu conteúdo e a sua assinatura — nada de publicidade alheia.",
      },
      {
        title: "Documento limpo em qualquer dispositivo",
        content: "Não importa se você assina pelo celular a caminho do trabalho ou pelo computador no escritório: o resultado é sempre um PDF limpo, sem marcas nem compressão. Você pode assinar, conferir o resultado e, se algo não agradar, repetir o processo quantas vezes precisar sem que apareça nenhuma marca.",
        bulletPoints: [
          "Mesmo resultado profissional no iPhone, Android, Windows e Mac",
          "Sem marca d'água mesmo que você assine dezenas de documentos",
          "O PDF mantém sua resolução e formato originais",
        ],
      },
    ],
    faq: [
      { question: "O Firmalo adiciona algum tipo de marca ao meu PDF?", answer: "Não. Seu PDF assinado é exatamente igual ao original, apenas com sua assinatura adicionada." },
      { question: "Existe limite de documentos que posso assinar?", answer: "Não. Você pode assinar todos os documentos que precisar, sem limites nem restrições." },
      { question: "O PDF assinado mantém a mesma qualidade?", answer: "Sim. Não comprimimos nem alteramos a qualidade do documento. Apenas adicionamos sua assinatura na posição escolhida." },
      { question: "Por que outras ferramentas gratuitas colocam marca d'água?", answer: "Costumam usá-la como publicidade ou para empurrar você para a versão paga. O Firmalo não precisa fazer isso porque processa tudo no seu navegador, sem custos de servidor." },
      { question: "Vou precisar pagar para tirar a marca d'água?", answer: "Não. No Firmalo nunca há marca d'água, então não há nada para pagar para tirá-la. É grátis e limpo desde o primeiro documento." },
    ],
    relatedSlugs: ["assinar-pdf-online-gratis", "alternativa-smallpdf-assinar-pdf", "alternativa-docusign-gratis"],
  },
  {
    slug: "adicionar-assinatura-no-pdf",
    lang: "pt",
    title: "Adicionar assinatura no PDF — Guia passo a passo | Firmalo",
    metaDescription: "Aprenda como adicionar sua assinatura em qualquer documento PDF em 3 passos simples. Desenhe, digite ou envie uma imagem. Grátis e sem cadastro.",
    heroTitle: "Adicionar assinatura no PDF em 3 passos",
    heroSubtitle: "Guia completo para adicionar sua assinatura em qualquer documento PDF. Desenhe com o dedo, digite seu nome ou envie uma imagem.",
    sections: [
      {
        title: "Passo 1: Envie seu documento PDF",
        content: "Arraste seu arquivo PDF para a zona de upload ou clique para selecioná-lo do seu dispositivo. O Firmalo aceita arquivos de até 50 MB e funciona com qualquer PDF padrão. Seu arquivo não é enviado para nenhum servidor — é processado diretamente no navegador.",
      },
      {
        title: "Passo 2: Crie sua assinatura",
        content: "O Firmalo oferece três formas de criar sua assinatura, adaptando-se à sua preferência.",
        bulletPoints: [
          "Desenhar: Use o dedo no celular ou o mouse no computador para desenhar sua assinatura real",
          "Digitar: Digite seu nome e escolha entre vários estilos de caligrafia profissional",
          "Enviar imagem: Envie uma foto ou digitalização da sua assinatura manuscrita (PNG, JPG)",
        ],
      },
      {
        title: "Passo 3: Posicione e baixe",
        content: "Após criar sua assinatura, ela aparecerá sobre o PDF. Arraste-a para a posição exata onde precisa e ajuste o tamanho. Se seu PDF tem várias páginas, navegue até a página correta. Quando estiver satisfeito, pressione 'Baixar' e seu PDF assinado será salvo no dispositivo.",
      },
      {
        title: "Onde posicionar a assinatura conforme o documento?",
        content: "O lugar da assinatura muda conforme o tipo de documento. Saber onde ela vai evita ter que refazer o trâmite.",
        bulletPoints: [
          "Contratos: ao final do texto, ao lado do nome e, se houver, sobre a linha de assinatura",
          "Formulários oficiais: no quadro ou campo marcado como «assinatura»",
          "Cartas e autorizações: abaixo do encerramento, antes ou sobre o seu nome digitado",
          "Documentos de várias páginas: na última página e, se exigido, uma rubrica em cada folha",
        ],
      },
      {
        title: "Sua assinatura fica incorporada no PDF",
        content: "Quando você baixa o documento, a assinatura não é um adesivo que possa ser movido ou apagado depois: ela fica incorporada dentro do próprio PDF como parte da página. Isso significa que quem receber o arquivo verá sua assinatura exatamente onde você colocou, em qualquer leitor de PDF e em qualquer dispositivo, sem precisar do Firmalo nem de nenhum programa especial.",
      },
    ],
    faq: [
      { question: "Posso adicionar minha assinatura em um PDF de várias páginas?", answer: "Sim. O Firmalo suporta PDFs de qualquer número de páginas. Navegue até a página onde precisa da assinatura." },
      { question: "Posso mudar o tamanho da minha assinatura?", answer: "Sim. Após colocar a assinatura sobre o PDF, arraste o canto para ajustar o tamanho." },
      { question: "Quais formatos de imagem aceita para enviar assinatura?", answer: "Você pode enviar sua assinatura em formato PNG, JPG ou WebP. Recomendamos PNG com fundo transparente." },
      { question: "Posso adicionar várias assinaturas no mesmo documento?", answer: "Sim. Você pode colocar sua assinatura em diferentes páginas ou posições do mesmo PDF antes de baixá-lo, útil quando um documento pede assinatura em vários pontos." },
      { question: "A assinatura pode ser apagada ou movida depois de baixar o PDF?", answer: "Não. A assinatura fica incorporada dentro do PDF como parte da página, então permanece fixa em qualquer leitor e dispositivo." },
      { question: "Preciso instalar algum programa para adicionar a assinatura?", answer: "Não. Todo o processo acontece no seu navegador, tanto no celular quanto no computador. Não é preciso instalar nem configurar nada." },
    ],
    relatedSlugs: ["criar-assinatura-online", "assinar-pdf-online-gratis", "assinar-pdf-no-celular"],
  },
  {
    slug: "criar-assinatura-online",
    lang: "pt",
    title: "Criar assinatura online grátis — Desenhe, digite ou envie imagem | Firmalo",
    metaDescription: "Crie sua assinatura digital online grátis. Desenhe com o mouse ou dedo, digite seu nome em caligrafia ou envie uma imagem. Sem cadastro.",
    heroTitle: "Crie sua assinatura online grátis",
    heroSubtitle: "Três formas de criar sua assinatura perfeita: desenhe à mão, digite com estilo ou envie uma imagem.",
    sections: [
      {
        title: "Desenhe sua assinatura à mão",
        content: "O modo de desenho permite criar uma assinatura manuscrita autêntica. No celular, desenhe com o dedo diretamente na tela. No computador, use o mouse ou trackpad. O resultado é uma assinatura natural que parece ter sido feita com caneta no papel.",
      },
      {
        title: "Digite seu nome em caligrafia",
        content: "Se prefere uma assinatura mais formal, digite seu nome e escolha entre vários estilos de caligrafia profissional. O Firmalo gera instantaneamente uma assinatura elegante com fontes cursivas desenhadas para parecer escrita à mão. Ideal para documentos formais e profissionais.",
      },
      {
        title: "Envie uma imagem da sua assinatura",
        content: "Já tem sua assinatura digitalizada ou fotografada? Envie a imagem diretamente. O Firmalo aceita arquivos PNG, JPG e WebP.",
        bulletPoints: [
          "PNG com fundo transparente (recomendado)",
          "JPG ou WebP também funcionam",
          "Assine em papel branco e fotografe com boa luz",
          "Recorte a imagem para incluir apenas a assinatura",
        ],
      },
      {
        title: "Dicas para uma assinatura com aparência profissional",
        content: "Uma assinatura digital bem feita faz diferença em um documento formal. Se for desenhar, faça devagar e com traço firme; se a tela for pequena, use o celular na horizontal para ter mais espaço. Se enviar uma foto, garanta fundo branco e luz uniforme, para que ao recortar não fiquem sombras. E se digitar seu nome, escolha um estilo de caligrafia sóbrio: letras muito decorativas ficam difíceis de ler em documentos oficiais.",
      },
      {
        title: "Use sua assinatura em qualquer documento",
        content: "A assinatura que você cria no Firmalo serve para tudo: contratos, formulários, autorizações escolares, recibos ou cartas. Depois de criada, você a coloca sobre o PDF, ajusta o tamanho e baixa o documento com a assinatura incorporada. Como tudo acontece no seu navegador, dá para repetir o processo quantas vezes quiser, sem limites nem custo.",
      },
    ],
    faq: [
      { question: "Qual a melhor forma de criar minha assinatura?", answer: "Depende do contexto. Para documentos informais, desenhar é a opção mais rápida. Para documentos formais, a assinatura digitada em caligrafia ou uma imagem digitalizada ficam mais profissionais." },
      { question: "A assinatura é salva para usar depois?", answer: "Não armazenamos sua assinatura. Por privacidade, cada sessão começa do zero." },
      { question: "Posso mudar a cor da assinatura?", answer: "Atualmente a assinatura é desenhada em cor escura (azul marinho), que é o padrão para assinaturas profissionais." },
      { question: "É grátis criar minha assinatura online?", answer: "Sim, completamente grátis e sem limite. Você pode criar e usar sua assinatura quantas vezes precisar, sem cadastro nem custo." },
      { question: "A assinatura que eu crio tem validade jurídica?", answer: "A assinatura eletrônica simples é válida para a maioria dos contratos e trâmites do dia a dia no Brasil. Para atos que exigem assinatura qualificada, verifique se é necessário um certificado ICP-Brasil." },
      { question: "Posso criar minha assinatura pelo celular?", answer: "Sim. Desenhar com o dedo na tela do celular é, na verdade, a forma mais natural de conseguir uma assinatura manuscrita autêntica." },
    ],
    relatedSlugs: ["adicionar-assinatura-no-pdf", "assinar-pdf-online-gratis", "assinar-pdf-no-celular"],
  },
  {
    slug: "assinar-pdf-no-celular",
    lang: "pt",
    title: "Assinar PDF no celular — iPhone e Android | Firmalo",
    metaDescription: "Assine seu PDF diretamente do celular iPhone ou Android. Desenhe sua assinatura com o dedo, sem instalar apps. Grátis e privado.",
    heroTitle: "Assine seu PDF no celular",
    heroSubtitle: "Assine documentos diretamente do iPhone ou Android. Sem baixar apps, sem cadastro. Desenhe sua assinatura com o dedo.",
    sections: [
      {
        title: "Assine com o dedo, sem apps",
        content: "Não precisa baixar nenhum aplicativo. O Firmalo funciona diretamente no navegador do celular — Safari, Chrome ou qualquer outro. Simplesmente abra a página, envie seu PDF e desenhe sua assinatura com o dedo. A interface touch foi otimizada para telas pequenas.",
      },
      {
        title: "Otimizado para telas touch",
        content: "O Firmalo foi projetado desde o início para funcionar em mobile. A zona de assinatura se adapta ao tamanho da tela, os botões são grandes e fáceis de tocar, e você pode arrastar a assinatura sobre o PDF com gestos naturais.",
        bulletPoints: [
          "Botões e controles otimizados para dedos",
          "Zona de assinatura adaptada para tela touch",
          "Arraste e redimensione a assinatura com gestos",
          "Funciona em orientação vertical e horizontal",
        ],
      },
      {
        title: "Ideal para assinar na correria",
        content: "Recebeu um contrato por WhatsApp ou email e precisa assinar agora? Com o Firmalo você pode assinar de onde estiver — no ônibus, numa reunião ou na rua. Abra o PDF, assine e envie o documento assinado de volta em menos de um minuto.",
      },
      {
        title: "Como assinar um PDF no iPhone",
        content: "No iPhone não é preciso usar o app Arquivos nem o Markup. Abra o PDF no Safari ou Chrome, envie para o Firmalo e assine com o dedo.",
        bulletPoints: [
          "Abra firmalo.io no Safari ou Chrome",
          "Envie o PDF (do app Arquivos, do email ou do chat onde recebeu)",
          "Desenhe sua assinatura com o dedo e posicione sobre o documento",
          "Toque em «Baixar»: o PDF assinado fica no seu app Arquivos",
        ],
      },
      {
        title: "Como assinar um PDF no Android",
        content: "No Android o processo é idêntico. Abra o documento pelo Chrome, Firefox ou pelo gerenciador de arquivos, envie para o Firmalo e assine direto na tela. O PDF assinado é salvo na pasta de Downloads, pronto para reenviar pelo WhatsApp, Gmail ou qualquer app. Não precisa instalar o Adobe nem nenhum aplicativo de assinatura.",
      },
    ],
    faq: [
      { question: "Funciona no iPhone?", answer: "Sim. O Firmalo funciona perfeitamente no Safari e Chrome para iOS. Não precisa baixar nenhum app." },
      { question: "Funciona no Android?", answer: "Sim. Funciona no Chrome, Firefox e qualquer navegador moderno para Android." },
      { question: "O PDF assinado é salvo no meu celular?", answer: "Sim. Ao pressionar 'Baixar', o PDF assinado é salvo na pasta de downloads do celular." },
      { question: "Preciso de internet para assinar?", answer: "Precisa de internet só para abrir a página. Uma vez carregada, o processamento é local." },
      { question: "Preciso instalar algum app para assinar pelo celular?", answer: "Não. O Firmalo funciona dentro do navegador. Não ocupa espaço, não pede permissões e não há nada para instalar." },
      { question: "Posso assinar um PDF que recebi pelo WhatsApp?", answer: "Sim. Salve o PDF do WhatsApp, envie para o Firmalo, assine e reenvie o documento assinado pelo mesmo chat." },
    ],
    relatedSlugs: ["assinar-pdf-online-gratis", "adicionar-assinatura-no-pdf", "criar-assinatura-online"],
  },
  {
    slug: "assinar-contrato-pdf-online",
    lang: "pt",
    title: "Assinar contrato PDF online — Rápido e grátis | Firmalo",
    metaDescription: "Assine seu contrato em PDF online. Sem imprimir, sem scanner. Assine diretamente do celular ou computador. Grátis e privado.",
    heroTitle: "Assine seu contrato em PDF online",
    heroSubtitle: "Sem imprimir, sem scanner. Assine seu contrato diretamente do seu dispositivo e envie de volta em minutos.",
    sections: [
      {
        title: "Assine contratos sem imprimir",
        content: "Não precisa mais imprimir o contrato, assinar à mão e digitalizar. Com o Firmalo, você assina diretamente sobre o PDF digital. O processo leva menos de um minuto e o resultado é um documento profissional pronto para enviar.",
      },
      {
        title: "O que verificar antes de assinar?",
        content: "Antes de assinar qualquer contrato, certifique-se de revisar estes pontos importantes.",
        bulletPoints: [
          "Verifique os dados do proprietário e do imóvel",
          "Revise o valor do aluguel e forma de pagamento",
          "Confirme a duração do contrato e condições de renovação",
          "Leia as cláusulas sobre depósito e garantias",
          "Verifique as condições de rescisão antecipada",
        ],
      },
      {
        title: "Validade legal da assinatura visual",
        content: "O Firmalo coloca uma assinatura visual no PDF. No Brasil, uma assinatura visual em um contrato de aluguel é aceita como demonstração de vontade na maioria dos casos. Para contratos de alto valor, consulte a legislação sobre assinatura eletrônica certificada (ICP-Brasil).",
      },
      {
        title: "As duas partes assinam, sem imprimir",
        content: "Um contrato precisa da assinatura das duas partes. Com o Firmalo não é preciso se encontrar nem imprimir: cada um abre o PDF, coloca sua assinatura e reenvia o documento. O mais comum é uma pessoa assinar primeiro, baixar o PDF já assinado e repassar para a outra adicionar a assinatura no mesmo arquivo. Assim fica um único documento com as duas assinaturas, sem papel.",
      },
      {
        title: "Serve para aluguel, prestação de serviço e mais",
        content: "Funciona igual para um contrato de locação residencial, um aluguel por temporada, uma prestação de serviço, um contrato de freelancer ou a renovação de um já existente. Enquanto o documento estiver em PDF, você pode assiná-lo em segundos pelo celular ou computador, revisar antes de enviar e guardar uma cópia para você.",
      },
    ],
    faq: [
      { question: "Posso assinar um contrato com esta ferramenta?", answer: "Sim. O Firmalo permite colocar sua assinatura visual em qualquer contrato em formato PDF." },
      { question: "A assinatura tem validade legal?", answer: "O Firmalo coloca uma assinatura visual. Sua validade depende da legislação e do acordo entre as partes. Para a maioria dos contratos, é aceita como demonstração de vontade." },
      { question: "Posso assinar se o contrato tem várias páginas?", answer: "Sim. Navegue até a página onde precisa assinar e coloque sua assinatura." },
      { question: "Como fazer para as duas partes assinarem?", answer: "Uma parte assina primeiro e baixa o PDF; depois envia para a outra, que abre o mesmo arquivo no Firmalo e adiciona sua assinatura. O resultado é um único PDF com as duas assinaturas." },
      { question: "Preciso imprimir e digitalizar o contrato?", answer: "Não. É justamente esse passo que o Firmalo elimina: você assina direto sobre o PDF digital, sem impressora nem scanner." },
      { question: "Posso guardar uma cópia do contrato assinado?", answer: "Sim. Ao baixar, o PDF assinado fica no seu dispositivo. Guarde ou reenvie por email ou WhatsApp como qualquer arquivo." },
    ],
    relatedSlugs: ["assinar-contrato-trabalho-pdf", "assinar-pdf-sem-imprimir", "adicionar-assinatura-no-pdf", "assinar-pdf-para-visto"],
  },
  {
    slug: "assinar-pdf-para-visto",
    lang: "pt",
    title: "Assinar PDF para visto — Formulários e documentos | Firmalo",
    metaDescription: "Assine formulários e documentos PDF para seu processo de visto. Sem imprimir, do celular ou PC. Grátis, sem cadastro e privado.",
    heroTitle: "Assine documentos PDF para seu visto",
    heroSubtitle: "Assine formulários, declarações e documentos de suporte para seu processo de visto. Sem imprimir, sem scanner.",
    sections: [
      {
        title: "Assine formulários de visto rapidamente",
        content: "Processos de visto exigem assinar múltiplos documentos: formulários de solicitação, declarações, autorizações de verificação de antecedentes e mais. Com o Firmalo, você pode assinar todos esses documentos diretamente em formato digital.",
      },
      {
        title: "Documentos comuns que precisam de assinatura",
        content: "Estes são os tipos de documentos que tipicamente precisam de assinatura para um processo de visto.",
        bulletPoints: [
          "Formulário de solicitação de visto",
          "Declarações juramentadas",
          "Carta convite assinada",
          "Autorização de verificação de antecedentes",
          "Consentimento para processamento de dados",
        ],
      },
      {
        title: "Dicas para assinar documentos de visto",
        content: "Use sempre sua assinatura consistente — a mesma que aparece no passaporte ou documento de identidade. Assine no espaço indicado do formulário. Alguns consulados preferem assinatura manuscrita original; verifique os requisitos específicos.",
      },
      {
        title: "Privacidade para documentos com dados sensíveis",
        content: "Processos de visto incluem informações delicadas: número do passaporte, dados bancários, endereço e antecedentes. Como o Firmalo processa tudo no seu navegador e nunca envia o arquivo para um servidor, esses dados não ficam nas mãos de terceiros. É uma diferença importante em relação a ferramentas que enviam seus documentos para a nuvem para assinar.",
      },
      {
        title: "Útil para qualquer tipo de visto",
        content: "Serve igual para os documentos de suporte de um visto de turismo, de estudante, de trabalho ou de residência, e para processos em consulados dos Estados Unidos, Canadá, Portugal, países do Espaço Schengen e outros. Lembre que o formulário principal de cada país costuma ser assinado no portal oficial; o Firmalo é ideal para todo o resto: cartas, declarações, autorizações e comprovantes em PDF.",
      },
    ],
    faq: [
      { question: "Os consulados aceitam documentos assinados digitalmente?", answer: "Depende do consulado e do tipo de documento. Muitos aceitam assinatura digital para documentos de suporte. Verifique com seu consulado." },
      { question: "Meu documento assinado é seguro?", answer: "Sim. Seu documento nunca sai do dispositivo. É a forma mais privada de assinar documentos com dados sensíveis." },
      { question: "Funciona para o visto americano?", answer: "O DS-160 é preenchido online no site oficial. O Firmalo é ideal para documentos de suporte como cartas, declarações e outros PDFs." },
      { question: "Serve para vistos de Portugal, Canadá ou Schengen?", answer: "Sim, para os documentos de suporte em PDF de qualquer país. O formulário principal de cada visto costuma ser assinado no portal oficial; o restante você assina com o Firmalo." },
      { question: "Posso assinar uma declaração ou carta convite?", answer: "Sim. São documentos PDF como qualquer outro: envie, coloque sua assinatura no lugar indicado e baixe-os assinados." },
      { question: "Devo usar a mesma assinatura do meu passaporte?", answer: "É o recomendado. Manter uma assinatura consistente com a do passaporte e documento de identidade evita problemas de correspondência no processo." },
    ],
    relatedSlugs: ["assinar-autorizacao-pdf", "assinar-pdf-privado-sem-upload", "assinar-contrato-pdf-online"],
  },
  {
    slug: "alternativa-smallpdf-assinar-pdf",
    lang: "pt",
    title: "Alternativa ao SmallPDF para assinar PDF — Grátis e sem limites | Firmalo",
    metaDescription: "Procurando alternativa gratuita ao SmallPDF? O Firmalo permite assinar PDFs sem limites, sem marca d'água e sem cadastro. 100% privado.",
    heroTitle: "A alternativa gratuita ao SmallPDF",
    heroSubtitle: "Assine PDFs sem os limites do SmallPDF. Sem marca d'água, sem restrições diárias, sem assinatura paga. 100% grátis, sempre.",
    sections: [
      {
        title: "Por que buscar uma alternativa ao SmallPDF?",
        content: "O SmallPDF é popular, mas sua versão gratuita tem limitações: apenas 2 documentos por dia, marca d'água em alguns casos e exige criar conta. Além disso, seus arquivos são enviados para os servidores deles para processamento.",
      },
      {
        title: "Firmalo vs SmallPDF — Comparação",
        content: "Estas são as diferenças-chave entre as duas ferramentas.",
        bulletPoints: [
          "Documentos por dia: SmallPDF limita a 2, Firmalo não tem limite",
          "Marca d'água: SmallPDF adiciona na versão gratuita, Firmalo nunca",
          "Cadastro: SmallPDF exige conta, Firmalo não",
          "Privacidade: SmallPDF envia arquivos para servidores, Firmalo processa localmente",
          "Custo: SmallPDF Pro custa ~R$45/mês, Firmalo é 100% grátis",
        ],
      },
      {
        title: "A vantagem da privacidade",
        content: "A diferença mais importante é a privacidade. O SmallPDF precisa enviar seu arquivo para os servidores para processar. O Firmalo funciona completamente no navegador — seu PDF nunca sai do dispositivo.",
      },
      {
        title: "Trocar do SmallPDF para o Firmalo em 30 segundos",
        content: "Não há nada para instalar nem configurar para fazer a troca. O fluxo é exatamente o que você já conhece, mas sem os limites.",
        bulletPoints: [
          "Abra firmalo.io (não pede conta nem email)",
          "Envie o mesmo PDF que você ia assinar no SmallPDF",
          "Crie sua assinatura: desenhe, digite ou envie uma imagem",
          "Baixe o PDF assinado, sem marca d'água e sem contar documentos",
        ],
      },
      {
        title: "Para que o SmallPDF ainda serve?",
        content: "Sendo justo: o SmallPDF é uma boa suíte se você precisa comprimir, converter, juntar ou dividir PDFs com frequência. Nessas tarefas ele oferece mais que o Firmalo. Mas se o que você quer é especificamente assinar um PDF sem limites diários, sem marca d'água e sem enviar seu arquivo para um servidor, o Firmalo cobre esse caso melhor e de graça.",
      },
    ],
    faq: [
      { question: "O Firmalo faz tudo que o SmallPDF faz?", answer: "O Firmalo se especializa em assinar PDFs. Para outras funções como comprimir ou converter, o SmallPDF oferece mais ferramentas. Mas para assinar, o Firmalo oferece experiência superior." },
      { question: "O Firmalo é realmente grátis para sempre?", answer: "Sim. Não há planos premium nem funcionalidades bloqueadas." },
      { question: "Posso migrar do SmallPDF para o Firmalo?", answer: "Não há nada para migrar. Simplesmente abra o Firmalo e comece a assinar." },
      { question: "O SmallPDF grátis coloca marca d'água ao assinar?", answer: "A versão gratuita tem limites de uso diário e, dependendo da função, pode adicionar marcas. O Firmalo nunca coloca marca d'água, não importa quantos documentos você assine." },
      { question: "Quantos documentos posso assinar grátis no Firmalo?", answer: "Quantos quiser. Não há limite diário nem mensal, diferente do teto de documentos da versão gratuita do SmallPDF." },
      { question: "Meus arquivos são enviados para algum servidor como no SmallPDF?", answer: "Não. O SmallPDF processa nos servidores dele; o Firmalo processa tudo no seu navegador, então o PDF nunca sai do seu dispositivo." },
    ],
    relatedSlugs: ["alternativa-docusign-gratis", "assinar-pdf-sem-marca-dagua", "assinar-pdf-online-gratis"],
    comparison: {
      competitor: "SmallPDF",
      caption: "Comparação rápida para assinar PDF de uso pessoal. O SmallPDF é uma suite completa de PDF; o Firmalo foca só em assinar, sem limites nem nuvem.",
      rows: [
        { feature: "Preço", firmalo: "Grátis sempre", competitor: "Grátis limitado · Pro ~$12/mês" },
        { feature: "Documentos por dia", firmalo: "Sem limite", competitor: "2 por dia na versão grátis" },
        { feature: "Marca d'água", firmalo: "Nunca", competitor: "Em algumas funções da versão grátis" },
        { feature: "Cadastro", firmalo: "Não exige", competitor: "Exige conta" },
        { feature: "Privacidade", firmalo: "Processado no navegador; o arquivo não é enviado", competitor: "Envia seus arquivos para a nuvem" },
        { feature: "Instalação", firmalo: "Nenhuma (web)", competitor: "Nenhuma (web)" },
      ],
    },
  },
  {
    slug: "alternativa-docusign-gratis",
    lang: "pt",
    title: "Alternativa gratuita ao DocuSign para assinar PDF | Firmalo",
    metaDescription: "Procurando alternativa grátis ao DocuSign? O Firmalo permite assinar PDFs sem custo, sem conta e com total privacidade.",
    heroTitle: "Alternativa gratuita ao DocuSign",
    heroSubtitle: "Assine seus PDFs sem o custo nem a complexidade do DocuSign. Grátis, sem conta, com total privacidade.",
    sections: [
      {
        title: "DocuSign vs Firmalo: Quando usar cada um?",
        content: "O DocuSign é uma plataforma de assinatura eletrônica empresarial com funções avançadas: assinatura múltipla, fluxos de aprovação, certificação legal. Mas para uso pessoal — assinar um contrato ou formulário — sua complexidade e custo (R$50-100/mês) são desnecessários. O Firmalo oferece uma solução simples e gratuita.",
      },
      {
        title: "Vantagens do Firmalo para uso pessoal",
        content: "Para assinar documentos do dia a dia, o Firmalo tem vantagens claras.",
        bulletPoints: [
          "Grátis vs R$50-100/mês do DocuSign",
          "Sem necessidade de criar conta",
          "Processo em 30 segundos vs minutos de configuração",
          "Privacidade total — sem servidores intermediários",
          "Sem emails nem notificações desnecessárias",
        ],
      },
      {
        title: "Quando usar o DocuSign?",
        content: "O DocuSign é a melhor opção quando você precisa de: assinatura de múltiplas pessoas, fluxos de aprovação empresariais, assinatura eletrônica avançada com validade ICP-Brasil, ou integração com sistemas empresariais. Para todo o resto, o Firmalo é mais rápido e gratuito.",
      },
      {
        title: "Sem assinatura mensal e sem período de teste",
        content: "O DocuSign trabalha por assinatura: mesmo o plano mais básico custa algumas dezenas de reais por mês, e os testes gratuitos expiram em poucos dias ou documentos. O Firmalo não tem planos, nem cartão, nem data de vencimento. Se você só precisa assinar seus próprios documentos de vez em quando, pagar uma mensalidade por isso não faz sentido.",
      },
      {
        title: "Assine em segundos, sem curva de aprendizado",
        content: "O DocuSign foi pensado para equipes e tem painéis, modelos, papéis e configurações que levam tempo para entender. Para assinar um único documento, isso atrapalha. Com o Firmalo você abre o PDF, assina e baixa — sem tutoriais, sem configurar nada e sem criar uma conta.",
      },
    ],
    faq: [
      { question: "A assinatura do Firmalo tem a mesma validade que o DocuSign?", answer: "O Firmalo coloca uma assinatura visual no PDF. O DocuSign oferece assinatura eletrônica certificada. Para uso pessoal e documentos simples, a assinatura visual é suficiente." },
      { question: "Posso enviar um PDF para outra pessoa assinar?", answer: "Atualmente o Firmalo é uma ferramenta de assinatura individual. Para fluxos de assinatura múltipla, o DocuSign é mais adequado." },
      { question: "O Firmalo terá integração com outras ferramentas?", answer: "O Firmalo foca em ser a ferramenta mais simples para assinar PDFs. Não planejamos integrações empresariais complexas." },
      { question: "Preciso de cartão de crédito para usar o Firmalo?", answer: "Não. Não pedimos cartão, conta nem email. Diferente dos testes do DocuSign, não há nada que expire nem que seja cobrado depois." },
      { question: "O Firmalo serve para uso pessoal e não empresarial?", answer: "Exato. Foi pensado para assinar seus próprios documentos — contratos, formulários, cartas — de forma rápida e gratuita. Para fluxos empresariais com vários signatários, o DocuSign continua mais adequado." },
      { question: "É complicado de usar como o DocuSign?", answer: "Não. Não há painéis, modelos nem configuração. Você envia o PDF, coloca sua assinatura e baixa; todo o processo leva menos de um minuto." },
    ],
    relatedSlugs: ["alternativa-smallpdf-assinar-pdf", "assinar-pdf-online-gratis", "assinar-pdf-sem-cadastro"],
  },

  {
    slug: "assinar-pdf-sem-imprimir",
    lang: "pt",
    title: "Assinar PDF sem imprimir — Sem scanner nem apps | Firmalo",
    metaDescription: "Assine um PDF sem imprimir nem escanear. Adicione sua assinatura no navegador, baixe o documento assinado e envie em segundos. Grátis e privado.",
    heroTitle: "Assine seu PDF sem imprimir",
    heroSubtitle: "Esqueça imprimir, assinar à mão e escanear. Com o Firmalo você coloca sua assinatura diretamente no PDF e baixa o documento pronto para enviar.",
    sections: [
      {
        title: "Como assinar um PDF sem imprimir",
        content: "O processo substitui completamente impressora e scanner. Abra o Firmalo, selecione o PDF, crie sua assinatura e posicione-a na página correta. Tudo acontece no navegador, sem instalar programas nem converter o arquivo.",
        bulletPoints: [
          "Envie ou arraste o PDF do celular ou computador",
          "Desenhe sua assinatura, digite em caligrafia ou envie uma imagem",
          "Mova a assinatura até a linha correta e ajuste o tamanho",
          "Baixe o PDF assinado sem imprimir nenhuma folha",
        ],
      },
      {
        title: "Ideal para contratos, formulários e autorizações",
        content: "Assinar sem imprimir serve para documentos do dia a dia: contratos de aluguel ou trabalho, formulários de trâmites, autorizações, cartas, recibos e anexos. Enquanto o arquivo estiver em PDF, você pode adicionar uma assinatura visual no lugar exato e enviar de volta por email ou WhatsApp.",
      },
      {
        title: "Sem scanner e sem perder qualidade",
        content: "Quando você imprime e escaneia, o documento costuma ficar pesado, torto ou com baixa qualidade. O Firmalo preserva o PDF original e apenas adiciona a assinatura. O resultado fica limpo e mais profissional que uma foto do papel assinado.",
      },
      {
        title: "Privacidade: seu PDF não vai para servidores",
        content: "O arquivo é processado localmente no navegador. Isso importa quando você assina contratos, documentos de identidade, informações médicas ou trâmites com dados pessoais. Não há fila na nuvem nem cópias temporárias em servidores de terceiros.",
      },
    ],
    faq: [
      { question: "Posso assinar um PDF sem imprimir?", answer: "Sim. O Firmalo permite colocar uma assinatura visual diretamente no PDF e baixar o documento assinado." },
      { question: "Preciso instalar Adobe ou outro aplicativo?", answer: "Não. Funciona no navegador, tanto no celular quanto no computador." },
      { question: "O documento assinado continua em PDF?", answer: "Sim. Você baixa um arquivo PDF padrão, pronto para enviar ou guardar." },
      { question: "Posso assinar pelo celular?", answer: "Sim. Você pode desenhar a assinatura com o dedo e posicioná-la no documento pelo iPhone ou Android." },
      { question: "Assinar sem imprimir tem validade jurídica?", answer: "Para muitos trâmites cotidianos e acordos entre partes, a assinatura eletrônica simples é válida. Se o trâmite exigir assinatura qualificada, verifique os requisitos." },
    ],
    relatedSlugs: ["assinar-pdf-online-gratis", "assinar-contrato-pdf-online", "assinar-contrato-trabalho-pdf", "assinar-autorizacao-pdf"],
  },
  {
    slug: "assinar-pdf-privado-sem-upload",
    lang: "pt",
    title: "Assinar PDF privado sem upload de arquivos | Firmalo",
    metaDescription: "Assine PDFs privados sem enviá-los para servidores. O documento é processado no navegador: ideal para contratos, dados pessoais e arquivos sensíveis.",
    heroTitle: "Assine PDFs privados sem upload",
    heroSubtitle: "Seu documento não sai do dispositivo. O Firmalo adiciona a assinatura no navegador, sem conta, sem nuvem e sem cópias em servidores.",
    sections: [
      {
        title: "O que significa assinar sem upload",
        content: "Em muitas ferramentas online, o PDF é enviado para servidores externos para ser processado. O Firmalo funciona diferente: a edição acontece localmente no navegador. Isso reduz exposição, evita cópias temporárias na nuvem e mantém seus documentos sob seu controle.",
      },
      {
        title: "Para documentos com informação sensível",
        content: "Use este fluxo quando o PDF contém dados pessoais, contratos, documentos trabalhistas, informações médicas, passaportes, declarações ou acordos confidenciais. Se você não quer que um terceiro receba o arquivo, use uma ferramenta com processamento local.",
        bulletPoints: [
          "Contratos e anexos com dados das partes",
          "Formulários com número de documento ou endereço",
          "Autorizações, cartas e declarações privadas",
          "PDFs que não devem ficar armazenados em outra plataforma",
        ],
      },
      {
        title: "Sem cadastro e sem histórico de documentos",
        content: "O Firmalo não exige conta para assinar. Sem conta, também não há painel com histórico de documentos, arquivos recentes ou dados vinculados ao seu email. Você abre, assina e fecha: o documento fica com você.",
      },
      {
        title: "Privacidade sem complicar o uso",
        content: "A experiência continua simples: envie o PDF ao navegador, crie a assinatura, posicione e baixe. A diferença é onde o processamento acontece: no seu dispositivo, não em servidores externos.",
      },
    ],
    faq: [
      { question: "Meu PDF é enviado ao Firmalo?", answer: "Não. O processamento acontece localmente no navegador; o arquivo não é enviado aos nossos servidores." },
      { question: "O Firmalo guarda meus documentos?", answer: "Não. Não há armazenamento de documentos nem histórico de arquivos assinados." },
      { question: "Posso assinar documentos confidenciais?", answer: "Sim. Contratos, formulários e PDFs com dados sensíveis são um dos principais casos de uso." },
      { question: "Preciso criar conta para ser mais seguro?", answer: "Não. Para este caso, não criar conta reduz a quantidade de dados pessoais entregues a uma plataforma." },
      { question: "O resultado tem marca d'água?", answer: "Não. Você baixa o PDF assinado sem logos nem marcas d'água." },
    ],
    relatedSlugs: ["assinar-pdf-sem-cadastro", "assinar-pdf-online-gratis", "assinar-pdf-sem-imprimir", "assinar-pdf-para-visto"],
  },
  {
    slug: "assinar-contrato-trabalho-pdf",
    lang: "pt",
    title: "Assinar contrato de trabalho PDF online | Firmalo",
    metaDescription: "Assine um contrato de trabalho em PDF sem imprimir. Adicione sua assinatura no navegador, mantenha a privacidade do documento e baixe pronto para enviar.",
    heroTitle: "Assine seu contrato de trabalho em PDF",
    heroSubtitle: "Para contratos trabalhistas, anexos e acordos de emprego: assine o PDF online sem imprimir, sem scanner e sem enviar o arquivo a servidores.",
    sections: [
      {
        title: "Assine contratos de trabalho sem imprimir",
        content: "Se você recebeu um contrato de trabalho por email, não precisa imprimir, assinar à mão e escanear. Com o Firmalo você abre o PDF, coloca sua assinatura na página indicada e devolve o arquivo assinado em minutos.",
      },
      {
        title: "O que revisar antes de assinar",
        content: "Antes de adicionar a assinatura, confira os pontos básicos do contrato. O Firmalo facilita a assinatura, mas a decisão legal e trabalhista continua sendo sua.",
        bulletPoints: [
          "Razão social da empresa e nome do trabalhador",
          "Cargo, funções e local de trabalho",
          "Salário, benefícios e frequência de pagamento",
          "Jornada, modalidade remota/presencial e data de início",
          "Cláusulas de confidencialidade, exclusividade e rescisão",
        ],
      },
      {
        title: "Também serve para anexos e acordos internos",
        content: "Além do contrato principal, você pode assinar anexos, renovações, acordos de confidencialidade, autorizações de tratamento de dados, recibos e comunicações trabalhistas em PDF. O fluxo é o mesmo para qualquer documento que precise de assinatura visual.",
      },
      {
        title: "Privacidade para informação trabalhista",
        content: "Contratos de trabalho contêm dados pessoais, salário e condições privadas. O Firmalo processa o arquivo no navegador, então o PDF não é enviado para uma nuvem de terceiros para adicionar a assinatura.",
      },
    ],
    faq: [
      { question: "Posso assinar um contrato de trabalho em PDF?", answer: "Sim. Você pode colocar sua assinatura visual no PDF e baixar o documento assinado." },
      { question: "Serve para anexos trabalhistas?", answer: "Sim. Funciona para contratos, anexos, acordos de confidencialidade, recibos e outros documentos em PDF." },
      { question: "Preciso imprimir o contrato?", answer: "Não. A assinatura é adicionada diretamente no PDF digital." },
      { question: "O contrato é enviado para servidores?", answer: "Não. O processamento acontece no navegador." },
      { question: "Tem validade jurídica?", answer: "A assinatura eletrônica simples costuma ser válida para muitos acordos trabalhistas, mas verifique a legislação aplicável e as exigências da empresa." },
    ],
    relatedSlugs: ["assinar-pdf-sem-imprimir", "assinar-contrato-pdf-online", "assinar-pdf-privado-sem-upload", "assinar-autorizacao-pdf"],
  },
  {
    slug: "assinar-autorizacao-pdf",
    lang: "pt",
    title: "Assinar autorização em PDF online | Firmalo",
    metaDescription: "Assine uma autorização em PDF pelo navegador. Sem imprimir, sem scanner, sem cadastro e com processamento privado no seu dispositivo.",
    heroTitle: "Assine uma autorização em PDF online",
    heroSubtitle: "Adicione sua assinatura a autorizações, consentimentos e permissões em PDF sem imprimir nem instalar aplicativos.",
    sections: [
      {
        title: "Para autorizações e consentimentos do dia a dia",
        content: "Autorizações são comuns em trâmites escolares, médicos, trabalhistas, bancários ou de viagem. Se o documento chegou em PDF, você pode assinar com o Firmalo e devolver como arquivo assinado sem usar papel.",
        bulletPoints: [
          "Autorizações escolares ou de menores",
          "Consentimentos para trâmites ou tratamento de dados",
          "Permissões de viagem, entrega ou representação",
          "Cartas simples que exigem assinatura",
        ],
      },
      {
        title: "Assinatura rápida pelo celular ou computador",
        content: "Abra o PDF, crie sua assinatura e posicione no espaço indicado. Se recebeu o arquivo por WhatsApp ou email, dá para fazer tudo no próprio celular e reenviar o PDF assinado em poucos minutos.",
      },
      {
        title: "Sem enviar documentos sensíveis",
        content: "Muitas autorizações incluem nomes, documentos de identidade, endereços ou dados de menores. O Firmalo processa o arquivo no navegador, sem enviar o PDF para servidores externos para assinar.",
      },
      {
        title: "Resultado limpo e pronto para enviar",
        content: "A assinatura fica incorporada no PDF, sem marca d'água nem alteração de formato. Você pode guardar uma cópia e enviar por email, mensagem ou plataforma de trâmites.",
      },
    ],
    faq: [
      { question: "Posso assinar uma autorização em PDF?", answer: "Sim. Envie o PDF, coloque sua assinatura no campo correto e baixe o documento assinado." },
      { question: "Serve para permissões escolares ou de viagem?", answer: "Sim, desde que o documento esteja em PDF e o trâmite aceite assinatura eletrônica simples." },
      { question: "Posso fazer pelo celular?", answer: "Sim. O Firmalo funciona em navegadores móveis e permite desenhar a assinatura com o dedo." },
      { question: "O PDF fica com marca d'água?", answer: "Não. O documento assinado fica limpo, sem logos nem marcas." },
      { question: "O Firmalo guarda a autorização?", answer: "Não. O arquivo é processado localmente no navegador e não é armazenado em servidores." },
    ],
    relatedSlugs: ["assinar-pdf-sem-imprimir", "assinar-pdf-privado-sem-upload", "assinar-pdf-para-visto", "assinar-contrato-trabalho-pdf"],
  },
];

// ─── Lookup functions ───────────────────────────────────────────

const allPages = [...esPages, ...ptPages];
const pageIndex = new Map<string, SeoPageData>();
for (const p of allPages) {
  pageIndex.set(`${p.lang}/${p.slug}`, p);
}

export function getSeoPage(lang: string, slug: string): SeoPageData | null {
  return pageIndex.get(`${lang}/${slug}`) ?? null;
}

export function getAllSeoPages(): { lang: string; slug: string }[] {
  return allPages.map((p) => ({ lang: p.lang, slug: p.slug }));
}

export function getSeoPagesByLang(lang: string): SeoPageData[] {
  return allPages.filter((p) => p.lang === lang);
}
