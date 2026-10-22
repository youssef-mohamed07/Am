import type { Metadata } from "next";
import { Anton, Geist } from "next/font/google";
import localFont from "next/font/local";
import "../app/globals.css";
import "../app/site.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const displayFont = Anton({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

const arabicSerif = localFont({
  src: [
    { path: "../../public/Thmanyah-Font-Family/thmanyah typeface/thmanyahserifdisplay/woff2/thmanyahserifdisplay-Bold.woff2", weight: "700", style: "normal" },
    { path: "../../public/Thmanyah-Font-Family/thmanyah typeface/thmanyahserifdisplay/woff2/thmanyahserifdisplay-Black.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-arabic-serif",
  display: "swap",
});

const arabicFont = localFont({
  src: [
    { path: "../../public/Thmanyah-Font-Family/thmanyah typeface/thmanyahsans/woff2/thmanyahsans-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/Thmanyah-Font-Family/thmanyah typeface/thmanyahsans/woff2/thmanyahsans-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../public/Thmanyah-Font-Family/thmanyah typeface/thmanyahsans/woff2/thmanyahsans-Bold.woff2", weight: "700", style: "normal" },
    { path: "../../public/Thmanyah-Font-Family/thmanyah typeface/thmanyahsans/woff2/thmanyahsans-Black.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-arabic",
  display: "swap",
});

export const arabicMetadata: Metadata = {
  title: "فيت وذ عبدالله — تدريب أونلاين وصناعة محتوى",
  description: "تدريب أونلاين بخطة تناسبك، ومحتوى يقرّب البراند من جمهوره مع عبدالله.",
  alternates: { languages: { ar: "/", en: "/en" } },
};

export default function SiteLayout({ children, language }: { children: React.ReactNode; language: "ar" | "en" }) {
  return (
    <html
      lang={language}
      dir={language === "ar" ? "rtl" : "ltr"}
      className={`${geistSans.variable} ${displayFont.variable} ${arabicFont.variable} ${arabicSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
