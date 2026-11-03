"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SectionContainerProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export function SectionContainer({
  id,
  children,
  className,
}: SectionContainerProps) {
  return (
    <motion.section
      id={id}
      className={cn("py-20 md:py-28 lg:py-32 overflow-hidden", className)}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </motion.section>
  );
}
