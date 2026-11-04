"use client";

import { useState } from "react";
import { SectionContainer } from "@/components/section-container";
import { SectionHeading } from "@/components/section-heading";
import { getProjects } from "@/lib/config";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ExternalLink, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Project } from "@/config/types";
import { FaGithub } from "react-icons/fa";

export function ProjectsSection() {
  const allProjects = getProjects();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <SectionContainer id="projects">
      <SectionHeading
        title="Selected Projects"
        subtitle="A selection of products and platforms I have worked on."
      />

      <div className="mx-auto grid max-w-6xl grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5 md:gap-6 xl:grid-cols-3">
        <AnimatePresence>
          {allProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <ProjectCard
                project={project}
                onSelect={() => setSelectedProject(project)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <ProjectDialog
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </SectionContainer>
  );
}

interface ProjectCardProps {
  project: Project;
  onSelect: () => void;
}

function getProjectWebsites(project: Project) {
  return project.websites?.length
    ? project.websites
    : project.liveUrl
      ? [{ label: "Live Demo", url: project.liveUrl }]
      : [];
}

function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const websites = getProjectWebsites(project);
  return (
    <Card className="flex h-full flex-col gap-0 overflow-hidden rounded-2xl border border-border bg-card pt-0 shadow-sm ring-0 transition-all duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-lg">
      <div className="relative flex h-44 items-center justify-center overflow-hidden border-b border-border bg-muted sm:h-48">
        {project.imageUrl ? (
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 350px"
            style={{ objectFit: "cover" }}
            className="transition-transform duration-500 group-hover/card:scale-[1.03]"
          />
        ) : (
          <span className="text-muted-foreground text-sm">
            No image available
          </span>
        )}
      </div>
      <CardHeader className="gap-2 pt-5">
        <CardTitle className="text-lg font-semibold tracking-tight">
          {project.title}
        </CardTitle>
        <CardDescription className="leading-relaxed">
          {project.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="grow py-5">
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
          {project.tags.length > 3 && (
            <Badge variant="outline">+{project.tags.length - 3}</Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between bg-transparent">
        <Button
          variant="ghost"
          size="sm"
          className="font-medium"
          onClick={onSelect}
        >
          Learn More <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
        </Button>

        <div className="flex gap-2">
          {project.githubUrl && (
            <Button variant="outline" size="icon" asChild>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`GitHub Repository for ${project.title}`}
              >
                <FaGithub className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
          )}
          {websites.map((website) => (
            <Button key={website.url} variant="outline" size="icon" asChild>
              <a
                href={website.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${website.label} for ${project.title}`}
                title={website.label}
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}

interface ProjectDialogProps {
  project: Project | null;
  onClose: () => void;
}

function ProjectDialog({ project, onClose }: ProjectDialogProps) {
  if (!project) return null;
  const websites = getProjectWebsites(project);

  return (
    <Dialog open={!!project} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[95vw] sm:max-w-3xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl md:text-3xl tracking-[-0.02em] leading-tight">
            {project.title}
          </DialogTitle>
          <DialogDescription className="text-base text-pretty">
            {project.description}
          </DialogDescription>
        </DialogHeader>

        <div className="relative h-64 md:h-80 mt-4 rounded-md overflow-hidden bg-muted flex items-center justify-center">
          {project.imageUrl ? (
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              sizes="(max-width: 1200px) 100vw, 80vw"
              style={{ objectFit: "cover" }}
            />
          ) : (
            <span className="text-muted-foreground">No image available</span>
          )}
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">About this project</h3>
          <p className="text-muted-foreground">
            {project.longDescription || project.description}
          </p>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Technologies</h3>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mt-6">
          {websites.map((website) => (
            <Button key={website.url} asChild>
              <a
                href={website.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${website.label} for ${project.title}`}
              >
                {website.label}{" "}
                <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
          ))}
          {project.githubUrl && (
            <Button variant="outline" asChild>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`GitHub Repository for ${project.title}`}
              >
                GitHub Repository{" "}
                <FaGithub className="ml-2 h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
