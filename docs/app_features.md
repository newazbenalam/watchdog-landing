# Watchdog — App Features & Landing Page Reference

> Complete, structured feature guide and landing page reference document for the **Watchdog** Observability & Monitoring Platform.

---

## 1. Product Positioning & Value Proposition

- **Tagline**: Modern, real-time observability, server telemetry, and uptime monitoring engineered for agile engineering teams and indie builders.
- **Elevated Pitch**: Watchdog combines synthetic uptime probing, deep server telemetry, multi-database performance monitoring, automated cold-boot prevention (Keep-Alive), incident lifecycle management, and one-click agent provisioning into an intuitive mobile, web, and admin interface.
- **Core Value Pillars**:
  1. **Zero-Friction Server Provisioning**: Install agents over SSH in seconds with real-time streaming progress logs.
  2. **Multi-Protocol Synthetic Monitoring**: Monitor HTTP(S), TCP, Ping, DNS, SSL Certificates, and DBs (PostgreSQL, MySQL, Redis, Supabase).
  3. **Real-time Incident & Alert Engine**: Live WebSocket updates, push/email dispatch, SLA metrics (MTTR, MTTA), and root-cause postmortems.
  4. **Native Mobile First**: Instant oversight via iOS/Android Flutter app with multi-language support (English & Bengali).
  5. **Automated Server Warmers (Keep-Alive)**: Prevent free-tier hosting (Render, Fly.io, Railway, Heroku) cold-starts with intelligent scheduling.

---

## 2. Core Feature Matrix & Capabilities

### A. Infrastructure & Server Telemetry
- **Lightweight Server Agent**:
  - Runs natively on Linux (systemd / cron fallback) and Windows (Node 18+).
  - Collects CPU usage, load average, RAM/Swap usage, disk partitions, network I/O, process count, and uptime.
  - Periodic heartbeat (30s interval) with instant offline detection and automatic recovery alerting.
  - Service monitoring (tracks states of critical system daemons like Nginx, PostgreSQL, Docker, Redis).
  - Secure token authentication via `x-agent-id` and single-reveal `x-agent-key` with instant key rotation and revocation.
- **Automated 1-Click SSH Provisioning**:
  - Point-and-shoot provisioning directly from the mobile app or web console (`Host`, `Port`, `User`, `Password` or `Private Key`).
  - Automatic Node.js installation (via NodeSource on apt/dnf/yum), agent deployment to `/opt/watchdog-agent`, and service registration.
  - Zero persistent credential storage: SSH credentials are kept in-memory during setup and never written to disk or database.
  - Real-time deployment status streaming via WebSockets (`Connecting`, `Installing`, `Starting`, `Verifying`).
- **WordPress Integration Agent (`watchdog-agent-wp`)**:
  - Native WordPress plugin communicating with Watchdog API via autonomous WP-Cron schedules.
  - Tracks WordPress metrics: active users, posts, comments, moderation queues, active plugins, core/plugin pending updates, memory limits, and DB size.
  - Built-in self-response latency probe (`site.response_ms`, `site.up`).
  - Fallback crontab endpoint for low-traffic sites (`/?watchdog_beat=...`).

---

### B. Synthetic Probes & Database Monitoring
- **Web & API Probes (HTTP / HTTPS)**:
  - Configurable check intervals (30s, 60s, 5m, 15m), custom timeouts, HTTP methods, headers, and request body payload.
  - Expected status code matching & content string verification (`body must contain`).
  - Granular latency breakdowns: DNS lookup, TCP connect, TLS handshake, TTFB (Time to First Byte), and total duration.
- **Network Probes (TCP / PING / DNS / SSL)**:
  - **TCP Port Monitor**: Verify availability of arbitrary network ports (SSH, custom socket daemons, FTP).
  - **ICMP Ping**: Track latency and packet drop rates.
  - **DNS Record Monitor**: Query A, AAAA, CNAME, MX, TXT, NS records against expected values.
  - **SSL Certificate Expiry**: Proactive alerts before SSL certificates expire (30d, 14d, 7d, 1d thresholds) with cipher verification.
- **Deep Database Health Checks**:
  - **PostgreSQL / Supabase**: Direct connection checks via native connection poolers, connection pool saturation, cache hit ratio, database size, committed/rolled back transactions, deadlocks, and temp I/O stats.
  - **MySQL**: Live connection pinging, query latency, and connection status.
  - **Redis**: In-memory ping latency, cluster reachability, and memory health.
- **Keep-Alive (Cold-Boot Warmer)**:
  - Dedicated keep-alive manager specifically built for free-tier cloud instances (Render, Railway, Fly, Heroku, Glitch, Koyeb).
  - Automatic interval wake-up pings to prevent instances from sleeping.

---

### C. Alerts, Incidents & Reliability Analytics
- **Configurable Alert Rules**:
  - Rules for `SERVER_OFFLINE`, `CPU_HIGH`, `RAM_HIGH`, `DISK_HIGH`, `HTTP_FAILED`, `HTTP_SLOW`, `HTTP_STATUS_MISMATCH`, `SSL_EXPIRING`, `TCP_CLOSED`, `DNS_FAILED`.
  - Configurable thresholds, duration tolerances (`forDurationMinutes`), and severity tiers (`INFO`, `WARNING`, `CRITICAL`).
- **Incident Lifecycle Management**:
  - Automated incident grouping (groups correlated alert triggers into a single incident).
  - States: `OPEN`, `ACKNOWLEDGED`, `RESOLVED`.
  - Comprehensive timeline tracking: alert triggers, acknowledgments, notes, investigations, and root-cause postmortems.
  - Reliability Metrics: Mean Time to Detect/Acknowledge (MTTA), Mean Time to Resolve (MTTR), and 24-hour / 30-day uptime percentages.
- **Multi-Channel Notification Dispatch**:
  - Real-time mobile push notifications via Firebase Cloud Messaging (FCM).
  - Email notification alerts (SMTP / transactional gateways).
  - Granular user notification preferences: filter minimum alert severity (`INFO`, `WARNING`, `CRITICAL`) and channel switches.
  - In-app notification inbox with read/unread state management.

---

### D. Multi-Tenancy, Collaboration & Security
- **Multi-Tenant Organizations & Projects**:
  - Team collaboration with granular roles: `OWNER`, `ADMIN`, `DEVELOPER`, `VIEWER`.
  - Logical project partitioning by environment (`PRODUCTION`, `STAGING`, `DEVELOPMENT`, `TESTING`).
- **Administrative Control Panel (`watchdog-admin`)**:
  - Next.js administrative suite for platform operators.
  - Full system oversight: global incident feeds, user promotion/demotion, org-level audits, agent key management.
- **Enterprise-Grade Audit Logging**:
  - Audit trail documenting all system mutations (`server.created`, `monitor.deleted`, `agent.revoked`, `user.promoted`).
- **Security & Privacy Architecture**:
  - JWT auth with automatic, single-flight refresh token rotation.
  - Secure hardware-backed mobile storage (`flutter_secure_storage`).
  - Passwords hashed with bcrypt; SSH credentials never stored.

---

### E. Native Cross-Platform Mobile Experience (`watchdog_neo`)
- Modern Flutter UI with dark/light themes and fluid sparkline visualizations.
- Real-time WebSocket connection (`/ws`) for instantaneous state changes without polling.
- Multi-language localization: Native English (`en`) and Bengali (`bn`).
- Timezone selector supporting all IANA timezones (defaults to `Asia/Dhaka`).
- Interactive manual checks (`Check Now`) with instant visual feedback.

---

## 3. Landing Website Structure & Content Blueprint

### Section 1: Hero Area
- **Headline**: High-Performance Observability & Uptime Monitoring Without the Complexity.
- **Subheadline**: Track servers, APIs, databases, SSL certificates, and prevent cold-boots with an all-in-one platform built for agile teams.
- **Primary CTA**: Get Started Free / Download Mobile App
- **Secondary CTA**: View Live Demo / Explore Documentation
- **Visuals**: Hero mockup showing Flutter Mobile dashboard, real-time sparkline metrics, and status badges (`Operational`, `99.98% Uptime`).

### Section 2: Trust & Social Proof Badges
- 99.99% Monitoring Reliability
- 30-Second Heartbeat Resolution
- Sub-Second WebSocket Broadcasts
- Zero Persistent SSH Credential Storage
- Open-Source / Self-Hostable or Managed Cloud

### Section 3: Feature Highlights (Grid / Tabs)
1. **Full-Stack Synthetic Probes**: HTTP(S), DNS, Ping, TCP, and SSL monitoring.
2. **One-Command & SSH Agent Provisioning**: SSH auto-deploy or copy-paste Linux/WordPress agent.
3. **Database Deep Dives**: Postgres cache ratios, active connections, Redis & MySQL latency.
4. **Cold-Boot Prevention (Keep-Alive)**: Never let your free-tier backend sleep again.
5. **Instant Incident Response**: Real-time push notifications, incident timelines, MTTR tracking.
6. **Bilingual Mobile Experience**: Full English & Bengali support on iOS and Android.

### Section 4: How It Works (3-Step Workflow)
1. **Deploy in Seconds**: Add an HTTP endpoint or enter server SSH credentials to auto-install the agent.
2. **Watchdog Observes**: Distributed workers and agents collect metrics, execute health checks, and stream data.
3. **Resolve Before Users Notice**: Receive real-time FCM push alerts, collaborate on incident timelines, and diagnose root causes.

### Section 5: Comparison Matrix (Watchdog vs. Traditional Monitoring)

| Capability | Traditional APM / Uptime Tools | Watchdog |
| :--- | :--- | :--- |
| **Mobile-First Experience** | Clunky responsive web views | Native Flutter iOS & Android apps |
| **Agent Provisioning** | Manual multi-step configuration | 1-Click automated SSH provisioning |
| **Database Telemetry** | Expensive enterprise add-ons | Native PostgreSQL, MySQL, Redis & Supabase |
| **Cold-Boot Warmer** | Requires separate cron jobs | Dedicated built-in Keep-Alive module |
| **WordPress Integration** | Generic external ping only | Deep WP metrics (plugins, posts, updates, PHP memory) |
| **Language Support** | English only | English and Bengali native localization |
| **Realtime Updates** | Periodic dashboard refreshes | Instant full-duplex WebSocket stream |

### Section 6: Frequently Asked Questions (FAQ)

1. **What is Watchdog?**  
   Watchdog is an all-in-one observability and uptime monitoring platform designed to track the health, metrics, databases, and uptime of websites, servers, and cloud applications.

2. **How does automated SSH server provisioning work?**  
   You provide SSH host details and credentials in the app. Watchdog securely connects in-memory, installs Node.js (if missing), deploys the agent, sets up systemd service auto-start, and confirms the first heartbeat. Your credentials are never stored.

3. **What is the Keep-Alive feature?**  
   Keep-Alive is designed for developers hosting APIs on platforms with spin-down sleep policies (like Render, Railway, or Fly.io free tiers). Watchdog periodically warms up your service so cold-boot latency never affects your users.

4. **Can I monitor databases directly?**  
   Yes! Watchdog natively connects to PostgreSQL (including Supabase), MySQL, and Redis to measure response times, connection pools, cache hits, and transaction health.

5. **How does the WordPress Agent plugin work?**  
   The WordPress plugin (`watchdog-agent-wp`) hooks into WP-Cron to send 30-second heartbeats and collect internal metrics such as PHP memory usage, database size, active plugins, pending updates, and user count.

6. **What notification channels are supported?**  
   Watchdog supports instant mobile push notifications via Firebase Cloud Messaging (FCM), transactional email alerts, and in-app notification centers with customizable severity thresholds.

7. **Is Watchdog localized in multiple languages?**  
   Yes, Watchdog is fully localized in English and Bengali (বাংলা), including the mobile client and date/time formatters.

8. **Can I manage multiple environments and teams?**  
   Yes. Watchdog provides multi-tenant organizations with role-based access control (`Owner`, `Admin`, `Developer`, `Viewer`) and projects segmented by environment (`Production`, `Staging`, `Development`, `Testing`).

---

## 4. Tech Stack & Architecture Summary

| Component | Technologies & Frameworks |
| :--- | :--- |
| **Landing Website** | Next.js (App Router), TypeScript, TailwindCSS, Bootstrap Icons |
| **Mobile Client** | Flutter, Riverpod, Dio, GoRouter, Firebase Cloud Messaging, Flutter Secure Storage |
| **Backend API** | NestJS, TypeScript, Prisma ORM, PostgreSQL, Redis, Socket.IO, BullMQ |
| **Monitoring Workers** | BullMQ background jobs, HTTP/SSL/DNS/TCP/Database synthetic probes |
| **Server Agents** | Node.js (Linux/Windows systemd & cron agent), PHP (WordPress Agent Plugin) |
| **Admin Console** | Next.js, TailwindCSS, Next-Auth / JWT Session Management |
