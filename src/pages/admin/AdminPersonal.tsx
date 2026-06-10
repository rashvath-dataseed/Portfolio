import { useState } from "react";
import Button from "../../components/ui/Button";
import { usePortfolio } from "../../context/PortfolioContext";

export default function AdminPersonal() {
  const { data, updateData } = usePortfolio();
  const [saved, setSaved] = useState(false);

  if (!data) return null;

  const info = data.personalInfo;

  const setField = (key: keyof typeof info, value: string) => {
    void updateData((current) => ({
      ...current,
      personalInfo: {
        ...current.personalInfo,
        [key]: value,
      },
      lastUpdated: new Date().toISOString(),
    }));
  };

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <section className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 sm:p-6">
      <h2 className="text-lg font-semibold text-white">Personal Information</h2>
      <p className="mt-1 text-sm text-neutral-400">Edit profile details shown on the portfolio.</p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {[
          ["fullName", "Full Name"],
          ["designation", "Designation"],
          ["location", "Location"],
          ["email", "Email"],
          ["phone", "Phone"],
          ["linkedinUrl", "LinkedIn URL"],
          ["githubUrl", "GitHub URL"],
          ["twitterUrl", "Twitter/X URL"],
          ["resumeUrl", "Resume URL"],
          ["profilePicture", "Profile Picture URL"],
        ].map(([field, label]) => (
          <div key={field}>
            <label className="mb-1 block text-xs text-neutral-400">{label}</label>
            <input
              value={info[field as keyof typeof info]}
              onChange={(event) => setField(field as keyof typeof info, event.target.value)}
              className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white"
            />
          </div>
        ))}
      </div>

      <div className="mt-4">
        <label className="mb-1 block text-xs text-neutral-400">Short Bio</label>
        <textarea
          rows={3}
          value={info.shortBio}
          onChange={(event) => setField("shortBio", event.target.value)}
          className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white"
        />
      </div>

      <div className="mt-4">
        <label className="mb-1 block text-xs text-neutral-400">About Me</label>
        <textarea
          rows={5}
          value={info.aboutMe}
          onChange={(event) => setField("aboutMe", event.target.value)}
          className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white"
        />
      </div>

      <div className="mt-5 flex items-center gap-3">
        <Button onClick={save}>Save</Button>
        {saved ? <span className="text-sm text-emerald-400">Update successful</span> : null}
      </div>
    </section>
  );
}
