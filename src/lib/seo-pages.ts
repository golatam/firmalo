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
        title: "¿Por qué elegir Firmalo para firmar PDF?",
        content: "A diferencia de otras herramientas online, Firmalo procesa tu documento directamente en tu navegador. Esto significa que tu archivo nunca se sube a ningún servidor — tu privacidad está garantizada. Además, es completamente gratuito, sin marcas de agua ni límites de uso.",
      },
      {
        title: "Funciona en cualquier dispositivo",
        content: "Firmalo está diseñado para funcionar perfectamente en celulares, tablets y computadoras. No importa si usas iPhone, Android, Windows o Mac — simplemente abre tu navegador y firma tu PDF. La interfaz táctil está optimizada para que dibujar tu firma con el dedo sea natural y preciso.",
      },
    ],
    faq: [
      { question: "¿Puedo firmar un PDF gratis sin crear cuenta?", answer: "Sí. Firmalo no requiere registro ni cuenta de ningún tipo. Simplemente abre la página, sube tu PDF y firma." },
      { question: "¿Mi PDF firmado tendrá marca de agua?", answer: "No. Tu documento firmado queda completamente limpio y profesional, sin logos ni marcas de agua." },
      { question: "¿Es seguro firmar mi PDF aquí?", answer: "Totalmente. Tu archivo se procesa en tu navegador y nunca se sube a ningún servidor. Nadie tiene acceso a tu documento." },
      { question: "¿Funciona en celular?", answer: "Sí. Firmalo funciona en cualquier navegador moderno, tanto en celular como en computadora." },
    ],
    relatedSlugs: ["firmar-pdf-sin-registro", "firmar-pdf-sin-marca-de-agua", "firmar-pdf-desde-celular"],
  },
  {
    slug: "firmar-pdf-sin-registro",
    lang: "es",
    title: "Firmar PDF sin registro — Sin cuenta ni email | Firmalo",
    metaDescription: "Firma tu PDF sin necesidad de crear una cuenta ni proporcionar tu email. Herramienta 100% privada que funciona directamente en tu navegador.",
    heroTitle: "Firma tu PDF sin registro",
    heroSubtitle: "No te pedimos cuenta, email ni datos personales. Abre Firmalo, sube tu PDF, firma y descarga. Así de simple.",
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
    ],
    faq: [
      { question: "¿Realmente no necesito crear una cuenta?", answer: "Correcto. Firmalo funciona sin ningún tipo de registro. No te pedimos email, nombre ni contraseña." },
      { question: "¿Cómo gana dinero Firmalo si es gratis?", answer: "Firmalo es un proyecto orientado a la comunidad latinoamericana. No monetizamos tus datos ni tu actividad." },
      { question: "¿Mis documentos quedan almacenados en algún servidor?", answer: "No. Todo se procesa en tu navegador. Cuando cierras la página, no queda ningún rastro de tu documento." },
    ],
    relatedSlugs: ["firmar-pdf-online-gratis", "firmar-pdf-sin-marca-de-agua", "crear-firma-online"],
  },
  {
    slug: "firmar-pdf-sin-marca-de-agua",
    lang: "es",
    title: "Firmar PDF sin marca de agua — 100% limpio y profesional | Firmalo",
    metaDescription: "Firma tu PDF sin que aparezcan marcas de agua ni logos. Tu documento queda limpio y profesional. Gratis, sin registro y sin límites.",
    heroTitle: "Firma tu PDF sin marca de agua",
    heroSubtitle: "Tu documento firmado queda limpio y profesional. Sin logos, sin textos superpuestos, sin marcas de ningún tipo.",
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
    ],
    faq: [
      { question: "¿Firmalo agrega algún tipo de marca a mi PDF?", answer: "No. Tu PDF firmado es exactamente igual al original, solo con tu firma añadida. No agregamos marcas de agua, logos ni textos." },
      { question: "¿Hay un límite de documentos que puedo firmar?", answer: "No. Puedes firmar todos los documentos que necesites, sin límites ni restricciones." },
      { question: "¿El PDF firmado mantiene la misma calidad?", answer: "Sí. No comprimimos ni alteramos la calidad de tu documento. Solo añadimos tu firma en la posición que elijas." },
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
    ],
    faq: [
      { question: "¿Puedo añadir mi firma a un PDF de varias páginas?", answer: "Sí. Firmalo soporta PDFs de cualquier número de páginas. Navega hasta la página donde necesitas la firma y posiciónala." },
      { question: "¿Puedo cambiar el tamaño de mi firma?", answer: "Sí. Una vez colocada la firma sobre el PDF, puedes arrastrar la esquina para ajustar el tamaño." },
      { question: "¿Qué formatos de imagen acepta para subir firma?", answer: "Puedes subir tu firma en formato PNG, JPG o WebP. Recomendamos PNG con fondo transparente para el mejor resultado." },
    ],
    relatedSlugs: ["crear-firma-online", "firmar-pdf-online-gratis", "firmar-pdf-desde-celular"],
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
    ],
    faq: [
      { question: "¿Cuál es la mejor forma de crear mi firma?", answer: "Depende del contexto. Para documentos informales, dibujar es la opción más rápida. Para documentos formales, la firma escrita en caligrafía o una imagen escaneada lucen más profesionales." },
      { question: "¿La firma se guarda para usarla después?", answer: "No almacenamos tu firma. Por privacidad, cada sesión comienza desde cero. Si necesitas reutilizar tu firma, guarda la imagen en tu dispositivo." },
      { question: "¿Puedo cambiar el color de la firma?", answer: "Actualmente la firma se dibuja en color oscuro (azul marino), que es el estándar para firmas profesionales." },
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
    ],
    faq: [
      { question: "¿Funciona en iPhone?", answer: "Sí. Firmalo funciona perfectamente en Safari y Chrome para iOS. No necesitas descargar ninguna app." },
      { question: "¿Funciona en Android?", answer: "Sí. Funciona en Chrome, Firefox y cualquier navegador moderno para Android." },
      { question: "¿El PDF firmado se guarda en mi celular?", answer: "Sí. Al presionar 'Descargar', el PDF firmado se guarda en la carpeta de descargas de tu celular." },
      { question: "¿Necesito internet para firmar?", answer: "Necesitas internet solo para abrir la página. Una vez cargada, el procesamiento es local y no requiere conexión." },
    ],
    relatedSlugs: ["firmar-pdf-online-gratis", "anadir-firma-a-pdf", "crear-firma-online"],
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
    ],
    faq: [
      { question: "¿Puedo firmar un contrato de alquiler con esta herramienta?", answer: "Sí. Firmalo te permite colocar tu firma visual en cualquier contrato en formato PDF. Es la forma más rápida de firmar sin imprimir." },
      { question: "¿La firma tiene validez legal?", answer: "Firmalo coloca una firma visual. Su validez depende de la legislación de tu país y del acuerdo entre las partes. Para la mayoría de contratos de alquiler, es aceptada como muestra de voluntad." },
      { question: "¿Puedo firmar si el contrato tiene varias páginas?", answer: "Sí. Navega hasta la página donde necesitas firmar y coloca tu firma. Firmalo soporta PDFs de cualquier extensión." },
    ],
    relatedSlugs: ["firmar-pdf-online-gratis", "anadir-firma-a-pdf", "firmar-pdf-para-visa"],
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
    ],
    faq: [
      { question: "¿Los consulados aceptan documentos firmados digitalmente?", answer: "Depende del consulado y del tipo de documento. Muchos aceptan firma digital para documentos de soporte, pero algunos exigen firma manuscrita original para el formulario principal. Verifica con tu consulado." },
      { question: "¿Puedo firmar el formulario DS-160 con Firmalo?", answer: "El DS-160 se firma electrónicamente en el sitio oficial del gobierno. Firmalo es ideal para documentos de soporte como cartas, declaraciones y otros PDFs." },
      { question: "¿Mi documento firmado es seguro?", answer: "Sí. Tu documento nunca sale de tu dispositivo. Es la forma más privada de firmar documentos con información sensible como datos de pasaporte." },
    ],
    relatedSlugs: ["firmar-pdf-online-gratis", "firmar-contrato-alquiler-pdf", "firmar-pdf-sin-registro"],
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
    ],
    faq: [
      { question: "¿Firmalo hace todo lo que hace SmallPDF?", answer: "Firmalo se especializa en firmar PDFs. Para otras funciones como comprimir, convertir o fusionar PDFs, SmallPDF ofrece más herramientas. Pero para firmar, Firmalo ofrece una experiencia superior y sin limitaciones." },
      { question: "¿Firmalo es realmente gratis para siempre?", answer: "Sí. No hay planes premium, pruebas gratuitas ni funciones bloqueadas. La herramienta completa es gratuita." },
      { question: "¿Puedo migrar de SmallPDF a Firmalo?", answer: "No hay nada que migrar. Simplemente abre Firmalo, sube tu PDF y firma. No necesitas cuenta ni configuración." },
    ],
    relatedSlugs: ["alternativa-docusign-gratis", "firmar-pdf-sin-marca-de-agua", "firmar-pdf-online-gratis"],
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
    ],
    faq: [
      { question: "¿La firma de Firmalo tiene la misma validez que DocuSign?", answer: "Firmalo coloca una firma visual en el PDF. DocuSign ofrece firma electrónica certificada con mayor validez legal. Para uso personal y documentos simples, la firma visual es suficiente. Para contratos empresariales importantes, DocuSign puede ser más apropiado." },
      { question: "¿Puedo enviar un PDF para que otra persona lo firme?", answer: "Actualmente Firmalo es una herramienta de firma individual. Si necesitas que otra persona firme, envíale el PDF y que use Firmalo también. Para flujos de firma múltiple, DocuSign es más adecuado." },
      { question: "¿Firmalo se integrará con otras herramientas?", answer: "Firmalo se enfoca en ser la herramienta más simple para firmar PDFs. No planeamos integraciones empresariales complejas — esa es la fortaleza de DocuSign." },
    ],
    relatedSlugs: ["alternativa-smallpdf-firmar-pdf", "firmar-pdf-online-gratis", "firmar-pdf-sin-registro"],
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
        title: "Por que escolher o Firmalo?",
        content: "Diferente de outras ferramentas online, o Firmalo processa seu documento diretamente no navegador. Isso significa que seu arquivo nunca é enviado para nenhum servidor — sua privacidade está garantida. Além disso, é completamente gratuito, sem marcas d'água nem limites de uso.",
      },
      {
        title: "Funciona em qualquer dispositivo",
        content: "O Firmalo foi projetado para funcionar perfeitamente em celulares, tablets e computadores. Não importa se você usa iPhone, Android, Windows ou Mac — simplesmente abra seu navegador e assine seu PDF. A interface touch foi otimizada para que desenhar sua assinatura com o dedo seja natural e preciso.",
      },
    ],
    faq: [
      { question: "Posso assinar um PDF grátis sem criar conta?", answer: "Sim. O Firmalo não exige cadastro nem conta de nenhum tipo. Simplesmente abra a página, envie seu PDF e assine." },
      { question: "Meu PDF assinado terá marca d'água?", answer: "Não. Seu documento assinado fica completamente limpo e profissional, sem logos nem marcas d'água." },
      { question: "É seguro assinar meu PDF aqui?", answer: "Totalmente. Seu arquivo é processado no navegador e nunca é enviado para nenhum servidor. Ninguém tem acesso ao seu documento." },
      { question: "Funciona no celular?", answer: "Sim. O Firmalo funciona em qualquer navegador moderno, tanto no celular quanto no computador." },
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
    ],
    faq: [
      { question: "Realmente não preciso criar uma conta?", answer: "Correto. O Firmalo funciona sem nenhum tipo de cadastro. Não pedimos email, nome nem senha." },
      { question: "Como o Firmalo ganha dinheiro se é grátis?", answer: "O Firmalo é um projeto orientado à comunidade. Não monetizamos seus dados nem sua atividade." },
      { question: "Meus documentos ficam armazenados em algum servidor?", answer: "Não. Tudo é processado no navegador. Quando você fecha a página, não fica nenhum rastro do seu documento." },
    ],
    relatedSlugs: ["assinar-pdf-online-gratis", "assinar-pdf-sem-marca-dagua", "criar-assinatura-online"],
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
    ],
    faq: [
      { question: "O Firmalo adiciona algum tipo de marca ao meu PDF?", answer: "Não. Seu PDF assinado é exatamente igual ao original, apenas com sua assinatura adicionada." },
      { question: "Existe limite de documentos que posso assinar?", answer: "Não. Você pode assinar todos os documentos que precisar, sem limites nem restrições." },
      { question: "O PDF assinado mantém a mesma qualidade?", answer: "Sim. Não comprimimos nem alteramos a qualidade do documento. Apenas adicionamos sua assinatura na posição escolhida." },
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
    ],
    faq: [
      { question: "Posso adicionar minha assinatura em um PDF de várias páginas?", answer: "Sim. O Firmalo suporta PDFs de qualquer número de páginas. Navegue até a página onde precisa da assinatura." },
      { question: "Posso mudar o tamanho da minha assinatura?", answer: "Sim. Após colocar a assinatura sobre o PDF, arraste o canto para ajustar o tamanho." },
      { question: "Quais formatos de imagem aceita para enviar assinatura?", answer: "Você pode enviar sua assinatura em formato PNG, JPG ou WebP. Recomendamos PNG com fundo transparente." },
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
    ],
    faq: [
      { question: "Qual a melhor forma de criar minha assinatura?", answer: "Depende do contexto. Para documentos informais, desenhar é a opção mais rápida. Para documentos formais, a assinatura digitada em caligrafia ou uma imagem digitalizada ficam mais profissionais." },
      { question: "A assinatura é salva para usar depois?", answer: "Não armazenamos sua assinatura. Por privacidade, cada sessão começa do zero." },
      { question: "Posso mudar a cor da assinatura?", answer: "Atualmente a assinatura é desenhada em cor escura (azul marinho), que é o padrão para assinaturas profissionais." },
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
    ],
    faq: [
      { question: "Funciona no iPhone?", answer: "Sim. O Firmalo funciona perfeitamente no Safari e Chrome para iOS. Não precisa baixar nenhum app." },
      { question: "Funciona no Android?", answer: "Sim. Funciona no Chrome, Firefox e qualquer navegador moderno para Android." },
      { question: "O PDF assinado é salvo no meu celular?", answer: "Sim. Ao pressionar 'Baixar', o PDF assinado é salvo na pasta de downloads do celular." },
      { question: "Preciso de internet para assinar?", answer: "Precisa de internet só para abrir a página. Uma vez carregada, o processamento é local." },
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
    ],
    faq: [
      { question: "Posso assinar um contrato com esta ferramenta?", answer: "Sim. O Firmalo permite colocar sua assinatura visual em qualquer contrato em formato PDF." },
      { question: "A assinatura tem validade legal?", answer: "O Firmalo coloca uma assinatura visual. Sua validade depende da legislação e do acordo entre as partes. Para a maioria dos contratos, é aceita como demonstração de vontade." },
      { question: "Posso assinar se o contrato tem várias páginas?", answer: "Sim. Navegue até a página onde precisa assinar e coloque sua assinatura." },
    ],
    relatedSlugs: ["assinar-pdf-online-gratis", "adicionar-assinatura-no-pdf", "assinar-pdf-para-visto"],
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
    ],
    faq: [
      { question: "Os consulados aceitam documentos assinados digitalmente?", answer: "Depende do consulado e do tipo de documento. Muitos aceitam assinatura digital para documentos de suporte. Verifique com seu consulado." },
      { question: "Meu documento assinado é seguro?", answer: "Sim. Seu documento nunca sai do dispositivo. É a forma mais privada de assinar documentos com dados sensíveis." },
      { question: "Funciona para o visto americano?", answer: "O DS-160 é preenchido online no site oficial. O Firmalo é ideal para documentos de suporte como cartas, declarações e outros PDFs." },
    ],
    relatedSlugs: ["assinar-pdf-online-gratis", "assinar-contrato-pdf-online", "assinar-pdf-sem-cadastro"],
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
    ],
    faq: [
      { question: "O Firmalo faz tudo que o SmallPDF faz?", answer: "O Firmalo se especializa em assinar PDFs. Para outras funções como comprimir ou converter, o SmallPDF oferece mais ferramentas. Mas para assinar, o Firmalo oferece experiência superior." },
      { question: "O Firmalo é realmente grátis para sempre?", answer: "Sim. Não há planos premium nem funcionalidades bloqueadas." },
      { question: "Posso migrar do SmallPDF para o Firmalo?", answer: "Não há nada para migrar. Simplesmente abra o Firmalo e comece a assinar." },
    ],
    relatedSlugs: ["alternativa-docusign-gratis", "assinar-pdf-sem-marca-dagua", "assinar-pdf-online-gratis"],
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
    ],
    faq: [
      { question: "A assinatura do Firmalo tem a mesma validade que o DocuSign?", answer: "O Firmalo coloca uma assinatura visual no PDF. O DocuSign oferece assinatura eletrônica certificada. Para uso pessoal e documentos simples, a assinatura visual é suficiente." },
      { question: "Posso enviar um PDF para outra pessoa assinar?", answer: "Atualmente o Firmalo é uma ferramenta de assinatura individual. Para fluxos de assinatura múltipla, o DocuSign é mais adequado." },
      { question: "O Firmalo terá integração com outras ferramentas?", answer: "O Firmalo foca em ser a ferramenta mais simples para assinar PDFs. Não planejamos integrações empresariais complexas." },
    ],
    relatedSlugs: ["alternativa-smallpdf-assinar-pdf", "assinar-pdf-online-gratis", "assinar-pdf-sem-cadastro"],
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
