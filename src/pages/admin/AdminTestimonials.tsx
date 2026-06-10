import { useState } from "react";
import Button from "../../components/ui/Button";
import { usePortfolio } from "../../context/PortfolioContext";
import type { ContentStatus, Testimonial } from "../../types/portfolio";

const statusOptions: ContentStatus[] = ["draft", "published", "archived"];

const emptyTestimonial: Omit<Testimonial, "id" | "updatedAt" | "publishedAt"> = {
  name: "",
  designation: "",
  company: "",
  feedback: "",
  profileImage: "",
  status: "draft",
};

export default function AdminTestimonials() {
  const { data, upsertItem, deleteItem, updateStatus } = usePortfolio();
  const [form, setForm] = useState(emptyTestimonial);

  if (!data) return null;

  return (
    <section className="space-y-5">
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 sm:p-6">
        <h2 className="text-lg font-semibold text-white">Add Testimonial</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <input placeholder="Name" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} className="rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white" />
          <input placeholder="Designation" value={form.designation} onChange={(e) => setForm((p) => ({ ...p, designation: e.target.value }))} className="rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white" />
          <input placeholder="Company" value={form.company} onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))} className="rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white" />
          <input placeholder="Profile Image URL" value={form.profileImage} onChange={(e) => setForm((p) => ({ ...p, profileImage: e.target.value }))} className="rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white" />
          <select value={form.status} onChange={(e) => setForm((p) => ({ ...p, status: e.target.value as ContentStatus }))} className="rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white">{statusOptions.map((status) => <option key={status} value={status}>{status}</option>)}</select>
        </div>
        <textarea rows={4} placeholder="Feedback" value={form.feedback} onChange={(e) => setForm((p) => ({ ...p, feedback: e.target.value }))} className="mt-3 w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white" />
        <div className="mt-3"><Button onClick={async () => { if (!form.name.trim()) return; await upsertItem("testimonials", form); setForm(emptyTestimonial); }}>Save</Button></div>
      </div>

      <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 sm:p-6 space-y-2">
        {data.testimonials.map((item) => (
          <div key={item.id} className="grid gap-2 rounded-lg border border-neutral-800 bg-neutral-900 p-3 sm:grid-cols-[1.5fr_1fr_120px_auto]">
            <div><p className="text-sm font-medium text-white">{item.name}</p><p className="text-xs text-neutral-400">{item.designation} · {item.company}</p></div>
            <p className="line-clamp-2 text-xs text-neutral-400">{item.feedback}</p>
            <select value={item.status} onChange={(e) => void updateStatus("testimonials", item.id, e.target.value as ContentStatus)} className="rounded-md border border-neutral-700 bg-neutral-950 px-2 py-1 text-xs text-neutral-200">{statusOptions.map((status) => <option key={status} value={status}>{status}</option>)}</select>
            <div className="flex justify-end gap-2"><button onClick={() => setForm({ ...item })} className="rounded-md border border-neutral-700 px-2 py-1 text-xs text-neutral-200">Edit</button><button onClick={() => void deleteItem("testimonials", item.id)} className="rounded-md border border-rose-700 px-2 py-1 text-xs text-rose-300">Delete</button></div>
          </div>
        ))}
      </div>
    </section>
  );
}
