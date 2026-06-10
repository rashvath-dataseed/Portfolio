export type ContentStatus = "draft" | "published" | "archived";

export interface BaseEntity {
  id: string;
  status: ContentStatus;
  updatedAt: string;
  publishedAt?: string;
}

export interface PersonalInfo {
  fullName: string;
  designation: string;
  shortBio: string;
  aboutMe: string;
  location: string;
  email: string;
  phone: string;
  linkedinUrl: string;
  githubUrl: string;
  twitterUrl: string;
  resumeUrl: string;
  profilePicture: string;
}

export interface Project extends BaseEntity {
  title: string;
  description: string;
  techStack: string[];
  projectImage: string;
  liveUrl: string;
  githubUrl: string;
  startDate: string;
  endDate: string;
  featured: boolean;
  displayOrder: number;
}

export interface Skill extends BaseEntity {
  name: string;
  proficiency: number;
  category: string;
  icon: string;
  displayOrder: number;
}

export interface Experience extends BaseEntity {
  companyName: string;
  role: string;
  duration: string;
  location: string;
  description: string;
  technologiesUsed: string[];
}

export interface Certification extends BaseEntity {
  certificateName: string;
  issuingOrganization: string;
  issueDate: string;
  credentialUrl: string;
  certificateImage: string;
}

export interface Education extends BaseEntity {
  institutionName: string;
  degree: string;
  specialization: string;
  duration: string;
  grade: string;
}

export interface Testimonial extends BaseEntity {
  name: string;
  designation: string;
  company: string;
  feedback: string;
  profileImage: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  linkedIn: string;
  github: string;
  twitterX: string;
  portfolioUrl: string;
}

export interface PortfolioSettings {
  darkModeDefault: boolean;
  portfolioTheme: string;
  primaryColor: string;
  secondaryColor: string;
  seoTitle: string;
  seoDescription: string;
  openGraphImage: string;
}

export interface PortfolioAnalytics {
  portfolioVisits: number;
  resumeDownloads: number;
  contactFormSubmissions: number;
  projectViews: Record<string, number>;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  projects: Project[];
  skills: Skill[];
  experience: Experience[];
  certifications: Certification[];
  education: Education[];
  testimonials: Testimonial[];
  contactInfo: ContactInfo;
  settings: PortfolioSettings;
  analytics: PortfolioAnalytics;
  contactSubmissions: ContactSubmission[];
  lastUpdated: string;
}
