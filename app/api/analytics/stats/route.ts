import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  const BASE_VIEWS = 300;
  const BASE_LOVE = 80;

  try {
    const supabase = createAdminClient();

    const { count: viewsCount, error: viewsError } = await supabase
      .from("analytics_events")
      .select("*", { count: "exact", head: true })
      .eq("event_type", "page_view");

    const { count: loveCount, error: loveError } = await supabase
      .from("analytics_events")
      .select("*", { count: "exact", head: true })
      .eq("event_type", "portfolio_love");

    if (viewsError || loveError) {
      console.error("Supabase Error:", viewsError || loveError);
      return NextResponse.json(
        { error: "Failed to load stats" },
        { status: 500 },
      );
    }

    const views = BASE_VIEWS + (viewsCount || 0);
    const love = BASE_LOVE + (loveCount || 0);

    return NextResponse.json({ views, love });
  } catch {
    return NextResponse.json({ views: BASE_VIEWS, love: BASE_LOVE });
  }
}
