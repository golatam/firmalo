import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://firmalo.io"),
  title: {
    default: "Firmalo — Firma PDF online gratis",
    template: "%s | Firmalo",
  },
  description:
    "Firma tu PDF online gratis. Sin registro, sin marca de agua. Tu archivo nunca sale de tu dispositivo.",
  openGraph: {
    type: "website",
    siteName: "Firmalo",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
