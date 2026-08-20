export interface Experience {
  company: string;
  location: "Islamabad" | "Rawalpindi" | "remote";
  startDate: string;
  endDate: string | null;
  tech: string[];
}

export interface Project {
  title: string;
  description: string;
  category: "AI / ML" | "Backend" | "Full Stack" | "Product";
  highlight: string;
  tech: string[];
  github?: string;
  featured?: boolean;
  status?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: "github" | "linkedin" | "instagram" | "email";
}

export const experiences: Experience[] = [
  {
    company: "D4 Interactive",
    location: "Islamabad",
    startDate: "2025-10",
    endDate: null,
    tech: ["Go", "Python", "Vue.js", "Laravel", "Kafka", "ClickHouse", "MongoDB", "Pusher"],
  },
  {
    company: "Progress LLC",
    location: "remote",
    startDate: "2025-07",
    endDate: "2025-10",
    tech: ["Python", "n8n", "Firebase", "REST APIs"],
  },
  {
    company: "RiseTech AI",
    location: "Rawalpindi",
    startDate: "2024-06",
    endDate: "2025-06",
    tech: ["PyTorch", "Python", "Computer Vision", "Deep Learning"],
  },
  {
    company: "GAOTech Inc.",
    location: "remote",
    startDate: "2023-10",
    endDate: "2023-12",
    tech: ["MongoDB", "Express", "React", "Node.js"],
  },
];

export const projects: Project[] = [
  {
    title: "Medivise",
    description:
      "An AI-enabled healthcare system combining medical RAG, fine-tuned Llama models, and computer-vision diagnostics for personalized patient guidance.",
    category: "AI / ML",
    highlight: "8B + 70B LLMs / 13 CNNs",
    tech: ["Python", "FastAPI", "Streamlit", "Firebase", "RAG", "PyTorch", "GCP", "TensorFlow"],
    github: "https://github.com/AbdulWasayUl/medivide-frontend",
    featured: true,
  },
  {
    title: "Dream Learning",
    description:
      "A mobile-first learning platform with courses, quizzes, assignments, certificates, and premium content backed by Firebase.",
    category: "Product",
    highlight: "End-to-end learning experience",
    tech: ["Flutter", "Firebase", "Dart", "Cloud Firestore"],
    github: "https://github.com/AbdulWasayUl/dream-learning",
  },
  {
    title: "Sprintly",
    description:
      "A production-minded productivity workspace with real-time updates, drag-and-drop flows, rich-text editing, queues, caching, and a documented API.",
    category: "Full Stack",
    highlight: "Realtime + async workers",
    tech: ["React", "TypeScript", "Express", "MongoDB", "Redis", "Pusher", "BullMQ"],
    status: "Work in progress",
  },
  {
    title: "Neural Style Transfer",
    description:
      "A transformer-based computer-vision pipeline for transferring visual styles across both images and video, with custom datasets plus dedicated training and inference workflows.",
    category: "AI / ML",
    highlight: "Image + video stylization",
    tech: ["Python", "PyTorch", "Transformers", "Computer Vision", "CUDA", "Pillow"],
    github: "https://github.com/AbdulWasayUl/style-transfer",
  },
];

export const profileHighlights = [
  { value: "2+", label: "Years building" },
  { value: "18%", label: "Diagnostic lift" },
  { value: "20%", label: "Latency reduced" },
  { value: "3.65", label: "NUST CGPA" },
];

export const currentFocus = [
  {
    index: "01",
    title: "Systems to experiences",
    description: "Architecting the foundations and the interfaces people actually use.",
  },
  {
    index: "02",
    title: "Intelligence in the loop",
    description: "Making AI useful inside reliable, measurable, production-ready products.",
  },
  {
    index: "03",
    title: "Build, ship, operate",
    description: "Owning the path from system design and code to cloud delivery and scale.",
  },
];

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/AbdulWasayUl",
    icon: "github",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/abdul-wasay-671442237/",
    icon: "linkedin",
  },
  {
    name: "Instagram",
    url: "https://instagram.com/wasay_ul",
    icon: "instagram",
  },
  {
    name: "Email",
    url: "mailto:abdul.wasay@wasay.dev",
    icon: "email",
  },
];

export const skillCategories = [
  {
    key: "languages" as const,
    skills: ["Python", "Java", "C++", "Go", "TypeScript", "Dart"],
  },
  {
    key: "backend" as const,
    skills: ["Node.js", "Express", "FastAPI", "Laravel", "REST APIs", "GraphQL"],
  },
  {
    key: "frontend" as const,
    skills: ["React", "Next.js", "Vue.js", "Flutter", "Tailwind CSS"],
  },
  {
    key: "databases" as const,
    skills: ["MongoDB", "PostgreSQL", "ClickHouse", "Redis", "Firebase", "Cloud Firestore"],
  },
  {
    key: "devops" as const,
    skills: ["Docker", "Kubernetes", "CI/CD", "GCP", "Linux", "Kafka"],
  },
  {
    key: "aiml" as const,
    skills: ["PyTorch", "TensorFlow", "LangChain", "RAG", "Computer Vision", "NLP"],
  },
  {
    key: "architecture" as const,
    skills: ["System Design", "Microservices", "Event-Driven", "Distributed Systems", "Design Patterns"],
  },
  {
    key: "tools" as const,
    skills: ["Git", "n8n", "Pusher", "Streamlit", "Firebase Auth"],
  },
];

export const education = {
  university: "National University of Sciences & Technology (NUST)",
  department: "SEECS",
  degree: "Bachelor of Engineering — Software Engineering",
  graduationYear: "2025",
  cgpa: "3.65/4.00",
};

export function formatDateRange(
  startDate: string,
  endDate: string | null,
  presentLabel: string
): string {
  const format = (d: string) => {
    const [year, month] = d.split("-");
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];
    return `${months[parseInt(month) - 1]} ${year}`;
  };
  return `${format(startDate)} — ${endDate ? format(endDate) : presentLabel}`;
}
