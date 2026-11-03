import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getVisitorId } from "@/lib/analytics/visitors";

const EVENTS = ["page_view", "portfolio_love"] as const;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!EVENTS.includes(body.eventType)) {
      return NextResponse.json({ error: "Invalid event" }, { status: 400 });
    }

    const visitorId = await getVisitorId();

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return NextResponse.json({
        success: true,
        warning: "Analytics disabled: Missing credentials",
      });
    }

    const supabase = createAdminClient();

    const { error } = await supabase.from("analytics_events").insert({
      visitor_id: visitorId,
      event_type: body.eventType,
    });

    if (error?.code === "23505") {
      return NextResponse.json({
        success: true,
        alreadyTracked: true,
      });
    }

    if (error) {
      console.error(error);

      return NextResponse.json({ error: "Analytics failed" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
    });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
