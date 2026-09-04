import type { Metadata } from "next";
import { PageHero, RelatedLegal } from "../components/AppShell";

export const metadata: Metadata = {
  title: "Acceptable Use Policy",
  description: "Acceptable Use Policy for WatchLog covering prohibited probe activity, anti-abuse rules, credential handling, enforcement, and reporting violations.",
  alternates: { canonical: "/acceptable-use" },
};

const sections = [
  ["Purpose", "This Acceptable Use Policy (\u201cAUP\u201d) governs your use of the WatchLog platform, agents, synthetic probes, and keep-alive services. It supplements the Terms and Conditions. By using WatchLog you agree to comply with this policy."],
  ["Prohibited Monitoring Activity", "You may not use WatchLog synthetic probes to initiate Denial of Service (DoS) or Distributed DoS attacks, flood endpoints with request volumes exceeding reasonable health-check rates, probe systems you do not own or lack written authorization to monitor, scan ports or services of third-party infrastructure without permission, or bypass rate limits of external services."],
  ["Ownership & Authorization", "You confirm that every server, database, website, API, or endpoint you configure for monitoring is owned by you or covered by explicit authorization from the system owner. WatchLog may request proof of authorization when investigating abuse reports."],
  ["Keep-Alive Warmer Usage", "Keep-Alive warming is intended for endpoints you own or operate. Using it to artificially inflate traffic metrics of third-party sites, keep unauthorized services awake, or evade free-tier abuse detection of hosting providers is prohibited."],
  ["Credentials & Agent Security", "You may not use WatchLog to store, proxy, or distribute stolen credentials. SSH credentials provided for 1-click provisioning must belong to systems you administer. Agent API tokens must be kept confidential and rotated or revoked if compromised."],
  ["Service Integrity & Reverse Engineering", "You may not attempt to disrupt platform availability, scrape the service at abusive volumes, reverse engineer the agents or dashboards beyond what open licenses permit, resell the service without a written agreement, or circumvent subscription and billing controls including BDApps carrier verification."],
  ["Illegal or Harmful Content", "You may not use WatchLog to monitor, distribute, or facilitate illegal content, malware command-and-control, phishing infrastructure, harassment, or content infringing third-party intellectual property rights."],
  ["Enforcement", "We may investigate suspected violations. Depending on severity, we may warn, throttle probes, suspend organizations, revoke agent tokens, or terminate accounts. Suspicious probe traffic targeting third-party systems may be blocked immediately without prior notice."],
  ["Reporting Violations", "Report abuse, unauthorized probing, or security issues to newazbenalam@gmail.com. We cooperate with network operators and law enforcement where legally required or appropriate."],
  ["Changes to This Policy", "This AUP may be updated as new agent capabilities, probe types, or abuse patterns emerge. Continued use of WatchLog after an update constitutes acceptance of the revised policy."],
];

const references = [
  ["WatchLog Terms and Conditions", "/terms"],
  ["Computer Fraud and Abuse Act overview (US DOJ)", "https://www.justice.gov/jm/criminal-resource-manual-1030-computer-fraud-and-abuse-act"],
  ["UK Computer Misuse Act 1990 (legislation.gov.uk)", "https://www.legislation.gov.uk/ukpga/1990/18/contents"],
];

export default function AcceptableUsePage() {
  return (
    <main>
      <PageHero
        title="Acceptable Use Policy"
        subtitle="The rules that keep WatchLog probes, agents, and keep-alive services safe, lawful, and abuse-free for everyone."
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
              <h2>References</h2>
              <ul className="text-muted-soft">
                {references.map(([label, href]) => (
                  <li key={href}><a href={href}>{label}</a></li>
                ))}
              </ul>
            </section>
          </article>
        </div>
      </section>
      <RelatedLegal exclude="/acceptable-use" />
    </main>
  );
}
