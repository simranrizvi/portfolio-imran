import {
  FaDocker,
  FaGit,
  FaGithub,
  FaNodeJs,
  FaPython,
  FaReact,
} from "react-icons/fa";
import { RiNextjsFill } from "react-icons/ri";
import {
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiExpress,
  SiFastapi,
  SiPostgresql,
  SiMongodb,
  SiMysql,
  SiPrisma,
  SiPostman,
  SiRedis,
} from "react-icons/si";
import { Database, Box, ShieldCheck, Workflow, Sparkles } from "lucide-react";

export const DATA = {
  skills: [
    { name: "HTML5", icon: <SiHtml5 />, color: "#E34F26" },
    { name: "CSS3", icon: <SiCss />, color: "#1572B6" },
    { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "#06B6D4" },
    { name: "React.js", icon: <FaReact />, color: "#61DAFB" },
    { name: "Next.js", icon: <RiNextjsFill />, color: "#E2E8F0" },
    { name: "Node.js", icon: <FaNodeJs />, color: "#339933" },
    { name: "Express.js", icon: <SiExpress />, color: "#CBD5E0" },
    { name: "FastAPI", icon: <SiFastapi />, color: "#009688" },
    {
      name: "REST APIs",
      icon: <Workflow className="size-4" />,
      color: "#38BDF8",
    },
    { name: "Python", icon: <FaPython />, color: "#3776AB" },
    { name: "PostgreSQL", icon: <SiPostgresql />, color: "#4169E1" },
    { name: "MongoDB", icon: <SiMongodb />, color: "#47A248" },
    { name: "MySQL", icon: <SiMysql />, color: "#4479A1" },
    { name: "Prisma", icon: <SiPrisma />, color: "#A5F3FC" },
    { name: "Git", icon: <FaGit />, color: "#F05032" },
    { name: "GitHub", icon: <FaGithub />, color: "#E2E8F0" },
    { name: "Postman", icon: <SiPostman />, color: "#FF6C37" },
    { name: "Docker", icon: <FaDocker />, color: "#2496ED" },
    { name: "Redis", icon: <SiRedis />, color: "#DC382D" },
    { name: "BullMQ", icon: <Box className="size-4" />, color: "#F97316" },
    { name: "JWT", icon: <ShieldCheck className="size-4" />, color: "#A78BFA" },
    {
      name: "RBAC",
      icon: <ShieldCheck className="size-4" />,
      color: "#A78BFA",
    },
    {
      name: "API Integration",
      icon: <Database className="size-4" />,
      color: "#38BDF8",
    },
    {
      name: "AI Integration",
      icon: <Sparkles className="size-4" />,
      color: "#A78BFA",
    },
  ],
};
