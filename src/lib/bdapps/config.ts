import { BdAppsConfig } from "./types";

export const bdAppsConfig: BdAppsConfig = {
  appId: process.env.BDAPPS_APP_ID || "APP_139921",
  appPassword: process.env.BDAPPS_APP_PASSWORD || "a0f308c541496f23a4e96c9f42487f3e",
  baseUrl: process.env.BDAPPS_BASE_URL || "https://developer.bdapps.com",
  applicationHash: process.env.BDAPPS_APP_HASH || "WatchLog",
  defaultMetadata: {
    client: "MOBILEAPP",
    device: "WatchLog Android",
    os: "android",
    appCode: "com.neo.watchlog",
  },
};
