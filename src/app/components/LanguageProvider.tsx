"use client";

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

type Language = "en" | "bn";

const bn: Record<string, string> = {
  "Home": "হোম",
  "Features": "ফিচারস",
  "FAQ": "সাধারণ জিজ্ঞাসা",
  "Privacy Policy": "গোপনীয়তা নীতি",
  "Terms": "শর্তাবলি",
  "Contact": "যোগাযোগ",
  "Download App": "অ্যাপ ডাউনলোড",
  "Real-time observability, server telemetry, database health checks, and uptime monitoring engineered for modern systems.": "আধুনিক সিস্টেমের জন্য রিয়েল-টাইম পর্যবেক্ষণ, সার্ভার টেলিমেট্রি, ডাটাবেস স্বাস্থ্য পরীক্ষা এবং আপটাইম মনিটরিং।",
  "Product": "প্রোডাক্ট",
  "Download": "ডাউনলোড",
  "Legal": "আইনি",
  "Privacy": "গোপনীয়তা",
  "Delete Account": "অ্যাকাউন্ট মুছুন",
  "Support": "সহায়তা",
  "All rights reserved.": "সর্বস্বত্ব সংরক্ষিত।",
  "Ready for zero-downtime confidence?": "জিরো-ডাউনটাইম আত্মবিশ্বাসের জন্য প্রস্তুত?",
  "Start monitoring servers, APIs, databases, and cold-boots with WatchLog today.": "আজই ওয়াচলগের সাথে সার্ভার, এপিআই, ডাটাবেস ও কোল্ড-বুট মনিটরিং শুরু করুন।",
  "Real-Time Observability & Uptime Platform": "রিয়েল-টাইম পর্যবেক্ষণ ও আপটাইম প্ল্যাটফর্ম",
  "Modern, real-time observability, server telemetry, and uptime monitoring engineered for agile engineering teams and indie builders.": "গতিশীল ইঞ্জিনিয়ারিং টিম এবং ডেভেলপারদের জন্য তৈরি আধুনিক রিয়েল-টাইম পর্যবেক্ষণ, সার্ভার টেলিমেট্রি এবং আপটাইম মনিটরিং।",
  "Observing": "পর্যবেক্ষণ করছে",
  "Linux VMs, APIs, PostgreSQL, Redis, SSL certs, and cold-boot warmers.": "লিনাক্স ভিএম, এপিআই, পোস্টগ্রেস, রেডিস, এসএসএল এবং কোল্ড-বুট ওয়ার্মার।",
  "Download on": "ডাউনলোড করুন",
  "Google Play": "গুগল প্লে",
  "BDApps": "বিডি অ্যাপস",
  "Subscription Plans": "সাবস্ক্রিপশন প্ল্যান",
  "Explore Features": "ফিচারগুলো দেখুন",
  "30s Fast Heartbeats": "৩০ সেকেন্ড ফাস্ট হার্টবিট",
  "Sub-minute autonomous server health beats with instant offline detection and recovery alerts.": "তাত্ক্ষণিক অফলাইন সনাক্তকরণ এবং রিকভারি সতর্কতা সহ সাব-মিনিট সার্ভার হেলথ বিট।",
  "Multi-Protocol Probes": "মাল্টি-প্রোটোকল প্রোব",
  "Synthetic checks for HTTP/S, TCP ports, ICMP Ping, DNS records, and SSL cert expirations.": "এইচটিটিপি/এস, টিসিপি পোর্ট, পিং, ডিএনএস রেকর্ড এবং এসএসএল মেয়াদের সিন্থেটিক চেক।",
  "1-Click SSH Agent Setup": "১-ক্লিকে এসএসএইচ এজেন্ট সেটআপ",
  "Auto-install server agents over SSH in seconds with streaming progress and zero credential storage.": "কোনো পাসওয়ার্ড সংরক্ষণ ছাড়াই লাইভ প্রগ্রেস স্ট্রিমিং সহ সেকেন্ডে এসএসএইচ-এর মাধ্যমে সার্ভার এজেন্ট ইনস্টল।",
  "Deep Database Telemetry": "গভীর ডাটাবেস টেলিমেট্রি",
  "Native live health and performance metrics for PostgreSQL, Supabase, MySQL, and Redis.": "পোস্টগ্রেসকিউএল, সুপাবেস, মাইএসকিউএল এবং রেডিসের লাইভ পারফরম্যান্স মেট্রিক্স।",
  "Cold-Boot Warmer": "কোল্ড-বুট ওয়ার্মার",
  "Dedicated Keep-Alive service to keep free-tier instances (Render, Railway, Fly.io) always awake.": "ফ্রি-টিয়ার ক্লাউড ইনস্ট্যান্স (রেন্ডার, রেলওয়ে, ফ্লাই.আইও) সর্বদা সচল রাখতে ডেডিকেটেড কিপ-অ্যালাইভ সেবা।",
  "Real-Time Incident Engine": "রিয়েল-টাইম ইনসিডেন্ট ইঞ্জিন",
  "Instant WebSocket updates, FCM mobile push, MTTR/MTTA reliability stats, and root cause logs.": "ইনস্ট্যান্ট ওয়েবসকেট আপডেট, এফসিএম পুশ নোটিফিকেশন, এমটিটিআর/এমটিটিএ স্ট্যাটাস এবং রুট-কজ লগ।",
  "Full-Stack Telemetry, Monitoring & Alerting": "ফুল-স্ট্যাক টেলিমেট্রি, মনিটরিং ও অ্যালার্টিং",
  "Synthetic uptime checks, 1-click SSH provisioning, deep database health, cold-boot warmers, and native mobile apps.": "সিন্থেটিক আপটাইম চেক, ১-ক্লিক এসএসএইচ প্রভিশনিং, ডাটাবেস হেলথ, কোল্ড-বুট ওয়ার্মার এবং নেটিভ মোবাইল অ্যাপ।",
  "Purpose-built observability tools with zero-friction setup and real-time streaming updates.": "সহজ সেটআপ এবং রিয়েল-টাইম স্ট্রিমিং আপডেট সহ উদ্দেশ্য-নির্মিত পর্যবেক্ষণ সরঞ্জাম।",
  "Synthetic Probes": "সিন্থেটিক প্রোব",
  "Server Telemetry": "সার্ভার টেলিমেট্রি",
  "Database Observability": "ডাটাবেস অবজারভেবিলিটি",
  "Automated SSH Provisioning": "স্বয়ংক্রিয় এসএসএইচ সেটআপ",
  "Keep-Alive & Cold-Boot Warmer": "কিপ-অ্যালাইভ ও কোল্ড-বুট ওয়ার্মার",
  "Incidents & Alerts": "ইনসিডেন্ট ও অ্যালার্ট",
  "WordPress Integration": "ওয়ার্ডপ্রেস ইন্টিগ্রেশন",
  "Collaboration & Security": "সহযোগিতা ও নিরাপত্তা",
  "Why WatchLog": "কেন ওয়াচলগ",
  "Built for speed, simplicity, and zero friction": "গতি, সরলতা এবং শূন্য জটিলতার জন্য নির্মিত",
  "WatchLog eliminates complex APM overhead while giving developers instant mobile alerts, database telemetry, and cold-boot prevention.": "ওয়াচলগ জটিল এপিএম ঝামেলা দূর করে ডেভেলপারদের তাৎক্ষণিক মোবাইল অ্যালার্ট, ডাটাবেস টেলিমেট্রি এবং কোল্ড-বুট সুবিধা দেয়।",
  "Capability": "সক্ষমতা",
  "Traditional APM / Uptime": "প্রচলিত এপিএম / আপটাইম",
  "WatchLog": "ওয়াচলগ",
  "Mobile Experience": "মোবাইল অভিজ্ঞতা",
  "Clunky mobile web views": "ভারী মোবাইল ওয়েব ভিউ",
  "Native Flutter iOS & Android apps with sparklines": "স্পার্কলাইন সহ নেটিভ ফ্লাটার আইওএস ও অ্যান্ড্রয়েড অ্যাপ",
  "Agent Installation": "এজেন্ট ইনস্টলেশন",
  "Complex multi-step scripts": "জটিল বহু-ধাপের স্ক্রিপ্ট",
  "1-Click automated SSH provisioning with live logs": "লাইভ লগ সহ ১-ক্লিকে স্বয়ংক্রিয় এসএসএইচ প্রভিশনিং",
  "Database Monitoring": "ডাটাবেস মনিটরিং",
  "Expensive enterprise tier add-on": "ব্যয়বহুল এন্টারপ্রাইজ অ্যাড-অন",
  "Built-in PostgreSQL, MySQL, Redis & Supabase": "বিল্ট-ইন পোস্টগ্রেসকিউএল, মাইএসকিউএল, রেডিস ও সুপাবেস",
  "Requires external cron scripts": "বাহ্যিক ক্রন স্ক্রিপ্ট প্রয়োজন",
  "Dedicated Keep-Alive engine for cloud free-tiers": "ক্লাউড ফ্রি-টিয়ারের জন্য ডেডিকেটেড কিপ-অ্যালাইভ ইঞ্জিন",
  "WordPress Telemetry": "ওয়ার্ডপ্রেস টেলিমেট্রি",
  "Generic external HTTP check only": "শুধুমাত্র সাধারণ এক্সটার্নাল এইচটিটিপি চেক",
  "Deep WordPress metrics, plugin updates & memory": "গভীর ওয়ার্ডপ্রেস মেট্রিক্স, প্লাগইন আপডেট ও মেমোরি",
  "Real-Time State": "রিয়েল-টাইম অবস্থা",
  "Periodic dashboard polling": "নির্দিষ্ট সময় পর পর পোলিং",
  "Sub-second WebSocket live event broadcasts": "সাব-সেকেন্ড ওয়েবসকেট লাইভ ইভেন্ট ব্রডকাস্ট",
  "Alert Grouping & SLA": "অ্যালার্ট গ্রুপিং ও এসএলএ",
  "Scattered noisy alert emails": "ছড়িয়ে ছিটিয়ে থাকা বিভ্রান্তিকর ইমেইল",
  "Unified incidents, timeline notes, MTTR/MTTA": "একত্রিত ইনসিডেন্ট, টাইমলাইন নোট এবং এমটিটিআর/এমটিটিএ",
  "Language Support": "ভাষা সহায়তা",
  "English only": "শুধু ইংরেজি",
  "Native English and Bengali (বাংলা) localization": "নেটিভ ইংরেজি ও বাংলা ভাষায় সম্পূর্ণ লোকালাইজেশন",
  "Observability Lifecycle": "পর্যবেক্ষণ কর্মপ্রবাহ",
  "From Provisioning to Instant Resolution": "সেটআপ থেকে তাত্ক্ষণিক সমাধান",
  "Provision Agent": "এজেন্ট সেটআপ",
  "Telemetry Ingestion": "টেলিমেট্রি গ্রহণ",
  "Smart Alert Engine": "স্মার্ট অ্যালার্ট ইঞ্জিন",
  "FCM Mobile Push": "এফসিএম মোবাইল পুশ",
  "Resolve & Analyze": "সমাধান ও বিশ্লেষণ",
  "Technology Stack": "প্রযুক্তি স্ট্যাক",
  "Built on robust, high-performance engines": "শক্তিশালী এবং উচ্চ-কার্যক্ষম প্রযুক্তিতে নির্মিত",
  "App Preview": "অ্যাপ প্রিভিউ",
  "A glance at the WatchLog interface": "ওয়াচলগ ইন্টারফেসের এক ঝলক",
  "Frequently Asked Questions": "সচরাচর জিজ্ঞাসিত প্রশ্ন",
  "View all FAQs": "সব প্রশ্ন দেখুন",
  "Subscription": "সাবস্ক্রিপশন",
  "Premium Access for WatchLog": "ওয়াচলগের প্রিমিয়াম অ্যাক্সেস",
  "Subscribe with your BDApps mobile number to unlock real-time server telemetry, database monitoring, and unlimited push notifications.": "রিয়েল-টাইম সার্ভার টেলিমেট্রি, ডাটাবেস মনিটরিং এবং পুশ নোটিফিকেশন আনলক করতে আপনার বিডি অ্যাপস নম্বর দিয়ে সাবস্ক্রাইব করুন।",
  "Coming soon": "শীঘ্রই আসছে",
  "7-day access": "৭ দিনের অ্যাক্সেস",
  "Short-term access for testing WatchLog features.": "ওয়াচলগ ফিচার পরীক্ষার জন্য স্বল্পমেয়াদি অ্যাক্সেস।",
  "All premium WatchLog monitoring probes": "সব প্রিমিয়াম ওয়াচলগ মনিটরিং প্রোব",
  "No recurring monthly commitment": "কোনো পুনরাবৃত্ত মাসিক প্রতিশ্রুতি নেই",
  "Available soon through BDApps": "বিডি অ্যাপসের মাধ্যমে শীঘ্রই আসছে",
  "Monthly": "মাসিক",
  "Monthly access": "মাসিক অ্যাক্সেস",
  "Recurring monthly access. A verification code will be sent to your BDApps number.": "পুনরাবৃত্ত মাসিক অ্যাক্সেস। আপনার বিডি অ্যাপস নম্বরে একটি যাচাইকরণ কোড পাঠানো হবে।",
  "1-Click SSH server agent provisioning": "১-ক্লিকে এসএসএইচ সার্ভার এজেন্ট সেটআপ",
  "Postgres, MySQL, Redis & Supabase monitoring": "পোস্টগ্রেস, মাইএসকিউএল, রেডিস ও সুপাবেস মনিটরিং",
  "Keep-Alive cold-boot warmer & instant FCM push": "কিপ-অ্যালাইভ কোল্ড-বুট ওয়ার্মার ও তাৎক্ষণিক এফসিএম পুশ",
  "Subscribe with BDApps": "বিডি অ্যাপস দিয়ে সাবস্ক্রাইব",
  "Yearly access": "বার্ষিক অ্যাক্সেস",
  "Best value for long-term server reliability and monitoring.": "দীর্ঘমেয়াদি সার্ভার নির্ভরযোগ্যতা এবং পর্যবেক্ষণের জন্য সেরা মূল্য।",
  "All premium WatchLog features": "সব প্রিমিয়াম ওয়াচলগ ফিচার",
  "One annual payment": "একটি বার্ষিক পেমেন্ট",
  "Monthly subscription": "মাসিক সাবস্ক্রিপশন",
  "Confirm your mobile number": "আপনার মোবাইল নম্বর নিশ্চিত করুন",
  "BDApps will send a verification code to activate monthly access at BDT 9.99.": "মাসিক ৯.৯৯ টাকায় অ্যাক্সেস সক্রিয় করতে বিডি অ্যাপস একটি যাচাইকরণ কোড পাঠাবে।",
  "BDApps mobile number": "বিডি অ্যাপস মোবাইল নম্বর",
  "Send verification code": "যাচাইকরণ কোড পাঠান",
  "Sending code...": "কোড পাঠানো হচ্ছে...",
  "Verification required": "যাচাইকরণ প্রয়োজন",
  "Enter your code": "আপনার কোড লিখুন",
  "Enter the verification code sent to your phone.": "আপনার ফোনে পাঠানো কোডটি লিখুন।",
  "Confirm subscription": "সাবস্ক্রিপশন নিশ্চিত করুন",
  "Confirming subscription...": "নিশ্চিত করা হচ্ছে...",
  "Use another number": "অন্য নম্বর ব্যবহার করুন",
  "Subscription active": "সাবস্ক্রিপশন সক্রিয়",
  "You are ready to use WatchLog": "আপনি ওয়াচলগ ব্যবহার করতে প্রস্তুত",
  "Your BDApps monthly subscription has been confirmed.": "আপনার বিডি অ্যাপস মাসিক সাবস্ক্রিপশন সফলভাবে নিশ্চিত হয়েছে।",
  "Download Android APK": "অ্যান্ড্রয়েড এপিকে ডাউনলোড করুন",
  "The APK download link has not been configured yet.": "এপিকে ডাউনলোড লিংক এখনও কনফিগার করা হয়নি।",
  "Contact Support": "সহায়তায় যোগাযোগ করুন",
  "Have questions about server monitoring, synthetic probes, Keep-Alive, or account support? Reach out to the WatchLog team.": "সার্ভার মনিটরিং, সিন্থেটিক প্রোব, কিপ-অ্যালাইভ বা অ্যাকাউন্ট সহায়তা সম্পর্কে প্রশ্ন আছে? ওয়াচলগ টিমের সাথে যোগাযোগ করুন।",
  "Support & Inquiries": "সহায়তা ও অনুসন্ধান",
  "Business hours: 24/7 Incident Escalation & Response": "কর্মঘণ্টা: ২৪/৭ ইনসিডেন্ট রেসপন্স ও সহায়তা",
  "Global Monitoring Edge Network": "গ্লোবাল মনিটরিং এজ নেটওয়ার্ক",
  "Full Name": "পূর্ণ নাম",
  "Email": "ইমেইল",
  "Subject": "বিষয়",
  "Message": "বার্তা",
  "Send Message": "বার্তা পাঠান",
  "Message sent successfully.": "বার্তা সফলভাবে পাঠানো হয়েছে।",
  "Delete Your Account": "আপনার অ্যাকাউন্ট মুছুন",
  "Submit a deletion request for your WatchLog account, organizations, and associated monitoring data.": "আপনার ওয়াচলগ অ্যাকাউন্ট, সংস্থা এবং সংশ্লিষ্ট পর্যবেক্ষণ ডেটা মুছতে অনুরোধ জমা দিন।",
  "Before you request deletion": "অনুরোধ করার আগে",
  "Deleting your account removes profile information, organizations, projects, configured monitors, server telemetry history, alert rules, and active sessions after verification.": "অ্যাকাউন্ট মুছে ফেললে প্রোফাইল, সংস্থা, প্রজেক্ট, মনিটর, সার্ভার টেলিমেট্রি ইতিহাস, অ্যালার্ট রুল এবং সক্রিয় সেশন মুছে যাবে।",
  "What may remain": "যা অবশিষ্ট থাকতে পারে",
  "Limited records may be retained when required for fraud prevention, legal obligations, dispute resolution, security auditing, or compliance.": "জালিয়াতি প্রতিরোধ, আইনি বাধ্যবাধকতা, বিরোধ নিষ্পত্তি বা অডিটের প্রয়োজনে সীমিত রেকর্ড রাখা হতে পারে।",
  "Timeline": "সময়সীমা",
  "Requests are typically reviewed within 7 business days. Full deletion may take up to 30 days depending on backup retention schedules.": "অনুরোধ সাধারণত ৭ কার্যদিবসের মধ্যে পর্যালোচনা করা হয়। ব্যাকআপ শিডিউল অনুযায়ী সম্পূর্ণ মুছতে ৩০ দিন পর্যন্ত সময় লাগতে পারে।",
  "User ID optional": "ইউজার আইডি (ঐচ্ছিক)",
  "Reason": "কারণ",
  "Additional Message": "অতিরিক্ত বার্তা",
  "I understand that account deletion is permanent after processing.": "আমি বুঝতে পেরেছি যে প্রক্রিয়াকরণের পরে অ্যাকাউন্ট মুছে ফেলা স্থায়ী।",
  "Submit Deletion Request": "মুছে ফেলার অনুরোধ পাঠান",
  "Account deletion request received.": "অ্যাকাউন্ট মুছে ফেলার অনুরোধ গ্রহণ করা হয়েছে।",
  "Clear answers about server telemetry, synthetic probes, Keep-Alive, database monitoring, security, and supported platforms.": "সার্ভার টেলিমেট্রি, সিন্থেটিক প্রোব, কিপ-অ্যালাইভ, ডাটাবেস মনিটরিং, নিরাপত্তা এবং সমর্থিত প্ল্যাটফর্ম সম্পর্কে স্পষ্ট উত্তর।",
  "Page not found": "পৃষ্ঠা পাওয়া যায়নি",
  "The page you are looking for does not exist or has moved.": "আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি খুঁজে পাওয়া যায়নি বা স্থানান্তরিত হয়েছে।",
  "Back Home": "হোমে ফিরে যান",
  "WatchLog Features": "ওয়াচলগ ফিচারস",
  "Complete observability workspace with 30s heartbeats, multi-protocol synthetic checks, deep database telemetry, automated server provisioning, and instant mobile alerts.": "৩০ সেকেন্ড হার্টবিট, মাল্টি-প্রোটোকল সিন্থেটিক চেক, ডাটাবেস টেলিমেট্রি, স্বয়ংক্রিয় সার্ভার সেটআপ এবং মোবাইল অ্যালার্ট সহ সম্পূর্ণ পর্যবেক্ষণ প্ল্যাটফর্ম।",
  "A transparent, GDPR-friendly overview of how WatchLog handles server telemetry, credentials, and notification data.": "ওয়াচলগ কীভাবে সার্ভার টেলিমেট্রি, ক্রেডেনশিয়াল এবং নোটিফিকেশন পরিচালনা করে তার একটি জিডিপিআর-বান্ধব স্পষ্ট বিবরণ।",
  "The legal terms and conditions governing the use of WatchLog observability and monitoring services.": "ওয়াচলগ পর্যবেক্ষণ ও মনিটরিং সেবা ব্যবহারের আইনি শর্তাবলি。"
};

type LanguageContextValue = { language: Language; toggleLanguage: () => void };
const LanguageContext = createContext<LanguageContextValue | null>(null);

function translated(value: string, language: Language) {
  if (language === "bn") return bn[value] ?? value;
  const english = Object.entries(bn).find(([, bangla]) => bangla === value)?.[0];
  return english ?? value;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const toggleLanguage = () => setLanguage((current) => current === "en" ? "bn" : "en");
  const value = useMemo(() => ({ language, toggleLanguage }), [language]);

  useEffect(() => {
    const saved = localStorage.getItem("watchlog-language");
    if (saved === "bn") setLanguage("bn");
  }, []);

  useEffect(() => {
    localStorage.setItem("watchlog-language", language);
    document.documentElement.lang = language;
    document.documentElement.dataset.language = language;
    const applyTranslations = () => {
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      const nodes: Text[] = [];
      while (walker.nextNode()) nodes.push(walker.currentNode as Text);
      nodes.forEach((node) => {
        const parent = node.parentElement;
        if (!parent || parent.closest("script, style, [data-no-translate]")) return;
        const value = node.nodeValue ?? "";
        const next = translated(value.trim(), language);
        if (next !== value.trim()) node.nodeValue = value.replace(value.trim(), next);
      });
      document.querySelectorAll<HTMLElement>("[placeholder], [aria-label], [title]").forEach((element) => {
        for (const attribute of ["placeholder", "aria-label", "title"]) {
          const value = element.getAttribute(attribute);
          if (value) element.setAttribute(attribute, translated(value, language));
        }
      });
    };
    applyTranslations();
    const observer = new MutationObserver(applyTranslations);
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function LanguageToggle() {
  const context = useContext(LanguageContext);
  if (!context) return null;
  const { language, toggleLanguage } = context;
  return <button className="language-toggle" type="button" onClick={toggleLanguage} aria-label={language === "en" ? "Switch language to Bangla" : "Switch language to English"}><i className="bi bi-translate" /><span>{language === "en" ? "বাংলা" : "English"}</span></button>;
}
