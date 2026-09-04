import type { Metadata } from "next";
import { PageHero, RelatedLegal } from "../components/AppShell";

export const metadata: Metadata = {
  title: "GDPR Notice",
  description: "GDPR compliance notice for WatchLog covering lawful bases, data subject rights, retention, international transfers, and sub-processors under Regulation (EU) 2016/679.",
  alternates: { canonical: "/gdpr" },
};

const sections = [
  ["Data Controller", "The controller responsible for personal data processed through WatchLog is [Legal Entity Name], [Registered Address] (\u201cWatchLog\u201d). Data protection inquiries and requests can be sent to newazbenalam@gmail.com. Please complete the registered entity details before publishing."],
  ["Categories of Personal Data", "We process account data (name, email, password hash), organizational and project metadata, device push tokens for Firebase Cloud Messaging (FCM), server telemetry metrics (CPU, RAM, disk, network, uptime, service status), synthetic check targets and results, database connection configurations, and audit event logs."],
  ["Lawful Bases of Processing (Art. 6 GDPR)", "Contract performance (Art. 6(1)(b)) for providing monitoring dashboards, agents, and alerts; legitimate interests (Art. 6(1)(f)) for service security, abuse prevention, and product improvement; consent (Art. 6(1)(a)) where required, e.g. optional notifications; legal obligations (Art. 6(1)(c)) for accounting and billing records processed via the BDApps carrier platform."],
  ["Purposes of Processing", "Personal data is processed to authenticate users, operate organizations and projects, collect and visualize server and database telemetry, run synthetic probes, deliver FCM push and email alerts, detect abuse, and fulfill subscription billing through mobile carriers."],
  ["Data Subject Rights (Art. 15\u201322 GDPR)", "You have the right to access (Art. 15), rectification (Art. 16), erasure (Art. 17), restriction (Art. 18), data portability (Art. 20), and objection (Art. 21), as well as the right to withdraw consent at any time. Requests can be submitted via the Contact page or by email; we respond within one month, extendable by two further months for complex requests (Art. 12(3)). You may lodge a complaint with your national supervisory authority (Art. 77)."],
  ["Data Retention", "Telemetry metrics and check logs are retained for the duration of your subscription and pruned automatically according to retention policies. Account data is retained while your account is active and deleted or anonymized after account deletion requests are processed, subject to statutory retention periods for billing records."],
  ["International Transfers (Chapter V GDPR)", "Where personal data is transferred outside the EEA, transfers rely on adequacy decisions or appropriate safeguards such as Standard Contractual Clauses (Art. 46). Server credentials processed during SSH provisioning are handled strictly in-memory and never persisted, minimizing exposure during any transfer."],
  ["Processors & Sub-processors", "We use Firebase Cloud Messaging (Google) for push notification delivery, transactional email gateways for alerts, and mobile carriers via the BDApps platform for subscription billing. Data sharing is limited to what is necessary for alert delivery, service operation, and billing, as described in the Privacy Policy and Data Processing Agreement."],
  ["Security Measures (Art. 32 GDPR)", "We apply encryption in transit (HTTPS/TLS), bcrypt password hashing, Flutter Secure Storage on mobile clients, in-memory-only handling of SSH credentials, rotatable agent API tokens, JWT session rotation, and role-based access control with audit trails."],
  ["Data Protection by Design & Default (Art. 25)", "Organizations, environments, and role-based permissions are separated by design. Zero persistent credential storage, configurable retention, and tenant partitioning are built into the product architecture."],
  ["Breach Notification (Art. 33\u201334)", "In the event of a personal data breach likely to result in a risk to individuals, we will notify the competent supervisory authority within 72 hours where required, and communicate the breach to affected users when the risk is high."],
  ["Children's Data", "WatchLog is not directed at children under 16 and we do not knowingly process their personal data. If you believe a minor has created an account, contact us for immediate removal."],
];

const references = [
  ["Full text of Regulation (EU) 2016/679 (GDPR)", "https://eur-lex.europa.eu/eli/reg/2016/679/oj"],
  ["Chapter III \u2014 Data subject rights (gdpr-info.eu)", "https://gdpr-info.eu/chapter-3/"],
  ["Chapter V \u2014 International transfers (gdpr-info.eu)", "https://gdpr-info.eu/chapter-5/"],
  ["ICO \u2014 UK GDPR guidance and resources", "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/"],
  ["List of EU standard contractual clauses (European Commission)", "https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/standard-contractual-clauses-scc_en"],
];

export default function GdprPage() {
  return (
    <main>
      <PageHero
        title="GDPR Notice"
        subtitle="How WatchLog complies with Regulation (EU) 2016/679: lawful bases, your rights as a data subject, transfers, and security of processing."
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
            <p className="text-muted-soft small mt-4">This notice summarizes obligations under the GDPR but does not constitute legal advice. Consult a qualified professional for entity-specific compliance.</p>
          </article>
        </div>
      </section>
      <RelatedLegal exclude="/gdpr" />
    </main>
  );
}
