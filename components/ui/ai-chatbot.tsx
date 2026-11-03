"use client";

import { useState, useRef, useEffect } from "react";
import { getResumeAnswer, type ResumeConfig } from "@/lib/resume-chat";
import { Button } from "@/components/ui/button";
import { Bot, Send, X } from "lucide-react";
import { motion } from "framer-motion";

import personal from "@/config/personal.json";
import experience from "@/config/experience.json";
import projects from "@/config/projects.json";
import skills from "@/config/skills.json";
import social from "@/config/social.json";

// Build the config object once at module level so it's stable
const resumeConfig: ResumeConfig = {
  personal: personal as ResumeConfig["personal"],
  experience: experience as ResumeConfig["experience"],
  projects: projects as ResumeConfig["projects"],
  skills: skills as ResumeConfig["skills"],
  social: social as ResumeConfig["social"],
};

type Message = {
  role: "user" | "assistant";
  text: string;
};

export default function AIChatbot({ initiallyOpen = false }: { initiallyOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(initiallyOpen);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const chatbotRef = useRef<HTMLDivElement>(null);

  const canSend = input.trim().length > 0 && !isTyping;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        chatbotRef.current &&
        !chatbotRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const sendMessage = async (question: string) => {
    const prompt = question.trim();
    if (!prompt || isTyping) return;

    setInput("");
    setMessages((prev) => [
      ...prev,
      { role: "user", text: prompt },
      { role: "assistant", text: "" },
    ]);
    setIsTyping(true);

    await new Promise((resolve) => setTimeout(resolve, 600));

    const response = getResumeAnswer(prompt, resumeConfig);
    const chars = response.split("");

    for (let i = 0; i < chars.length; i++) {
      const accumulated = response.slice(0, i + 1);
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          text: accumulated,
        };
        return updated;
      });
      await new Promise((resolve) =>
        setTimeout(resolve, 10 + Math.random() * 20),
      );
    }

    setIsTyping(false);
  };

  return (
    <div className="fixed right-6 bottom-6 z-40" ref={chatbotRef}>
      {isOpen ? (
        <div className="w-[calc(100vw-2rem)] sm:w-90 rounded-2xl border border-border/80 bg-card/95 backdrop-blur-md shadow-2xl shadow-black/10">
          <div className="flex items-center justify-between border-b border-border/70 px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Bot className="size-4" />
              </div>
              <div>
                <p className="text-sm font-semibold leading-none">Assistant</p>
                <p className="text-[11px] text-muted-foreground">
                  Ask about {personal.name.split(" ")[1]}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <X className="size-4" aria-hidden="true" />
            </Button>
          </div>

          <div className="min-h-96 max-h-96 overflow-y-auto px-4 pb-3 space-y-4 pt-4">
            {messages.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex h-72 flex-col items-center justify-center text-center space-y-4"
              >
                <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Bot className="size-7" />
                </div>
                <div>
                  <p className="font-semibold text-lg text-foreground">
                    Hi, I&apos;m {personal.name.split(" ")[1]}&apos;s Assistant
                  </p>
                  <p className="text-sm text-muted-foreground mt-1 max-w-62.5 mx-auto">
                    Ask me about his experience, projects, education, skills, or
                    contact info.
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2 mt-4 px-2">
                  {["What are his skills?", "Tell me about his experience"].map(
                    (suggestion, i) => (
                      <Button
                        key={i}
                        variant="secondary"
                        size="sm"
                        className="text-xs rounded-full h-8"
                        onClick={() => sendMessage(suggestion)}
                      >
                        {suggestion}
                      </Button>
                    ),
                  )}
                </div>
              </motion.div>
            )}

            {messages.map((message, index) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                key={`${message.role}-${index}`}
                className={`w-fit max-w-[90%] rounded-2xl px-4 py-2 text-sm leading-relaxed ${
                  message.role === "assistant"
                    ? "bg-muted text-foreground rounded-tl-sm"
                    : "bg-primary text-primary-foreground ml-auto rounded-tr-sm"
                }`}
              >
                {message.text}
                {message.role === "assistant" &&
                  message.text === "" &&
                  isTyping && (
                    <span className="flex gap-1 items-center h-5 py-2">
                      <span
                        className="size-1.5 rounded-full bg-foreground/50 animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <span
                        className="size-1.5 rounded-full bg-foreground/50 animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <span
                        className="size-1.5 rounded-full bg-foreground/50 animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </span>
                  )}
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form
            className="border-t border-border/70 p-3 flex items-center gap-2"
            onSubmit={(event) => {
              event.preventDefault();
              if (canSend) sendMessage(input);
            }}
          >
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about experience, projects, skills..."
              className="h-10 flex-1 rounded-xl border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            <Button
              type="submit"
              size="icon"
              disabled={!canSend}
              aria-label="Send message"
            >
              <Send className="size-4" aria-hidden="true" />
            </Button>
          </form>
        </div>
      ) : (
        <Button
          size="icon-lg"
          variant="outline"
          className="size-14 rounded-full shadow-xl"
          onClick={() => setIsOpen(true)}
          aria-label="Open AI Assistant"
        >
          <Bot aria-hidden="true" />
        </Button>
      )}
    </div>
  );
}
