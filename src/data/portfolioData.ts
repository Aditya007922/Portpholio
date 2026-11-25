export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: 'Full-Stack' | 'AI / Vision' | 'Civic Tech';
  description: string;
  architectureHighlights: string[];
  techStack: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
  metricsLabel: string;
}

export interface MetricItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
  detail: string;
}

export interface CredentialItem {
  number: string;
  title: string;
  issuer: string;
  periodOrScore: string;
  summary: string;
  highlights: string[];
}

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  skills: string[];
}

export interface TechTile {
  name: string;
  categoryId: string;
  abbr: string;
  focus: string;
}

export const METRICS: MetricItem[] = [
  {
    id: 'builds',
    value: 3,
    suffix: '+',
    label: 'Full-Stack, AI & Civic Flagship Builds',
    detail: 'End-to-end production-minded systems across web, computer vision & civic platforms',
  },
  {
    id: 'frameworks',
    value: 10,
    suffix: '+',
    label: 'Core Languages & Modern Frameworks',
    detail: 'React.js, Node.js, Java, Python, OpenCV, MongoDB, MySQL & Express.js',
  },
  {
    id: 'certs',
    value: 4,
    suffix: '+',
    label: 'Industry & Academic Certifications (92% NPTEL Elite)',
    detail: 'Verified credentials from NPTEL, Oracle Academy, Udemy & NASSCOM',
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'unitrans',
    number: '01',
    title: 'UniTrans',
    subtitle: 'Smart Transport & Logistics Platform',
    category: 'Full-Stack',
    description:
      'Full-stack web application streamlining transportation and logistics management with real-time route tracking, live information updates, and responsive user interfaces.',
    architectureHighlights: [
      'RESTful Node.js & Express.js API layer handling fleet schedules, route dispatch, and live status synchronization.',
      'MongoDB document schemas structured for fast route lookups, shipment logs, and commuter/operator records.',
      'Responsive React.js client interface engineered for clear route visibility across desktop and mobile viewports.',
    ],
    techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'HTML/CSS', 'JavaScript', 'Git'],
    image: '/src/assets/images/project_unitrans_logistics_1795602782269.jpg',
    liveUrl: '#project-unitrans-demo',
    githubUrl: 'https://github.com',
    metricsLabel: 'MERN Stack · Live Route Sync',
  },
  {
    id: 'classguard',
    number: '02',
    title: 'ClassGuard',
    subtitle: 'AI-Based Monitoring System',
    category: 'AI / Vision',
    description:
      'Real-time computer vision monitoring system analyzing live video streams for face detection, gaze tracking, activity recognition, and ambient noise levels on an interactive analytics dashboard.',
    architectureHighlights: [
      'Low-latency OpenCV frame processing pipeline executing concurrent face detection and gaze orientation vectors.',
      'Activity recognition state classifier paired with ambient acoustic level sampling for holistic classroom telemetry.',
      'Interactive analytics dashboard visualizing attention trends, engagement anomalies, and session timelines.',
    ],
    techStack: ['Python', 'OpenCV', 'Computer Vision', 'AI Analytics'],
    image: '/src/assets/images/project_classguard_vision_1795602782265.jpg',
    liveUrl: '#project-classguard-demo',
    githubUrl: 'https://github.com',
    metricsLabel: 'Real-Time CV · Multi-Signal Dashboard',
  },
  {
    id: 'loaksudhar',
    number: '03',
    title: 'LoakSudhar',
    subtitle: 'Civic Issue & Public Resolution App',
    category: 'Civic Tech',
    description:
      'Full-stack civic engagement platform empowering citizens to report local infrastructure issues, attach geo-tagged evidence, upvote community priorities, and track live municipal resolution status.',
    architectureHighlights: [
      'Interactive citizen reporting workflow with geo-tagged issue pins, category routing, and image evidence uploads.',
      'Node.js & Express.js REST APIs with MongoDB indexing for real-time status tracking and transparent resolution logs.',
      'Community priority upvoting and responsive administrative dashboard streamlining local governance.',
    ],
    techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'JavaScript'],
    image: '/src/assets/images/project_loaksudhar_civic_1795604575931.jpg',
    liveUrl: '#project-loaksudhar-demo',
    githubUrl: 'https://github.com',
    metricsLabel: 'Civic Platform · Geo-Tagged Tracking',
  },
];

export const CREDENTIALS: CredentialItem[] = [
  {
    number: '01',
    title: 'NPTEL Elite Certification (92% Score)',
    issuer: 'NPTEL · Education for Sustainable Development',
    periodOrScore: '92% Elite',
    summary:
      'Awarded Elite distinction with a 92% consolidated score for excellence in Education for Sustainable Development.',
    highlights: [
      'Top-tier national examination performance across continuous assignments and proctored evaluation.',
      'Applied systems-thinking frameworks to sustainable technology and engineering practices.',
    ],
  },
  {
    number: '02',
    title: 'Frontend & Backend Development Bootcamp',
    issuer: 'Sharda University',
    periodOrScore: 'May – June 2025',
    summary:
      'Intensive full-stack engineering bootcamp focused on modern web architectures, REST API design, database integration, and Java problem solving.',
    highlights: [
      'Built responsive React.js web applications with component-driven state management.',
      'Engineered Node.js and Express.js REST APIs backed by MongoDB schemas.',
      'Strengthened algorithmic problem-solving and Data Structures & Algorithms in Java.',
    ],
  },
  {
    number: '03',
    title: 'Oracle Academy Certification',
    issuer: 'Oracle Academy · Java Fundamentals',
    periodOrScore: 'Verified Credential',
    summary:
      'Completed formal certification in Java Fundamentals, covering object-oriented design, classes, inheritance, and core JVM concepts.',
    highlights: [
      'Mastered object-oriented programming principles, encapsulation, polymorphism, and exception handling.',
      'Built modular Java foundations supporting competitive DSA and backend application engineering.',
    ],
  },
  {
    number: '04',
    title: '100 Days of Code: The Complete Python Pro Bootcamp',
    issuer: 'Udemy',
    periodOrScore: 'Aug 2024',
    summary:
      'Comprehensive project-based Python engineering curriculum covering OOP, data structures, workflow automation, and web backends.',
    highlights: [
      'Authored Python automation scripts, API consumers, and modular OOP applications.',
      'Applied Python data structures and scripting foundations directly to OpenCV computer vision work.',
    ],
  },
  {
    number: '05',
    title: 'Software Product Developer Certification',
    issuer: 'Skill India & NASSCOM',
    periodOrScore: 'Industry Certified',
    summary:
      'National industry-aligned certification validating end-to-end software product development lifecycle practices.',
    highlights: [
      'Validated competencies in software engineering workflows, requirement breakdown, and quality delivery.',
      'Aligned with NASSCOM FutureSkills industry standards for software product roles.',
    ],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'languages',
    name: 'Programming Languages',
    description: 'Core languages for algorithms, backend logic, scripting, and embedded systems.',
    skills: ['Java', 'Python', 'JavaScript', 'C'],
  },
  {
    id: 'frontend',
    name: 'Frontend Development',
    description: 'Component-driven interfaces with crisp responsiveness and fluid interactions.',
    skills: ['React.js', 'HTML5', 'CSS3', 'Bootstrap', 'Responsive UI'],
  },
  {
    id: 'backend',
    name: 'Backend & APIs',
    description: 'Scalable server logic, middleware orchestration, and clean REST contracts.',
    skills: ['Node.js', 'Express.js', 'REST APIs'],
  },
  {
    id: 'databases',
    name: 'Databases',
    description: 'Document and relational modeling with disciplined CRUD & query optimization.',
    skills: ['MongoDB', 'MySQL', 'CRUD & Query Optimization'],
  },
  {
    id: 'core',
    name: 'Core CS & Tools',
    description: 'Algorithmic foundations, computer vision, connected hardware, and version control.',
    skills: [
      'Data Structures & Algorithms (Arrays, Linked Lists, Stacks, Queues, Trees, Graphs)',
      'OpenCV',
      'Arduino / IoT',
      'Git & GitHub',
    ],
  },
];

export const TECH_TILES: TechTile[] = [
  { name: 'React.js', categoryId: 'frontend', abbr: 'RE', focus: 'UI Architecture' },
  { name: 'JavaScript', categoryId: 'languages', abbr: 'JS', focus: 'ES6+ & Async' },
  { name: 'Java', categoryId: 'languages', abbr: 'JV', focus: 'OOP & DSA' },
  { name: 'Python', categoryId: 'languages', abbr: 'PY', focus: 'AI & Automation' },
  { name: 'Node.js', categoryId: 'backend', abbr: 'ND', focus: 'Runtime' },
  { name: 'Express.js', categoryId: 'backend', abbr: 'EX', focus: 'REST Services' },
  { name: 'MongoDB', categoryId: 'databases', abbr: 'MG', focus: 'NoSQL Store' },
  { name: 'MySQL', categoryId: 'databases', abbr: 'SQ', focus: 'Relational DB' },
  { name: 'OpenCV', categoryId: 'core', abbr: 'CV', focus: 'Vision Pipeline' },
  { name: 'Arduino / IoT', categoryId: 'core', abbr: 'IO', focus: 'Sensors & Cloud' },
  { name: 'HTML5 / CSS3', categoryId: 'frontend', abbr: 'H5', focus: 'Semantic Layout' },
  { name: 'Bootstrap', categoryId: 'frontend', abbr: 'BS', focus: 'Grid Systems' },
  { name: 'C Language', categoryId: 'languages', abbr: 'C', focus: 'Systems Core' },
  { name: 'DSA', categoryId: 'core', abbr: 'DS', focus: 'Trees & Graphs' },
  { name: 'REST APIs', categoryId: 'backend', abbr: 'AP', focus: 'JSON Contracts' },
  { name: 'Git & GitHub', categoryId: 'core', abbr: 'GT', focus: 'Version Control' },
];
