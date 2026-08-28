import { Cta } from "./components/AppShell";
import { ComparisonSection, FaqAccordion, FeaturesGrid, Hero, PricingSection, ScreenshotGallery, TrustSection, WorkflowSection } from "./components/Sections";

export default function Home() {
  return <main><Hero /><TrustSection /><FeaturesGrid /><PricingSection /><ComparisonSection /><ScreenshotGallery /><WorkflowSection /><FaqAccordion limit={8} /></main>;
}


