"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

export function PageViewTracker() {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;

    setTimeout(() => {
      trackEvent("page_view");
    }, 1000);
  }, []);

  return null;
}
