import type { Metadata } from "next";
import Home from "../../components/home";

export const metadata: Metadata = { title: "Abdullah Muhameed — Online Coaching & Content", description: "Personalized online coaching and high-impact UGC content by Abdullah Muhameed.", icons: { icon: "/brand/logo-mark.jpg", apple: "/brand/logo-mark.jpg" }, alternates: { languages: { ar: "/", en: "/en" } } };

export default function Page() {
  return <Home language="en" />;
}
