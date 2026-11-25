import type { Locale } from "./i18n";

// Single source of truth for the tool catalogue. The header mega-menu, the
// homepage grid and the footer are all built from this list — adding a tool is
// one new entry here (plus its dictionary-free es/pt labels below).
export type ToolGroup = "sign" | "convert" | "organize" | "optimize";
export type ToolStatus = "active" | "soon";

export interface ToolDef {
  id: string;
  group: ToolGroup;
  status: ToolStatus;
  // Only used for active tools; "soon" tools are never rendered as links.
  // `{lang}` is replaced with the current locale.
  href?: string;
  // SVG path data (24x24 viewBox, stroke icon), one string per <path>.
  icon: string[];
  name: Record<Locale, string>;
  description: Record<Locale, string>;
}

export const TOOL_GROUPS: ToolGroup[] = ["sign", "convert", "organize", "optimize"];

export const TOOLS: ToolDef[] = [
  {
    id: "sign-pdf",
    group: "sign",
    status: "active",
    href: "/{lang}",
    icon: ["M12 20h9", "M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"],
    name: { es: "Firmar PDF", pt: "Assinar PDF" },
    description: {
      es: "Dibuja, escribe o sube tu firma. Sin registro.",
      pt: "Desenhe, digite ou envie sua assinatura. Sem cadastro.",
    },
  },
  {
    id: "pdf-to-word",
    group: "convert",
    status: "soon",
    icon: [
      "M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z",
      "M14 3v5h5",
      "m8.5 12.5 1.3 5 2.2-5 2.2 5 1.3-5",
    ],
    name: { es: "Convertir PDF a Word", pt: "Converter PDF em Word" },
    description: {
      es: "Edita el texto de tu PDF en un documento Word.",
      pt: "Edite o texto do seu PDF em um documento Word.",
    },
  },
  {
    id: "merge-pdf",
    group: "organize",
    status: "soon",
    icon: ["m8 6 4-4 4 4", "M12 2v10.3a4 4 0 0 1-1.2 2.9L4 22", "m20 22-5-5"],
    name: { es: "Unir PDF", pt: "Juntar PDF" },
    description: {
      es: "Junta varios PDF en un solo archivo.",
      pt: "Junte vários PDFs em um único arquivo.",
    },
  },
  {
    id: "split-pdf",
    group: "organize",
    status: "soon",
    icon: ["M16 3h5v5", "M8 3H3v5", "M12 22v-8.3a4 4 0 0 0-1.2-2.9L3 3", "m15 9 6-6"],
    name: { es: "Dividir PDF", pt: "Dividir PDF" },
    description: {
      es: "Separa páginas o extrae solo las que necesitas.",
      pt: "Separe páginas ou extraia apenas as que você precisa.",
    },
  },
  {
    id: "compress-pdf",
    group: "optimize",
    status: "soon",
    icon: ["M4 14h6v6M20 10h-6V4M14 10l7-7M3 21l7-7"],
    name: { es: "Comprimir PDF", pt: "Comprimir PDF" },
    description: {
      es: "Reduce el tamaño de tu archivo para enviarlo.",
      pt: "Reduza o tamanho do arquivo para enviá-lo.",
    },
  },
  {
    id: "pdf-to-jpg",
    group: "convert",
    status: "soon",
    icon: [
      "M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      "M9 7a2 2 0 1 0 0 4 2 2 0 0 0 0-4z",
      "m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21",
    ],
    name: { es: "Convertir PDF a JPG", pt: "Converter PDF em JPG" },
    description: {
      es: "Guarda cada página de tu PDF como imagen.",
      pt: "Salve cada página do seu PDF como imagem.",
    },
  },
];

export function toolHref(tool: ToolDef, lang: Locale): string | null {
  if (tool.status !== "active" || !tool.href) return null;
  return tool.href.replace("{lang}", lang);
}

export function toolsByGroup(group: ToolGroup): ToolDef[] {
  return TOOLS.filter((t) => t.group === group);
}

export const FEATURED_TOOL = TOOLS.find((t) => t.status === "active")!;
