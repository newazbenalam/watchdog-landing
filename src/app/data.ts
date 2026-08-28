export const basePath = "";
export const assetBase = `${basePath}/assets/`;
export const bdAppsSubscriptionApi = "https://bdappsdigitalapps.com/NADB26099";
export const apkDownloadUrl = process.env.NEXT_PUBLIC_APK_DOWNLOAD_URL ?? "";

export const screenshots = [
  "Screenshot_1787398394.png",
  "Screenshot_1787405554.png",
  "Screenshot_1787405569.png",
  "Screenshot_1787405578.png",
  "Screenshot_1787405582.png",
  "Screenshot_1787896741.png",
  "Screenshot_1787896750.png",
];

export const trusts = [
  ["30s Fast Heartbeats", "bi-activity", "Sub-minute autonomous server health beats with instant offline detection and recovery alerts."],
  ["Multi-Protocol Probes", "bi-hdd-network", "Synthetic checks for HTTP/S, TCP ports, ICMP Ping, DNS records, and SSL cert expirations."],
  ["1-Click SSH Agent Setup", "bi-terminal", "Auto-install server agents over SSH in seconds with streaming progress and zero credential storage."],
  ["Deep Database Telemetry", "bi-database", "Native live health and performance metrics for PostgreSQL, Supabase, MySQL, and Redis."],
  ["Cold-Boot Warmer", "bi-lightning-charge", "Dedicated Keep-Alive service to keep free-tier instances (Render, Railway, Fly.io) always awake."],
  ["Real-Time Incident Engine", "bi-bell", "Instant WebSocket updates, FCM mobile push, MTTR/MTTA reliability stats, and root cause logs."],
] as const;

export const featureGroups = [
  ["Synthetic Probes", "bi-broadcast-pin", ["HTTP / HTTPS Health Checks", "Latency Breakdown (DNS/TCP/TLS/TTFB)", "Status Code & Body Match", "TCP Port Check", "ICMP Ping", "DNS Record Verification", "SSL Expiry Alerts", "Manual Check Now"]],
  ["Server Telemetry", "bi-cpu", ["30s Heartbeat Resolution", "CPU Usage & Load Average", "RAM & Swap Consumption", "Disk Usage & Partition Health", "Network Throughput", "Daemon/Service Tracking", "One-Click Key Rotation", "Instant Revocation"]],
  ["Database Observability", "bi-database-check", ["PostgreSQL Direct Checks", "Supabase Connection Pooler", "MySQL Latency & Ping", "Redis Reachability", "Cache Hit Ratios", "Active vs Idle Connections", "Committed/Rolled Back Tx", "Deadlock Monitoring"]],
  ["Automated SSH Provisioning", "bi-terminal-split", ["1-Click Remote Deployment", "Password or SSH Key Auth", "Zero Persistent Credential Storage", "Auto Node.js 20 Setup", "Systemd Daemon & Cron Fallback", "Real-Time WebSocket Progress"]],
  ["Keep-Alive & Cold-Boot Warmer", "bi-fire", ["Free-Tier Cloud Warmer", "Render / Railway / Fly.io / Heroku", "Scheduled Background Pings", "Zero Cold-Boot Latency", "Dedicated Keep-Alive Section", "Custom Intervals"]],
  ["Incidents & Alerts", "bi-exclamation-triangle", ["Automated Alert Grouping", "Multi-Severity (Info/Warn/Critical)", "Duration Tolerances", "Incident Timeline & Notes", "MTTR & MTTA Stats", "FCM Push Notifications", "Email Alerts", "In-App Notification Center"]],
  ["WordPress Integration", "bi-wordpress", ["Native WP Agent Plugin", "WP-Cron Autonomous Beats", "Plugin & Core Update Tracker", "PHP Memory Usage", "Database Size Monitoring", "Active User & Post Count", "Fallback Beat URL"]],
  ["Collaboration & Security", "bi-shield-check", ["Multi-Tenant Organizations", "Environment Separation (Prod/Stage/Dev)", "Role-Based Access (Owner/Admin/Dev)", "Enterprise Audit Trail", "JWT Session Rotation", "Hardware Secure Storage", "Bilingual (English & বাংলা)"]],
] as const;

export const comparison = [
  ["Mobile Experience", "Clunky mobile web views", "Native Flutter iOS & Android apps with sparklines"],
  ["Agent Installation", "Complex multi-step scripts", "1-Click automated SSH provisioning with live logs"],
  ["Database Monitoring", "Expensive enterprise tier add-on", "Built-in PostgreSQL, MySQL, Redis & Supabase"],
  ["Cold-Boot Warmer", "Requires external cron scripts", "Dedicated Keep-Alive engine for cloud free-tiers"],
  ["WordPress Telemetry", "Generic external HTTP check only", "Deep WordPress metrics, plugin updates & memory"],
  ["Real-Time State", "Periodic dashboard polling", "Sub-second WebSocket live event broadcasts"],
  ["Alert Grouping & SLA", "Scattered noisy alert emails", "Unified incidents, timeline notes, MTTR/MTTA"],
  ["Language Support", "English only", "Native English and Bengali (বাংলা) localization"],
] as const;

export const workflow = ["Provision Agent", "Synthetic Probes", "Telemetry Ingestion", "Smart Alert Engine", "FCM Mobile Push", "Resolve & Analyze"];
export const tech = ["Flutter", "NestJS", "PostgreSQL", "Redis", "Socket.IO", "BullMQ", "Prisma ORM", "Next.js", "Docker", "Node.js", "PHP / WP-Cron"];

export const faqs = [
  ["What is WatchLog?", "WatchLog is an all-in-one real-time observability, server telemetry, and uptime monitoring platform designed for modern engineering teams, system administrators, and indie developers."],
  ["How does 1-Click SSH server provisioning work?", "You provide SSH host details and credentials directly in the mobile or admin app. WatchLog establishes an in-memory SSH connection, installs Node.js if needed, sets up the agent as a systemd service, and verifies the first heartbeat. Your SSH credentials are never saved on disk or in the database."],
  ["What is the Keep-Alive cold-boot warmer?", "Keep-Alive is designed for developers hosting apps on platforms with auto-sleep policies (such as Render, Railway, Fly.io, or Heroku free tiers). WatchLog sends periodic warm-up pings so your endpoints never suffer from slow cold-start delays."],
  ["Can I monitor databases directly with WatchLog?", "Yes! WatchLog natively connects to PostgreSQL (including Supabase), MySQL, and Redis to measure response times, connection pools, cache hit ratios, and transaction health."],
  ["How does the WordPress Agent plugin work?", "The WordPress plugin (watchdog-agent-wp) uses WP-Cron to dispatch 30-second heartbeats and monitor critical site internals including active plugins, pending updates, PHP memory usage, database size, and self-response latency."],
  ["What synthetic monitoring probes are supported?", "WatchLog supports HTTP(S) with granular DNS/TCP/TLS/TTFB latency breakdowns, TCP port pinging, ICMP Ping, DNS record verification (A, AAAA, CNAME, MX, TXT), and SSL certificate expiration alerting."],
  ["What notification channels are supported?", "WatchLog delivers instant mobile push notifications via Firebase Cloud Messaging (FCM), transactional email alerts, and in-app notification centers with customizable severity thresholds."],
  ["Is WatchLog localized in multiple languages?", "Yes, WatchLog features full bilingual localization in English and Bengali (বাংলা), across the mobile client and date/time formatters."],
  ["Can I manage multiple organizations and environments?", "Yes. WatchLog supports multi-tenant organizations with role-based access control (Owner, Admin, Developer, Viewer) and project partitioning by environment (Production, Staging, Development, Testing)."],
  ["Can I export or delete my data?", "Yes. You have full ownership of your data. You can delete monitors, servers, organizations, or submit an account deletion request at any time."],
] as const;

export const navLinks = [["Home", "/"], ["Features", "/features"], ["FAQ", "/faq"], ["Privacy Policy", "/privacy-policy"], ["Terms", "/terms"], ["Contact", "/contact"]] as const;
