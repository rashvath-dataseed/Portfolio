import type { Project } from "../types/portfolio";

export function slugifyProjectTitle(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getProjectSlug(project: Project): string {
  if (project.slug?.trim()) {
    return project.slug.trim().toLowerCase();
  }
  return slugifyProjectTitle(project.title);
}

export function getProjectDetailsPath(project: Project): string {
  return `/projects/${getProjectSlug(project)}`;
}
