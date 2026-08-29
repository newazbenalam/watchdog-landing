# WatchLog Landing Website & BDApps Gateway

Modern, high-performance landing page and BDApps mobile billing gateway for **WatchLog** (Real-Time Observability & Server Telemetry).

---

## 🚀 Quick Start (Development)

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

---

## 🐳 Production Deployment with Docker

### 1. Configure Environment
Copy `.env.example` to `.env` and configure your credentials:

```env
BDAPPS_APP_ID=APP_139287
BDAPPS_APP_PASSWORD=your_bdapps_password
BDAPPS_BASE_URL=https://developer.bdapps.com
BDAPPS_APP_HASH=WatchLog
NEXT_PUBLIC_APK_DOWNLOAD_URL=/app-release.apk
PORT=3000
```

### 2. Build & Start with Docker Compose

```bash
docker compose up -d --build
```

### 3. View Logs & Status

```bash
docker compose logs -f
docker compose ps
```

### 4. Stop the Service

```bash
docker compose down
```

---

## 🛠 Features

- **Next.js 16 App Router**: Server-rendered React 19 architecture with Standalone runner.
- **BDApps Mobile Subscription API**:
  - `POST /api/bdapps/send-otp` (and `/send_otp.php`)
  - `POST /api/bdapps/verify-otp` (and `/verify_otp.php`)
  - `GET / POST /api/bdapps/check-subscription` (and `/check_subscription.php`)
  - `POST /api/bdapps/unsubscribe` (and `/unsubscribe.php`)
  - `POST /api/bdapps/subscription-listener` (and `/subscription_listener.php`)
- **Bilingual Localization**: English & Bengali (বাংলা) language toggling.
- **Micro-animations & Dark Design**: High-density typography, live terminal simulation, glassmorphism cards, and screenshot carousel.
