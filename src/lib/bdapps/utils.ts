/**
 * Normalizes any Bangladeshi phone format into an 11-digit local format: "01XXXXXXXXX"
 * Handles "01...", "8801...", "+8801...", "881...", etc.
 */
export function normalizeMobile(raw: string | undefined | null): string {
  if (!raw) return "";
  let digits = raw.replace(/\D+/g, "");
  if (digits.startsWith("880") && digits.length === 13) {
    digits = "0" + digits.slice(3);
  } else if (digits.startsWith("88") && digits.length === 12) {
    digits = "0" + digits.slice(2);
  }
  return digits;
}

/**
 * Validates whether the number is a valid 11-digit Bangladeshi mobile number: /^01[3-9]\d{8}$/
 */
export function isValidBDMobile(digits: string): boolean {
  return /^01[3-9]\d{8}$/.test(digits);
}

/**
 * Converts an 11-digit local number ("017...") to BDApps subscriberId ("tel:88017...")
 */
export function toSubscriberId(rawOrNormalized: string): string {
  const digits = normalizeMobile(rawOrNormalized);
  if (!isValidBDMobile(digits)) {
    // If it's already a full subscriberId like tel:8801...
    if (rawOrNormalized.startsWith("tel:")) return rawOrNormalized;
    return `tel:88${digits}`;
  }
  return `tel:88${digits}`;
}

/**
 * Maps BDApps error codes to user-friendly messages.
 */
export function mapStatusCodeToMessage(code?: string, detail?: string): string {
  if (!code) return detail || "An unknown error occurred. Please try again.";

  const normalized = code.toUpperCase().trim();
  switch (normalized) {
    case "S1000":
      return "Success";
    case "E1850":
      return "Invalid verification code. Please check and re-enter the code.";
    case "E1851":
      return "Verification code has expired. Please request a new code.";
    case "E1852":
      return "Maximum verification attempts reached. Please request a new code.";
    case "E1854":
      return "Verification code not found. Please request a new code.";
    case "E1855":
      return "Invalid or expired reference number. Please try again.";
    case "E1856":
      return "Invalid verification request.";
    case "E1857":
      return "Provider verification error. Please try again shortly.";
    case "E1301":
      return "This mobile operator is not currently supported for mobile billing.";
    case "E1313":
      return "Application authentication error. Please contact support.";
    case "E1317":
      return "Invalid mobile number. Please enter a valid Bangladeshi mobile number.";
    case "E1326":
      return "Insufficient mobile balance to complete the subscription (2.78 BDT/month including VAT+SD+Sc).";
    case "E1337":
      return "A duplicate request is already in progress. Please wait a moment.";
    case "E1601":
    case "E1603":
      return "Temporary provider system error. Please try again in a few minutes.";
    default:
      return detail || `Request failed (${code}). Please try again.`;
  }
}

/**
 * Standard CORS headers for BDApps endpoints
 */
export const corsHeaders: HeadersInit = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};
