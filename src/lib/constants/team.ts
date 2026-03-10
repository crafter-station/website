export interface TeamMember {
  username: string;
  name: string;
  position: string;
  location?: string;
  photoUrl: string;
  bio: {
    en: string;
    es: string;
    'pt-br': string;
  };
  skills: string[];
  github?: string;
  linkedin?: string;
  x?: string;
  instagram?: string;
  website?: string;
  projects?: string[];
  joinedYear?: number;
  cal?: string;
}

export const teamMembers: TeamMember[] = [
  {
      username: 'shiara',
      name: 'Shiara Arauzo',
      position: 'Design Engineer',
      location: 'Lima, Peru',
      photoUrl: '/team/shiara.webp',
      bio: {
        en: 'Design engineer with a deep curiosity for human-computer interaction. Builds interfaces that feel natural and delightful. Also runs The Research Blog.',
        es: 'Ingeniera de diseño con profunda curiosidad por la interacción humano-computadora. Construye interfaces que se sienten naturales y deliciosas. También dirige The Research Blog.',
        'pt-br': 'Engenheira de design com profunda curiosidade pela interação humano-computador. Constrói interfaces que parecem naturais e encantadoras. Também mantém The Research Blog.',
      },
      skills: ['UI/UX Design', 'React', 'Figma', 'TypeScript', 'Astro', 'Accessibility'],
      github: 'https://github.com/shiarauzo',
      linkedin: 'https://www.linkedin.com/in/shiara-arauzo/',
      instagram: 'https://www.instagram.com/the.research.blog',
      website: 'https://shiara.dev/',
      cal: "https://cal.com/shiara-arauzo/30-min",
      joinedYear: 2024,
    },
    {
      username: 'cris',
      name: 'Cristian Correa',
      position: 'Data & Software Engineer',
      location: 'Bogotá, Colombia',
      photoUrl: '/team/cris.webp',
      bio: {
        en: 'Data and software engineer bridging the gap between machine learning and product. Passionate about making data-driven products accessible across LATAM.',
        es: 'Ingeniero de datos y software que conecta el machine learning con el producto. Apasionado por hacer que los productos basados en datos sean accesibles en toda LATAM.',
        'pt-br': 'Engenheiro de dados e software que une machine learning com produto. Apaixonado por tornar produtos orientados a dados acessíveis em todo o LATAM.',
      },
      skills: ['Python', 'Data Engineering', 'Machine Learning', 'TypeScript', 'dbt', 'SQL'],
      github: 'https://github.com/camilocbarrera',
      linkedin: 'https://www.linkedin.com/in/cristiancamilocorrea/',
      x: 'https://x.com/camilocbarrera',
      website: 'https://cristiancorrea.xyz/',
      cal: "https://cal.com/cristian-correa/30min",
      joinedYear: 2024,
    },
  {
    username: 'railly',
    name: 'Railly Hugo',
    position: 'Design Engineer',
    location: 'Lima, Peru',
    photoUrl: '/team/railly.webp',
    bio: {
      en: 'Design engineer passionate about developer tools and open source. Creator of tinte — a theme generator for VSCode and shadcn/ui with 500+ GitHub stars.',
      es: 'Ingeniero de diseño apasionado por las herramientas para desarrolladores y el open source. Creador de tinte — un generador de temas para VSCode y shadcn/ui con más de 500 estrellas en GitHub.',
      'pt-br': 'Engenheiro de design apaixonado por ferramentas para desenvolvedores e open source. Criador do tinte — um gerador de temas para VSCode e shadcn/ui com mais de 500 estrelas no GitHub.',
    },
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Figma', 'Next.js', 'Design Systems'],
    github: 'https://github.com/Railly',
    linkedin: 'https://linkedin.com/in/railly-hugo',
    x: 'https://x.com/raillyhugo',
    website: 'https://railly.dev',
    projects: ['tinte', 'elements'],
    cal: "https://cal.com/railly/30min",
    joinedYear: 2023,
  },
   {
      username: 'emmy',
      name: 'Emmy Arias',
      position: 'Growth & Marketing',
      location: 'Bogotá, Colombia',
      photoUrl: '/team/emmy.webp',
      bio: {
        en: 'Growth and marketing strategist with an anthropology background that shapes how she thinks about products — starting with people, not solutions. Expert in automation and AI workflows, she finds elegant ways to solve complex distribution challenges. Currently at 30x.',
        es: 'Estratega de growth y marketing con formación en antropología que define cómo piensa sobre los productos: empezando por las personas, no por las soluciones. Experta en automatización y flujos de trabajo con IA, encuentra formas elegantes de resolver desafíos complejos de distribución. Actualmente en 30x.',
        'pt-br': 'Estrategista de crescimento e marketing com formação em antropologia que molda como ela pensa sobre produtos — começando pelas pessoas, não pelas soluções. Especialista em automação e fluxos de trabalho com IA, encontra maneiras elegantes de resolver desafios complexos de distribuição. Atualmente na 30x.',
      },
      skills: ['Growth', 'Marketing', 'n8n', 'Automation', 'AI Workflows', 'Kapso'],
      joinedYear: 2025,
  },
  {
      username: 'nicolas',
      name: 'Nicolas Vargas',
      position: 'Backend Developer',
      location: 'Bogotá, Colombia',
      photoUrl: '/team/nicolas.svg',
      bio: {
        en: 'Backend developer from Colombia building scalable systems and exploring the intersection of distributed computing and developer tooling.',
        es: 'Desarrollador backend de Colombia construyendo sistemas escalables y explorando la intersección de la computación distribuida y las herramientas para desarrolladores.',
        'pt-br': 'Desenvolvedor backend da Colômbia construindo sistemas escaláveis e explorando a interseção de computação distribuída e ferramentas para desenvolvedores.',
      },
      skills: ['Go', 'TypeScript', 'PostgreSQL', 'Docker', 'Distributed Systems'],
      github: 'https://github.com/MrUprizing',
      x: 'https://x.com/MrUprizing',
      website: 'https://uprizing.me/',
      joinedYear: 2025,
    },
   {
     username: 'nacho',
     name: 'Ignacio Velásquez',
     position: 'Growth & Automation',
     location: 'Arequipa, Peru',
     photoUrl: '/team/nacho.webp',
     bio: {
       en: 'Growth and automation specialist focused on helping products reach the right people. Builds systems that scale distribution and community engagement across LATAM.',
       es: 'Especialista en growth y automatización enfocado en ayudar a los productos a llegar a las personas correctas. Construye sistemas que escalan la distribución y el compromiso comunitario en LATAM.',
       'pt-br': 'Especialista em crescimento e automação focado em ajudar produtos a chegar às pessoas certas. Constrói sistemas que escalam distribuição e engajamento comunitário no LATAM.',
     },
     skills: ['Automation', 'AI', 'Notion', 'Product Hunt', 'Growth Hacking', 'Content Marketing'],
     linkedin: 'https://www.linkedin.com/in/ignacio-vel%C3%A1squez-franco-3a5765204/',
     website: 'https://theveller.gumroad.com/',
     cal: "https://cal.com/ignacio-velasquez-franco/30min",
     joinedYear: 2025,
   },
  {
    username: 'ignacio',
    name: 'Ignacio Rueda',
    position: 'Backend Engineer',
    location: 'Lima, Peru',
    photoUrl: '/team/ignacio.webp',
    bio: {
      en: 'Backend engineer focused on building reliable, performant APIs and systems. Loves Go and distributed systems.',
      es: 'Ingeniero backend enfocado en construir APIs y sistemas confiables y de alto rendimiento. Le apasiona Go y los sistemas distribuidos.',
      'pt-br': 'Engenheiro backend focado em construir APIs e sistemas confiáveis e de alto desempenho. Apaixonado por Go e sistemas distribuídos.',
    },
    skills: ['Go', 'Python', 'PostgreSQL', 'Docker', 'REST APIs', 'Distributed Systems'],
    github: 'https://github.com/Jibaru',
    linkedin: 'https://www.linkedin.com/in/ignacior97/',
    joinedYear: 2024,
  },
  {
    username: 'cuevaio',
    name: 'Anthony Cueva',
    position: 'Product Engineer',
    location: 'Lima, Peru',
    photoUrl: '/team/cueva.webp',
    bio: {
      en: 'Product engineer building full-stack applications. Focused on shipping fast and learning in public. Co-builder of text0, winner of the Next.js Hackathon 2025.',
      es: 'Ingeniero de producto construyendo aplicaciones full-stack. Enfocado en shipear rápido y aprender en público. Co-creador de text0, ganador del Next.js Hackathon 2025.',
      'pt-br': 'Engenheiro de produto construindo aplicações full-stack. Focado em fazer ship rápido e aprender em público. Co-criador do text0, vencedor do Next.js Hackathon 2025.',
    },
    skills: ['Next.js', 'TypeScript', 'PostgreSQL', 'Vercel', 'React', 'Astro'],
    github: 'https://github.com/cuevaio',
    linkedin: 'https://linkedin.com/in/cuevaio',
    x: 'https://x.com/cuevaio',
    website: 'https://www.cueva.io',
    instagram: "https://www.instagram.com/cueva.io",
    projects: ['text0', 'lupa'],
    cal: "https://cal.com/cuevaio/30min",
    joinedYear: 2023,
  },
  {
    username: 'liz',
    name: 'Liz Riveros',
    position: 'Project Manager',
    location: 'Lima, Peru',
    photoUrl: '/team/liz.webp',
    bio: {
      en: 'Project manager who keeps the team aligned, the roadmap honest, and the shipping cadence high. Brings structure to chaos without slowing things down.',
      es: 'Project manager que mantiene al equipo alineado, el roadmap honesto y el ritmo de shipeo alto. Aporta estructura al caos sin frenar las cosas.',
      'pt-br': 'Gerente de projetos que mantém a equipe alinhada, o roadmap honesto e o ritmo de ship alto. Traz estrutura ao caos sem desacelerar as coisas.',
    },
    skills: ['Project Management', 'Agile', 'Scrum', 'Leadership', 'Communication', 'Notion'],
    linkedin: 'https://www.linkedin.com/in/lizethriveros/',
    joinedYear: 2024,
  },
  {
      username: 'tarmeno',
      name: 'Carlos Tarmeño',
      position: 'Frontend Engineer',
      location: 'Lima, Peru',
      photoUrl: '/team/tarmeno.webp',
      bio: {
        en: 'Frontend engineer who cares deeply about craft and user experience. Builds polished, accessible interfaces and loves the intersection of design and code.',
        es: 'Ingeniero frontend que se preocupa profundamente por el oficio y la experiencia del usuario. Construye interfaces pulidas y accesibles y ama la intersección del diseño y el código.',
        'pt-br': 'Engenheiro frontend que se preocupa profundamente com o ofício e a experiência do usuário. Constrói interfaces polidas e acessíveis e ama a interseção entre design e código.',
      },
      skills: ['React', 'TypeScript', 'Next.js', 'CSS', 'JavaScript', 'Accessibility'],
      github: 'https://github.com/carlosdtn',
      linkedin: 'https://www.linkedin.com/in/carlos-tarmeno/',
      website: 'https://www.carlostarmeno.com/',
      joinedYear: 2024,
    },
    {
      username: 'edward',
      name: 'Edward Ramos',
      position: 'Frontend Engineer',
      location: 'Lima, Peru',
      photoUrl: '/team/edward.webp',
      bio: {
        en: 'Frontend engineer passionate about building interactive and visually engaging web experiences. Contributor to the elements component library.',
        es: 'Ingeniero frontend apasionado por construir experiencias web interactivas y visualmente atractivas. Contribuidor de la librería de componentes elements.',
        'pt-br': 'Engenheiro frontend apaixonado por construir experiências web interativas e visualmente envolventes. Contribuidor da biblioteca de componentes elements.',
      },
      skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Animation', 'Web APIs'],
      github: 'https://github.com/EdwardR0507',
      linkedin: 'https://www.linkedin.com/in/edwardramosvillarreal/',
      projects: ['elements'],
      joinedYear: 2024,
    },
];
