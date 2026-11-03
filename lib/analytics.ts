export async function trackEvent(eventType: "page_view" | "portfolio_love") {
  try {
    await fetch("/api/analytics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventType,
      }),
      keepalive: true,
    });
  } catch {
    // Analytics should never break the portfolio.
  }
}
