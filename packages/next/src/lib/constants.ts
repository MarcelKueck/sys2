// Application flow constants
export const APPLICATION_STEPS = [
  { title: "Basic Info", description: "Company details" },
  { title: "About Business", description: "Your business" },
  { title: "Collaboration", description: "Working together" },
  { title: "Space Selection", description: "Choose spaces" },
] as const;

export const TEAM_SIZE_OPTIONS = [
  { value: "1-5", label: "1-5 people" },
  { value: "6-20", label: "6-20 people" },
  { value: "21-50", label: "21-50 people" },
  { value: "50+", label: "50+ people" },
] as const;

export const COMPANY_STAGE_OPTIONS = [
  { value: "idea", label: "Idea" },
  { value: "mvp", label: "MVP" },
  { value: "growth", label: "Growth" },
  { value: "scale", label: "Scale" },
] as const;

export const FUNDING_STATUS_OPTIONS = [
  { value: "bootstrapped", label: "Bootstrapped" },
  { value: "pre-seed", label: "Pre-seed" },
  { value: "seed", label: "Seed" },
  { value: "series-a", label: "Series A" },
  { value: "series-b", label: "Series B" },
  { value: "series-c+", label: "Series C+" },
] as const;

export const INDUSTRIES = [
  "Technology & Software",
  "Artificial Intelligence & Machine Learning",
  "FinTech & Financial Services",
  "HealthTech & Medical",
  "E-commerce & Retail",
  "Education & EdTech",
  "Marketing & Advertising",
  "Media & Entertainment",
  "Energy & Sustainability",
  "Manufacturing & Hardware",
  "Professional Services",
  "Other",
] as const;

export const COMMON_TECH_STACK = [
  "React", "Vue.js", "Angular", "Node.js", "Python", "Java", "TypeScript", "JavaScript",
  "Go", "Rust", "Docker", "Kubernetes", "AWS", "Azure", "GCP", "PostgreSQL", "MongoDB",
  "Redis", "GraphQL", "REST API", "Machine Learning", "AI", "Blockchain", "iOS", "Android",
  "Unity", "TensorFlow", "PyTorch", "Figma", "Adobe Creative Suite"
] as const;

export const COLLABORATION_OPTIONS = [
  {
    id: "joint-development",
    title: "Joint Product Development",
    description: "Collaborate on building products together",
    icon: "🚀",
  },
  {
    id: "skill-sharing",
    title: "Skill Sharing & Workshops",
    description: "Share expertise and learn from each other",
    icon: "🎓",
  },
  {
    id: "customer-referrals",
    title: "Customer Referrals",
    description: "Cross-promote and refer customers",
    icon: "🤝",
  },
  {
    id: "technical-partnerships",
    title: "Technical Partnerships",
    description: "Integrate technologies and systems",
    icon: "⚡",
  },
  {
    id: "resource-sharing",
    title: "Resource Sharing",
    description: "Share tools, equipment, or services",
    icon: "🔧",
  },
  {
    id: "mentorship-exchange",
    title: "Mentorship Exchange",
    description: "Mentor each other in different areas",
    icon: "🌟",
  },
] as const;
