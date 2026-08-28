import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "aos/dist/aos.css";
import "./globals.css";
import { AppShell } from "./components/AppShell";
import { LanguageProvider } from "./components/LanguageProvider";

const title = "WatchLog — Real-Time Observability, Server Telemetry & Uptime Monitoring";
const description = "All-in-one observability platform for modern engineering teams. 1-click SSH server provisioning, 30s heartbeats, synthetic probes, database health checks, cold-boot warmers, and native mobile apps.";

const basePath = "/NADB26099/app";

export const metadata: Metadata = {
  metadataBase: new URL("https://bdappsdigitalapps.com"),
  title: { default: title, template: "%s | WatchLog" },
  description,
  keywords: ["WatchLog", "uptime monitoring", "server monitoring", "observability", "synthetic monitoring", "database monitoring", "keep-alive warmer", "Flutter monitoring app", "NestJS monitoring"],
  robots: "index, follow",
  alternates: { canonical: `${basePath}/` },
  openGraph: { title, description, url: `${basePath}/`, siteName: "WatchLog", images: [`${basePath}/assets/logo-no-text.webp`], type: "website" },
  twitter: { card: "summary_large_image", title, description, images: [`${basePath}/assets/logo-no-text.webp`] },
  icons: { icon: `${basePath}/favicon.ico`, apple: `${basePath}/assets/logo-no-text.webp` },
  manifest: `${basePath}/manifest.json`,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", name: "WatchLog", url: "https://bdappsdigitalapps.com/NADB26099/app", logo: "https://bdappsdigitalapps.com/NADB26099/app/assets/logo-no-text.webp", email: "newazbenalam@gmail.com" },
      { "@type": "SoftwareApplication", name: "WatchLog: Real-Time Observability & Monitoring", operatingSystem: "Android, iOS, Linux, Windows, macOS, Web", applicationCategory: "DeveloperApplication", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } }
    ]
  };
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <LanguageProvider><AppShell>{children}</AppShell></LanguageProvider>
      </body>
    </html>
  );
}


