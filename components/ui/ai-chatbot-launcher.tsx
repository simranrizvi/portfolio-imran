"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";

const AIChatbot = dynamic(() => import("@/components/ui/ai-chatbot"), { ssr: false });

export function AIChatbotLauncher() {
  const [opened, setOpened] = useState(false);

  if (opened) return <AIChatbot initiallyOpen />;

  return (
    <div className="fixed right-6 bottom-6 z-40">
      <Button
        size="icon-lg"
        variant="outline"
        className="size-14 rounded-full shadow-xl"
        onClick={() => setOpened(true)}
        aria-label="Open AI Assistant"
      >
        <Bot aria-hidden="true" />
      </Button>
    </div>
  );
}
