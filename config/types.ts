export interface PersonalInfo {
  name: string;
  username?: string;
  title: string;
  bio: string;
  seoDescription?: string;
  tagline?: string;
  company?: string;
  city?: string;
  joinedDate?: string;
  avatarUrl?: string;
  email: string;
  phone?: string;
  location: string;
  resumeUrl?: string;
  websiteUrl: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category:
    | "frontend"
    | "backend"
    | "database"
    | "ai-ml"
    | "devops"
    | "design"
    | "other";
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  imageUrl: string;
  liveUrl?: string;
  websites?: { label: string; url: string }[];
  githubUrl?: string;
  featured: boolean;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  startDate: string;
  endDate?: string;
  description: string;
  technologies: string[];
  type: "work" | "education";
}

export interface Social {
  platform: string;
  url: string;
  icon: string;
}
