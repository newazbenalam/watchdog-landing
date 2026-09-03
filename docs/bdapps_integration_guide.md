• The skill initializer is blocked by the workspace’s Windows directory permissions, so I’m continuing with the same
  required SKILL.md structure manually under docs/subscription-backend-integration. The content will remain self-
  contained and include the live endpoint contract, monitoring, and Flutter guidance.

• Added docs\subscription-backend-integration\SKILL.md (+324 -0)
      1 +---
      2 +name: subscription-backend-integration
      3 +description: Integrate and operate AI Notepad's BDApps monthly mobile subscription, including OTP request and v
         erification, subscription status monitoring, unsubscribe flows, website integration, Flutter integration, backe
         nd security, and troubleshooting. Use when implementing or debugging subscription purchase, renewal, cancellati
         on, or access-entitlement behavior.
      4 +---
      5 +
      6 +# Subscription Backend Integration
      7 +
      8 +Use this guide when continuing AI Notepad's BDApps subscription work. The current production backend is PHP and
          is deployed at:
      9 +
     10 +`https://bdappsdigitalapps.com/NADB26099`
     11 +
     12 +The currently supported product is the monthly plan at `9.99 BDT`. The 7-day and yearly plans are displayed as
         `Coming soon` and must not call the monthly endpoint.
     13 +
     14 +## Source Of Truth
     15 +
     16 +Read these files before changing the integration:
     17 +
     18 +- `docs/backend/bdApps_docs.html`: checked-in BDApps API specification.
     19 +- `docs/backend/samples/config.php`: server-only BDApps credentials.
     20 +- `docs/backend/samples/send_otp.php`: phone normalization and OTP request proxy.
     21 +- `docs/backend/samples/verify_otp.php`: OTP verification proxy.
     22 +- `docs/backend/samples/check_subscription.php`: status query proxy.
     23 +- `docs/backend/samples/unsubscribe.php`: cancellation proxy.
     24 +- `docs/backend/samples/subscription_listener.php`: BDApps notification receiver.
     25 +- `src/app/components/Sections.tsx`: current website purchase modal.
     26 +- `src/app/data.ts`: website BDApps base URL and APK URL configuration.
     27 +
     28 +Never move `BDAPPS_APP_ID` or `BDAPPS_APP_PASSWORD` into frontend code, `NEXT_PUBLIC_*` variables, the APK, Flu
         tter assets, logs, or a public repository.
     29 +
     30 +## Current Website Flow
     31 +
     32 +The static Next.js website calls the deployed PHP proxies directly. It does not call `developer.bdapps.com` fro
         m the browser.
     33 +
     34 +1. The user chooses the active monthly plan.
     35 +2. The user enters a Bangladeshi mobile number.
     36 +3. The website sends a form-encoded `POST` to `send_otp.php`.
     37 +4. The PHP proxy sends a JSON request to BDApps `/subscription/otp/request` and returns `referenceNo`.
     38 +5. The user enters the received OTP.
     39 +6. The website sends `Otp` and `referenceNo` to `verify_otp.php`.
     40 +7. Access is considered active only when the response contains `statusCode: "S1000"` and `subscriptionStatus: "
         REGISTERED"`.
     41 +8. Only after that confirmation should the APK download control be enabled.
     42 +
     43 +The website uses `NEXT_PUBLIC_APK_DOWNLOAD_URL` only for the final download URL. This is not a payment secret.
         Build the static site with the real APK URL configured:
     44 +
     45 +```powershell
     46 +$env:NEXT_PUBLIC_APK_DOWNLOAD_URL = "https://example.com/path/ai-notepad.apk"
     47 +npm run build
     48 +```
     49 +
     50 +The build copies the static export to `dist`.
     51 +
     52 +## Endpoint Contract
     53 +
     54 +All deployed proxy endpoints accept `POST` requests with `application/x-www-form-urlencoded` bodies and return
         JSON. They also answer `OPTIONS` for CORS preflight.
     55 +
     56 +### Request OTP
     57 +
     58 +`POST https://bdappsdigitalapps.com/NADB26099/send_otp.php`
     59 +
     60 +Body:
     61 +
     62 +```text
     63 +user_mobile=01712345678
     64 +```
     65 +
     66 +Accepted input forms are normalized by PHP to an 11-digit local number. The proxy accepts local `01...`, `8801.
         ..`, and `88...` forms. BDApps receives:
     67 +
     68 +```json
     69 +{
     70 +  "applicationId": "SERVER_VALUE",
     71 +  "password": "SERVER_VALUE",
     72 +  "subscriberId": "tel:8801712345678",
     73 +  "applicationHash": "App Name",
     74 +  "applicationMetaData": {
     75 +    "client": "MOBILEAPP",
     76 +    "device": "...",
     77 +    "os": "...",
     78 +    "appCode": "..."
     79 +  }
     80 +}
     81 +```
     82 +
     83 +Successful proxy response:
     84 +
     85 +```json
     86 +{
     87 +  "success": true,
     88 +  "referenceNo": "213561321321613",
     89 +  "statusCode": "S1000",
     90 +  "statusDetail": "Success",
     91 +  "version": "1.0"
     92 +}
     93 +```
     94 +
     95 +Do not proceed to OTP verification without a non-empty `referenceNo`.
     96 +
     97 +### Verify OTP
     98 +
     99 +`POST https://bdappsdigitalapps.com/NADB26099/verify_otp.php`
    100 +
    101 +Body:
    102 +
    103 +```text
    104 +Otp=123564&referenceNo=213561321321613
    105 +```
    106 +
    107 +Successful response:
    108 +
    109 +```json
    110 +{
    111 +  "statusCode": "S1000",
    112 +  "statusDetail": "Success",
    113 +  "subscriptionStatus": "REGISTERED",
    114 +  "subscriberId": "tel:MASKED_VALUE",
    115 +  "version": "1.0"
    116 +}
    117 +```
    118 +
    119 +The `subscriberId` returned by BDApps may be masked. Store it if the app needs it for later server-side operati
         ons, but do not display it as a phone number.
    120 +
    121 +### Check Subscription Status
    122 +
    123 +`POST https://bdappsdigitalapps.com/NADB26099/check_subscription.php`
    124 +
    125 +Body:
    126 +
    127 +```text
    128 +user_mobile=01712345678
    129 +```
    130 +
    131 +Successful proxy response shape:
    132 +
    133 +```json
    134 +{
    135 +  "subscriptionStatus": "REGISTERED",
    136 +  "isSubscribed": true,
    137 +  "statusCode": "S1000",
    138 +  "statusDetail": "Success",
    139 +  "version": "1.0",
    140 +  "subscriberId": "tel:8801712345678"
    141 +}
    142 +```
    143 +
    144 +Treat `isSubscribed === true` or a normalized `subscriptionStatus === REGISTERED` as active. Treat every other
         status as inactive or unresolved. Normalize case and trim punctuation because BDApps examples include values su
         ch as `UNREGISTERED.`.
    145 +
    146 +### Unsubscribe
    147 +
    148 +`POST https://bdappsdigitalapps.com/NADB26099/unsubscribe.php`
    149 +
    150 +Body:
    151 +
    152 +```text
    153 +user_mobile=01712345678
    154 +```
    155 +
    156 +The PHP proxy calls BDApps `/subscription/send` with `action: "0"`.
    157 +
    158 +Successful cancellation is represented by either:
    159 +
    160 +- `statusCode === "S1000"`, or
    161 +- `subscriptionStatus === "UNREGISTERED"` after normalization.
    162 +
    163 +Cancellation should be confirmed by calling `check_subscription.php` again. Do not grant or revoke access based
          only on a network-level `200` response.
    164 +
    165 +## Monitoring Subscriptions
    166 +
    167 +Use two complementary mechanisms.
    168 +
    169 +### Active status checks
    170 +
    171 +Call `check_subscription.php`:
    172 +
    173 +- when the user opens the subscription screen;
    174 +- after OTP verification;
    175 +- when the app resumes from background after a long interval;
    176 +- before a protected purchase or download action;
    177 +- after a cancellation request;
    178 +- during support investigations.
    179 +
    180 +Do not poll aggressively. A practical Flutter policy is on app start, on resume if the last check is older than
          15 minutes, and on explicit user refresh. Cache only the normalized status and its timestamp; never cache the
         OTP.
    181 +
    182 +### BDApps notifications
    183 +
    184 +Configure the BDApps notification callback to point to:
    185 +
    186 +`https://bdappsdigitalapps.com/NADB26099/subscription_listener.php`
    187 +
    188 +The listener currently acknowledges notifications with `S1000` and writes a basic line to `subscription_notific
         ations.log`. Before treating this as production-grade entitlement storage, improve it to:
    189 +
    190 +1. Authenticate or validate the notification according to BDApps provisioning guidance.
    191 +2. Validate `applicationId`, `subscriberId`, `status`, `frequency`, and timestamp.
    192 +3. Store an idempotent event keyed by provider event identifiers or a stable hash.
    193 +4. Update the server-side subscription record.
    194 +5. Return `S1000` only after the event is safely recorded.
    195 +6. Keep secrets and logs outside the public web root.
    196 +
    197 +Never use a client-provided `REGISTERED` value as the sole entitlement source for sensitive features. The Flutt
         er app should ask the backend for the current entitlement, and the backend should reconcile provider status.
    198 +
    199 +## Flutter Integration
    200 +
    201 +Keep the Flutter app dependent on the PHP backend contract, not on BDApps credentials. Implement a small reposi
         tory/service with these methods:
    202 +
    203 +```dart
    204 +abstract class SubscriptionRepository {
    205 +  Future<OtpChallenge> requestOtp(String phoneNumber);
    206 +  Future<SubscriptionState> verifyOtp({required String otp, required String referenceNo});
    207 +  Future<SubscriptionState> checkStatus(String phoneNumber);
    208 +  Future<SubscriptionState> unsubscribe(String phoneNumber);
    209 +}
    210 +```
    211 +
    212 +Use `http` or the project's existing networking client. Send form data, not a JSON body, to the PHP proxies:
    213 +
    214 +```dart
    215 +final response = await client.post(
    216 +  Uri.parse('$baseUrl/send_otp.php'),
    217 +  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    218 +  body: {'user_mobile': normalizedPhone},
    219 +);
    220 +```
    221 +
    222 +Recommended state model:
    223 +
    224 +```text
    225 +unknown
    226 +checking
    227 +otpRequired
    228 +verifying
    229 +active
    230 +inactive
    231 +cancelling
    232 +error
    233 +```
    234 +
    235 +Persist only non-sensitive subscription metadata locally:
    236 +
    237 +- normalized phone number, if the user consents;
    238 +- last known status;
    239 +- last status-check time;
    240 +- current `referenceNo` only until OTP verification completes.
    241 +
    242 +Clear `referenceNo` after success, failure, timeout, or cancellation. Do not persist OTP values. Use secure sto
         rage for any authenticated app session tokens, but remember that BDApps application credentials never belong in
          Flutter.
    243 +
    244 +### Flutter purchase sequence
    245 +
    246 +```text
    247 +phone input
    248 +  -> validate and normalize
    249 +  -> requestOtp
    250 +  -> show OTP screen
    251 +  -> verifyOtp
    252 +  -> require S1000 + REGISTERED
    253 +  -> checkStatus
    254 +  -> active entitlement
    255 +```
    256 +
    257 +Handle timeout, connection failure, invalid OTP, expired reference number, too many OTP attempts, and provider
         charging errors as recoverable UI states. Offer retry without silently submitting repeated requests.
    258 +
    259 +### Flutter cancellation sequence
    260 +
    261 +```text
    262 +user confirms cancellation
    263 +  -> unsubscribe
    264 +  -> require successful provider response
    265 +  -> checkStatus
    266 +  -> show inactive state
    267 +```
    268 +
    269 +Use an explicit confirmation screen. Explain that cancellation affects recurring subscription status and that p
         rovider timing may affect when the status changes.
    270 +
    271 +## Status And Error Handling
    272 +
    273 +Important provider statuses from the checked-in BDApps specification include:
    274 +
    275 +- `S1000`: request completed successfully;
    276 +- `E1850`: invalid OTP;
    277 +- `E1851`: OTP expired;
    278 +- `E1852`: maximum OTP attempts reached;
    279 +- `E1854`: OTP not found;
    280 +- `E1855`: invalid reference number;
    281 +- `E1856`: invalid OTP request;
    282 +- `E1857`: provider-side OTP error;
    283 +- `E1301`: application is not allowed for the operator;
    284 +- `E1313`: application authentication failed;
    285 +- `E1317`: invalid or disallowed MSISDN;
    286 +- `E1326`: insufficient balance for a charging operation;
    287 +- `E1337`: duplicate request;
    288 +- `E1601`/`E1603`: provider or temporary system error.
    289 +
    290 +Map provider codes to user-safe messages. Log the provider code and a correlation ID server-side, but never log
          OTPs, passwords, or full sensitive tokens.
    291 +
    292 +## Security And Deployment Rules
    293 +
    294 +- Keep `config.php` credentials server-side and outside frontend bundles.
    295 +- Replace `Access-Control-Allow-Origin: *` with the actual website and app origins when the deployment topology
          allows it.
    296 +- Add rate limiting per IP, phone number, and device to OTP endpoints.
    297 +- Avoid revealing whether a phone number belongs to another account.
    298 +- Use HTTPS for every website, Flutter, PHP, and BDApps request.
    299 +- Validate provider responses by schema and status, not only HTTP status.
    300 +- Add request IDs and structured server logs with retention limits.
    301 +- Make notification handling idempotent.
    302 +- Do not allow the APK URL or a client-supplied plan price to decide entitlement.
    303 +- The backend must verify that the provisioned BDApps service is the monthly `9.99 BDT` product.
    304 +
    305 +## Current Limitations
    306 +
    307 +The checked-in samples do not implement a verified one-time 7-day charge or a yearly subscription. Do not simul
         ate those plans by calling the monthly subscription endpoint. Add a separately reviewed backend endpoint only a
         fter BDApps provisions and documents the corresponding product and charging behavior.
    308 +
    309 +The current `subscription_listener.php` is an acknowledgement/logging sample, not a durable entitlement service
         . Harden it before relying on asynchronous notifications for access control.
    310 +
    311 +## Verification Checklist
    312 +
    313 +Before releasing a change:
    314 +
    315 +1. Confirm the deployed PHP files return JSON and support CORS for the website/app origins.
    316 +2. Test invalid, local, `88...`, and `880...` phone formats without sending repeated OTPs.
    317 +3. Test OTP success and each recoverable failure state with a provider-approved test number.
    318 +4. Confirm only `S1000` plus `REGISTERED` unlocks the monthly entitlement.
    319 +5. Confirm status checks normalize `REGISTERED` and `UNREGISTERED.` correctly.
    320 +6. Confirm unsubscribe is followed by a status check.
    321 +7. Confirm notification events are logged without OTPs or credentials.
    322 +8. Confirm the website static build still writes to `dist`.
    323 +9. Confirm the Flutter app works offline by retaining the last known state but does not invent a new active ent
         itlement.
    324 +

# WatchLog — BDApps Mobile Subscription Integration Guide

This guide documents the BDApps mobile subscription integration for WatchLog, converting and upgrading the PHP proxy samples into full-stack TypeScript/Next.js API route handlers and services.

---

## 1. Architecture Overview

WatchLog supports two deployment modes for BDApps mobile billing:
1. **Next.js Full-Stack API Routes (Recommended)**: Built directly into `watchdog-landing` (`src/lib/bdapps/` and `src/app/api/bdapps/`). Works on Node.js, Vercel, Docker, etc.
2. **Standalone PHP Backend (`backend_php/`)**: Standalone PHP scripts with CORS and JSON support for deployment to Apache/Nginx/cPanel servers.

---

## 2. Supported Endpoints

All endpoints support both `application/json` and `application/x-www-form-urlencoded` request bodies and full CORS preflight.

| Operation | Next.js API Route | Legacy / PHP URL | Method |
|---|---|---|---|
| **Request OTP** | `/api/bdapps/send-otp` | `/send_otp.php` | `POST` |
| **Verify OTP** | `/api/bdapps/verify-otp` | `/verify_otp.php` | `POST` |
| **Check Status** | `/api/bdapps/check-subscription` | `/check_subscription.php` | `GET` / `POST` |
| **Unsubscribe** | `/api/bdapps/unsubscribe` | `/unsubscribe.php` | `POST` |
| **Listener Webhook** | `/api/bdapps/subscription-listener` | `/subscription_listener.php` | `POST` |
| **SMS Gateway** | `/api/bdapps/sms` | `/sms.php` | `POST` |
| **USSD Menu** | `/api/bdapps/ussd` | `/ussd.php` | `POST` |

---

## 3. Environment Configuration

Set the following variables in `.env`:

```env
BDAPPS_APP_ID=APP_139287
BDAPPS_APP_PASSWORD=a0f308c541496f23a4e96c9f42487f3e
BDAPPS_BASE_URL=https://developer.bdapps.com
BDAPPS_APP_HASH=WatchLog
NEXT_PUBLIC_APK_DOWNLOAD_URL=/app-release.apk
NEXT_PUBLIC_BDAPPS_API_URL=
```

---

## 4. Purchasing Flow

1. User clicks **Subscribe with BDApps** in the daily pricing tier (2.78 BDT/day including VAT+SD+Sc). Subscriptions are available for Robi and Cirkle users only.
2. User enters an 11-digit Bangladeshi mobile number (`01XXXXXXXXX`).
3. App dispatches `POST /api/bdapps/send-otp` with `user_mobile`.
4. BDApps sends a 4-8 digit SMS verification code and returns a `referenceNo`.
5. User enters the OTP code.
6. App dispatches `POST /api/bdapps/verify-otp` with `Otp` and `referenceNo`.
7. Once confirmed with `statusCode: "S1000"` and `subscriptionStatus: "REGISTERED"`:
   - Subscription state is retained in browser local storage.
   - APK download button unlocks immediately.