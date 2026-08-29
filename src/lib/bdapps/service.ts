import { bdAppsConfig } from "./config";
import {
  CheckSubscriptionResponse,
  SendOtpResponse,
  SendSmsResponse,
  SendUssdResponse,
  SubscriptionNotificationPayload,
  UnsubscribeResponse,
  VerifyOtpResponse,
} from "./types";
import { isValidBDMobile, mapStatusCodeToMessage, normalizeMobile, toSubscriberId } from "./utils";

/**
 * Generic helper to send POST requests to BDApps API with timeout and error handling.
 */
async function sendBdAppsRequest<T>(endpoint: string, payload: Record<string, unknown>, timeoutMs = 30000): Promise<T> {
  const url = `${bdAppsConfig.baseUrl.replace(/\/+$/, "")}/${endpoint.replace(/^\/+/, "")}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    const data = await response.json();
    return data as T;
  } catch (err: unknown) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`BDApps request timed out after ${timeoutMs / 1000}s`);
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Request OTP from BDApps for user subscription.
 * Corresponds to PHP send_otp.php
 */
export async function requestOtp(
  rawMobile: string,
  customMetadata?: Record<string, string>
): Promise<SendOtpResponse> {
  const digits = normalizeMobile(rawMobile);
  if (!isValidBDMobile(digits)) {
    return {
      success: false,
      message: "Invalid mobile number format. Please provide an 11-digit number starting with 01.",
      referenceNo: null,
    };
  }

  const subscriberId = toSubscriberId(digits);
  const requestPayload = {
    applicationId: bdAppsConfig.appId,
    password: bdAppsConfig.appPassword,
    subscriberId,
    applicationHash: bdAppsConfig.applicationHash,
    applicationMetaData: {
      ...bdAppsConfig.defaultMetadata,
      ...customMetadata,
    },
  };

  try {
    const response = await sendBdAppsRequest<{
      referenceNo?: string;
      statusCode?: string;
      statusDetail?: string;
      version?: string;
    }>("subscription/otp/request", requestPayload);

    const referenceNo = (response.referenceNo || "").trim();

    if (referenceNo !== "") {
      return {
        success: true,
        referenceNo,
        statusCode: response.statusCode || "S1000",
        statusDetail: response.statusDetail || "Success",
        version: response.version || "1.0",
      };
    }

    return {
      success: false,
      message: mapStatusCodeToMessage(response.statusCode, response.statusDetail),
      referenceNo: null,
      statusCode: response.statusCode || "",
      statusDetail: response.statusDetail || "",
      subscriberId,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to connect to BDApps OTP service.";
    return {
      success: false,
      message,
      referenceNo: null,
    };
  }
}

/**
 * Verify OTP entered by user with BDApps.
 * Corresponds to PHP verify_otp.php
 */
export async function verifyOtp(otp: string, referenceNo: string): Promise<VerifyOtpResponse> {
  const cleanOtp = (otp || "").trim();
  const cleanRef = (referenceNo || "").trim();

  if (!cleanOtp || !cleanRef) {
    return {
      statusCode: "FAILED",
      message: "Missing OTP or reference number.",
      success: false,
    };
  }

  const requestPayload = {
    applicationId: bdAppsConfig.appId,
    password: bdAppsConfig.appPassword,
    referenceNo: cleanRef,
    otp: cleanOtp,
  };

  try {
    const response = await sendBdAppsRequest<{
      statusCode?: string;
      statusDetail?: string;
      subscriptionStatus?: string;
      subscriberId?: string;
      version?: string;
    }>("subscription/otp/verify", requestPayload, 15000);

    const isSuccess =
      response.statusCode === "S1000" &&
      response.subscriptionStatus?.toUpperCase() === "REGISTERED";

    return {
      statusCode: response.statusCode || "FAILED",
      statusDetail: response.statusDetail || "",
      subscriptionStatus: response.subscriptionStatus || "",
      subscriberId: response.subscriberId || "",
      version: response.version || "1.0",
      success: isSuccess,
      message: isSuccess ? "Subscription confirmed" : mapStatusCodeToMessage(response.statusCode, response.statusDetail),
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to connect to BDApps OTP verification service.";
    return {
      statusCode: "FAILED",
      message,
      success: false,
    };
  }
}

/**
 * Check subscription status of a mobile subscriber.
 * Corresponds to PHP check_subscription.php
 */
export async function checkSubscription(rawMobileOrSubscriberId: string): Promise<CheckSubscriptionResponse> {
  const subscriberId = toSubscriberId(rawMobileOrSubscriberId);

  const requestPayload = {
    version: "1.0",
    applicationId: bdAppsConfig.appId,
    password: bdAppsConfig.appPassword,
    subscriberId,
  };

  try {
    const response = await sendBdAppsRequest<{
      subscriptionStatus?: string;
      statusCode?: string;
      statusDetail?: string;
      version?: string;
    }>("subscription/getStatus", requestPayload, 10000);

    const status = (response.subscriptionStatus || "").toUpperCase().trim().replace(/\.+$/, "");
    const isSubscribed = status === "REGISTERED";

    return {
      subscriptionStatus: status || "UNKNOWN",
      isSubscribed,
      statusCode: response.statusCode,
      statusDetail: response.statusDetail,
      version: response.version,
      subscriberId,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Connection failed to BDApps status API.";
    return {
      subscriptionStatus: "UNKNOWN",
      isSubscribed: false,
      error: message,
      subscriberId,
    };
  }
}

/**
 * Cancel/Unsubscribe an active subscription.
 * Corresponds to PHP unsubscribe.php
 */
export async function unsubscribe(rawMobileOrSubscriberId: string): Promise<UnsubscribeResponse> {
  const subscriberId = toSubscriberId(rawMobileOrSubscriberId);

  const requestPayload = {
    applicationId: bdAppsConfig.appId,
    password: bdAppsConfig.appPassword,
    subscriberId,
    version: "1.0",
    action: "0", // 0 = Unsubscribe
  };

  try {
    const response = await sendBdAppsRequest<{
      statusCode?: string;
      statusDetail?: string;
      subscriptionStatus?: string;
    }>("subscription/send", requestPayload, 30000);

    const statusCode = (response.statusCode || "").toUpperCase().trim();
    const subscriptionStatus = (response.subscriptionStatus || "UNKNOWN").toUpperCase().trim().replace(/\.+$/, "");
    const success = statusCode === "S1000" || subscriptionStatus === "UNREGISTERED";

    return {
      success,
      subscriberId,
      statusCode: response.statusCode,
      statusDetail: response.statusDetail,
      subscriptionStatus: response.subscriptionStatus,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to connect to BDApps unsubscribe service.";
    return {
      success: false,
      subscriberId,
      error: message,
    };
  }
}

/**
 * Handle subscription notifications / webhooks from BDApps.
 * Corresponds to PHP subscription_listener.php
 */
export async function handleSubscriptionNotification(
  payload: SubscriptionNotificationPayload
): Promise<{ statusCode: string; statusDetail: string }> {
  const timestamp = payload.timeStamp || new Date().toISOString();
  const status = (payload.status || "").toUpperCase();
  const subscriberId = payload.subscriberId || "unknown";
  const appId = payload.applicationId || "";

  console.log(`[BDApps Notification] ${timestamp} | App: ${appId} | Subscriber: ${subscriberId} | Status: ${status}`);

  return {
    statusCode: "S1000",
    statusDetail: "Notification received",
  };
}

/**
 * Send SMS message to subscribers.
 * Corresponds to PHP sms.php / SMSSender
 */
export async function sendSms(message: string, addresses: string | string[]): Promise<SendSmsResponse> {
  const destinationAddresses = Array.isArray(addresses) ? addresses : [addresses];
  const formattedAddresses = destinationAddresses.map((addr) =>
    addr.startsWith("tel:") ? addr : toSubscriberId(addr)
  );

  const requestPayload = {
    applicationId: bdAppsConfig.appId,
    password: bdAppsConfig.appPassword,
    message,
    destinationAddresses: formattedAddresses,
    version: "1.0",
    encoding: "8",
  };

  return sendBdAppsRequest<SendSmsResponse>("sms/send", requestPayload, 20000);
}

/**
 * Send USSD response to user session.
 * Corresponds to PHP ussd.php / UssdSender
 */
export async function sendUssd(
  sessionId: string,
  message: string,
  destinationAddress: string,
  operation: "mo-init" | "mo-cont" | "mt-cont" | "mt-fin" | string = "mt-fin"
): Promise<SendUssdResponse> {
  const requestPayload = {
    applicationId: bdAppsConfig.appId,
    password: bdAppsConfig.appPassword,
    sessionId,
    message,
    destinationAddress: destinationAddress.startsWith("tel:") ? destinationAddress : toSubscriberId(destinationAddress),
    ussdOperation: operation,
    version: "1.0",
    encoding: "440",
  };

  return sendBdAppsRequest<SendUssdResponse>("ussd/send", requestPayload, 15000);
}
