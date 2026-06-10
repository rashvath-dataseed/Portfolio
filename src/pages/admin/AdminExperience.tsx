import { useState } from "react";
import Button from "../../components/ui/Button";
import { usePortfolio } from "../../context/PortfolioContext";
import type { ContentStatus, Experience } from "../../types/portfolio";

const statusOptions: ContentStatus[] = ["draft", "published", "archived"];

const emptyExperience: Omit<Experience, "id" | "updatedAt" | "publishedAt"> = {
  companyName: "",
  role: "",
  duration: "",
  location: "",
  description: "",
  technologiesUsed: [],
  status: "draft",
};

export default function AdminExperience() {
  const { data, upsertItem, deleteItem, updateStatus } = usePortfolio();
  const [form, setForm] = useState(emptyExperience);

  if (!data) return null;

  return (
    <section className="space-y-5">
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 sm:p-6">
        <h2 className="text-lg font-semibold text-white">Add Experience</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <input placeholder="Company Name" value={form.companyName} onChange={(e) => setForm((p) => ({ ...p, companyName: e.target.value }))} className="rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white" />
          <input placeholder="Role" value={form.role} onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))} className="rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white" />
          <input placeholder="Duration" value={form.duration} onChange={(e) => setForm((p) => ({ ...p, duration: e.target.value }))} className="rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white" />
          <input placeholder="Location" value={form.location} onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))} className="rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white" />
          <select value={form.status} onChange={(e) => setForm((p) => ({ ...p, status: e.target.value as ContentStatus }))} className="rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white">
            {statusOptions.map((status) => <option key={status} value={status}>{status}</option>)}
          </select>
          <input placeholder="Technologies (comma separated)" value={form.technologiesUsed.join(", ")} onChange={(e) => setForm((p) => ({ ...p, technologiesUsed: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) }))} className="rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white" />
        </div>
        <textarea rows={4} placeholder="Description" value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} className="mt-3 w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white" />
        <div className="mt-3"><Button onClick={async () => { if (!form.companyName.trim()) return; await upsertItem("experience", form); setForm(emptyExperience); }}>Save</Button></div>
      </div>

      <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 sm:p-6 space-y-2">
        {data.experience.map((item) => (
          <div key={item.id} className="grid gap-2 rounded-lg border border-neutral-800 bg-neutral-900 p-3 sm:grid-cols-[1.5fr_1fr_120px_auto]">
            <div><p className="text-sm font-medium text-white">{item.role} · {item.companyName}</p><p className="text-xs text-neutral-400">{item.duration} · {item.location}</p></div>
            <p className="text-xs text-neutral-400">Updated {new Date(item.updatedAt).toLocaleDateString()}</p>
            <select value={item.status} onChange={(e) => void updateStatus("experience", item.id, e.target.value as ContentStatus)} className="rounded-md border border-neutral-700 bg-neutral-950 px-2 py-1 text-xs text-neutral-200">{statusOptions.map((status) => <option key={status} value={status}>{status}</option>)}</select>
            <div className="flex justify-end gap-2"><button onClick={() => setForm({ ...item })} className="rounded-md border border-neutral-700 px-2 py-1 text-xs text-neutral-200">Edit</button><button onClick={() => void deleteItem("experience", item.id)} className="rounded-md border border-rose-700 px-2 py-1 text-xs text-rose-300">Delete</button></div>
          </div>
        ))}
      </div>
    </section>
  );
}
