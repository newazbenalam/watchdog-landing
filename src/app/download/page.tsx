import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { apkDownloadUrl, assetBase } from "../data";

export const metadata: Metadata = {
  title: "Download WatchLog App",
  description: "Download the WatchLog Android APK directly for real-time observability, server telemetry, and uptime monitoring.",
  robots: "noindex, nofollow", // Hidden from search engine crawlers
};

export default function DownloadPage() {
  const downloadLink = apkDownloadUrl || "/app-release.apk";

  return (
    <main className="min-vh-100 d-flex align-items-center justify-content-center py-5 position-relative">
      <span className="blob" />
      <div className="container position-relative" style={{ zIndex: 1, maxWidth: "560px" }}>
        <div className="glass-card text-center p-5 rounded-4 shadow-lg border">
          <div className="mb-4 d-inline-block">
            <Image
              src={`${assetBase}logo-no-text.webp`}
              alt="WatchLog Logo"
              width={72}
              height={72}
              priority
              className="rounded-3"
            />
          </div>

          <p className="eyebrow mb-2">Direct APK Download</p>
          <h1 className="section-title h2 mb-3">Watch<span className="gradient-text">Log</span> for Android</h1>
          
          <p className="text-muted-soft mb-4">
            Get the latest version of WatchLog for instant mobile alerts, server telemetry, database health metrics, and 30s heartbeats.
          </p>

          <div className="d-grid gap-3">
            <a
              href={downloadLink}
              download
              className="btn btn-gradient rounded-pill py-3 px-4 fs-5 fw-bold d-flex align-items-center justify-content-center gap-2 shadow"
            >
              <i className="bi bi-download fs-4" />
              <span>Download Android APK</span>
            </a>
          </div>

          <div className="mt-4 pt-3 border-top d-flex justify-content-between text-muted-soft small">
            <span><i className="bi bi-shield-check text-success me-1" />Verified & Safe</span>
            <span><i className="bi bi-android2 me-1" />Android 6.0+</span>
          </div>

          <div className="mt-4">
            <Link href="/" className="text-muted-soft text-decoration-none small hover-white">
              <i className="bi bi-arrow-left me-1" /> Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
