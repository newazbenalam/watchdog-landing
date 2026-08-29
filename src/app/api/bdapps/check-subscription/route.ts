import { NextResponse } from "next/server";
import { checkSubscription, corsHeaders } from "@/lib/bdapps";

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: corsHeaders });
}

async function parseMobile(req: Request): Promise<string> {
  const url = new URL(req.url);
  const queryMobile = url.searchParams.get("user_mobile") || url.searchParams.get("userMobile") || url.searchParams.get("subscriberId");
  if (queryMobile) return queryMobile;

  const contentType = req.headers.get("content-type") || "";
  try {
    if (contentType.includes("application/x-www-form-urlencoded")) {
      const text = await req.text();
      const params = new URLSearchParams(text);
      return params.get("user_mobile") || params.get("userMobile") || params.get("subscriberId") || "";
    }
    const json = (await req.json()) as Record<string, unknown>;
    return String(json.user_mobile || json.userMobile || json.subscriberId || "");
  } catch {
    return "";
  }
}

export async function GET(req: Request) {
  const userMobile = await parseMobile(req);
  if (!userMobile) {
    return NextResponse.json({ error: "Missing mobile number format" }, { status: 400, headers: corsHeaders });
  }

  const result = await checkSubscription(userMobile);
  return NextResponse.json(result, { status: 200, headers: corsHeaders });
}

export async function POST(req: Request) {
  const userMobile = await parseMobile(req);
  if (!userMobile) {
    return NextResponse.json({ error: "Invalid mobile number format" }, { status: 400, headers: corsHeaders });
  }

  const result = await checkSubscription(userMobile);
  return NextResponse.json(result, { status: 200, headers: corsHeaders });
}
