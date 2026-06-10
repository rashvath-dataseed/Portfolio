import { doc, getDoc, setDoc } from "firebase/firestore";
import { defaultPortfolioData } from "../config/defaultPortfolioData";
import type { ContactSubmission, PortfolioData } from "../types/portfolio";
import { firestoreDb, isFirebaseConfigured } from "./firebase";

const LOCAL_STORAGE_KEY = "portfolio-data-v1";
const FIRESTORE_COLLECTION = "portfolio";
const FIRESTORE_DOC_ID = "content";

function readLocalData(): PortfolioData {
  const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!raw) return defaultPortfolioData;

  try {
    const parsed = JSON.parse(raw) as PortfolioData;
    const merged = { ...defaultPortfolioData, ...parsed };

    // Migrate legacy sparse skill payloads to the richer resume-based defaults.
    const categoryCount = new Set((merged.skills ?? []).map((skill) => skill.category)).size;
    const isSparseSkills = (merged.skills?.length ?? 0) <= 3 && categoryCount <= 1;
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
    return snapshot.data() as PortfolioData;
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
    return { ...defaultPortfolioData, ...remote };
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
