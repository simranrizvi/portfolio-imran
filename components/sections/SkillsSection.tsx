"use client";

import { motion } from "framer-motion";
import { DATA } from "@/data/resume";
import { SectionContainer } from "@/components/section-container";
import { SectionHeading } from "@/components/section-heading";

const skillGroups = [
  {
    title: "Frontend",
    description: "Interfaces and user experience",
    names: ["HTML5", "CSS3", "Tailwind CSS", "React.js", "Next.js"],
  },
  {
    title: "Backend & APIs",
    description: "Services and integrations",
    names: [
      "Node.js",
      "Express.js",
      "FastAPI",
      "REST APIs",
      "Python",
      "API Integration",
      "AI Integration",
    ],
  },
  {
    title: "Data & Infrastructure",
    description: "Storage, queues, and deployment",
    names: [
      "PostgreSQL",
      "MongoDB",
      "MySQL",
      "Prisma",
      "Redis",
      "BullMQ",
      "Docker",
    ],
  },
  {
    title: "Tools & Security",
    description: "Development and access control",
    names: ["Git", "GitHub", "Postman", "JWT", "RBAC"],
  },
];

export function SkillsSection() {
  return (
    <SectionContainer id="skills">
      <SectionHeading
        title="Technical Skills"
        subtitle="The technologies I use across full-stack development and AI integration."
      />

      <div className="mx-auto max-w-5xl border-y border-border">
        {skillGroups.map((group, index) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.05 }}
            viewport={{ once: true, margin: "-40px" }}
            className="grid gap-5 border-b border-border py-6 last:border-b-0 md:grid-cols-[220px_minmax(0,1fr)] md:gap-10 md:py-8"
          >
            <div className="flex items-start gap-4">
              <span className="pt-1 font-mono text-xs text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  {group.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {group.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-3">
              {DATA.skills
                .filter((skill) => group.names.includes(skill.name))
                .map((skill) => (
                  <div
                    key={skill.name}
                    className="flex min-w-0 items-center gap-2.5"
                  >
                    <span
                      aria-hidden="true"
                      className="flex size-5 shrink-0 items-center justify-center text-lg"
                      style={{ color: skill.color }}
                    >
                      {skill.icon}
                    </span>
                    <span className="text-sm font-medium leading-snug text-foreground/85">
                      {skill.name}
                    </span>
                  </div>
                ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionContainer>
  );
}
