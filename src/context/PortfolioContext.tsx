import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type {
  Certification,
  ContentStatus,
  Education,
  Experience,
  PortfolioData,
  Project,
  Skill,
  Testimonial,
} from "../types/portfolio";
import {
  getPortfolioData,
  savePortfolioData,
  submitContactForm,
} from "../lib/portfolioStore";

type CollectionKey =
  | "projects"
  | "skills"
  | "experience"
  | "certifications"
  | "education"
  | "testimonials";

type CollectionTypeMap = {
  projects: Project;
  skills: Skill;
  experience: Experience;
  certifications: Certification;
  education: Education;
  testimonials: Testimonial;
};

interface PortfolioContextValue {
  data: PortfolioData | null;
  loading: boolean;
  refresh: () => Promise<void>;
  updateData: (updater: (current: PortfolioData) => PortfolioData) => Promise<void>;
  upsertItem: <K extends CollectionKey>(
    key: K,
    item: Omit<CollectionTypeMap[K], "id" | "updatedAt" | "publishedAt"> &
      Partial<Pick<CollectionTypeMap[K], "id" | "updatedAt" | "publishedAt">>,
  ) => Promise<void>;
  deleteItem: <K extends CollectionKey>(key: K, id: string) => Promise<void>;
  updateStatus: <K extends CollectionKey>(
    key: K,
    id: string,
    status: ContentStatus,
  ) => Promise<void>;
  submitContact: (payload: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextValue | undefined>(undefined);

function sortCollection<T extends { displayOrder?: number; updatedAt: string }>(
  collection: T[],
): T[] {
  return [...collection].sort((a, b) => {
    const orderA = typeof a.displayOrder === "number" ? a.displayOrder : Number.MAX_SAFE_INTEGER;
    const orderB = typeof b.displayOrder === "number" ? b.displayOrder : Number.MAX_SAFE_INTEGER;

    if (orderA !== orderB) return orderA - orderB;
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });
}

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    const next = await getPortfolioData();
    setData(next);
    setLoading(false);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const persist = useCallback(async (next: PortfolioData) => {
    setData(next);
    await savePortfolioData(next);
  }, []);

  const updateData = useCallback(
    async (updater: (current: PortfolioData) => PortfolioData) => {
      if (!data) return;
      const next = updater(data);
      await persist(next);
    },
    [data, persist],
  );

  const upsertItem = useCallback(
    async <K extends CollectionKey>(
      key: K,
      item: Omit<CollectionTypeMap[K], "id" | "updatedAt" | "publishedAt"> &
        Partial<Pick<CollectionTypeMap[K], "id" | "updatedAt" | "publishedAt">>,
    ) => {
      if (!data) return;

      const now = new Date().toISOString();
      const items = [...(data[key] as CollectionTypeMap[K][])];
      const id = item.id ?? crypto.randomUUID();
      const index = items.findIndex((entry) => entry.id === id);
      const nextItem = {
        ...item,
        id,
        updatedAt: now,
        publishedAt:
          item.status === "published"
            ? item.publishedAt ?? now
            : item.publishedAt,
      } as CollectionTypeMap[K];

      if (index >= 0) {
        items[index] = nextItem;
      } else {
        items.unshift(nextItem);
      }

      const nextData = {
        ...data,
        [key]: sortCollection(items),
        lastUpdated: now,
      } as PortfolioData;

      await persist(nextData);
    },
    [data, persist],
  );

  const deleteItem = useCallback(
    async <K extends CollectionKey>(key: K, id: string) => {
      if (!data) return;
      const nextData = {
        ...data,
        [key]: (data[key] as CollectionTypeMap[K][]).filter((item) => item.id !== id),
        lastUpdated: new Date().toISOString(),
      } as PortfolioData;
      await persist(nextData);
    },
    [data, persist],
  );

  const updateStatus = useCallback(
    async <K extends CollectionKey>(key: K, id: string, status: ContentStatus) => {
      if (!data) return;
      const now = new Date().toISOString();
      const nextItems = (data[key] as CollectionTypeMap[K][]).map((item) => {
        if (item.id !== id) return item;
        return {
          ...item,
          status,
          updatedAt: now,
          publishedAt: status === "published" ? item.publishedAt ?? now : item.publishedAt,
        };
      });

      await persist({
        ...data,
        [key]: nextItems,
        lastUpdated: now,
      } as PortfolioData);
    },
    [data, persist],
  );

  const submitContact = useCallback(
    async (payload: { name: string; email: string; subject: string; message: string }) => {
      await submitContactForm(payload);
      await refresh();
    },
    [refresh],
  );

  const value = useMemo(
    () => ({
      data,
      loading,
      refresh,
      updateData,
      upsertItem,
      deleteItem,
      updateStatus,
      submitContact,
    }),
    [data, deleteItem, loading, refresh, submitContact, updateData, updateStatus, upsertItem],
  );

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within PortfolioProvider");
  }
  return context;
}

export function usePublishedPortfolioData() {
  const { data, loading } = usePortfolio();

  if (!data) {
    return { data: null, loading };
  }

  return {
    loading,
    data: {
      ...data,
      projects: data.projects.filter((item) => item.status === "published"),
      skills: data.skills.filter((item) => item.status === "published"),
      experience: data.experience.filter((item) => item.status === "published"),
      certifications: data.certifications.filter((item) => item.status === "published"),
      education: data.education.filter((item) => item.status === "published"),
      testimonials: data.testimonials.filter((item) => item.status === "published"),
    },
  };
}
