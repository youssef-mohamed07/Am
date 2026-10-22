import SiteLayout, { arabicMetadata } from "../../components/site-layout";

export const metadata = arabicMetadata;

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteLayout language="ar">{children}</SiteLayout>;
}
