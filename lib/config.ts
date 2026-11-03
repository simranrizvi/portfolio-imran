import personalInfoJson from "@/config/personal.json";
import projectsJson from "@/config/projects.json";
import experienceJson from "@/config/experience.json";
import socialJson from "@/config/social.json";
import { PersonalInfo, Project, Experience, Social } from "@/config/types";

// Get personal info
export function getPersonalInfo(): PersonalInfo {
  return personalInfoJson;
}

// Get projects
export function getProjects(): Project[] {
  return projectsJson as Project[];
}

// Get experiences
export function getExperiences(): Experience[] {
  // Assert the type of experienceJson to Experience[]
  const experiences = experienceJson as Experience[];
  return experiences.sort((a, b) => {
    // Ensure startDate is treated as a string if needed for Date constructor
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });
}

// Get work experiences
export function getWorkExperiences(): Experience[] {
  const experiences = getExperiences();
  return experiences.filter((exp) => exp.type === "work");
}

// Get education experiences
export function getEducationExperiences(): Experience[] {
  const experiences = getExperiences();
  return experiences.filter((exp) => exp.type === "education");
}

// Get social links
export function getSocialLinks(): Social[] {
  return socialJson as Social[]; // Assert type
}
