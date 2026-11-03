"use client";

/* eslint-disable react-hooks/set-state-in-effect */
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  // Hydration guard — required to avoid SSR/client mismatch with next-themes
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(
      theme === "light" ? "dark" : theme === "dark" ? "system" : "light",
    );
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="hover:-translate-y-0.5 size-14 transition-all duration-200 ease-in-out rounded-full"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ duration: 0.2 }}
        key={theme}
      >
        {theme === "system" ? (
          <Monitor aria-hidden="true" />
        ) : theme === "dark" ? (
          <Sun aria-hidden="true" />
        ) : (
          <Moon aria-hidden="true" />
        )}
      </motion.div>
    </Button>
  );
}
