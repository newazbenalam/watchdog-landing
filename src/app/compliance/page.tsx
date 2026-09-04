import type { Metadata } from "next";
import { PageHero, RelatedLegal } from "../components/AppShell";

export const metadata: Metadata = {
  title: "Security & Compliance",
  description: "WatchLog security and compliance center: GDPR and CCPA alignment, encryption and credential handling, carrier billing compliance, and links to every legal document.",
  alternates: { canonical: "/compliance" },
};

const sections = [
  ["Our Compliance Approach", "WatchLog is engineered to align with internationally recognized privacy and security frameworks, including the EU General Data Protection Regulation (GDPR), the California Consumer Privacy Act (CCPA), and the ePrivacy Directive. Alignment means our architecture, policies, and workflows are designed to support these obligations; certification claims, where applicable, are listed separately."],
  ["Privacy by Design & Default", "Tenant isolation with multi-tenant organizations, environment separation (Production/Staging/Development), role-based access control (Owner/Admin/Developer/Viewer), and zero persistent credential storage are architectural decisions made at the product level, not retrofitted controls."],
  ["Data Security Measures", "Encryption in transit (HTTPS/TLS) across the platform, bcrypt-hashed passwords, Flutter Secure Storage for tokens on mobile clients, in-memory-only SSH credential handling during provisioning, rotatable agent API tokens, JWT session rotation, and enterprise audit trails."],
  ["Your Rights, Operationalized", "Access, export, restriction, objection, and full deletion of personal and organizational data are supported by in-product workflows and the account deletion request page, aligned with GDPR Articles 15\u201322 and CCPA consumer rights."],
  ["Carrier Billing Compliance (BDApps)", "Mobile-carrier subscriptions are processed through the BDApps platform in cooperation with local operators. Billing, opt-in confirmation, renewal notices, and cancellation channels follow carrier and telecom regulator requirements; you may cancel recurring subscriptions at any time through standard carrier channels."],
  ["Data Transfers", "Cross-border data flows rely on adequacy decisions or Standard Contractual Clauses as described in the GDPR Notice. Telemetry is minimized: probes process status codes, timings, headers, and expected payloads rather than full third-party response bodies."],
  ["Vulnerability Disclosure", "Security researchers are encouraged to report suspected vulnerabilities to newazbenalam@gmail.com. We ask for good-faith, non-disruptive testing and will acknowledge and investigate reports promptly."],
  ["Certification Status", "WatchLog is designed in alignment with the control objectives of frameworks such as ISO/IEC 27001 and SOC 2 but makes no certification claims unless explicitly and publicly stated by the operator. Do not interpret \u201calignment\u201d as \u201ccertification\u201d."],
  ["Policy Governance", "All WatchLog legal and compliance documents below are reviewed together when regulations, features, or sub-processors change. Continued use of the service after updates constitutes acceptance, as set out in the Terms and Conditions."],
];

const references = [
  ["GDPR Regulation (EU) 2016/679 (EUR-Lex)", "https://eur-lex.europa.eu/eli/reg/2016/679/oj"],
  ["California Consumer Privacy Act (CCPA)", "https://oag.ca.gov/privacy/ccpa"],
  ["ISO/IEC 27001 information security standard", "https://www.iso.org/standard/27001"],
  ["ePrivacy Directive 2002/58/EC (EUR-Lex)", "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex%3A32002L0058"],
];

export default function CompliancePage() {
  return (
    <main>
      <PageHero
        title="Security & Compliance"
        subtitle="How WatchLog aligns with GDPR, CCPA, and ePrivacy obligations \u2014 and the security controls built into every agent, probe, and dashboard."
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
      <RelatedLegal exclude="/compliance" />
    </main>
  );
}
