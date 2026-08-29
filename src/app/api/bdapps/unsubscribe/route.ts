import { NextResponse } from "next/server";
import { unsubscribe, corsHeaders } from "@/lib/bdapps";

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
  const userMobile = String(body.user_mobile || body.userMobile || body.subscriberId || "").trim();

  if (!userMobile) {
    return NextResponse.json(
      { error: "Mobile number required" },
      { status: 400, headers: corsHeaders }
    );
  }

  const result = await unsubscribe(userMobile);
  return NextResponse.json(result, { status: 200, headers: corsHeaders });
}
