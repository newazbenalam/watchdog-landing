import type { Metadata } from "next";
import { PageHero, RelatedLegal } from "../components/AppShell";

export const metadata: Metadata = {
  title: "Legal Notice",
  description: "Legal notice and imprint for WatchLog including operator identity, contact details, intellectual property, liability disclaimers, and governing law.",
  alternates: { canonical: "/legal-notice" },
};

const sections = [
  ["Operator Information", "WatchLog is operated by [Legal Entity Name], [Registered Address], [Registration Number], [Country] (hereinafter \u201cWatchLog\u201d, \u201cwe\u201d, \u201cus\u201d). Fill in the registered company details before publishing this notice. General inquiries can be directed to newazbenalam@gmail.com at any time."],
  ["Contact", "Email: newazbenalam@gmail.com. Postal and phone contact details should reflect the registered business address above. We aim to respond to legitimate inquiries within 5 business days."],
  ["Represented By", "The service is legally represented by [Managing Director / Owner Name]. Please update this field to match the registered representative of the operating entity."],
  ["Scope of Service", "WatchLog provides server telemetry, synthetic uptime probes, database observability, keep-alive warming, and incident alerting as a software service. The platform is provided \u201cas is\u201d and \u201cas available\u201d as described in our Terms and Conditions."],
  ["VAT / Tax Identification", "[VAT / Tax ID Number]. WatchLog subscription billing for mobile-carrier users is processed through the BDApps platform of the respective carriers; carrier billing records remain governed by the subscriber agreement with your mobile operator."],
  ["Intellectual Property", "All content on this website, including the WatchLog name, logo, design, text, graphics, agents, and software, is the property of WatchLog or its licensors and is protected by copyright and trademark law. Reproduction, redistribution, or derivative use without written permission is prohibited."],
  ["Third-Party Links & Content", "This website may contain links to third-party websites (for example app stores or documentation portals). We do not control and are not responsible for the content, privacy practices, or availability of external sites. At the time of linking, no unlawful content was identifiable on the linked pages."],
  ["Liability for Content", "The information on this website is provided for general information purposes. While we take reasonable care to keep it accurate and current, we make no warranties of any kind about completeness, accuracy, or availability and accept no liability for loss arising from reliance on this content."],
  [" Liability for Technical Availability", "We make reasonable efforts to keep the website and monitoring services available and secure. However, WatchLog does not guarantee uninterrupted availability of the website, the dashboards, or alert delivery, as further limited in the Terms and Conditions."],
  ["Governing Law & Jurisdiction", "These legal notices and any dispute arising from the use of this website or the WatchLog service are governed by the laws of [Country], without prejudice to mandatory consumer protection rights in your country of residence."],
  ["Dispute Resolution for Consumers", "The European Commission provides a platform for online dispute resolution (ODR). We are neither obligated nor currently willing to participate in dispute resolution proceedings before a consumer arbitration board, unless required by mandatory law."],
  ["References", "Official regulation texts referenced across WatchLog legal documents: GDPR Regulation (EU) 2016/679 (EUR-Lex), Directive 2002/58/EC on privacy and electronic communications (EUR-Lex), and the California Consumer Privacy Act (California Attorney General)."],
];

const references = [
  ["GDPR \u2014 Regulation (EU) 2016/679 (EUR-Lex)", "https://eur-lex.europa.eu/eli/reg/2016/679/oj"],
  ["ePrivacy Directive 2002/58/EC (EUR-Lex)", "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex%3A32002L0058"],
  ["California Consumer Privacy Act (CCPA)", "https://oag.ca.gov/privacy/ccpa"],
];

export default function LegalNoticePage() {
  return (
    <main>
      <PageHero
        title="Legal Notice"
        subtitle="Operator identity, contact details, intellectual property, and liability information for the WatchLog website and service."
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
            <p className="text-muted-soft small mt-4">Note: bracketed fields (e.g. [Legal Entity Name]) must be completed by the operating company. This page is provided for informational purposes and does not constitute legal advice.</p>
          </article>
        </div>
      </section>
      <RelatedLegal exclude="/legal-notice" />
    </main>
  );
}
