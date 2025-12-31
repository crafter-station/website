export interface TeamMember {
  username: string;
  name: string;
  position: string;
  photoUrl: string;
  bio: string;
  skills: string[];
  github?: string;
  linkedin?: string;
  x?: string;
  instagram?: string;
  website?: string;
}

export const teamMembers: TeamMember[] = [
  {
    username: "railly",
    name: "Railly Hugo",
    position: "Design Engineer",
    photoUrl: "/team/railly.webp",
    bio: "",
    skills: ["React", "TypeScript", "Tailwind CSS", "Figma", "Next.js"],
    github: "https://github.com/Railly",
    linkedin: "https://linkedin.com/in/railly-hugo",
    x: "https://x.com/raillyhugo",
    website: "https://railly.dev",
  },
  {
    username: "cueva",
    name: "Anthony Cueva",
    position: "Product Engineer",
    photoUrl: "/team/cueva.webp",
    bio: "",
    skills: ["Next.js", "TypeScript", "PostgreSQL", "Vercel", "React"],
    github: "https://github.com/cuevaio",
    linkedin: "https://linkedin.com/in/cuevaio",
    x: "https://x.com/cuevaio",
    website: "https://www.cueva.io",
  },
  {
    username: "cris",
    name: "Cristian Correa",
    position: "Data & Software Engineer",
    photoUrl: "/team/cris.webp",
    bio: "",
    skills: ["Python", "Data Engineering", "Machine Learning", "TypeScript"],
    github: "https://github.com/camilocbarrera",
    linkedin: "https://www.linkedin.com/in/cristiancamilocorrea/",
    x: "https://x.com/camilocbarrera",
    website: "https://cristiancorrea.xyz/",
  },
  {
    username: "shiara",
    name: "Shiara Arauzo",
    position: "Design Engineer",
    photoUrl: "/team/shiara.webp",
    bio: "",
    skills: ["UI/UX Design", "React", "Figma", "TypeScript", "Astro"],
    github: "https://github.com/shiarauzo",
    linkedin: "https://www.linkedin.com/in/shiara-arauzo/",
    instagram: "https://www.instagram.com/the.research.blog",
    website: "https://shiara.dev/",
  },
  {
    username: "ignacio",
    name: "Ignacio Rueda",
    position: "Backend Dev",
    photoUrl: "/team/ignacio.webp",
    bio: "",
    skills: ["Go", "Python", "PostgreSQL", "Docker", "APIs"],
    github: "https://github.com/Jibaru",
    linkedin: "https://www.linkedin.com/in/ignacior97/",
  },
  {
    username: "tarmeno",
    name: "Carlos Tarmeño",
    position: "Frontend Dev",
    photoUrl: "/team/tarmeno.webp",
    bio: "",
    skills: ["React", "TypeScript", "Next.js", "CSS", "JavaScript"],
    github: "https://github.com/carlosdtn",
    linkedin: "https://www.linkedin.com/in/carlos-tarmeno/",
    website: "https://www.carlostarmeno.com/",
  },
  {
    username: "edward",
    name: "Edward Ramos",
    position: "Frontend Dev",
    photoUrl: "/team/edward.webp",
    bio: "",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    github: "https://github.com/EdwardR0507",
    linkedin: "https://www.linkedin.com/in/edwardramosvillarreal/",
  },
  {
    username: "liz",
    name: "Liz Riveros",
    position: "Project Manager",
    photoUrl: "/team/liz.webp",
    bio: "",
    skills: ["Project Management", "Agile", "Scrum", "Leadership"],
    linkedin: "https://www.linkedin.com/in/lizethriveros/",
  },
  {
    username: "nicolas",
    name: "Nicolas Vargas",
    position: "Backend Developer",
    photoUrl: "/team/nicolas.svg",
    bio: "",
    skills: [],
    github: "https://github.com/MrUprizing",
    x: "https://x.com/MrUprizing",
    website: "https://uprizing.me/",
  },
];
