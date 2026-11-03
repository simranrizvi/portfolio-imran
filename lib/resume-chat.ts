import type {
  PersonalInfo,
  Experience,
  Project,
  Skill,
  Social,
} from "@/config/types";

// ─── Stop-words ────────────────────────────────────────────────────────────────
const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "by",
  "for",
  "from",
  "how",
  "i",
  "in",
  "is",
  "it",
  "me",
  "my",
  "of",
  "on",
  "or",
  "that",
  "the",
  "to",
  "what",
  "where",
  "who",
  "with",
  "you",
  "your",
]);

// ─── Config-based data shape ────────────────────────────────────────────────────
export type ResumeConfig = {
  personal: PersonalInfo;
  experience: Experience[];
  projects: Project[];
  skills: Skill[];
  social: Social[];
};

type KnowledgeDoc = {
  text: string;
  answer: string;
};

// ─── Text helpers ───────────────────────────────────────────────────────────────
function normalize(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, " ");
}

function tokenize(text: string): string[] {
  return normalize(text)
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOP_WORDS.has(t));
}

function overlapScore(queryTokens: string[], text: string): number {
  const targetTokens = new Set(tokenize(text));
  let score = 0;
  for (const token of queryTokens) {
    if (targetTokens.has(token)) score += 2;
    if (text.toLowerCase().includes(token)) score += 1;
  }
  return score;
}

// ─── Intent-based fast answers ──────────────────────────────────────────────────
function getIntentAnswer(query: string, cfg: ResumeConfig): string | null {
  const q = query.toLowerCase();
  const { personal, skills, experience, social } = cfg;

  // Contact / email
  if (
    q.includes("email") ||
    q.includes("contact") ||
    q.includes("reach") ||
    q.includes("hire")
  ) {
    const linkedin = social.find((s) => s.platform === "LinkedIn")?.url;
    const github = social.find((s) => s.platform === "GitHub")?.url;
    return (
      `You can reach ${personal.name} at ${personal.email}` +
      (personal.phone ? ` or ${personal.phone}` : "") +
      (linkedin ? `. LinkedIn: ${linkedin}` : "") +
      (github ? `. GitHub: ${github}` : "") +
      "."
    );
  }

  // Phone
  if (q.includes("phone") || q.includes("call") || q.includes("number")) {
    return personal.phone
      ? `${personal.name}'s phone number is ${personal.phone}.`
      : `Phone number is not publicly listed. Reach out via email: ${personal.email}.`;
  }

  // Location
  if (
    q.includes("where") ||
    q.includes("location") ||
    q.includes("based") ||
    q.includes("from")
  ) {
    return `${personal.name} is based in ${personal.location}.`;
  }

  // Skills / tech stack
  if (
    q.includes("skill") ||
    q.includes("stack") ||
    q.includes("technology") ||
    q.includes("technologies") ||
    q.includes("tech") ||
    q.includes("tools")
  ) {
    const topSkills = skills
      .sort((a, b) => b.level - a.level)
      .slice(0, 10)
      .map((s) => s.name)
      .join(", ");
    return `Core skills include ${topSkills}.`;
  }

  // Education
  if (
    q.includes("education") ||
    q.includes("degree") ||
    q.includes("study") ||
    q.includes("university") ||
    q.includes("college")
  ) {
    const edu = experience
      .filter((e) => e.type === "education")
      .map((e) => `${e.position} at ${e.company} (${e.duration})`)
      .join("; ");
    return edu || `${personal.name} has a Computer Science background.`;
  }

  // Current role / job
  if (
    q.includes("current role") ||
    q.includes("current job") ||
    q.includes("working") ||
    q.includes("work at") ||
    q.includes("employed") ||
    q.includes("role")
  ) {
    const current = experience.find((e) => e.type === "work" && !e.endDate);
    if (current) {
      return `${personal.name} is currently working as ${current.position} at ${current.company} (${current.duration}).`;
    }
    const latest = experience.filter((e) => e.type === "work")[0];
    if (latest) {
      return `${personal.name} last worked as ${latest.position} at ${latest.company} (${latest.duration}).`;
    }
  }

  // Freelance
  if (q.includes("freelance") || q.includes("freelancer")) {
    const freelance = experience.find(
      (e) => e.company.toLowerCase() === "freelance",
    );
    if (freelance) {
      return `${personal.name} worked as a ${freelance.position} (Freelance) from ${freelance.duration}. ${freelance.description}`;
    }
  }

  // Summary / who
  if (
    q.includes("who") ||
    q.includes("about") ||
    q.includes("introduce") ||
    q.includes("summary") ||
    q.includes("tell me")
  ) {
    return `${personal.name} is a ${personal.title}. ${personal.bio}`;
  }

  // Resume / CV download
  if (q.includes("resume") || q.includes("cv") || q.includes("download")) {
    return personal.resumeUrl
      ? `You can download ${personal.name}'s resume at: ${personal.resumeUrl}`
      : `Resume is available on request. Contact ${personal.email}.`;
  }

  return null;
}

// ─── Build knowledge docs from config ──────────────────────────────────────────
function buildKnowledge(cfg: ResumeConfig): KnowledgeDoc[] {
  const { personal, experience, projects, skills } = cfg;
  const docs: KnowledgeDoc[] = [];

  // Personal overview
  docs.push({
    text: `${personal.name} ${personal.title} ${personal.bio} ${personal.location}`,
    answer: `${personal.name} is a ${personal.title}. ${personal.bio}`,
  });

  // Work experience
  for (const exp of experience.filter((e) => e.type === "work")) {
    docs.push({
      text: `${exp.company} ${exp.position} ${exp.duration} ${exp.description} ${exp.technologies.join(" ")}`,
      answer: `${exp.position} at ${exp.company} (${exp.duration}): ${exp.description}`,
    });
  }

  // Education
  for (const edu of experience.filter((e) => e.type === "education")) {
    docs.push({
      text: `${edu.company} ${edu.position} ${edu.duration} ${edu.description}`,
      answer: `${edu.position} at ${edu.company} (${edu.duration}).`,
    });
  }

  // Projects
  for (const project of projects) {
    docs.push({
      text: `${project.title} ${project.description} ${project.longDescription ?? ""} ${project.tags.join(" ")}`,
      answer:
        `${project.title}: ${project.longDescription ?? project.description}` +
        (project.websites?.length
          ? ` Websites: ${project.websites.map((site) => `${site.label}: ${site.url}`).join(", ")}`
          : project.liveUrl
            ? ` Live: ${project.liveUrl}`
            : ""),
    });
  }

  // Skills grouped by category
  const categories = [...new Set(skills.map((s) => s.category))];
  for (const cat of categories) {
    const catSkills = skills
      .filter((s) => s.category === cat)
      .map((s) => s.name)
      .join(", ");
    docs.push({
      text: `${cat} skills technologies ${catSkills}`,
      answer: `${cat.charAt(0).toUpperCase() + cat.slice(1)} skills: ${catSkills}.`,
    });
  }

  return docs;
}

// ─── Public API ─────────────────────────────────────────────────────────────────
export function getResumeAnswer(query: string, cfg: ResumeConfig): string {
  const trimmed = query.trim();
  if (!trimmed) {
    return "Please ask about experience, projects, education, skills, or contact details.";
  }

  const intentAnswer = getIntentAnswer(trimmed, cfg);
  if (intentAnswer) return intentAnswer;

  const queryTokens = tokenize(trimmed);
  const knowledge = buildKnowledge(cfg);

  let bestDoc: KnowledgeDoc | null = null;
  let bestScore = 0;

  for (const doc of knowledge) {
    const score = overlapScore(queryTokens, doc.text);
    if (score > bestScore) {
      bestDoc = doc;
      bestScore = score;
    }
  }

  if (!bestDoc || bestScore < 2) {
    return "I can only answer from the resume data. Try asking about work experience, projects, skills, education, or contact info.";
  }

  return bestDoc.answer;
}
