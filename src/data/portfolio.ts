export interface Experience {
  company: string;
  location: "Islamabad" | "Rawalpindi" | "remote";
  startDate: string;
  endDate: string | null;
  tech: string[];
}

export interface Project {
  tech: string[];
  github: string;
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
    tech: ["Python", "FastAPI", "Streamlit", "Firebase", "RAG", "PyTorch", "GCP", "TensorFlow"],
    github: "https://github.com/AbdulWasayUl/medivide-frontend",
  },
  {
    tech: ["Flutter", "Firebase", "Dart", "Cloud Firestore"],
    github: "https://github.com/AbdulWasayUl/dream-learning",
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
    url: "mailto:wasay6788@gmail.com",
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
