import type { Metadata } from "next";
import Home from "../../components/home";

export const metadata: Metadata = { title: "FitWithAbdallah — Coaching & UGC Studio", description: "Personalized online coaching and high-impact UGC content by FitWithAbdallah.", alternates: { languages: { ar: "/", en: "/en" } } };

export default function Page() {
  return <Home language="en" />;
}
