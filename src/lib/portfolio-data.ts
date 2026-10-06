import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import project5 from "@/assets/project-5.jpg";

export const PROFILE = {
  name: "Anjani Singh",
  shortName: "Anjani",
  tagline: "Software Engineer · Quantum & Machine Learning Developer · R&D",
  bio: "Computer Science engineer working across software development, quantum technology, and machine learning. Experienced in building scalable web applications, quantum computing & communication systems, and research-driven intelligent solutions.",

  email: "hello@anjanisingh.dev",
  socials: {
    github: "https://github.com/anjani161161",
    linkedin: "https://www.linkedin.com/in/anjani-singh1616/",
    leetcode: "https://leetcode.com/u/vHn9wOhn55/",
    instagram: "https://www.instagram.com/1616anjani_singh/",
  },
  resumeUrl: "https://drive.google.com/file/d/1TdCY4X8OymbwHHuivcUHFek-ybPyuILO/view?usp=sharing",
  resumeDownloadUrl:
    "https://drive.google.com/uc?export=download&id=1TdCY4X8OymbwHHuivcUHFek-ybPyuILO",
} as const;

export const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
];

export const STATS = [
  { value: "5+", label: "Projects" },
  { value: "12+", label: "Technologies" },
  { value: "10+", label: "Certifications" },
  { value: "3", label: "Leadership Roles" },
];

export const SKILL_GROUPS = [
  {
    title: "Quantum & R&D",
    skills: [
      "Quantum Computing",
      "QForge 24",
      "Quantum Key Distribution (QKD)",
      "Device Integration",
      "Hardware-Software Systems",
      "Scientific Simulation",
    ],
  },
  {
    title: "AI & Machine Learning",
    skills: [
      "Machine Learning",
      "Model Development",
      "Data Processing",
      "OpenAI APIs",
      "Prompt Engineering",
      "AI Integrations",
    ],
  },
  {
    title: "Frontend",
    skills: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS", "Next.js"],
  },
  { title: "Backend", skills: ["Node.js", "Express.js", "REST APIs"] },
  { title: "Database", skills: ["MongoDB", "MySQL"] },
  { title: "Programming", skills: ["Python", "Java", "TypeScript", "C/C++"] },
  {
    title: "Tools & Systems",
    skills: ["Git", "GitHub", "VS Code", "Figma", "Postman", "Linux"],
  },
  {
    title: "Design",
    skills: ["Adobe Photoshop", "Adobe Illustrator", "Canva"],
  },
];

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  current?: boolean;
  description?: string;
  points: string[];
  tags?: string[];
}

export const EXPERIENCES: ExperienceItem[] = [
  {
    role: "Quantum / Machine Learning Project Developer (R&D)",
    company: "Quantum Insight Labs Pvt. Ltd. — IIT Delhi",
    period: "2026 — Present",
    current: true,
    description:
      "Currently working at Quantum Insight Labs Pvt. Ltd. at IIT Delhi on quantum technology, scientific systems, and machine learning projects. My work involves hands-on exposure to quantum hardware, quantum communication systems, scientific software, experimental data processing, and hardware-software integration.",
    points: [
      "QForge 24 — Hands-on work with quantum hardware and device experimentation, including interaction with the physical system and related scientific software.",
      "Infinity — Worked with quantum technology systems involving experimentation, scientific software, simulation, and device interaction.",
      "QKD (Quantum Key Distribution) — Worked on Quantum Key Distribution systems involving quantum communication and secure key exchange concepts, including software and hardware integration.",
      "Machine Learning — Worked on machine learning workflows involving experimental data processing, model development, analysis, and integration with scientific/quantum systems.",
    ],
    tags: [
      "QForge 24",
      "Infinity",
      "QKD",
      "Quantum Computing",
      "Machine Learning",
      "Scientific Simulation",
      "Device Integration",
    ],
  },
  {
    role: "Director of Technical Services",
    company: "Brndfy",
    period: "January 2026",
    points: [
      "Leading technical planning and execution for client web applications.",
      "Building scalable websites and modern web solutions using React, Next.js, Node.js, and MongoDB.",
      "Managing project architecture, deployment workflows, and development standards while collaborating with design and development teams.",
    ],
  },
  {
    role: "B.Tech — Computer Science Engineering",
    company: "Galgotias College of Engineering and Technology",
    period: "2023 — 2027",
    points: [
      "Focus on full-stack systems, distributed computing, and applied AI.",
      "Active in coding clubs, hackathons, and student leadership.",
    ],
  },
];

export const PROJECTS = [
  {
    title: "AI Powered SaaS Dashboard",
    description:
      "Production SaaS interface with realtime analytics, role-based access, and LLM-powered insights.",
    image: project1,
    tags: ["Next.js", "OpenAI", "PostgreSQL", "Tailwind"],
    category: "Full Stack",
    demo: "",
    github: "",
  },
  {
    title: "Online Examination & Result System",
    description:
      "Secure exam delivery with auto-grading, proctoring hooks, and instant result dashboards.",
    image: project2,
    tags: ["React", "Node.js", "MongoDB", "JWT"],
    category: "Full Stack",
    demo: "",
    github: "",
  },
  {
    title: "Placement Preparation Platform",
    description:
      "Curated DSA tracks, mock interviews, and progress analytics for engineering students.",
    image: project3,
    tags: ["Next.js", "Prisma", "MySQL"],
    category: "EdTech",
    demo: "",
    github: "",
  },
  {
    title: "Marketing Agency Dashboard",
    description: "Internal command center for Brndfy — clients, campaigns, invoicing, and reports.",
    image: project4,
    tags: ["React", "Express", "Recharts"],
    category: "Internal Tools",
    demo: "",
    github: "",
  },
  {
    title: "AI Productivity Suite",
    description:
      "A bundle of AI tools — writer, summarizer, image enhancer — with unified prompt orchestration.",
    image: project5,
    tags: ["Next.js", "OpenAI", "Vercel AI SDK"],
    category: "AI",
    demo: "",
    github: "",
  },
];

export const PROJECT_CATEGORIES = ["All", "Full Stack", "AI", "EdTech", "Internal Tools"];

export const SERVICES = [
  {
    title: "Quantum & Scientific Systems",
    desc: "Scientific software simulation, device interaction workflows, and quantum computing R&D.",
    icon: "Atom",
  },
  {
    title: "Machine Learning Solutions",
    desc: "Model development, data processing pipelines, and applied intelligent systems.",
    icon: "Sparkles",
  },
  {
    title: "Full Stack Web Development",
    desc: "Production-grade web apps with modern React/Next.js stacks and reliable backends.",
    icon: "Code2",
  },
  {
    title: "UI / UX Design",
    desc: "Premium interfaces with strong systems thinking — Figma to code.",
    icon: "Layers",
  },
  {
    title: "Graphic Design",
    desc: "Brand visuals, social creatives, and marketing collateral with polish.",
    icon: "Palette",
  },
  {
    title: "Website & Systems Optimization",
    desc: "Performance tuning, architecture reviews, and engineering process design.",
    icon: "Gauge",
  },
];

export const ACHIEVEMENTS = [
  {
    title: "R&D — Quantum Insight Labs (IIT Delhi)",
    desc: "Professional R&D experience working on quantum computing, QKD, and machine learning systems.",
  },
  {
    title: "Director of Technical Services — Brndfy",
    desc: "Leading the technical services division of a fast-growing marketing agency.",
  },
  {
    title: "Top Performer — College Hackathons",
    desc: "Multiple finalist placements across inter-college coding competitions.",
  },
  {
    title: "Open Source Contributor & Mentor",
    desc: "Active contributor to community libraries and mentoring peers on software engineering and tooling.",
  },
];
