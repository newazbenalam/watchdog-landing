import type { Metadata } from "next";
import { PageHero } from "../components/AppShell";
import { FeaturesGrid, ScreenshotGallery, WorkflowSection } from "../components/Sections";

export const metadata: Metadata = {
  title: "Features",
  description: "Explore WatchLog synthetic probes, 1-click SSH server provisioning, PostgreSQL/MySQL/Redis database monitoring, cold-boot warmers, and mobile incident alerts.",
  alternates: { canonical: "/features" },
};

export default function FeaturesPage() {
  return (
    <main>
      <PageHero
        title="WatchLog Features"
        subtitle="Complete observability workspace with 30s heartbeats, multi-protocol synthetic checks, deep database telemetry, automated server provisioning, and instant mobile alerts."
      />
      <FeaturesGrid expanded />
      <ScreenshotGallery />
      <WorkflowSection />
    </main>
  );
}


