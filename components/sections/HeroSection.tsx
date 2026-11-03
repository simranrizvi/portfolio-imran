"use client";

import { motion } from "framer-motion";
import { getPersonalInfo, getSocialLinks } from "@/lib/config";
import { Download } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { IconType } from "react-icons";
import { cn } from "@/lib/utils";
import { ButtonLink } from "../button-link";
import { Cover } from "../ui/cover";

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
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-12">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-10 md:space-y-12"
          >
            <motion.div variants={item}>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-[-0.02em] leading-[1.05]">
                <span className="inline-block">Hi, I&apos;m</span>{" "}
                <span className="inline-block text-primary">
                  {personalInfo.name}
                </span>
              </h1>
            </motion.div>

            <motion.div variants={item}>
              <Cover className="text-3xl md:text-4xl lg:text-5xl font-medium text-muted-foreground tracking-tight">
                {personalInfo.title}
              </Cover>
            </motion.div>

            <motion.div variants={item}>
              <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-12 text-muted-foreground leading-relaxed text-pretty">
                {personalInfo.bio}
              </p>
            </motion.div>

            <motion.div
              variants={item}
              className="flex flex-wrap gap-4 justify-center"
            >
              <ButtonLink
                href={
                  personalInfo.resumeUrl ?? "/Syed_Muhammad_Imran_Resume.pdf"
                }
                newTab={true}
              >
                <Download aria-hidden="true" /> Download Resume
              </ButtonLink>
              <ButtonLink href="/#projects" icon={true}>
                View My Work
              </ButtonLink>
              <ButtonLink href="/#contact" variant="outline">
                Get In Touch
              </ButtonLink>
            </motion.div>

            <motion.div variants={item}>
              <div className="flex gap-6 justify-center mt-6 md:mt-8">
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
