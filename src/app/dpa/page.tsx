import type { Metadata } from "next";
import { PageHero, RelatedLegal } from "../components/AppShell";

export const metadata: Metadata = {
  title: "Data Processing Agreement",
  description: "WatchLog Data Processing Agreement (DPA) summary covering processing roles, purposes, sub-processors, security measures, transfers, and deletion obligations under GDPR Article 28.",
  alternates: { canonical: "/dpa" },
};

const sections = [
  ["Purpose of This Agreement", "This Data Processing Agreement (\u201cDPA\u201d) summarizes the terms under which WatchLog processes personal data on behalf of business customers. It applies where WatchLog acts as a processor (Art. 4(8) GDPR) and the customer acts as a controller. Individual users who subscribe for personal use are covered by the Privacy Policy instead."],
  ["Roles of the Parties", "The customer determines the purposes and means of monitoring its own infrastructure and remains controller of telemetry, endpoints, and account data it configures. WatchLog processes that data strictly on the customer's documented instructions as a processor, and does not sell or repurpose it."],
  ["Subject Matter & Duration", "Subject matter: collection, transmission, storage, and display of server telemetry, synthetic check results, database health metrics, audit logs, and notification dispatch. Duration: for the term of the subscription, plus the retention period needed to complete deletion after termination."],
  ["Categories of Data Subjects & Data", "Data subjects include the customer's administrators, developers, and viewers. Data categories include account identifiers (name, email, password hash), role assignments, device push tokens, configured probe targets, and audit event logs. Server credentials used in SSH provisioning are processed in-memory only and never persisted."],
  ["Processing Instructions & Compliance", "WatchLog processes personal data only on documented instructions from the controller, including with regard to transfers, unless required by Union or Member State law. The customer is responsible for ensuring its instructions and configured targets comply with applicable data protection law."],
  ["Sub-processors", "Current sub-processors: Google (Firebase Cloud Messaging) for push notification delivery; transactional email gateway providers for alert delivery; mobile carriers via the BDApps platform for billing. WatchLog will notify customers of any intended changes to sub-processors, giving the opportunity to object, and imposes equivalent data protection obligations on each of them (Art. 28(2), 28(4))."],
  ["Confidentiality (Art. 28(3)(b))", "WatchLog personnel authorized to process personal data are bound by confidentiality obligations and access data on a least-privilege, need-to-know basis enforced through role-based access control."],
  ["Security Measures (Art. 32)", "Encryption in transit (HTTPS/TLS), bcrypt password hashing, rotatable agent API tokens, JWT session rotation, hardware-secured token storage on mobile (Flutter Secure Storage), multi-tenant isolation, environment separation, and enterprise audit trails."],
  ["Assistance with Data Subject Requests (Art. 28(3)(e))", "WatchLog provides dashboards, exports, and deletion workflows enabling controllers to fulfill data subject requests (access, rectification, erasure, portability). Additional reasonable assistance is available via the Contact page."],
  ["Breach Notification (Art. 33(2))", "WatchLog notifies the controller without undue delay after becoming aware of a personal data breach affecting the customer's data, providing information reasonably available to support the controller's own notification obligations."],
  ["Deletion or Return of Data (Art. 28(3)(g))", "At the customer's choice, WatchLog deletes or returns personal data at the end of the service relationship and deletes existing copies unless storage is required by law. Telemetry samples and check logs are pruned automatically per retention policies."],
  ["Audits & Information (Art. 28(3)(h))", "WatchLog makes available documentation and audit summaries reasonably necessary to demonstrate compliance with this DPA and GDPR Article 28. Full on-site audits can be arranged under mutual confidentiality for enterprise customers."],
  ["International Transfers", "Sub-processing involving transfers outside the EEA is covered by adequacy decisions or Standard Contractual Clauses, as detailed in the GDPR Notice (Chapter V)."],
];

const references = [
  ["GDPR Article 28 \u2014 Processor obligations (gdpr-info.eu)", "https://gdpr-info.eu/art-28-gdpr/"],
  ["EU Standard Contractual Clauses (European Commission)", "https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/standard-contractual-clauses-scc_en"],
  ["EDPB recommendations on supplementary measures", "https://www.edpb.europa.eu/our-work-tools/our-documents/recommendations/recommendations-012020-measures-supplement-transfer_en"],
];

export default function DpaPage() {
  return (
    <main>
      <PageHero
        title="Data Processing Agreement"
        subtitle="The Article 28 terms under which WatchLog processes telemetry and account data on behalf of business customers."
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
            <section>
              <h2>Official References</h2>
              <ul className="text-muted-soft">
                {references.map(([label, href]) => (
                  <li key={href}><a href={href} target="_blank" rel="noopener noreferrer">{label}</a></li>
                ))}
              </ul>
            </section>
          </article>
        </div>
      </section>
      <RelatedLegal exclude="/dpa" />
    </main>
  );
}
