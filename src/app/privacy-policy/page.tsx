import type { Metadata } from "next";
import { PageHero } from "../components/AppShell";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for WatchLog covering collected telemetry, server credentials, notification dispatch, data retention, and user rights.",
  alternates: { canonical: "/privacy-policy" },
};

const sections = [
  [
    "Information Collected",
    "WatchLog may collect account credentials (name, email address, password hash), organization and project metadata, device tokens for push notifications (FCM), server telemetry (CPU, RAM, disk, network, uptime, service statuses), synthetic check targets, database connection configurations, and audit event logs.",
  ],
  [
    "Server Credentials & In-Memory SSH Execution",
    "When using automated SSH provisioning, SSH credentials (passwords, private keys, sudo credentials) are processed strictly in-memory during deployment and are NEVER written to disk, database, or persistent log stores. Agent communication is authenticated via unique, rotatable API tokens.",
  ],
  [
    "Synthetic Probes & Health Checks",
    "Synthetic checks query user-configured URLs, IP addresses, TCP ports, DNS servers, and databases. We only process status codes, response times, headers, and expected response payloads to calculate uptime and trigger alert rules.",
  ],
  [
    "Data Storage & Retention",
    "Telemetry metrics and check records are stored in high-performance transactional time-series databases. Old metric samples and check logs are automatically pruned according to data retention policies.",
  ],
  [
    "Data Sharing",
    "Personal data and telemetry logs are never sold. Telemetry is transmitted to third-party services only when necessary for alert delivery (Firebase Cloud Messaging, transactional email gateways).",
  ],
  [
    "User Rights & Compliance",
    "Under GDPR, CCPA, and applicable global privacy regulations, users can inspect, export, restrict, or request full deletion of their personal and organizational data.",
  ],
  [
    "Security",
    "We use industry-standard encryption in transit (HTTPS / TLS), secure hardware storage on mobile devices (Flutter Secure Storage), and hashed passwords with bcrypt.",
  ],
  [
    "Changes to this Policy",
    "This privacy policy may be updated periodically to reflect new features, agent updates, or regulatory requirements.",
  ],
  [
    "Contact & Data Protection",
    "For privacy requests, data deletion, or security disclosures, please email newazbenalam@gmail.com.",
  ],
];

export default function PrivacyPage() {
  return (
    <main>
      <PageHero
        title="Privacy Policy"
        subtitle="A transparent, GDPR-friendly overview of how WatchLog handles server telemetry, credentials, and notification data."
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



