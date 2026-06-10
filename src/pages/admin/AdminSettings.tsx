import { useState } from "react";
import Button from "../../components/ui/Button";
import { usePortfolio } from "../../context/PortfolioContext";

export default function AdminSettings() {
  const { data, updateData } = usePortfolio();
  const [saved, setSaved] = useState(false);

  if (!data) return null;

  const settings = data.settings;

  const setField = (key: keyof typeof settings, value: string | boolean) => {
    void updateData((current) => ({
      ...current,
      settings: {
        ...current.settings,
        [key]: value,
      },
      lastUpdated: new Date().toISOString(),
    }));
  };

  return (
    <section className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 sm:p-6">
      <h2 className="text-lg font-semibold text-white">Portfolio Settings</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-neutral-200">
          <input
            type="checkbox"
            checked={settings.darkModeDefault}
            onChange={(event) => setField("darkModeDefault", event.target.checked)}
          />
          Dark Mode Default
        </label>
        <input placeholder="Portfolio Theme" value={settings.portfolioTheme} onChange={(event) => setField("portfolioTheme", event.target.value)} className="rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white" />
        <input placeholder="Primary Color" value={settings.primaryColor} onChange={(event) => setField("primaryColor", event.target.value)} className="rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white" />
        <input placeholder="Secondary Color" value={settings.secondaryColor} onChange={(event) => setField("secondaryColor", event.target.value)} className="rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white" />
        <input placeholder="SEO Title" value={settings.seoTitle} onChange={(event) => setField("seoTitle", event.target.value)} className="rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white" />
        <input placeholder="Open Graph Image URL" value={settings.openGraphImage} onChange={(event) => setField("openGraphImage", event.target.value)} className="rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white" />
      </div>
      <textarea rows={4} placeholder="SEO Description" value={settings.seoDescription} onChange={(event) => setField("seoDescription", event.target.value)} className="mt-3 w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white" />
      <div className="mt-4 flex items-center gap-3">
        <Button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}>Save Settings</Button>
        {saved ? <span className="text-sm text-emerald-400">Save successful</span> : null}
      </div>
    </section>
  );
}
