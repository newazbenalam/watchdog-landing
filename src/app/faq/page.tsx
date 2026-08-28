import type { Metadata } from "next";
import { PageHero } from "../components/AppShell";
import { FaqAccordion } from "../components/Sections";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common WatchLog questions about synthetic monitoring, 1-click SSH provisioning, databases, Keep-Alive, and notification channels.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <main>
      <PageHero
        title="Frequently Asked Questions"
        subtitle="Clear answers about server telemetry, synthetic probes, Keep-Alive, database monitoring, security, and supported platforms."
      />
      <FaqAccordion />
    </main>
  );
}


