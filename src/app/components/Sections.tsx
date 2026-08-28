"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { apkDownloadUrl, assetBase, bdAppsSubscriptionApi, comparison, faqs, featureGroups, screenshots, tech, trusts, workflow } from "../data";

export function Hero() {
  const [typed, setTyped] = useState("");
  const text = "Linux VMs, APIs, PostgreSQL, Redis, SSL certs, and cold-boot warmers.";
  useEffect(() => {
    let i = 0;
    const id = window.setInterval(() => { i += 1; setTyped(text.slice(0, i)); if (i >= text.length) window.clearInterval(id); }, 38);
    return () => window.clearInterval(id);
  }, []);
  return (
    <section className="hero position-relative">
      <span className="blob" />
      {Array.from({ length: 18 }).map((_, i) => <span key={i} className="particle" style={{ left: `${5 + i * 5}%`, bottom: `${(i % 6) * 10}px`, animationDelay: `${i * .7}s` }} />)}
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-6 hero-copy" data-aos="fade-up">
            <p className="eyebrow mb-3">Real-Time Observability & Uptime Platform</p>
            <h1 className="section-title mb-4">Watch<span className="gradient-text">log</span></h1>
            <p className="lead fs-4 text-muted-soft mb-3">Modern, real-time observability, server telemetry, and uptime monitoring engineered for agile engineering teams and indie builders.</p>
            <p className="text-muted-soft mb-4"><span className="fw-bold text-body">Observing </span>{typed}<span aria-hidden="true">|</span></p>
            <div className="hero-actions">
              <a className="btn btn-gradient rounded-pill hero-action-button store-action-button" href="#pricing" aria-label="Download on Google Play"><span className="store-action-copy"><small>Download on</small><strong>Google Play</strong></span><i className="bi bi-google-play store-action-icon" /></a>
              <a className="bdapps-button" href="#pricing" aria-label="Download on BDApps"><span className="bdapps-copy"><small>Download on</small><strong>BDApps</strong></span><Image src={`${assetBase}bdapps-logo.webp`} alt="BDApps logo" width={74} height={34} /></a>
            </div>
            <div className="hero-secondary-actions mt-3"><a className="btn btn-gradient rounded-pill hero-action-button" href="#pricing"><i className="bi bi-credit-card me-2" />Subscription Plans</a><a className="btn btn-glass rounded-pill hero-action-button" href="#features">Explore Features</a></div>
          </div>
          <div className="col-lg-6 hero-card" data-aos="fade-left">
            <div className="phone"><Image src={`${assetBase}${screenshots[0]}`} alt="WatchLog app dashboard screenshot" width={390} height={844} priority /></div>
            <div className="mini-shot one"><Image src={`${assetBase}${screenshots[1]}`} alt="WatchLog server metrics screenshot" width={180} height={390} /></div>
            <div className="mini-shot two"><Image src={`${assetBase}${screenshots[2]}`} alt="WatchLog monitor details screenshot" width={180} height={390} /></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TrustSection() {
  return <section className="section-sm"><div className="container"><div className="row g-4">{trusts.map(([title, icon, body]) => <div className="col-md-6 col-lg-4" key={title} data-aos="fade-up"><div className="glass-card trust-card"><span className="icon-box"><i className={`bi ${icon}`} /></span><h3 className="h5 fw-bold">{title}</h3><p className="text-muted-soft mb-0">{body}</p></div></div>)}</div></div></section>;
}

export function FeaturesGrid({ expanded = false }: { expanded?: boolean }) {
  return <section className="section bg-surface" id="features"><div className="container"><div className="text-center mb-5"><p className="eyebrow">Features</p><h2 className="section-title display-5">Full-Stack Telemetry, Monitoring & Alerting</h2><p className="lead-tight mx-auto">Synthetic uptime checks, 1-click SSH provisioning, deep database health, cold-boot warmers, and native mobile apps.</p></div><div className="row g-4">{featureGroups.map(([title, icon, items], index) => <div className="col-md-6 col-xl-4" key={title} data-aos="fade-up" data-aos-delay={(index % 3) * 80}><article className="feature-card"><span className="icon-box"><i className={`bi ${icon}`} /></span><h3 className="h4 fw-bold">{title}</h3><p className="text-muted-soft">{expanded ? `${title} is built for high reliability, autonomous recovery detection, and immediate resolution insights.` : "Purpose-built observability tools with zero-friction setup and real-time streaming updates."}</p><div className="feature-list">{items.map((item) => <span key={item}>{item}</span>)}</div></article></div>)}</div></div></section>;
}

export function ComparisonSection() {
  return <section className="section"><div className="container"><div className="row align-items-center g-5"><div className="col-lg-4" data-aos="fade-right"><p className="eyebrow">Why WatchLog</p><h2 className="section-title display-6">Built for speed, simplicity, and zero friction</h2><p className="text-muted-soft">WatchLog eliminates complex APM overhead while giving developers instant mobile alerts, database telemetry, and cold-boot prevention.</p></div><div className="col-lg-8" data-aos="fade-left"><div className="compare-table"> <div className="row-line head"><div className="cell">Capability</div><div className="cell">Traditional APM / Uptime</div><div className="cell">WatchLog</div></div>{comparison.map(([a, b, c]) => <div className="row-line" key={a}><div className="cell fw-bold">{a}</div><div className="cell text-muted-soft">{b}</div><div className="cell"><i className="bi bi-check-circle-fill text-success me-2" />{c}</div></div>)}</div></div></div></div></section>;
}

export function WorkflowSection() {
  return <section className="section bg-surface"><div className="container"><div className="text-center mb-5"><p className="eyebrow">Observability Lifecycle</p><h2 className="section-title display-5">From Provisioning to Instant Resolution</h2></div><div className="row g-3">{workflow.map((step, i) => <div className="col-md-4 col-lg-2" key={step} data-aos="fade-up"><div className={`glass-card workflow-step ${i === workflow.length - 1 ? "last" : ""}`}><span className="icon-box mb-3">{i + 1}</span><h3 className="h6 fw-bold mb-0">{step}</h3></div></div>)}</div></div></section>;
}

export function TechSection() {
  return <section className="section-sm"><div className="container"><div className="text-center mb-4"><p className="eyebrow">Technology Stack</p><h2 className="section-title display-6">Built on robust, high-performance engines</h2></div><div className="d-flex flex-wrap justify-content-center gap-2">{tech.map((item) => <span className="btn btn-glass rounded-pill px-3" key={item}>{item}</span>)}</div></div></section>;
}

export function ScreenshotGallery() {
  const [active, setActive] = useState<string | null>(null);
  return <section className="section" id="screenshots"><div className="container"><div className="text-center mb-5"><p className="eyebrow">App Preview</p><h2 className="section-title display-5">A glance at the WatchLog interface</h2></div><div className="row g-4">{screenshots.map((shot, i) => <div className="col-6 col-md-4 col-lg-3" key={shot} data-aos="zoom-in"><button className="screenshot-button" onClick={() => setActive(shot)} aria-label={`Open screenshot ${i + 1}`}><Image className="screenshot-frame" src={`${assetBase}${shot}`} alt={`WatchLog screenshot ${i + 1}`} width={390} height={844} loading="lazy" /></button></div>)}</div></div><div className={`lightbox ${active ? "show" : ""}`} role="dialog" aria-modal="true" onClick={() => setActive(null)}>{active && <Image src={`${assetBase}${active}`} alt="WatchLog screenshot preview" width={390} height={844} />}<button onClick={() => setActive(null)} aria-label="Close preview"><i className="bi bi-x-lg" /></button></div></section>;
}

export function FaqAccordion({ limit }: { limit?: number }) {
  const items = limit ? faqs.slice(0, limit) : faqs;
  return <section className="section"><div className="container"><div className="text-center mb-5"><p className="eyebrow">FAQ</p><h2 className="section-title display-5">Frequently Asked Questions</h2></div><div className="accordion faq-card overflow-hidden" id="faqAccordion">{items.map(([q, a], i) => <div className="accordion-item" key={q}><h3 className="accordion-header"><button className={`accordion-button ${i ? "collapsed" : ""}`} type="button" data-bs-toggle="collapse" data-bs-target={`#faq-${i}`} aria-expanded={!i}>{q}</button></h3><div id={`faq-${i}`} className={`accordion-collapse collapse ${i ? "" : "show"}`} data-bs-parent="#faqAccordion"><div className="accordion-body text-muted-soft">{a}</div></div></div>)}</div>{limit && <div className="text-center mt-4"><Link className="btn btn-gradient rounded-pill px-4" href="/faq">View all FAQs</Link></div>}</div></section>;
}

export function PricingSection() {
  const [purchaseOpen, setPurchaseOpen] = useState(false);
  return (
    <>
      <section className="section" id="pricing">
        <div className="container">
          <div className="text-center mb-5">
            <p className="eyebrow">Subscription</p>
            <h2 className="section-title display-5">Premium Access for WatchLog</h2>
            <p className="lead-tight mx-auto">Subscribe with your BDApps mobile number to unlock real-time server telemetry, database monitoring, and unlimited push notifications.</p>
          </div>
          <div className="row g-4 justify-content-center">
            <div className="col-md-6 col-lg-4" data-aos="fade-up">
              <article className="pricing-card">
                <span className="pricing-badge">Coming soon</span>
                <span className="icon-box"><i className="bi bi-calendar-week" /></span>
                <h3 className="h4 fw-bold">7-day access</h3>
                <div className="pricing-price"><span>BDT</span><strong>3.50</strong></div>
                <p className="text-muted-soft mb-4">Short-term access for testing WatchLog features.</p>
                <ul className="pricing-list">
                  <li><i className="bi bi-check-circle-fill" />All premium WatchLog monitoring probes</li>
                  <li><i className="bi bi-check-circle-fill" />No recurring monthly commitment</li>
                  <li><i className="bi bi-check-circle-fill" />Available soon through BDApps</li>
                </ul>
                <button className="btn btn-glass rounded-pill w-100 mt-4" type="button" disabled>Coming soon</button>
              </article>
            </div>
            <div className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="80">
              <article className="pricing-card featured">
                <span className="pricing-badge">Monthly</span>
                <span className="icon-box"><i className="bi bi-calendar2-check" /></span>
                <h3 className="h4 fw-bold">Monthly access</h3>
                <div className="pricing-price"><span>BDT</span><strong>9.99</strong></div>
                <p className="text-muted-soft mb-4">Recurring monthly access. A verification code will be sent to your BDApps number.</p>
                <ul className="pricing-list">
                  <li><i className="bi bi-check-circle-fill" />1-Click SSH server agent provisioning</li>
                  <li><i className="bi bi-check-circle-fill" />Postgres, MySQL, Redis & Supabase monitoring</li>
                  <li><i className="bi bi-check-circle-fill" />Keep-Alive cold-boot warmer & instant FCM push</li>
                </ul>
                <button className="btn btn-gradient rounded-pill w-100 mt-4" type="button" onClick={() => setPurchaseOpen(true)}><i className="bi bi-phone me-2" />Subscribe with BDApps</button>
              </article>
            </div>
            <div className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="160">
              <article className="pricing-card">
                <span className="pricing-badge">Coming soon</span>
                <span className="icon-box"><i className="bi bi-stars" /></span>
                <h3 className="h4 fw-bold">Yearly access</h3>
                <div className="pricing-price"><span>BDT</span><strong>49.99</strong></div>
                <p className="text-muted-soft mb-4">Best value for long-term server reliability and monitoring.</p>
                <ul className="pricing-list">
                  <li><i className="bi bi-check-circle-fill" />All premium WatchLog features</li>
                  <li><i className="bi bi-check-circle-fill" />One annual payment</li>
                  <li><i className="bi bi-check-circle-fill" />Available soon through BDApps</li>
                </ul>
                <button className="btn btn-glass rounded-pill w-100 mt-4" type="button" disabled>Coming soon</button>
              </article>
            </div>
          </div>
        </div>
      </section>
      <MonthlySubscriptionModal open={purchaseOpen} onClose={() => setPurchaseOpen(false)} />
    </>
  );
}

type SubscriptionResponse = { success?: boolean; message?: string; statusCode?: string; statusDetail?: string; referenceNo?: string; subscriptionStatus?: string };

function MonthlySubscriptionModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState<"phone" | "otp" | "success">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [referenceNo, setReferenceNo] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") close(); };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  });

  const close = () => {
    setStep("phone");
    setPhone("");
    setOtp("");
    setReferenceNo("");
    setError("");
    setBusy(false);
    onClose();
  };

  const post = async (endpoint: string, data: Record<string, string>) => {
    const response = await fetch(`${bdAppsSubscriptionApi}/${endpoint}`, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams(data) });
    const body = await response.json() as SubscriptionResponse;
    if (!response.ok) throw new Error(body.message || body.statusDetail || "The subscription service is unavailable. Please try again.");
    return body;
  };

  const requestOtp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedPhone = phone.replace(/\D/g, "").replace(/^880/, "0");
    if (!/^01[3-9]\d{8}$/.test(normalizedPhone)) { setError("Enter a valid Bangladeshi mobile number."); return; }
    setBusy(true); setError("");
    try {
      const response = await post("send_otp.php", { user_mobile: normalizedPhone });
      if (!response.success || !response.referenceNo) throw new Error(response.message || response.statusDetail || "Could not send the verification code.");
      setPhone(normalizedPhone); setReferenceNo(response.referenceNo); setStep("otp");
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Could not send the verification code."); }
    finally { setBusy(false); }
  };

  const verifyOtp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!/^\d{4,8}$/.test(otp)) { setError("Enter the verification code sent to your phone."); return; }
    setBusy(true); setError("");
    try {
      const response = await post("verify_otp.php", { Otp: otp, referenceNo });
      if (response.statusCode !== "S1000" || response.subscriptionStatus?.toUpperCase() !== "REGISTERED") throw new Error(response.statusDetail || "Subscription could not be confirmed.");
      setStep("success");
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Subscription could not be confirmed."); }
    finally { setBusy(false); }
  };

  if (!open) return null;
  return <div className="subscription-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) close(); }}><section className="subscription-modal" role="dialog" aria-modal="true" aria-labelledby="subscriptionTitle"><button className="subscription-modal-close" type="button" aria-label="Close subscription dialog" onClick={close}><i className="bi bi-x-lg" /></button>{step === "phone" && <form onSubmit={requestOtp}><p className="eyebrow mb-2">Monthly subscription</p><h2 className="h3 fw-bold" id="subscriptionTitle">Confirm your mobile number</h2><p className="text-muted-soft">BDApps will send a verification code to activate monthly access at BDT 9.99.</p><label className="form-label fw-bold" htmlFor="subscriptionPhone">BDApps mobile number</label><input className="form-control" id="subscriptionPhone" type="tel" inputMode="numeric" autoComplete="tel-national" placeholder="01XXXXXXXXX" value={phone} onChange={(event) => setPhone(event.target.value)} disabled={busy} required />{error && <p className="subscription-error" role="alert">{error}</p>}<button className="btn btn-gradient rounded-pill w-100 mt-4" type="submit" disabled={busy}>{busy ? "Sending code..." : "Send verification code"}</button></form>}{step === "otp" && <form onSubmit={verifyOtp}><p className="eyebrow mb-2">Verification required</p><h2 className="h3 fw-bold" id="subscriptionTitle">Enter your code</h2><p className="text-muted-soft">We sent a verification code to {phone}. Enter it to activate your subscription.</p><label className="form-label fw-bold" htmlFor="subscriptionOtp">Verification code</label><input className="form-control" id="subscriptionOtp" type="text" inputMode="numeric" autoComplete="one-time-code" maxLength={8} value={otp} onChange={(event) => setOtp(event.target.value.replace(/\D/g, ""))} disabled={busy} required />{error && <p className="subscription-error" role="alert">{error}</p>}<button className="btn btn-gradient rounded-pill w-100 mt-4" type="submit" disabled={busy}>{busy ? "Confirming subscription..." : "Confirm subscription"}</button><button className="btn btn-link w-100 mt-2" type="button" disabled={busy} onClick={() => { setStep("phone"); setOtp(""); setError(""); }}>Use another number</button></form>}{step === "success" && <div className="text-center"><span className="subscription-success-icon"><i className="bi bi-check-lg" /></span><p className="eyebrow mt-3 mb-2">Subscription active</p><h2 className="h3 fw-bold" id="subscriptionTitle">You are ready to use WatchLog</h2><p className="text-muted-soft">Your BDApps monthly subscription has been confirmed.</p>{apkDownloadUrl ? <a className="btn btn-gradient rounded-pill w-100 mt-4" href={apkDownloadUrl} download><i className="bi bi-android2 me-2" />Download Android APK</a> : <p className="subscription-error mt-4 mb-0" role="status">The APK download link has not been configured yet.</p>}</div>}</section></div>;
}


