import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
});

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
