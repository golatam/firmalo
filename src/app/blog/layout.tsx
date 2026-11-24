import { Inter } from "next/font/google";
import { getDictionary } from "@/lib/dictionaries";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"], display: "swap" });

// /blog lives outside [lang] (URL template is /blog/{slug}), so it needs its own
// <html> shell. Articles are treated as Spanish for now.
export default async function BlogLayout({ children }: { children: React.ReactNode }) {
  const dict = await getDictionary("es");

  return (
    <html lang="es" className={`h-full antialiased ${inter.className}`}>
      <body className="min-h-full flex flex-col bg-surface text-text">
        <GoogleAnalytics />
        <Header lang="es" dict={dict} />
        <main className="flex-1">{children}</main>
        <Footer lang="es" dict={dict} />
      </body>
    </html>
  );
}
