import { doc, getDoc, setDoc } from "firebase/firestore";
import { defaultPortfolioData } from "../config/defaultPortfolioData";
import type { ContactSubmission, PortfolioData } from "../types/portfolio";
import { firestoreDb, isFirebaseConfigured } from "./firebase";

const LOCAL_STORAGE_KEY = "portfolio-data-v1";
const FIRESTORE_COLLECTION = "portfolio";
const FIRESTORE_DOC_ID = "content";

function mergeById<T extends { id: string }>(
  defaults: T[],
  incoming?: T[],
): T[] {
  if (!incoming?.length) return defaults;

  const byId = new Map<string, T>();

  // Keep default order first, then allow incoming items to override by id.
  defaults.forEach((item) => {
    byId.set(item.id, item);
  });

  incoming.forEach((item) => {
    byId.set(item.id, item);
  });

  return [...byId.values()];
}

function backfillFromDefaultsById<T extends { id: string }>(
  defaults: T[],
  incoming?: T[],
): T[] {
  if (!incoming?.length) return defaults;

  const defaultById = new Map<string, T>();
  defaults.forEach((item) => {
    defaultById.set(item.id, item);
  });

  return incoming.map((item) => {
    const fallback = defaultById.get(item.id);
    if (!fallback) return item;
    return {
      ...fallback,
      ...item,
    };
  });
}

function mergeWithDefaults(incoming: Partial<PortfolioData>): PortfolioData {
  const merged = {
    ...defaultPortfolioData,
    ...incoming,
    personalInfo: {
      ...defaultPortfolioData.personalInfo,
      ...(incoming.personalInfo ?? {}),
    },
    contactInfo: {
      ...defaultPortfolioData.contactInfo,
      ...(incoming.contactInfo ?? {}),
    },
    settings: {
      ...defaultPortfolioData.settings,
      ...(incoming.settings ?? {}),
    },
    projects: backfillFromDefaultsById(
      defaultPortfolioData.projects,
      incoming.projects,
    ),
    analytics: {
      ...defaultPortfolioData.analytics,
      ...(incoming.analytics ?? {}),
      projectViews: {
        ...defaultPortfolioData.analytics.projectViews,
        ...(incoming.analytics?.projectViews ?? {}),
      },
    },
    certifications: mergeById(
      defaultPortfolioData.certifications,
      incoming.certifications,
    ),
  } as PortfolioData;

  // Backfill critical resume sections when persisted data is empty.
  if (!merged.projects?.length) merged.projects = defaultPortfolioData.projects;
  if (!merged.skills?.length) merged.skills = defaultPortfolioData.skills;
  if (!merged.experience?.length)
    merged.experience = defaultPortfolioData.experience;
  if (!merged.education?.length)
    merged.education = defaultPortfolioData.education;

  const projectTitles = new Set(
    (merged.projects ?? []).map((project) =>
      (project.title ?? "").trim().toLowerCase(),
    ),
  );
  const hasLegacyPersonalProjectSet =
    (merged.projects?.length ?? 0) <= 3 &&
    projectTitles.has("e-commerce app") &&
    projectTitles.has("crypto tracker") &&
    projectTitles.has("weathernow");
  const hasClientProjects =
    projectTitles.has("au bank - multi-currency forex platform") ||
    projectTitles.has("ebixcash - card distribution platform") ||
    projectTitles.has("target peak - admin portal") ||
    projectTitles.has("bank of india - corporate website");
  if (hasLegacyPersonalProjectSet && !hasClientProjects) {
    merged.projects = defaultPortfolioData.projects;
  }

  // Migrate older sparse resume payloads to richer defaults.
  const firstExperience = merged.experience?.[0];
  const experienceLineCount = (firstExperience?.description ?? "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean).length;
  const isSparseExperience =
    (merged.experience?.length ?? 0) <= 1 && experienceLineCount < 5;
  if (isSparseExperience) {
    merged.experience = defaultPortfolioData.experience;
  }

  const hasMangaloreUniversity = (merged.education ?? []).some((item) =>
    (item.specialization ?? "").toLowerCase().includes("mangalore university"),
  );
  if (!hasMangaloreUniversity) {
    merged.education = defaultPortfolioData.education;
  }

  const primaryExperience = merged.experience?.[0];
  const isLegacyExperience =
    (merged.experience?.length ?? 0) === 1 &&
    (primaryExperience?.companyName ?? "") === "Ekfrazo Technologies Pvt. Ltd." &&
    (primaryExperience?.description ?? "")
      .toLowerCase()
      .includes("recruited as a software developer intern");
  if (isLegacyExperience) {
    merged.experience = defaultPortfolioData.experience;
  }

  const hasResponsibilityFormat =
    (primaryExperience?.description ?? "")
      .toLowerCase()
      .includes("build scalable web applications using react, next.js, and typescript");
  const shouldRefreshExperienceCopy =
    (merged.experience?.length ?? 0) === 1 &&
    (primaryExperience?.companyName ?? "") === "Ekfrazo Technologies Pvt. Ltd." &&
    !hasResponsibilityFormat;
  if (shouldRefreshExperienceCopy) {
    merged.experience = defaultPortfolioData.experience;
  }

  const skillNames = new Set(
    (merged.skills ?? []).map((item) => item.name.trim().toLowerCase()),
  );
  const isLegacySkills =
    (merged.skills?.length ?? 0) <= 24 &&
    skillNames.has("sitefinity") &&
    !skillNames.has("material ui") &&
    !skillNames.has("axios");
  if (isLegacySkills) {
    merged.skills = defaultPortfolioData.skills;
  }

  return merged;
}

function readLocalData(): PortfolioData {
  const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!raw) return defaultPortfolioData;

  try {
    const parsed = JSON.parse(raw) as Partial<PortfolioData>;
    const merged = mergeWithDefaults(parsed);

    // Migrate legacy sparse skill payloads to the richer resume-based defaults.
    const categoryCount = new Set(
      (merged.skills ?? []).map((skill) => skill.category),
    ).size;
    const isSparseSkills =
      (merged.skills?.length ?? 0) <= 3 && categoryCount <= 1;
    if (isSparseSkills) {
      merged.skills = defaultPortfolioData.skills;
    }

    return merged;
  } catch {
    return defaultPortfolioData;
  }
}

function writeLocalData(data: PortfolioData) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
}

async function readRemoteData(): Promise<PortfolioData | null> {
  if (!isFirebaseConfigured || !firestoreDb) return null;

  try {
    const ref = doc(firestoreDb, FIRESTORE_COLLECTION, FIRESTORE_DOC_ID);
    const snapshot = await getDoc(ref);
    if (!snapshot.exists()) return null;
    return mergeWithDefaults(snapshot.data() as Partial<PortfolioData>);
  } catch {
    return null;
  }
}

async function writeRemoteData(data: PortfolioData): Promise<void> {
  if (!isFirebaseConfigured || !firestoreDb) return;

  try {
    const ref = doc(firestoreDb, FIRESTORE_COLLECTION, FIRESTORE_DOC_ID);
    await setDoc(ref, data, { merge: true });
  } catch {
    // Local persistence remains source of truth if remote write fails.
  }
}

export async function getPortfolioData(): Promise<PortfolioData> {
  const remote = await readRemoteData();
  if (remote) {
    writeLocalData(remote);
    return mergeWithDefaults(remote);
  }

  const local = readLocalData();
  writeLocalData(local);
  return local;
}

export async function savePortfolioData(data: PortfolioData): Promise<void> {
  const payload = { ...data, lastUpdated: new Date().toISOString() };
  writeLocalData(payload);
  await writeRemoteData(payload);
}

export async function recordVisit(): Promise<void> {
  const data = await getPortfolioData();
  data.analytics.portfolioVisits += 1;
  await savePortfolioData(data);
}

export async function recordResumeDownload(): Promise<void> {
  const data = await getPortfolioData();
  data.analytics.resumeDownloads += 1;
  await savePortfolioData(data);
}

export async function recordProjectView(projectId: string): Promise<void> {
  const data = await getPortfolioData();
  const current = data.analytics.projectViews[projectId] ?? 0;
  data.analytics.projectViews[projectId] = current + 1;
  await savePortfolioData(data);
}

export async function submitContactForm(
  submission: Omit<ContactSubmission, "id" | "submittedAt">,
): Promise<void> {
  const data = await getPortfolioData();
  data.contactSubmissions.unshift({
    id: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
    ...submission,
  });
  data.analytics.contactFormSubmissions += 1;
  await savePortfolioData(data);
}
