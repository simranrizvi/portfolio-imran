"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NumberTicker } from "../ui/number-ticker";

type Props = {
  initialCount: number;
};

export function PortfolioLove({ initialCount }: Props) {
  const [count, setCount] = useState(initialCount);
  const [loved, setLoved] = useState(false);

  async function handleLove() {
    if (loved) return;

    setLoved(true);
    setCount((value) => value + 1);

    await trackEvent("portfolio_love");
  }

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-2 text-red-500">
        <Heart
          className={cn(
            "size-6 transition-all duration-300",
            loved ? "fill-red-500 scale-110" : "",
          )}
          aria-hidden="true"
        />
        <NumberTicker value={count} className="text-3xl tracking-tight" />
      </div>

      <Button
        type="button"
        onClick={handleLove}
        disabled={loved}
        variant={loved ? "secondary" : "default"}
        size="sm"
        className={cn(
          "transition-all duration-300 cursor-pointer  font-sans text-sm shadow-sm",
          loved && "opacity-80 cursor-default",
        )}
      >
        {loved ? "Thanks ❤️" : "Love this portfolio"}
      </Button>
    </div>
  );
}
