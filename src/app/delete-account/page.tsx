import type { Metadata } from "next";
import { ContactForm, PageHero } from "../components/AppShell";

export const metadata: Metadata = {
  title: "Delete Account",
  description: "Request deletion of your WatchLog account and associated telemetry data.",
  alternates: { canonical: "/delete-account" },
};

export default function DeleteAccountPage() {
  return (
    <main>
      <PageHero
        title="Delete Your Account"
        subtitle="Submit a deletion request for your WatchLog account, organizations, and associated monitoring data."
      />
      <section className="section">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-5">
              <div className="legal-card">
                <h2>Before you request deletion</h2>
                <p className="text-muted-soft">
                  Deleting your account removes profile information, organizations, projects, configured monitors, server telemetry history, alert rules, and active sessions after verification.
                </p>
                <h2>What may remain</h2>
                <p className="text-muted-soft">
                  Limited records may be retained when required for fraud prevention, legal obligations, dispute resolution, security auditing, or compliance.
                </p>
                <h2>Timeline</h2>
                <p className="text-muted-soft">
                  Requests are typically reviewed within 7 business days. Full deletion may take up to 30 days depending on backup retention schedules.
                </p>
              </div>
            </div>
            <div className="col-lg-7">
              <ContactForm deleteAccount />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


