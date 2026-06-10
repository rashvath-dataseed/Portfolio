import { useState } from "react";
import Button from "../../components/ui/Button";
import { usePortfolio } from "../../context/PortfolioContext";
import type { Certification, ContentStatus } from "../../types/portfolio";

const statusOptions: ContentStatus[] = ["draft", "published", "archived"];

const emptyCertification: Omit<Certification, "id" | "updatedAt" | "publishedAt"> = {
  certificateName: "",
  issuingOrganization: "",
  issueDate: "",
  credentialUrl: "",
  certificateImage: "",
  status: "draft",
};

export default function AdminCertifications() {
  const { data, upsertItem, deleteItem, updateStatus } = usePortfolio();
  const [form, setForm] = useState(emptyCertification);

  if (!data) return null;

  return (
    <section className="space-y-5">
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 sm:p-6">
        <h2 className="text-lg font-semibold text-white">Add Certification</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <input placeholder="Certificate Name" value={form.certificateName} onChange={(e) => setForm((p) => ({ ...p, certificateName: e.target.value }))} className="rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white" />
          <input placeholder="Issuing Organization" value={form.issuingOrganization} onChange={(e) => setForm((p) => ({ ...p, issuingOrganization: e.target.value }))} className="rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white" />
          <input type="date" value={form.issueDate} onChange={(e) => setForm((p) => ({ ...p, issueDate: e.target.value }))} className="rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white" />
          <input placeholder="Credential URL" value={form.credentialUrl} onChange={(e) => setForm((p) => ({ ...p, credentialUrl: e.target.value }))} className="rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white" />
          <input placeholder="Certificate Image URL" value={form.certificateImage} onChange={(e) => setForm((p) => ({ ...p, certificateImage: e.target.value }))} className="rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white" />
          <select value={form.status} onChange={(e) => setForm((p) => ({ ...p, status: e.target.value as ContentStatus }))} className="rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white">{statusOptions.map((status) => <option key={status} value={status}>{status}</option>)}</select>
        </div>
        <div className="mt-3"><Button onClick={async () => { if (!form.certificateName.trim()) return; await upsertItem("certifications", form); setForm(emptyCertification); }}>Save</Button></div>
      </div>

      <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 sm:p-6 space-y-2">
        {data.certifications.map((item) => (
          <div key={item.id} className="grid gap-2 rounded-lg border border-neutral-800 bg-neutral-900 p-3 sm:grid-cols-[1.5fr_1fr_120px_auto]">
            <div><p className="text-sm font-medium text-white">{item.certificateName}</p><p className="text-xs text-neutral-400">{item.issuingOrganization}</p></div>
            <p className="text-xs text-neutral-400">{item.issueDate || "-"}</p>
            <select value={item.status} onChange={(e) => void updateStatus("certifications", item.id, e.target.value as ContentStatus)} className="rounded-md border border-neutral-700 bg-neutral-950 px-2 py-1 text-xs text-neutral-200">{statusOptions.map((status) => <option key={status} value={status}>{status}</option>)}</select>
            <div className="flex justify-end gap-2"><button onClick={() => setForm({ ...item })} className="rounded-md border border-neutral-700 px-2 py-1 text-xs text-neutral-200">Edit</button><button onClick={() => void deleteItem("certifications", item.id)} className="rounded-md border border-rose-700 px-2 py-1 text-xs text-rose-300">Delete</button></div>
          </div>
        ))}
      </div>
    </section>
  );
}
