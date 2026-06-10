import { useState } from "react";
import Button from "../../components/ui/Button";
import { usePortfolio } from "../../context/PortfolioContext";
import type { ContentStatus, Education } from "../../types/portfolio";

const statusOptions: ContentStatus[] = ["draft", "published", "archived"];

const emptyEducation: Omit<Education, "id" | "updatedAt" | "publishedAt"> = {
  institutionName: "",
  degree: "",
  specialization: "",
  duration: "",
  grade: "",
  status: "draft",
};

export default function AdminEducation() {
  const { data, upsertItem, deleteItem, updateStatus } = usePortfolio();
  const [form, setForm] = useState(emptyEducation);

  if (!data) return null;

  return (
    <section className="space-y-5">
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 sm:p-6">
        <h2 className="text-lg font-semibold text-white">Add Education</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <input placeholder="Institution Name" value={form.institutionName} onChange={(e) => setForm((p) => ({ ...p, institutionName: e.target.value }))} className="rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white" />
          <input placeholder="Degree" value={form.degree} onChange={(e) => setForm((p) => ({ ...p, degree: e.target.value }))} className="rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white" />
          <input placeholder="Specialization" value={form.specialization} onChange={(e) => setForm((p) => ({ ...p, specialization: e.target.value }))} className="rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white" />
          <input placeholder="Duration" value={form.duration} onChange={(e) => setForm((p) => ({ ...p, duration: e.target.value }))} className="rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white" />
          <input placeholder="Grade/CGPA" value={form.grade} onChange={(e) => setForm((p) => ({ ...p, grade: e.target.value }))} className="rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white" />
          <select value={form.status} onChange={(e) => setForm((p) => ({ ...p, status: e.target.value as ContentStatus }))} className="rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white">{statusOptions.map((status) => <option key={status} value={status}>{status}</option>)}</select>
        </div>
        <div className="mt-3"><Button onClick={async () => { if (!form.institutionName.trim()) return; await upsertItem("education", form); setForm(emptyEducation); }}>Save</Button></div>
      </div>

      <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 sm:p-6 space-y-2">
        {data.education.map((item) => (
          <div key={item.id} className="grid gap-2 rounded-lg border border-neutral-800 bg-neutral-900 p-3 sm:grid-cols-[1.5fr_1fr_120px_auto]">
            <div><p className="text-sm font-medium text-white">{item.degree}</p><p className="text-xs text-neutral-400">{item.institutionName}</p></div>
            <p className="text-xs text-neutral-400">{item.duration}</p>
            <select value={item.status} onChange={(e) => void updateStatus("education", item.id, e.target.value as ContentStatus)} className="rounded-md border border-neutral-700 bg-neutral-950 px-2 py-1 text-xs text-neutral-200">{statusOptions.map((status) => <option key={status} value={status}>{status}</option>)}</select>
            <div className="flex justify-end gap-2"><button onClick={() => setForm({ ...item })} className="rounded-md border border-neutral-700 px-2 py-1 text-xs text-neutral-200">Edit</button><button onClick={() => void deleteItem("education", item.id)} className="rounded-md border border-rose-700 px-2 py-1 text-xs text-rose-300">Delete</button></div>
          </div>
        ))}
      </div>
    </section>
  );
}
