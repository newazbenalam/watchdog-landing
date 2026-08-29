export interface BdAppsConfig {
  appId: string;
  appPassword: string;
  baseUrl: string;
  applicationHash: string;
  defaultMetadata: {
    client: string;
    device: string;
    os: string;
    appCode: string;
  };
}

export interface SendOtpRequest {
  user_mobile?: string;
  userMobile?: string;
  applicationMetaData?: Record<string, string>;
}

export interface SendOtpResponse {
  success: boolean;
  referenceNo: string | null;
  statusCode?: string;
  statusDetail?: string;
  version?: string;
  message?: string;
  subscriberId?: string;
}

export interface VerifyOtpRequest {
  Otp?: string;
  otp?: string;
  referenceNo?: string;
  user_mobile?: string;
}

export interface VerifyOtpResponse {
  statusCode: string;
  statusDetail?: string;
  subscriptionStatus?: "REGISTERED" | "UNREGISTERED" | "PENDING" | string;
  subscriberId?: string;
  version?: string;
  message?: string;
  success?: boolean;
}

export interface CheckSubscriptionRequest {
  user_mobile?: string;
  userMobile?: string;
  subscriberId?: string;
}

export interface CheckSubscriptionResponse {
  subscriptionStatus: "REGISTERED" | "UNREGISTERED" | "PENDING" | "UNKNOWN" | string;
  isSubscribed: boolean;
  statusCode?: string;
  statusDetail?: string;
  version?: string;
  subscriberId?: string;
  error?: string;
  details?: string;
}

export interface UnsubscribeRequest {
  user_mobile?: string;
  userMobile?: string;
  subscriberId?: string;
}

export interface UnsubscribeResponse {
  success: boolean;
  subscriberId?: string;
  statusCode?: string;
  statusDetail?: string;
  subscriptionStatus?: string;
  error?: string;
}

export interface SubscriptionNotificationPayload {
  timeStamp?: string;
  status?: string;
  applicationId?: string;
  subscriberId?: string;
  frequency?: string;
  version?: string;
  [key: string]: unknown;
}

export interface SmsReceiverPayload {
  version?: string;
  applicationId?: string;
  address?: string;
  sourceAddress?: string;
  message?: string;
  requestId?: string;
  encoding?: string;
}

export interface SendSmsRequest {
  message: string;
  addresses: string | string[];
}

export interface SendSmsResponse {
  statusCode?: string;
  statusDetail?: string;
  messageId?: string;
  version?: string;
  [key: string]: unknown;
}

export interface UssdReceiverPayload {
  version?: string;
  applicationId?: string;
  address?: string;
  sessionId?: string;
  ussdOperation?: "mo-init" | "mo-cont" | "mt-cont" | "mt-fin" | string;
  message?: string;
  encoding?: string;
}

export interface SendUssdRequest {
  sessionId: string;
  message: string;
  destinationAddress: string;
  ussdOperation?: "mo-init" | "mo-cont" | "mt-cont" | "mt-fin" | string;
}

export interface SendUssdResponse {
  statusCode?: string;
  statusDetail?: string;
  version?: string;
  [key: string]: unknown;
}
