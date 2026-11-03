"use client";

import React from "react";
import { motion } from "framer-motion";
import { DATA } from "@/data/resume";
import { Marquee } from "@/components/ui/marquee";
import { SectionContainer } from "@/components/section-container";
import { SectionHeading } from "@/components/section-heading";

const SkillCard = ({ skill }: { skill: (typeof DATA.skills)[0] }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.08, y: -2, transition: { duration: 0.18 } }}
      whileTap={{ scale: 0.95 }}
      className="mx-1"
    >
      <div
        className="flex items-center gap-2 rounded-full border px-4 h-9 cursor-default select-none transition-colors duration-200"
        style={{
          borderColor: `${skill.color}40`, // 25% opacity border
          backgroundColor: `${skill.color}14`, // 8% opacity tinted bg
          boxShadow: `0 0 0 0 ${skill.color}00`,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow =
            `0 0 12px 2px ${skill.color}30`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow =
            `0 0 0 0 ${skill.color}00`;
        }}
      >
        {skill.icon && (
          <span
            style={{ color: skill.color }}
            className="shrink-0 leading-none"
          >
            {React.cloneElement(
              skill.icon as React.ReactElement<{
                "aria-label"?: string;
                role?: string;
              }>,
              {
                "aria-label": skill.name,
                role: "img",
              },
            )}
          </span>
        )}
        <span className="text-sm font-medium text-foreground whitespace-nowrap">
          {skill.name}
        </span>
      </div>
    </motion.div>
  );
};

export function SkillsSection() {
  const skills = DATA.skills;
  const firstRow = skills.slice(0, Math.ceil(skills.length / 2));
  const secondRow = skills.slice(Math.ceil(skills.length / 2));

  return (
    <SectionContainer id="skills">
      <SectionHeading
        title="Technologies & Tools I Work With"
        subtitle="A snapshot of the languages, frameworks, and tools I use to build modern, scalable products."
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
        className="relative mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-4 overflow-hidden py-6 md:py-8"
      >
        <Marquee pauseOnHover className="[--duration:30s]">
          {firstRow.map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:30s]">
          {secondRow.map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </Marquee>
        <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r"></div>
        <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l"></div>
      </motion.div>
    </SectionContainer>
  );
}
