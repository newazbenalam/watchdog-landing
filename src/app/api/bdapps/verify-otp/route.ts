import { NextResponse } from "next/server";
import { verifyOtp, corsHeaders } from "@/lib/bdapps";

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: corsHeaders });
}

async function parseBody(req: Request): Promise<Record<string, unknown>> {
  const contentType = req.headers.get("content-type") || "";
  try {
    if (contentType.includes("application/x-www-form-urlencoded")) {
      const text = await req.text();
      const params = new URLSearchParams(text);
      const res: Record<string, string> = {};
      params.forEach((v, k) => { res[k] = v; });
      return res;
    }
    return (await req.json()) as Record<string, unknown>;
  } catch {
    return {};
  }
}

export async function POST(req: Request) {
  const body = await parseBody(req);
  const otp = String(body.Otp || body.otp || "").trim();
  const referenceNo = String(body.referenceNo || body.reference_no || "").trim();

  if (!otp || !referenceNo) {
    return NextResponse.json(
      { statusCode: "FAILED", message: "Missing OTP or referenceNo" },
      { status: 400, headers: corsHeaders }
    );
  }

  const result = await verifyOtp(otp, referenceNo);
  return NextResponse.json(result, { status: 200, headers: corsHeaders });
}
