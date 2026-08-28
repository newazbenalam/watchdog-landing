import type { Metadata } from "next";
import { PageHero } from "../components/AppShell";
import { ContactForm } from "../components/AppShell";

export const metadata: Metadata = {
  title: "Contact Support",
  description: "Contact WatchLog support for product questions, server telemetry assistance, account inquiries, and enterprise monitoring.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main>
      <PageHero
        title="Contact Support"
        subtitle="Have questions about server monitoring, synthetic probes, Keep-Alive, or account support? Reach out to the WatchLog team."
      />
      <section className="section">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-7">
              <ContactForm />
            </div>
            <div className="col-lg-5">
              <div className="glass-card p-4 h-100">
                <h2 className="h4 fw-bold">Support & Inquiries</h2>
                <p className="text-muted-soft">Email: newazbenalam@gmail.com</p>
                <p className="text-muted-soft">Business hours: 24/7 Incident Escalation & Response</p>
                <div className="map-placeholder rounded-2 mt-4">
                  <span>
                    <i className="bi bi-geo-alt me-2" />
                    Global Monitoring Edge Network
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


