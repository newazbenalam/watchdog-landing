import { NextResponse } from "next/server";
import { checkSubscription, sendUssd, corsHeaders, UssdReceiverPayload } from "@/lib/bdapps";

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: corsHeaders });
}

export async function POST(req: Request) {
  try {
    const payload = (await req.json()) as UssdReceiverPayload;
    const address = payload.address || "";
    const sessionId = payload.sessionId || "";
    const ussdOperation = payload.ussdOperation || "mo-init";

    console.log(`[BDApps USSD] Address: ${address} | Session: ${sessionId} | Op: ${ussdOperation}`);

    if (ussdOperation === "mo-init") {
      const statusRes = await checkSubscription(address);
      if (statusRes.isSubscribed) {
        await sendUssd(sessionId, "Welcome to WatchLog! Reply:\n1. Unsubscribe\n2. Status", address, "mt-cont");
      } else {
        await sendUssd(sessionId, "WatchLog: Real-Time Observability\nMonthly: BDT 9.99\nPlease confirm subscription prompt.", address, "mt-fin");
      }
    }

    return NextResponse.json(
      { statusCode: "S1000", statusDetail: "Process completed successfully." },
      { status: 200, headers: corsHeaders }
    );
  } catch (err: unknown) {
    console.error("[BDApps USSD Error]", err);
    return NextResponse.json(
      { statusCode: "E1312", statusDetail: "Request is Invalid." },
      { status: 400, headers: corsHeaders }
    );
  }
}
