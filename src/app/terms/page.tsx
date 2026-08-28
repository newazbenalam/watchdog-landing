import type { Metadata } from "next";
import { PageHero } from "../components/AppShell";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms and Conditions for WatchLog including service usage, synthetic probes, acceptable use, liability, and SLA policies.",
  alternates: { canonical: "/terms" },
};

const sections = [
  ["Service Description", "WatchLog provides server monitoring, synthetic uptime probes, database telemetry, cold-boot keep-alive warming, incident alerting, and mobile observability dashboards."],
  ["User Accounts & Responsibilities", "Users are responsible for safeguarding their authentication credentials and for all telemetry probes configured within their organizations and projects."],
  ["Acceptable Use & Anti-Abuse", "You may not use WatchLog synthetic probes to initiate Denial of Service (DoS) attacks, flood third-party systems, or overload external endpoints."],
  ["Agent Deployment & System Access", "When using automated SSH provisioning, you grant WatchLog permission to install required runtime dependencies (Node.js) and register systemd background services on the specified target machine."],
  ["Subscription & Billing (BDApps)", "Subscription payments are billed via BDApps mobile carrier integration. You can cancel recurring subscriptions at any time through standard carrier channels."],
  ["Intellectual Property", "The WatchLog application, dashboard, brand, logos, agents, and software are protected under intellectual property and copyright laws."],
  ["Limitation of Liability", "WatchLog is designed for high availability, but does not guarantee 100% uninterrupted monitoring. To the maximum extent permitted by law, WatchLog is not liable for indirect or consequential damages resulting from missed alerts or downtime."],
  ["Changes to Terms", "These terms may be revised periodically. Continued use of WatchLog signifies acceptance of updated terms."],
  ["Contact Information", "For questions regarding these terms, contact newazbenalam@gmail.com."],
];

export default function TermsPage() {
  return (
    <main>
      <PageHero
        title="Terms and Conditions"
        subtitle="The legal terms and conditions governing the use of WatchLog observability and monitoring services."
      />
      <section className="section">
        <div className="container">
          <article className="legal-card">
            {sections.map(([title, body]) => (
              <section key={title}>
                <h2>{title}</h2>
                <p className="text-muted-soft">{body}</p>
              </section>
            ))}
          </article>
        </div>
      </section>
    </main>
  );
}



