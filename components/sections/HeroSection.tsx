"use client";

import { motion } from "framer-motion";
import { getPersonalInfo, getSocialLinks } from "@/lib/config";
import { Download } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { IconType } from "react-icons";
import { cn } from "@/lib/utils";
import { ButtonLink } from "../button-link";

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

export function HeroSection() {
  const personalInfo = getPersonalInfo();
  const socials = getSocialLinks();

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
    <section className="relative flex min-h-[85svh] items-center py-28 sm:py-32">
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-7 md:space-y-8"
          >
            <motion.div variants={item}>
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Full Stack Development & AI Integration
              </p>
              <h1 className="text-4xl font-semibold tracking-[-0.04em] leading-[1.08] sm:text-5xl md:text-6xl lg:text-7xl">
                {personalInfo.name}
              </h1>
            </motion.div>

            <motion.div variants={item}>
              <p className="text-xl font-medium tracking-tight text-foreground/80 sm:text-2xl md:text-3xl">
                {personalInfo.title}
              </p>
            </motion.div>

            <motion.div variants={item}>
              <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl">
                {personalInfo.bio}
              </p>
            </motion.div>

            <motion.div variants={item} className="flex flex-wrap gap-3 pt-2">
              <ButtonLink
                href="/#projects"
                icon={true}
                className="h-11 rounded-lg px-5 text-sm"
              >
                View Projects
              </ButtonLink>
              <ButtonLink
                href={
                  personalInfo.resumeUrl ?? "/Syed_Muhammad_Imran_Resume.pdf"
                }
                newTab={true}
                variant="outline"
                className="h-11 rounded-lg px-5 text-sm"
              >
                <Download aria-hidden="true" /> Download Resume
              </ButtonLink>
            </motion.div>

            <motion.div variants={item}>
              <div className="flex gap-3 border-t border-border pt-6">
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
                        "flex h-10 w-10 items-center justify-center rounded-lg",
                        "text-muted-foreground transition-all duration-300",
                        "border border-border",
                        IconHoverMap[social.icon] ||
                          "hover:text-primary hover:border-primary",
                      )}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {IconComponent && (
                        <IconComponent className="h-5 w-5" aria-hidden="true" />
                      )}
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
