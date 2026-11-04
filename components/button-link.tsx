"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ReactNode } from "react";

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: "default" | "secondary" | "outline" | "ghost" | "link";
  icon?: boolean;
  className?: string;
  newTab?: boolean;
}

export function ButtonLink({
  href,
  children,
  variant = "default",
  icon = false,
  className,
  newTab = false,
}: ButtonLinkProps) {
  const target = newTab ? "_blank" : undefined;
  const rel = newTab ? "noopener noreferrer" : undefined;

  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
      transition={{ duration: 0.18 }}
    >
      <Button variant={variant} asChild className={className}>
        <Link href={href} target={target} rel={rel}>
          {children}
          {icon && <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />}
        </Link>
      </Button>
    </motion.div>
  );
}
