"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FormEvent, ReactNode, useEffect, useState } from "react";
import AOS from "aos";
import { assetBase, legalPages, navLinks } from "../data";
import { LanguageToggle } from "./LanguageProvider";

export function AppShell({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState("0%");
  const [showTop, setShowTop] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
    AOS.init({ duration: 700, once: true, offset: 80 });
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const top = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(top > 12);
      setShowTop(top > 550);
      setProgress(`${height > 0 ? (top / height) * 100 : 0}%`);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="scroll-progress" style={{ "--scroll": progress } as React.CSSProperties} />
      <nav className={`navbar navbar-expand-lg fixed-top ${scrolled ? "nav-blur" : ""}`} aria-label="Main navigation">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center gap-2 fw-bold" href="/">
            <Image src={`${assetBase}logo-no-text.webp`} alt="WatchLog logo" width={42} height={42} priority />
            <span>WatchLog</span>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="mainNav">
            <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
              {navLinks.map(([label, href]) => (
                <li className="nav-item" key={href}>
                  <Link className={`nav-link ${pathname === href ? "active" : ""}`} href={href}>{label}</Link>
                </li>
              ))}
              <li className="nav-item ms-lg-2"><a className="btn btn-gradient rounded-pill px-4" href="#pricing">Download App</a></li>
              <li className="nav-item ms-lg-2"><LanguageToggle /></li>
            </ul>
          </div>
        </div>
      </nav>
      {children}
      <Footer />
      <button className={`back-to-top ${showTop ? "show" : ""}`} aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><i className="bi bi-arrow-up" /></button>
      <ToastHost />
    </>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-5">
            <div className="d-flex align-items-center gap-2 mb-3"><Image className="footer-logo" src={`${assetBase}logo-no-text.webp`} alt="WatchLog icon" width={44} height={44} /><strong>WatchLog</strong></div>
            <p className="text-muted-soft mb-4">Real-time observability, server telemetry, database health checks, and uptime monitoring engineered for modern systems.</p>
            <div className="d-flex gap-3 fs-5"><a href="#" aria-label="Twitter"><i className="bi bi-twitter-x" /></a><a href="#" aria-label="LinkedIn"><i className="bi bi-linkedin" /></a><a href="mailto:newazbenalam@gmail.com" aria-label="Email"><i className="bi bi-envelope" /></a></div>
          </div>
          <div className="col-6 col-lg-2"><h3 className="h6 fw-bold">Product</h3><Link className="d-block mb-2" href="/features">Features</Link><Link className="d-block mb-2" href="/faq">FAQ</Link><a className="d-block" href="#pricing">Download</a></div>
          <div className="col-6 col-lg-2"><h3 className="h6 fw-bold">Legal</h3><Link className="d-block mb-2" href="/terms">Terms &amp; Conditions</Link><Link className="d-block mb-2" href="/privacy-policy">Privacy Policy</Link><Link className="d-block mb-2" href="/cookies">Cookie Policy</Link><Link className="d-block mb-2" href="/gdpr">GDPR Notice</Link><Link className="d-block" href="/legal-notice">Legal Notice</Link></div>
          <div className="col-6 col-lg-2"><h3 className="h6 fw-bold">Compliance</h3><Link className="d-block mb-2" href="/compliance">Security &amp; Compliance</Link><Link className="d-block mb-2" href="/acceptable-use">Acceptable Use</Link><Link className="d-block mb-2" href="/dpa">Data Processing</Link><Link className="d-block" href="/delete-account">Delete Account</Link></div>
          <div className="col-lg-3"><h3 className="h6 fw-bold">Support</h3><Link className="d-block mb-2" href="/contact">Contact</Link><a className="d-block" href="mailto:newazbenalam@gmail.com">newazbenalam@gmail.com</a></div>
        </div>
        <div className="border-top mt-5 pt-4 text-muted-soft small">Copyright {new Date().getFullYear()} WatchLog. All rights reserved.</div>
      </div>
    </footer>
  );
}

function ToastHost() {
  return <div className="toast-container position-fixed top-0 end-0 p-3" id="toastHost" />;
}

export function PageHero({ title, subtitle }: { title: string; subtitle: string }) {
  return <section className="page-hero"><div className="container"><p className="eyebrow mb-2">WatchLog</p><h1 className="section-title display-4 mb-3">{title}</h1><p className="lead lead-tight mb-0">{subtitle}</p></div></section>;
}

export function RelatedLegal({ exclude }: { exclude?: string }) {
  return (
    <section className="pb-5">
      <div className="container">
        <article className="legal-card">
          <h2>Related Legal Documents</h2>
          <p className="text-muted-soft">All WatchLog legal and compliance policies are part of one agreement framework:</p>
          <div className="feature-list">
            {legalPages.filter(([, href]) => href !== exclude).map(([label, href]) => (
              <Link key={href} href={href}><span>{label}</span></Link>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

export function Cta() {
  return <section className="section-sm" id="download"><div className="container"><div className="cta-band text-center" data-aos="zoom-in"><h2 className="section-title display-6 mb-3">Ready for zero-downtime confidence?</h2><p className="mb-4 opacity-75">Start monitoring servers, APIs, databases, and cold-boots with WatchLog today.</p><div className="d-flex flex-wrap justify-content-center gap-3"><a className="btn btn-light rounded-pill px-4" href="#pricing">Download App</a><Link className="btn btn-outline-light rounded-pill px-4" href="/contact">Contact Support</Link></div></div></div></section>;
}

export function ContactForm({ deleteAccount = false }: { deleteAccount?: boolean }) {
  const [validated, setValidated] = useState(false);
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setValidated(true);
    if (!form.checkValidity()) return;
    showToast(deleteAccount ? "Account deletion request received." : "Message sent successfully.");
    form.reset();
    setValidated(false);
  };
  return (
    <form className={`glass-card p-4 needs-validation ${validated ? "was-validated" : ""}`} noValidate onSubmit={onSubmit}>
      <div className="row g-3">
        <div className="col-md-6"><label className="form-label">Full Name</label><input className="form-control" required /></div>
        <div className="col-md-6"><label className="form-label">Email</label><input className="form-control" type="email" required /></div>
        {deleteAccount && <div className="col-md-6"><label className="form-label">User ID optional</label><input className="form-control" /></div>}
        <div className={deleteAccount ? "col-md-6" : "col-12"}><label className="form-label">{deleteAccount ? "Reason" : "Subject"}</label><input className="form-control" required /></div>
        <div className="col-12"><label className="form-label">{deleteAccount ? "Additional Message" : "Message"}</label><textarea className="form-control" rows={5} required /></div>
        {deleteAccount && <div className="col-12"><div className="form-check"><input className="form-check-input" id="confirmDelete" type="checkbox" required /><label className="form-check-label" htmlFor="confirmDelete">I understand that account deletion is permanent after processing.</label></div></div>}
        <div className="col-12"><button className="btn btn-gradient rounded-pill px-4" type="submit">{deleteAccount ? "Submit Deletion Request" : "Send Message"}</button></div>
      </div>
    </form>
  );
}

function showToast(message: string) {
  const host = document.getElementById("toastHost");
  if (!host) return;
  host.innerHTML = `<div class="toast align-items-center text-bg-success border-0 show" role="status"><div class="d-flex"><div class="toast-body">${message}</div><button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button></div></div>`;
}





