import { NextResponse } from "next/server";
import { sendSms, corsHeaders, SmsReceiverPayload } from "@/lib/bdapps";

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: corsHeaders });
}

export async function POST(req: Request) {
  try {
    const payload = (await req.json()) as SmsReceiverPayload & { message?: string; destinationAddresses?: string[] };

    // If it's an outbound send SMS request
    if (payload.destinationAddresses && payload.message) {
      const result = await sendSms(payload.message, payload.destinationAddresses);
      return NextResponse.json(result, { status: 200, headers: corsHeaders });
    }

    // Inbound MO SMS webhook processing
    const address = payload.sourceAddress || payload.address || "";
    const rawMessage = (payload.message || "").trim();

    console.log(`[BDApps SMS Received] From: ${address} | Message: ${rawMessage}`);

    // Acknowledge receipt to BDApps
    return NextResponse.json(
      { statusCode: "S1000", statusDetail: "Process completed successfully." },
      { status: 200, headers: corsHeaders }
    );
  } catch (err: unknown) {
    console.error("[BDApps SMS Error]", err);
    return NextResponse.json(
      { statusCode: "E1312", statusDetail: "Request is Invalid." },
      { status: 400, headers: corsHeaders }
    );
  }
}
