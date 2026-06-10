import { useState } from "react";
import Button from "../../components/ui/Button";
import { usePortfolio } from "../../context/PortfolioContext";
import type { ContentStatus, Skill } from "../../types/portfolio";

const statusOptions: ContentStatus[] = ["draft", "published", "archived"];
const categories = ["Frontend", "Backend", "Database", "Tools", "Cloud"];

const emptySkill: Omit<Skill, "id" | "updatedAt" | "publishedAt"> = {
  name: "",
  proficiency: 50,
  category: "Frontend",
  icon: "Code2",
  displayOrder: 0,
  status: "draft",
};

export default function AdminSkills() {
  const { data, upsertItem, deleteItem, updateStatus } = usePortfolio();
  const [form, setForm] = useState(emptySkill);

  if (!data) return null;

  return (
    <section className="space-y-5">
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 sm:p-6">
        <h2 className="text-lg font-semibold text-white">Add Skill</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <input
            placeholder="Skill Name"
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
            className="rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white"
          />
          <input
            type="number"
            placeholder="Proficiency %"
            min={0}
            max={100}
            value={form.proficiency}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, proficiency: Number(event.target.value) || 0 }))
            }
            className="rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white"
          />
          <select
            value={form.category}
            onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}
            className="rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
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
        <div className="mt-3 flex items-center gap-2">
          <Button
            onClick={async () => {
              if (!form.name.trim()) return;
              await upsertItem("skills", form);
              setForm(emptySkill);
            }}
          >
            Add Skill
          </Button>
        </div>
      </div>

      <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 sm:p-6">
        <h3 className="text-base font-medium text-white">Skill List</h3>
        <div className="mt-3 space-y-2">
          {[...data.skills].sort((a, b) => a.displayOrder - b.displayOrder).map((skill) => (
            <div key={skill.id} className="grid gap-2 rounded-lg border border-neutral-800 bg-neutral-900 p-3 sm:grid-cols-[1.5fr_1fr_120px_auto]">
              <div>
                <p className="text-sm font-medium text-white">{skill.name}</p>
                <p className="text-xs text-neutral-400">{skill.category} · {skill.proficiency}%</p>
              </div>
              <p className="text-xs text-neutral-400">Updated {new Date(skill.updatedAt).toLocaleDateString()}</p>
              <select
                value={skill.status}
                onChange={(event) =>
                  void updateStatus("skills", skill.id, event.target.value as ContentStatus)
                }
                className="rounded-md border border-neutral-700 bg-neutral-950 px-2 py-1 text-xs text-neutral-200"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setForm({ ...skill })}
                  className="rounded-md border border-neutral-700 px-2 py-1 text-xs text-neutral-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => void deleteItem("skills", skill.id)}
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
