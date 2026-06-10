import { useState } from "react";
import Button from "../../components/ui/Button";
import { usePortfolio } from "../../context/PortfolioContext";

export default function AdminContact() {
  const { data, updateData } = usePortfolio();
  const [saved, setSaved] = useState(false);

  if (!data) return null;

  const contact = data.contactInfo;

  const setField = (key: keyof typeof contact, value: string) => {
    void updateData((current) => ({
      ...current,
      contactInfo: {
        ...current.contactInfo,
        [key]: value,
      },
      lastUpdated: new Date().toISOString(),
    }));
  };

  return (
    <section className="space-y-5">
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 sm:p-6">
        <h2 className="text-lg font-semibold text-white">Contact Information</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            ["email", "Email"],
            ["phone", "Phone"],
            ["linkedIn", "LinkedIn"],
            ["github", "GitHub"],
            ["twitterX", "Twitter/X"],
            ["portfolioUrl", "Portfolio URL"],
          ].map(([field, label]) => (
            <div key={field}>
              <label className="mb-1 block text-xs text-neutral-400">{label}</label>
              <input
                value={contact[field as keyof typeof contact]}
                onChange={(event) => setField(field as keyof typeof contact, event.target.value)}
                className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white"
              />
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-3">
          <Button
            onClick={() => {
              setSaved(true);
              setTimeout(() => setSaved(false), 2000);
            }}
          >
            Save
          </Button>
          {saved ? <span className="text-sm text-emerald-400">Save successful</span> : null}
        </div>
      </div>

      <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 sm:p-6">
        <h3 className="text-base font-medium text-white">Contact Form Submissions</h3>
        <div className="mt-3 space-y-2">
          {data.contactSubmissions.length ? (
            data.contactSubmissions.slice(0, 20).map((submission) => (
              <div key={submission.id} className="rounded-lg border border-neutral-800 bg-neutral-900 p-3 text-sm">
                <p className="font-medium text-white">{submission.subject}</p>
                <p className="text-xs text-neutral-400">{submission.name} · {submission.email} · {new Date(submission.submittedAt).toLocaleString()}</p>
                <p className="mt-2 text-neutral-300">{submission.message}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-neutral-400">No submissions yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}
