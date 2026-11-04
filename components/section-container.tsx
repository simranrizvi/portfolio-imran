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
      className={cn("overflow-hidden py-20 md:py-24 lg:py-28", className)}
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
