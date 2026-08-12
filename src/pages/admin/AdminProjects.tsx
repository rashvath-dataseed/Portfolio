import { useMemo, useState } from "react";
import Button from "../../components/ui/Button";
import { usePortfolio } from "../../context/PortfolioContext";
import { slugifyProjectTitle } from "../../lib/projectRouting";
import type { ContentStatus, Project } from "../../types/portfolio";

const statusOptions: ContentStatus[] = ["draft", "published", "archived"];

const emptyProject: Omit<Project, "id" | "updatedAt" | "publishedAt"> = {
  title: "",
  description: "",
  slug: "",
  detailedDescription: "",
  techStack: [],
  projectImage: "",
  liveUrl: "",
  githubUrl: "",
  startDate: "",
  endDate: "",
  featured: false,
  displayOrder: 0,
  status: "draft",
};

export default function AdminProjects() {
  const { data, upsertItem, deleteItem, updateStatus } = usePortfolio();
  const [form, setForm] = useState(emptyProject);
  const [query, setQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | ContentStatus>("all");

  const normalizeProjectPayload = (payload: typeof form): typeof form => ({
    ...payload,
    slug: payload.slug?.trim() || slugifyProjectTitle(payload.title),
    detailedDescription: payload.detailedDescription?.trim() || "",
  });

  const rows = useMemo(() => {
    if (!data) return [];

    return data.projects.filter((project) => {
      const matchesQuery = project.title.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = filterStatus === "all" || project.status === filterStatus;
      return matchesQuery && matchesStatus;
    });
  }, [data, filterStatus, query]);

  if (!data) return null;

  return (
    <section className="space-y-5">
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 sm:p-6">
        <h2 className="text-lg font-semibold text-white">Add Project</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <input
            placeholder="Project Title"
            value={form.title}
            onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
            className="rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white"
          />
          <input
            placeholder="Slug (optional, e.g. my-project-name)"
            value={form.slug ?? ""}
            onChange={(event) => setForm((prev) => ({ ...prev, slug: event.target.value }))}
            className="rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white"
          />
          <input
            placeholder="Tech Stack (comma separated)"
            value={form.techStack.join(", ")}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                techStack: event.target.value
                  .split(",")
                  .map((item) => item.trim())
                  .filter(Boolean),
              }))
            }
            className="rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white"
          />
          <input
            placeholder="Live URL"
            value={form.liveUrl}
            onChange={(event) => setForm((prev) => ({ ...prev, liveUrl: event.target.value }))}
            className="rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white"
          />
          <input
            placeholder="GitHub URL"
            value={form.githubUrl}
            onChange={(event) => setForm((prev) => ({ ...prev, githubUrl: event.target.value }))}
            className="rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white"
          />
          <input
            type="number"
            placeholder="Display Order"
            value={form.displayOrder}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, displayOrder: Number(event.target.value) || 0 }))
            }
            className="rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white"
          />
          <select
            value={form.status}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, status: event.target.value as ContentStatus }))
            }
            className="rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <textarea
          rows={4}
          placeholder="Description"
          value={form.description}
          onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
          className="mt-3 w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white"
        />
        <textarea
          rows={10}
          placeholder="In-depth project details"
          value={form.detailedDescription ?? ""}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, detailedDescription: event.target.value }))
          }
          className="mt-3 w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white"
        />

        <div className="mt-4 flex items-center gap-3">
          <Button
            onClick={async () => {
              if (!form.title.trim()) return;
              await upsertItem("projects", normalizeProjectPayload(form));
              setForm(emptyProject);
            }}
          >
            Save Draft
          </Button>
          <Button
            variant="secondary"
            onClick={async () => {
              if (!form.title.trim()) return;
              await upsertItem("projects", {
                ...normalizeProjectPayload(form),
                status: "published",
              });
              setForm(emptyProject);
            }}
          >
            Publish
          </Button>
        </div>
      </div>

      <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 sm:p-6">
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <input
            placeholder="Search projects"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white"
          />
          <select
            value={filterStatus}
            onChange={(event) =>
              setFilterStatus(event.target.value as "all" | ContentStatus)
            }
            className="rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white"
          >
            <option value="all">All Statuses</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          {rows.map((project) => (
            <div
              key={project.id}
              className="grid gap-2 rounded-lg border border-neutral-800 bg-neutral-900 p-3 text-sm sm:grid-cols-[1.5fr_1fr_160px_auto]"
            >
              <div>
                <p className="font-medium text-white">{project.title}</p>
                <p className="text-xs text-neutral-400">{project.techStack.join(", ")}</p>
              </div>
              <p className="text-neutral-400">{new Date(project.updatedAt).toLocaleDateString()}</p>
              <select
                value={project.status}
                onChange={(event) =>
                  void updateStatus("projects", project.id, event.target.value as ContentStatus)
                }
                className="rounded-md border border-neutral-700 bg-neutral-950 px-2 py-1 text-xs text-neutral-200"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setForm({ ...project })}
                  className="rounded-md border border-neutral-700 px-2 py-1 text-xs text-neutral-200"
                >
                  Edit
                </button>
                <button
                  onClick={async () => {
                    const copiedTitle = `${project.title} (Copy)`;
                    await upsertItem("projects", {
                      ...project,
                      id: undefined,
                      title: copiedTitle,
                      slug: slugifyProjectTitle(copiedTitle),
                    });
                  }}
                  className="rounded-md border border-neutral-700 px-2 py-1 text-xs text-neutral-200"
                >
                  Duplicate
                </button>
                <button
                  onClick={() => void deleteItem("projects", project.id)}
                  className="rounded-md border border-rose-700 px-2 py-1 text-xs text-rose-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
