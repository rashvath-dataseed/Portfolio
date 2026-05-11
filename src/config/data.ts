import {
  Code2,
  Layout,
  Server,
  GitBranch,
  Globe,
  Layers,
  ShieldCheck,
  Paintbrush,
  Terminal,
  type LucideIcon,
} from 'lucide-react';

/* ─── Types ─── */
export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: 'github' | 'linkedin' | 'email' | 'phone';
}

export interface SkillCategory {
  title: string;
  icon: LucideIcon;
  skills: string[];
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  description: string[];
}

export interface Project {
  title: string;
  techStack: string;
  description: string;
  liveUrl?: string;
  tags: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
  avatar?: string;
}

/* ─── Site Config ─── */
export const siteConfig = {
  name: 'Rashvath Shetty',
  title: 'Software Developer',
  location: 'Bangalore, Karnataka, India',
  email: 'rashvathshetty4@gmail.com',
  phone: '+91 9148050368',
  resumeUrl: '#',
};

/* ─── Navigation ─── */
export const navLinks: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];

/* ─── Social Links ─── */
export const socialLinks: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/rashvath', icon: 'github' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/rashvath-shetty-507438286', icon: 'linkedin' },
  { label: 'Email', href: 'mailto:rashvathshetty4@gmail.com', icon: 'email' },
];

/* ─── About ─── */
export const aboutData = {
  heading: 'About Me',
  paragraphs: [
    'I am a Software Developer at Ekfrazo Technologies, where I build scalable, high-quality frontend solutions using React, Next.js, and TypeScript. I started as an intern in February 2025 and earned a full-time role through consistent delivery and strong technical contributions.',
    'My work centers on designing reusable component architectures, implementing type-safe form handling with Zod, and integrating REST APIs for seamless real-time interactions. I have contributed to production-grade modules including Card Dispatch, Incident Tracking, and Booking Verification systems.',
    'I thrive in collaborative Agile environments and am passionate about writing clean, maintainable code that solves real problems. I am always looking to grow, take on new challenges, and contribute to impactful engineering work.',
  ],
  stats: [
    // { label: 'Months of Experience', value: '15+' },
    // { label: 'Projects Delivered', value: '6+' },
    // { label: 'Technologies Used', value: '12+' },
  ],
};

/* ─── Skills ─── */
export const skillCategories: SkillCategory[] = [
  {
    title: 'Languages',
    icon: Code2,
    skills: ['JavaScript', 'TypeScript', 'HTML5', 'CSS3'],
  },
  {
    title: 'Frameworks & Libraries',
    icon: Layers,
    skills: ['React', 'Next.js', 'Tailwind CSS', 'Redux', 'Chart.js', 'Zod'],
  },
  {
    title: 'Tools & Platforms',
    icon: Terminal,
    skills: ['Git', 'GitHub', 'VS Code', 'Vercel', 'Clerk', 'Sitefinity'],
  },
  {
    title: 'Frontend Architecture',
    icon: Layout,
    skills: ['Component Reusability', 'Responsive Design', 'Form Validation', 'State Management'],
  },
  {
    title: 'API & Integration',
    icon: Server,
    skills: ['REST APIs', 'Real-time Data Handling', 'Third-party Integrations'],
  },
  {
    title: 'Workflow',
    icon: GitBranch,
    skills: ['Agile & Scrum', 'Code Reviews', 'Version Control', 'Debugging'],
  },
];

/* ─── Experience ─── */
export const experiences: Experience[] = [
  {
    role: 'Software Developer',
    company: 'Ekfrazo Technologies Pvt. Ltd.',
    location: 'Remote',
    period: 'Feb 2025 - Present',
    type: 'Full-time',
    description: [
      'Recruited as a Software Developer Intern (Feb 2025 - Sep 2025) and offered a full-time role based on strong performance and consistent contributions.',
      'Developed and integrated reusable React and Next.js components, improving UI consistency and reducing development effort across modules.',
      'Designed dynamic, role-based UI components including tables and forms to support scalable and reusable frontend architecture.',
      'Implemented Zod-based validation to ensure structured, type-safe, and secure form handling.',
      'Built responsive user interfaces using Tailwind CSS, ensuring smooth performance across devices.',
      'Integrated REST APIs to enable real-time data handling and seamless user interactions.',
      'Contributed to key modules such as Card Dispatch, Incident Tracking, and Booking Verification systems.',
      'Configured and customized Sitefinity CMS for a banking client, including custom content types and taxonomies.',
      'Worked with Git for version control, following proper branching practices, raising pull requests, and participating in code reviews.',
      'Collaborated in an Agile environment, working closely with cross-functional teams to deliver features efficiently.',
    ],
  },
];

/* ─── Education ─── */
export const education = [
  {
    institution: 'Dr. BB Hegde First Grade College, Kundapura',
    university: 'Mangalore University',
    degree: 'Bachelor of Computer Applications (BCA)',
    grade: 'CGPA: 6.25',
    period: '2021 - 2024',
  },
  {
    institution: 'Seshadripuram PU College, Yelahanka, Bangalore',
    degree: 'Pre-University (PU)',
    grade: 'Percentage: 69%',
    period: '2019 - 2021',
  },
];

/* ─── Projects ─── */
export const projects: Project[] = [
  {
    title: 'E-commerce App',
    techStack: 'React, Redux, Tailwind CSS',
    description:
      'Full-featured online store with product filtering, cart management, and checkout functionality. Built with a scalable component architecture and global state management using Redux.',
    liveUrl: 'https://ecommerce-theta-tan-34.vercel.app',
    tags: ['React', 'Redux', 'Tailwind CSS'],
  },
  {
    title: 'Crypto Tracker',
    techStack: 'Next.js, CoinGecko API, Chart.js, Clerk Auth',
    description:
      'Real-time cryptocurrency price tracking application featuring interactive charts, Clerk authentication, and a personalized wishlist. Integrated with CoinGecko API for live market data.',
    liveUrl: 'https://crypto-git-main-rashvaths-projects.vercel.app',
    tags: ['Next.js', 'Chart.js', 'Clerk', 'API'],
  },
  {
    title: 'WeatherNow',
    techStack: 'React, Weather API, Tailwind CSS',
    description:
      'Live weather updates application with animated, location-aware responsive UI. Provides current conditions, forecasts, and dynamic visual feedback based on weather data.',
    liveUrl: 'https://rashvath.github.io/WeatherNow',
    tags: ['React', 'API', 'Tailwind CSS'],
  },
];

/* ─── Certifications ─── */
export const certifications: Certification[] = [
  {
    title: 'Introduction to Frontend Development',
    issuer: 'SimpliLearn',
    date: 'May 2025',
  },
  {
    title: 'React JS Bootcamp',
    issuer: 'LetsUpgrade',
    date: 'Apr 2025',
  },
  {
    title: 'React JS for Beginners',
    issuer: 'SimpliLearn',
    date: 'May 2025',
  },
];

/* ─── Testimonials ─── */
export const testimonials: Testimonial[] = [
  {
    name: 'Team Lead',
    role: 'Engineering Lead',
    company: 'Ekfrazo Technologies',
    text: 'Rashvath consistently delivers clean, well-structured code. His ability to build reusable components and quickly adapt to new requirements makes him a valuable addition to any development team.',
  },
  {
    name: 'Project Manager',
    role: 'Project Manager',
    company: 'Ekfrazo Technologies',
    text: 'A dependable developer who communicates effectively and meets deadlines. Rashvath contributed significantly to our frontend modules and was a strong collaborator during sprint cycles.',
  },
];
