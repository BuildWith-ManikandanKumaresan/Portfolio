import { Injectable } from '@angular/core';
import {
  Certification,
  Competency,
  ContactLink,
  EducationItem,
  ExperienceItem,
  NavItem,
  Profile,
  ProjectCard,
  SkillGroup,
} from '../models/resume.model';

/**
 * Single source of truth for all portfolio content.
 * Data is sourced directly from the resume so the UI stays in lock-step with it.
 * Exposed as readonly arrays — components only render, never mutate.
 */
@Injectable({ providedIn: 'root' })
export class ResumeDataService {
  readonly profile: Profile = {
    name: 'Manikandan Kumaresan',
    role: 'Advanced Back-End Software Engineer',
    location: 'Chennai, India',
    email: 'manikandan24may@gmail.com',
    phone: '+918973343353',
    phoneDisplay: '+91 89733 43353',
    linkedin: 'https://linkedin.com/in/manikandan-kumaresan',
    github: 'https://github.com/BuildWith-ManikandanKumaresan',
    portfolio: 'https://manikandan.in',
    yearsOfExperience: 11,
    resumeFile: 'assets/Manikandan_Kumaresan_Resume.pdf',
    summary:
      "Hi there! I'm a software engineer who genuinely enjoys building things that " +
      'make a difference. I love turning complex problems into clean, reliable, and ' +
      'well-crafted solutions — and I care just as much about how something is built ' +
      'as what it does. I thrive on continuous learning, thoughtful design, and ' +
      'collaborating with great people. Always curious, always improving, and always ' +
      'excited for the next challenge.',
  };

  /** Animated rotating roles for the hero typing effect. */
  readonly heroRoles: readonly string[] = [
    'Advanced Back-End Software Engineer',
    'Microservices & Distributed Systems Architect',
    'C# / .NET Specialist',
    'Event-Driven & CQRS Practitioner',
    'Generative AI Certified Engineer',
  ];

  readonly competencies: readonly Competency[] = [
    { label: 'System Design', icon: '🧩' },
    { label: 'Microservices', icon: '🧱' },
    { label: 'Event-Driven Architecture', icon: '⚡' },
    { label: 'CQRS', icon: '🔀' },
    { label: 'Domain-Driven Design', icon: '🎯' },
    { label: 'Distributed Systems', icon: '🌐' },
    { label: 'REST API Design', icon: '🔌' },
    { label: 'Async Programming', icon: '⏱️' },
    { label: 'Performance Optimization', icon: '🚀' },
    { label: 'SOLID Principles', icon: '📐' },
    { label: 'CI/CD & DevOps', icon: '♻️' },
    { label: 'Generative AI / LLMs', icon: '🤖' },
  ];

  readonly skillGroups: readonly SkillGroup[] = [
    {
      category: 'Languages & Frameworks',
      icon: '💻',
      skills: [
        'C#',
        '.NET (Core, 6, 8)',
        'ASP.NET Core Web API',
        'TypeScript',
        'JavaScript',
        'HTML5',
        'CSS',
        'PowerShell',
        'T-SQL',
      ],
    },
    {
      category: 'Frontend',
      icon: '🎨',
      skills: ['Angular 12 / 16', 'RxJS', 'Component Architecture'],
    },
    {
      category: 'Databases',
      icon: '🗄️',
      skills: ['Microsoft SQL Server', 'Redis'],
    },
    {
      category: 'Patterns & Libraries',
      icon: '📚',
      skills: [
        'CQRS (MediatR)',
        'Chain-of-Responsibility',
        'Repository / DAO',
        'Dependency Injection',
        'Plugin Architecture',
        'Entity Framework Core',
        'ADO.NET',
      ],
    },
    {
      category: 'Messaging & Real-Time',
      icon: '📡',
      skills: ['RabbitMQ', 'ActiveMQ', 'SignalR'],
    },
    {
      category: 'Cloud & DevOps',
      icon: '☁️',
      skills: ['Docker', 'Kubernetes', 'Jenkins', 'CI/CD Pipelines', 'Git', 'Perforce'],
    },
    {
      category: 'Testing',
      icon: '🧪',
      skills: ['NUnit', 'Moq', 'Selenium', 'JMeter'],
    },
    {
      category: 'AI',
      icon: '🤖',
      skills: ['Generative AI', 'LLMs', 'Prompt Engineering', 'AI-Assisted Development'],
    },
  ];

  readonly experience: readonly ExperienceItem[] = [
    {
      company: 'Light & Wonder Inc.',
      title: 'Advanced Back-End Software Engineer',
      period: 'Dec 2019 – Present',
      start: 'Dec 2019',
      end: 'Present',
      location: 'Chennai, India',
      current: true,
      products: [
        'iView Content Engine (ICE)',
        'Systems Deployment Platform (SDP)',
        'Power Progressive Multisite (PPM)',
        'Tableview',
        'MCC Boss Gateway',
      ],
      highlights: [
        'Designed and built the iView Content Engine (ICE), automating enterprise configuration deployments across US, Europe and APAC, reducing cycle time by 70% (5–7 days to 2–3 hours).',
        'Enabled self-service configuration management for non-technical users with built-in governance (approval workflows, compliance tracking) and seamless Perforce + JIRA integration.',
        'Designed and built the Systems Deployment Platform (SDP): a generic, reusable, centralized desktop solution driven by dynamic questionnaires, eliminating external infrastructure dependencies.',
        'Led the migration of PPM 16.0 from legacy .NET Framework to .NET 6.0, paying down years of technical debt and unblocking future feature work.',
        'Optimized Web API and microservice hot paths, delivering 25–30% faster response times for 24/7 casino operations and reducing infrastructure cost.',
        'Expanded the Tableview product into European markets (France) through MCC platform integration, opening a new revenue stream.',
        'Launched Floor View — a real-time pit and table management feature — improving operational visibility for casino floor managers.',
        'Established an automated testing framework (NUnit, Moq, Selenium) achieving 80%+ coverage and cutting regression QA effort significantly.',
        'Implemented a cashless payment system for Tableview Legacy, enhancing user experience and reducing transaction friction.',
        'Mentored junior engineers and codified architectural patterns and coding standards that raised team productivity and code consistency.',
      ],
    },
    {
      company: 'Syncfusion Software Pvt. Ltd.',
      title: 'Software Engineer — Level 3',
      period: 'Sep 2015 – Nov 2019',
      start: 'Sep 2015',
      end: 'Nov 2019',
      location: 'Chennai, India',
      current: false,
      products: ['ODBC SDK Driver', 'ODBC SQL Engine', 'Big Data Cluster Manager', 'BOLD-BI Dashboard Designer'],
      highlights: [
        'Architected and launched the ODBC SDK Driver from concept to release, enabling real-time data integration with Excel, Power BI, Tableau, Qlik and BOLD-BI.',
        'Designed the ODBC SQL Engine — a query-execution framework translating standard SQL into queries against NoSQL sources (MongoDB, Google BigQuery, Elasticsearch, OData) — bridging a long-standing gap for enterprise BI users.',
        'Added enterprise authentication (OAuth 2.0, Kerberos) to the ODBC ecosystem to meet customer compliance and security requirements.',
        'Led analysis and architectural design for 5+ major product enhancements, turning customer needs into clear technical specifications.',
        'Led proof-of-concept initiatives and architectural design reviews, translating complex requirements into scalable product specifications.',
        'Owned root-cause analysis for critical production issues, improving reliability and reducing support escalations.',
        'Ran code reviews and technical mentoring, establishing coding standards adopted across the engineering team.',
      ],
    },
  ];

  /**
   * Personal / open-source projects. Intentionally empty for now — to be populated
   * with GitHub-linked projects in the future. The Projects section renders a
   * friendly "coming soon" state while this is empty.
   */
  readonly projects: readonly ProjectCard[] = [];

  readonly education: readonly EducationItem[] = [
    {
      degree: 'M.Sc., Information Technology',
      institution: 'Bharathiar University — Dr. N.G.P. Arts & Science College, Coimbatore',
      period: '2013 – 2015',
    },
    {
      degree: 'B.Sc., Information Technology',
      institution: 'Bharathiar University — Parks College of Arts & Science, Tiruppur',
      period: '2010 – 2013',
    },
  ];

  readonly certifications: readonly Certification[] = [
    { title: 'Claude Code in Action', issuer: 'Anthropic', year: '2026' },
    { title: 'Claude 101 — Certificate of Completion', issuer: 'Anthropic', year: '2026' },
    { title: '.NET Core Microservices: The Complete Guide (.NET 8 MVC)', issuer: 'Udemy', year: '2025' },
  ];

  readonly navItems: readonly NavItem[] = [
    { id: 'home', label: 'Home' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  /** Contact / footer links with inline SVG icon keys resolved in the template. */
  get contactLinks(): readonly ContactLink[] {
    return [
      {
        label: 'Email',
        value: this.profile.email,
        href: `mailto:${this.profile.email}`,
        icon: 'mail',
        external: false,
      },
      {
        label: 'Phone',
        value: this.profile.phoneDisplay,
        href: `tel:${this.profile.phone}`,
        icon: 'phone',
        external: false,
      },
      {
        label: 'LinkedIn',
        value: 'in/manikandan-kumaresan',
        href: this.profile.linkedin,
        icon: 'linkedin',
        external: true,
      },
      {
        label: 'GitHub',
        value: 'BuildWith-ManikandanKumaresan',
        href: this.profile.github,
        icon: 'github',
        external: true,
      },
    ];
  }
}
