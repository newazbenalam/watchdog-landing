import { NextResponse } from "next/server";
import { handleSubscriptionNotification, corsHeaders, SubscriptionNotificationPayload } from "@/lib/bdapps";

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: corsHeaders });
}

export async function POST(req: Request) {
  try {
    const payload = (await req.json()) as SubscriptionNotificationPayload;
    const result = await handleSubscriptionNotification(payload);
    return NextResponse.json(result, { status: 200, headers: corsHeaders });
  } catch (err: unknown) {
    console.error("[Subscription Listener Error]", err);
    return NextResponse.json(
      { statusCode: "S1000", statusDetail: "Notification received" },
      { status: 200, headers: corsHeaders }
    );
  }
}
