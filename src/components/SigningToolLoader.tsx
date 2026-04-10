"use client";

import dynamic from "next/dynamic";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";

const SigningTool = dynamic(
  () => import("./SigningTool").then((m) => ({ default: m.SigningTool })),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-2xl border-2 border-dashed border-border-hover bg-white p-12 flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    ),
  }
);

export function SigningToolLoader({
  dict,
  lang,
}: {
  dict: Dictionary;
  lang: Locale;
}) {
  return <SigningTool dict={dict} lang={lang} />;
}
