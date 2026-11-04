"use client";

import { SectionContainer } from "@/components/section-container";
import { SectionHeading } from "@/components/section-heading";
import { getWorkExperiences, getEducationExperiences } from "@/lib/config";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BriefcaseIcon, GraduationCap } from "lucide-react";
import { Experience } from "@/config/types";

export function ExperienceSection() {
  const workExperiences = getWorkExperiences();
  const educationExperiences = getEducationExperiences();

  return (
    <SectionContainer id="experience">
      <SectionHeading
        title="Experience & Education"
        subtitle="Where I have worked and what I have learned."
      />

      <Tabs defaultValue="work" className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 flex justify-center"
        >
          <TabsList className="grid h-11 w-full max-w-xs grid-cols-2 rounded-lg border border-border bg-card p-1">
            <TabsTrigger value="work" className="gap-2">
              <BriefcaseIcon className="h-4 w-4" aria-hidden="true" />
              Work
            </TabsTrigger>

            <TabsTrigger value="education" className="gap-2">
              <GraduationCap className="h-4 w-4" aria-hidden="true" />
              Education
            </TabsTrigger>
          </TabsList>
        </motion.div>

        <TabsContent value="work" className="space-y-4">
          {workExperiences.map((exp, i) => (
            <ExperienceCard key={exp.id} experience={exp} index={i} />
          ))}
        </TabsContent>

        <TabsContent value="education" className="space-y-4">
          {educationExperiences.map((exp, i) => (
            <ExperienceCard key={exp.id} experience={exp} index={i} />
          ))}
        </TabsContent>
      </Tabs>
    </SectionContainer>
  );
}

function ExperienceCard({
  experience,
  index,
}: {
  experience: Experience;
  index: number;
}) {
  return (
    <motion.div
      className="mx-auto max-w-5xl"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      viewport={{ once: true }}
    >
      <Card className="gap-0 rounded-2xl border border-border bg-card py-6 shadow-sm ring-0 transition-colors duration-300 hover:border-foreground/20">
        <CardHeader className="gap-2 px-6 sm:px-7">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <CardTitle className="text-lg font-semibold tracking-tight sm:text-xl">
                {experience.position}
              </CardTitle>
              <CardDescription className="mt-1 text-sm font-medium">
                {experience.company}
              </CardDescription>
            </div>
            <span className="rounded-md border border-border bg-muted/40 px-2.5 py-1 text-xs font-medium text-muted-foreground">
              {experience.duration}
            </span>
          </div>
        </CardHeader>

        <CardContent className="px-6 pt-4 sm:px-7">
          <p className="mb-5 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {experience.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {experience.technologies.map((tech) => (
              <Badge
                key={tech}
                variant="outline"
                className="text-xs font-medium"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
