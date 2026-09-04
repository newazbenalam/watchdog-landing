import type { Metadata } from "next";
import { PageHero, RelatedLegal } from "../components/AppShell";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Cookie and storage policy for WatchLog describing strictly necessary storage, language preferences, push tokens, consent management, and how to control cookies in your browser.",
  alternates: { canonical: "/cookies" },
};

const sections = [
  ["What Are Cookies & Similar Technologies", "Cookies are small text files stored by your browser. Websites may also use similar local storage technologies (such as localStorage) to remember settings. This policy covers both cookies and equivalent browser storage used by the WatchLog website."],
  ["Our Approach to Cookies", "The WatchLog landing website sets no advertising, tracking, profiling, or third-party marketing cookies. We do not use Google Analytics, Meta Pixel, or similar tracking scripts on this site. Only strictly necessary functional storage, described below, is used."],
  ["Strictly Necessary / Functional Storage", "Language preference: the website stores your selected interface language (English or Bengali) under the key \u201cwatchlog-language\u201d in your browser's localStorage. This is functional storage strictly necessary to provide the feature you request, and under the ePrivacy Directive does not require consent."],
  ["Session & Authentication", "The WatchLog application (web dashboard and mobile apps) uses authentication sessions with JWT rotation and secure token storage (Flutter Secure Storage on mobile). These tokens are required to keep you signed in securely and are not used for advertising."],
  ["Push Notification Tokens", "If you enable mobile push alerts, a Firebase Cloud Messaging (FCM) device token is stored so notifications can reach your device. This is tied to your account settings and can be revoked at any time by disabling notifications in the app."],
  ["Cookies Set by Third Parties", "We embed no third-party advertising or analytics iframes. If you visit external links (app stores, documentation), those sites may set their own cookies under their own policies; we encourage you to review them separately."],
  ["Carrier Billing Pages", "Subscription flows operated through the BDApps platform are governed by your mobile carrier. Any session identifiers created by carrier landing pages are subject to the carrier's own cookie and privacy policies."],
  ["Consent & Changes", "Because only strictly necessary and functional storage is used, no cookie consent banner is required under the ePrivacy Directive. If we ever introduce non-essential cookies (e.g. analytics), this policy will be updated and a consent mechanism will be added before they are set."],
  ["How to Control or Delete Storage", "You can clear site data or block cookies at any time in your browser settings (e.g. Chrome: Settings \u2192 Privacy \u2192 Third-party cookies; Firefox: Settings \u2192 Privacy & Security; Safari: Preferences \u2192 Privacy). Clearing localStorage will simply reset your language preference to the default. Blocking strictly necessary storage may affect app sign-in."],
  ["Do Not Track", "We do not track users across websites and therefore do not respond differently to browser Do Not Track signals; there is no cross-site tracking activity to restrict."],
];

const references = [
  ["ePrivacy Directive 2002/58/EC (EUR-Lex)", "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex%3A32002L0058"],
  ["GDPR Regulation (EU) 2016/679 (EUR-Lex)", "https://eur-lex.europa.eu/eli/reg/2016/679/oj"],
  ["ICO guidance on cookies and similar technologies", "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/cookies-and-similar-technologies/"],
  ["Google Chrome cookie management help", "https://support.google.com/chrome/answer/95647"],
  ["Mozilla Firefox cookie settings", "https://support.mozilla.org/kb/cookies-information-websites-store-on-your-computer"],
];

export default function CookiesPage() {
  return (
    <main>
      <PageHero
        title="Cookie Policy"
        subtitle="What the WatchLog website stores in your browser: strictly necessary storage only \u2014 no ads, no tracking cookies."
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
      <RelatedLegal exclude="/cookies" />
    </main>
  );
}
