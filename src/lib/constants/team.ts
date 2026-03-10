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
        en: "Name it and I'll learn it. Design engineer building across web, videogames and research. Building products where neuroscience meets user experience. Founder of Glitch Girls and organizer of #SheShips, empowering women across LATAM to build and ship.",
        es: 'Nómbralo y lo aprenderé. Ingeniera de diseño construyendo en web, videojuegos e investigación. Construyendo productos donde la neurociencia se encuentra con la experiencia de usuario. Fundadora de Glitch Girls y organizadora de #SheShips, empoderando a mujeres en LATAM para construir y hacer ship.',
        'pt-br': 'Diga o nome e eu aprenderei. Engenheira de design construindo na web, videogames e pesquisa. Construindo produtos onde a neurociência encontra a experiência do usuário. Fundadora do Glitch Girls e organizadora do #SheShips, empoderando mulheres no LATAM para construir e fazer ship.',
      },
      skills: ['UI/UX Design', 'React', 'Figma', 'TypeScript', 'Astro', 'Accessibility'],
      github: 'https://github.com/shiarauzo',
      linkedin: 'https://www.linkedin.com/in/shiara-arauzo/',
      instagram: 'https://www.instagram.com/shiaraarauzo/',
      website: 'https://shiara.design',
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
      github: 'https://github.com/estparcae',
      linkedin: 'https://www.linkedin.com/in/ed-pardo/',
      website: 'https://emmy-pardo.vercel.app',
      cal: 'https://cal.com/emms-pardo/30min',
      joinedYear: 2025,
  },
  {
      username: 'nicolas',
      name: 'Nicolas Vargas',
      position: 'Backend Developer',
      location: 'Bogotá, Colombia',
      photoUrl: '/team/nicolas.svg',
      bio: {
        en: 'Backend developer focused on cloud and AI-driven solutions. Specializes in serverless technologies, cloud architecture, and building scalable, high-performance applications with clean abstractions.',
        es: 'Desarrollador backend enfocado en soluciones cloud e impulsadas por IA. Especializado en tecnologías serverless, arquitectura cloud y construcción de aplicaciones escalables y de alto rendimiento con abstracciones limpias.',
        'pt-br': 'Desenvolvedor backend focado em soluções cloud e orientadas por IA. Especializado em tecnologias serverless, arquitetura cloud e construção de aplicações escaláveis e de alto desempenho com abstrações limpas.',
      },
      skills: ['Go', 'TypeScript', 'AWS', 'SST', 'Docker', 'Kubernetes'],
      github: 'https://github.com/MrUprizing',
      x: 'https://x.com/MrUprizing',
      website: 'https://uprizing.me/',
      cal: "https://cal.com/uprizing/30min",
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
    cal: "https://cal.com/irueda/30min",
    joinedYear: 2024,
  },
  {
    username: 'cuevaio',
    name: 'Anthony Cueva',
    position: 'Product Engineer',
    location: 'Somewhere in the world',
    photoUrl: '/team/cueva.webp',
    bio: {
      en: 'Product engineer obsessed with shipping and building in public. Self-taught software engineer currently working at a crypto startup. Organizes IRL events to spread the shipping culture across LATAM and is on a mission to grow the Crafter Station community. Can help with career advice and shipping products. Also learning to create content — and doing push-ups every single day.',
      es: 'Ingeniero de producto obsesionado con shipear y construir en público. Ingeniero de software autodidacta trabajando actualmente en una startup de cripto. Organiza eventos IRL para difundir la cultura del shipeo en LATAM y tiene la misión de hacer crecer la comunidad de Crafter Station. Puede ayudar con consejos de carrera y shipeo de productos. También aprendiendo a crear contenido — y haciendo flexiones todos los días.',
      'pt-br': 'Engenheiro de produto obcecado em fazer ship e construir em público. Engenheiro de software autodidata trabalhando atualmente em uma startup de cripto. Organiza eventos presenciais para espalhar a cultura do ship pelo LATAM e tem a missão de fazer crescer a comunidade da Crafter Station. Pode ajudar com conselhos de carreira e ship de produtos. Também aprendendo a criar conteúdo — e fazendo flexões todos os dias.',
    },
    skills: ['Next.js', 'TypeScript', 'PostgreSQL', 'Vercel', 'React', 'Astro', 'Content Creation', 'Career Advice'],
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
