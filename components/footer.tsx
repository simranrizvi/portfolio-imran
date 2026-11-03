"use client";

import Link from "next/link";
import { getSocialLinks } from "@/lib/config";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { IconType } from "react-icons";
import MarqueeText from "./ui/marquee-text";

const IconMap: Record<string, IconType> = {
  FaGithub,
  FaLinkedinIn,
  FaEnvelope,
  FaWhatsapp,
};

const IconHoverMap: Record<string, string> = {
  FaGithub:
    "hover:text-foreground hover:border-foreground hover:bg-foreground/10",
  FaLinkedinIn:
    "hover:text-[#0A66C2] hover:border-[#0A66C2] hover:bg-[#0A66C2]/10",
  FaEnvelope:
    "hover:text-[#EA4335] hover:border-[#EA4335] hover:bg-[#EA4335]/10",
  FaWhatsapp:
    "hover:text-[#25D366] hover:border-[#25D366] hover:bg-[#25D366]/10",
};

export function Footer() {
  const socials = getSocialLinks();
  const currentYear = new Date().getFullYear();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <footer className="bg-card py-12 space-y-6">
      <MarqueeText />
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 mt-10 md:mt-4">
        <div className="flex flex-col items-center justify-center">
          <motion.div
            className="flex gap-6"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            {socials.map((social) => {
              const IconComponent = IconMap[social.icon];
              return (
                <motion.a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.platform}
                  className={cn(
                    "h-10 w-10 flex items-center justify-center rounded-full",
                    "text-muted-foreground transition-all duration-300",
                    "border border-border",
                    IconHoverMap[social.icon] ||
                      "hover:text-primary hover:border-primary",
                  )}
                  variants={item}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {IconComponent && (
                    <IconComponent className="h-5 w-5" aria-hidden="true" />
                  )}
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </div>
      <motion.div
        className="space-y-2 text-center text-foreground/75 text-sm"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <p>&copy; {currentYear} All rights reserved.</p>
        <nav
          aria-label="Legal"
          className="flex items-center justify-center gap-3"
        >
          <Link
            href="/privacy"
            className="transition-colors hover:text-foreground"
          >
            Privacy Policy
          </Link>
          <span aria-hidden="true" className="text-border">
            &bull;
          </span>
          <Link
            href="/terms"
            className="transition-colors hover:text-foreground"
          >
            Terms of Service
          </Link>
        </nav>
      </motion.div>
    </footer>
  );
}
