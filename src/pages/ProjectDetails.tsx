import { useEffect, useMemo, type ComponentType } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Code2,
  Database,
  ExternalLink,
  FolderCog,
  Globe,
  Layers3,
  Server,
  Star,
  Wrench,
} from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import FloatingParticlesCanvas from "../components/ui/FloatingParticlesCanvas";
import GradientBlobs from "../components/ui/GradientBlobs";
import { usePublishedPortfolioData } from "../context/PortfolioContext";
import { getProjectDetailsPath, getProjectSlug } from "../lib/projectRouting";

type IconType = ComponentType<{ size?: number; className?: string }>;

type ModuleItem = {
  title: string;
  description: string;
  icon: IconType;
  accent: "blue" | "purple" | "cyan" | "green" | "amber" | "pink";
};

type ContributionItem = {
  title: string;
  icon: IconType;
  points: string[];
};

type CaseStudyPreset = {
  category: string;
  role: string;
  architecture: string;
  domain: string;
  type: string;
  overview: string;
  modules: ModuleItem[];
  contributions: ContributionItem[];
  architectureNodes: string[];
  techPills: string[];
};

const caseStudyPresets: Record<string, CaseStudyPreset> = {
  "au-forex-frontend": {
    category: "AU BANK",
    role: "Software Developer",
    architecture: "Next.js App Router",
    domain: "FinTech / Forex",
    type: "Enterprise Application",
    overview:
      "Contributed to a production-grade Next.js and TypeScript application powering multi-currency forex transactions, onboarding flows, secure sessions, and real-time currency operations.",
    modules: [
      {
        title: "Forex Transactions",
        description: "Buy, sell, and reload flows with multi-currency support and transaction details.",
        icon: Layers3,
        accent: "blue",
      },
      {
        title: "Customer Onboarding",
        description: "Structured customer, travel, and FATCA flows with validation-first forms.",
        icon: Star,
        accent: "purple",
      },
      {
        title: "Document Management",
        description: "Upload, compression, validation, preview, and re-upload workflows.",
        icon: FolderCog,
        accent: "amber",
      },
      {
        title: "Authentication",
        description: "OTP validation, session middleware, and protected route security.",
        icon: Server,
        accent: "cyan",
      },
      {
        title: "Transaction Management",
        description: "Receipts, refunds, status tracking, and confirmation PDF handling.",
        icon: Database,
        accent: "green",
      },
      {
        title: "Forex Rates",
        description: "Discounted rates, charges breakdown, and conversion logic.",
        icon: Globe,
        accent: "pink",
      },
    ],
    contributions: [
      {
        title: "API & Data Layer",
        icon: Database,
        points: [
          "Integrated REST APIs with Axios interceptors",
          "Centralized request and response handling",
          "Prevented duplicate profile/customer calls",
        ],
      },
      {
        title: "Authentication & Security",
        icon: Server,
        points: [
          "Implemented OTP-based auth flows",
          "Added session revalidation and logout guards",
          "Handled multi-tab conflicts and token safety",
        ],
      },
      {
        title: "Forms & Validation",
        icon: Code2,
        points: [
          "Built robust Zod-based validation",
          "Implemented business-rule checks for transactions",
          "Stabilized async validation and error states",
        ],
      },
      {
        title: "Document Workflows",
        icon: FolderCog,
        points: [
          "Added file type and size constraints",
          "Implemented image compression paths",
          "Enabled preview, delete, and re-upload states",
        ],
      },
      {
        title: "Transaction Management",
        icon: Wrench,
        points: [
          "Developed buy, sell, and reload features",
          "Integrated refund and receipt workflows",
          "Implemented PDF confirmation generation",
        ],
      },
      {
        title: "UI / Architecture",
        icon: Layers3,
        points: [
          "Built reusable dialogs and transaction UI blocks",
          "Improved loading, empty, and failure states",
          "Maintained strict TypeScript-driven contracts",
        ],
      },
    ],
    architectureNodes: [
      "UI Layer",
      "Components",
      "Business Logic",
      "API Layer",
      "Backend Services",
    ],
    techPills: [
      "Next.js",
      "React",
      "TypeScript",
      "Redux Toolkit",
      "Axios",
      "Zod",
      "React Hook Form",
      "JWT",
      "MUI",
      "Tailwind CSS",
    ],
  },
  "ebixcash-card-distribution-platform": {
    category: "EBIXCASH",
    role: "Software Developer",
    architecture: "Next.js + React Query",
    domain: "Enterprise Treasury",
    type: "Card Distribution Platform",
    overview:
      "Contributed across treasury operations, transaction management, vendor onboarding, RBAC workflows, and reporting pipelines in a production-grade enterprise platform.",
    modules: [
      {
        title: "User & Role Management",
        description: "Role mapping, permissions, location assignment, and workflow access.",
        icon: Star,
        accent: "purple",
      },
      {
        title: "Treasury Operations",
        description: "Deal mapping, deal IDs, balances, and settlement lifecycle support.",
        icon: Database,
        accent: "blue",
      },
      {
        title: "Transaction Management",
        description: "Card workflows, approvals, and business-rule validation paths.",
        icon: Layers3,
        accent: "cyan",
      },
      {
        title: "Vendor Onboarding",
        description: "Reusable onboarding components and request summary APIs.",
        icon: FolderCog,
        accent: "amber",
      },
      {
        title: "Reporting",
        description: "Financial tables, settled positions, and treasury report views.",
        icon: Wrench,
        accent: "green",
      },
      {
        title: "Approval Workflows",
        description: "Multi-level checker approval and rejection feedback handling.",
        icon: Server,
        accent: "pink",
      },
    ],
    contributions: [
      {
        title: "API & Treasury Mapping",
        icon: Database,
        points: [
          "Improved API mapping for treasury responses",
          "Stabilized deal ID extraction and balance sync",
          "Resolved settlement data edge cases",
        ],
      },
      {
        title: "Reporting Accuracy",
        icon: Wrench,
        points: [
          "Corrected reporting columns and field maps",
          "Aligned backend and UI reporting contracts",
          "Removed inconsistencies in financial tables",
        ],
      },
      {
        title: "Dynamic Forms",
        icon: Code2,
        points: [
          "Added role-based form options",
          "Improved validation and date constraints",
          "Implemented robust conditional states",
        ],
      },
      {
        title: "Vendor Onboarding",
        icon: FolderCog,
        points: [
          "Refactored onboarding into shared modules",
          "Unified request handling utilities",
          "Improved workflow maintainability",
        ],
      },
      {
        title: "Type Safety",
        icon: Layers3,
        points: [
          "Strengthened TypeScript null handling",
          "Improved guarded rendering paths",
          "Reduced runtime branch defects",
        ],
      },
      {
        title: "Workflow Stability",
        icon: Server,
        points: [
          "Fixed transaction state inconsistencies",
          "Improved checker and feedback states",
          "Hardened settlement flow reliability",
        ],
      },
    ],
    architectureNodes: [
      "UI Layer",
      "Components",
      "Business Logic",
      "API Layer",
      "Backend Services",
    ],
    techPills: [
      "Next.js",
      "React",
      "TypeScript",
      "React Query",
      "Axios",
      "Jest",
      "RBAC",
      "Form Validation",
      "API Integration",
      "Reusable Components",
    ],
  },
  "target-peak-web": {
    category: "TARGET PEAK",
    role: "Software Developer",
    architecture: "React + Vite + Router",
    domain: "EdTech Admin",
    type: "Admin Management Platform",
    overview:
      "Built and scaled a production-grade administrative platform with reusable dynamic forms/tables, analytics dashboards, role-based access, and multi-environment configuration.",
    modules: [
      {
        title: "Admin Dashboard",
        description: "Centralized navigation, analytics, and operational workflows.",
        icon: Layers3,
        accent: "blue",
      },
      {
        title: "User Management",
        description: "Admin access, registration tracking, and settings flows.",
        icon: Star,
        accent: "purple",
      },
      {
        title: "Performance & Results",
        description: "OMR workflows, result operations, and insight dashboards.",
        icon: Database,
        accent: "cyan",
      },
      {
        title: "Financial Management",
        description: "Payment status, paid/failed records, and audit views.",
        icon: Server,
        accent: "green",
      },
      {
        title: "Support & Promotions",
        description: "Support channels, coupon logic, FAQs, and events.",
        icon: FolderCog,
        accent: "amber",
      },
      {
        title: "System Configuration",
        description: "Roles, settings, access control, and environment config.",
        icon: Wrench,
        accent: "pink",
      },
    ],
    contributions: [
      {
        title: "Scalable Modules",
        icon: Layers3,
        points: [
          "Delivered 25+ administrative pages",
          "Built shared architecture across modules",
          "Improved maintainability with abstractions",
        ],
      },
      {
        title: "Dynamic Forms",
        icon: Code2,
        points: [
          "Implemented React Hook Form + Zod",
          "Created configurable DynamicForm system",
          "Stabilized validation contracts",
        ],
      },
      {
        title: "Data & APIs",
        icon: Database,
        points: [
          "Integrated Axios with shared API config",
          "Adopted React Query server-state flows",
          "Improved caching and synchronization",
        ],
      },
      {
        title: "Security & Access",
        icon: Server,
        points: [
          "Implemented AuthGate-protected routes",
          "Developed role-based access control",
          "Strengthened cookie-based auth flows",
        ],
      },
      {
        title: "Analytics Layer",
        icon: Globe,
        points: [
          "Integrated Recharts dashboards",
          "Built data-driven reporting views",
          "Improved admin decision visibility",
        ],
      },
      {
        title: "Environment Setup",
        icon: Wrench,
        points: [
          "Configured dev/stage/prod variants",
          "Managed environment-specific API URLs",
          "Aligned ports and deployment behavior",
        ],
      },
    ],
    architectureNodes: [
      "UI Layer",
      "Components",
      "Business Logic",
      "API Layer",
      "Backend Services",
    ],
    techPills: [
      "React",
      "TypeScript",
      "Vite",
      "React Router",
      "React Query",
      "Axios",
      "React Hook Form",
      "Zod",
      "Recharts",
      "Tailwind CSS",
    ],
  },
};

function splitHeadline(title: string): { category: string; base: string; accent: string } {
  const separator = " - ";
  const separatorIndex = title.indexOf(separator);
  const hasCategorySeparator = separatorIndex >= 0;
  const categoryPart = hasCategorySeparator
    ? title.slice(0, separatorIndex).trim()
    : "";
  const headline = hasCategorySeparator
    ? title.slice(separatorIndex + separator.length).trim()
    : title;
  const words = headline.split(/\s+/).filter(Boolean);

  if (words.length < 3) {
    return {
      category: categoryPart?.toUpperCase() || "PROJECT",
      base: headline,
      accent: "",
    };
  }

  return {
    category: categoryPart?.toUpperCase() || "PROJECT",
    base: words.slice(0, -2).join(" "),
    accent: words.slice(-2).join(" "),
  };
}

function getAccentClass(accent: ModuleItem["accent"]): string {
  if (accent === "purple") return "cs-accent--purple";
  if (accent === "cyan") return "cs-accent--cyan";
  if (accent === "green") return "cs-accent--green";
  if (accent === "amber") return "cs-accent--amber";
  if (accent === "pink") return "cs-accent--pink";
  return "cs-accent--blue";
}

export default function ProjectDetails() {
  const { projectSlug = "" } = useParams();
  const { data, loading } = usePublishedPortfolioData();

  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-case-reveal]"));
    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.15 },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  if (loading) {
    return (
      <main className="relative z-10 min-h-screen px-4 py-12 sm:px-6 lg:px-8">
        <div className="section-container">
          <p className="text-sm text-neutral-400">Loading project details...</p>
        </div>
      </main>
    );
  }

  if (!data) {
    return <Navigate to="/" replace />;
  }

  const project = data.projects.find(
    (item) => getProjectSlug(item) === projectSlug || item.id === projectSlug,
  );

  if (!project) {
    return <Navigate to="/" replace />;
  }

  const orderedProjects = [...data.projects].sort(
    (a, b) => a.displayOrder - b.displayOrder,
  );
  const currentIndex = Math.max(
    0,
    orderedProjects.findIndex((item) => item.id === project.id),
  );
  const totalProjects = orderedProjects.length;
  const previousProject =
    orderedProjects[(currentIndex - 1 + totalProjects) % totalProjects] ?? project;
  const nextProject = orderedProjects[(currentIndex + 1) % totalProjects] ?? project;

  const slug = getProjectSlug(project);
  const preset = caseStudyPresets[slug];
  const heading = splitHeadline(project.title);
  const categoryLabel = preset?.category || heading.category;
  const progressPercent = ((currentIndex + 1) / Math.max(totalProjects, 1)) * 100;
  const architectureNodes =
    preset?.architectureNodes || ["UI Layer", "Components", "Business Logic", "API Layer", "Services"];

  const metadataItems = useMemo(
    () => [
      { label: "Role", value: preset?.role || "Software Developer", icon: Star },
      {
        label: "Architecture",
        value: preset?.architecture || project.techStack.slice(0, 2).join(" + "),
        icon: Layers3,
      },
      {
        label: "Domain",
        value: preset?.domain || "Web Application",
        icon: Globe,
      },
      {
        label: "Type",
        value: preset?.type || "Case Study",
        icon: FolderCog,
      },
    ],
    [preset, project.techStack],
  );

  const techPills = preset?.techPills?.length ? preset.techPills : project.techStack;

  return (
    <>
      <GradientBlobs />
      <FloatingParticlesCanvas />

      <main className="case-study-page relative z-10 min-h-screen px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto w-full" style={{ maxWidth: "1320px" }}>
          <div className="cs-topnav cs-enter">
            <Link to="/#projects" className="cs-back-link">
              <ArrowLeft size={16} />
              Back to Projects
            </Link>

            <div className="cs-counter-wrap" aria-label="Project progress">
              <p className="cs-counter-text">
                {String(currentIndex + 1).padStart(2, "0")} / {String(totalProjects).padStart(2, "0")}
              </p>
              <div className="cs-counter-line">
                <span style={{ width: `${progressPercent}%` }} />
              </div>
            </div>
          </div>

          <section className="cs-hero cs-enter" data-case-reveal>
            <div>
              <p className="cs-category">{categoryLabel}</p>
              <h1 className="cs-title">
                {heading.base}
                {heading.accent ? <span className="cs-title-accent"> {heading.accent}</span> : null}
              </h1>
              <p className="cs-description">{project.description}</p>

              <div className="cs-pill-wrap cs-enter-delay-2">
                {techPills.map((tag) => (
                  <span key={tag} className="cs-pill">
                    <span className="cs-pill-dot">{tag.charAt(0)}</span>
                    {tag}
                  </span>
                ))}
              </div>

              {(project.liveUrl || project.githubUrl) && (
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cs-action cs-action--primary"
                    >
                      Live Demo
                      <ExternalLink size={15} />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cs-action"
                    >
                      Source Code
                      <ExternalLink size={15} />
                    </a>
                  )}
                </div>
              )}
            </div>

            <aside className="cs-card cs-meta-card cs-enter-delay-3" data-case-reveal>
              {metadataItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="cs-meta-row">
                    <div className="cs-meta-icon">
                      <Icon size={15} />
                    </div>
                    <div>
                      <p className="cs-meta-label">{item.label}</p>
                      <p className="cs-meta-value">{item.value}</p>
                    </div>
                  </div>
                );
              })}
            </aside>
          </section>

          <section className="cs-card cs-overview cs-reveal" data-case-reveal>
            <div>
              <h2 className="cs-section-title">Overview</h2>
              <p className="cs-body">
                {preset?.overview ||
                  "Detailed case study content for this project is presented below with modules, technical contributions, architecture, and implementation decisions."}
              </p>
            </div>

            <div className="cs-overview-visual" aria-hidden="true">
              <div className="cs-orbital cs-orbital--outer" />
              <div className="cs-orbital cs-orbital--inner" />
              <span className="cs-currency cs-currency--a">$</span>
              <span className="cs-currency cs-currency--b">€</span>
              <span className="cs-currency cs-currency--c">¥</span>
              <span className="cs-currency cs-currency--d">£</span>
              <div className="cs-mini-panel">
                <p className="cs-mini-panel__title">Buy Currency</p>
                <p className="cs-mini-panel__line">AUD 10,000.00</p>
                <p className="cs-mini-panel__line cs-mini-panel__line--muted">USD 6,742.50</p>
              </div>
            </div>
          </section>

          {preset?.modules?.length ? (
            <section className="cs-reveal" data-case-reveal>
              <h2 className="cs-section-title">Core Modules</h2>
              <div className="cs-module-grid">
                {preset.modules.map((module) => {
                  const Icon = module.icon;
                  return (
                    <article key={module.title} className={`cs-card cs-module-card ${getAccentClass(module.accent)}`}>
                      <div className="cs-module-icon">
                        <Icon size={16} />
                      </div>
                      <h3 className="cs-module-title">{module.title}</h3>
                      <p className="cs-module-body">{module.description}</p>
                    </article>
                  );
                })}
              </div>
            </section>
          ) : null}

          {preset?.contributions?.length ? (
            <section className="cs-reveal" data-case-reveal>
              <h2 className="cs-section-title">Technical Contributions</h2>
              <div className="cs-contrib-grid">
                {preset.contributions.map((card) => {
                  const Icon = card.icon;
                  return (
                    <article key={card.title} className="cs-card cs-contrib-card">
                      <div className="cs-contrib-head">
                        <div className="cs-contrib-icon">
                          <Icon size={15} />
                        </div>
                        <h3 className="cs-contrib-title">{card.title}</h3>
                      </div>
                      <ul className="cs-contrib-list">
                        {card.points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </article>
                  );
                })}
              </div>
            </section>
          ) : null}

          <section className="cs-reveal" data-case-reveal>
            <h2 className="cs-section-title">Architecture Overview</h2>
            <div className="cs-card cs-arch-wrap">
              <div className="cs-arch-flow">
                {architectureNodes.map((node, index) => (
                  <div key={node} className="cs-arch-item">
                    <div className="cs-arch-node">{node}</div>
                    {index < architectureNodes.length - 1 && (
                      <div className="cs-arch-connector" aria-hidden="true">
                        <span className="cs-arch-dot" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="cs-reveal" data-case-reveal>
            <h2 className="cs-section-title">Tech Stack</h2>
            <div className="cs-card">
              <div className="cs-pill-wrap">
                {techPills.map((tech) => (
                  <span key={tech} className="cs-pill">
                    <span className="cs-pill-dot">{tech.charAt(0)}</span>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section className="cs-card cs-project-nav cs-reveal" data-case-reveal>
            <Link to={getProjectDetailsPath(previousProject)} className="cs-project-nav-link">
              <ArrowLeft size={16} />
              <div>
                <p className="cs-project-nav-label">Previous Project</p>
                <p className="cs-project-nav-title">{previousProject.title}</p>
              </div>
            </Link>

            <div className="cs-project-nav-center" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </div>

            <Link to={getProjectDetailsPath(nextProject)} className="cs-project-nav-link cs-project-nav-link--right">
              <div>
                <p className="cs-project-nav-label">Next Project</p>
                <p className="cs-project-nav-title">{nextProject.title}</p>
              </div>
              <ArrowRight size={16} />
            </Link>
          </section>

          <section className="cs-card cs-reveal" data-case-reveal>
            <h2 className="cs-section-title">In-depth Details</h2>
            <p className="cs-body whitespace-pre-line">
              {project.detailedDescription?.trim() ||
                "Detailed case study will be published soon. This project currently shows a concise summary in the Projects section."}
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
