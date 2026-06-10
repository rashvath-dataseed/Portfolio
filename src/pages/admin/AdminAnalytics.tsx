import { useMemo } from "react";
import { usePortfolio } from "../../context/PortfolioContext";

export default function AdminAnalytics() {
  const { data } = usePortfolio();

  const topProjects = useMemo(() => {
    if (!data) return [];
    return Object.entries(data.analytics.projectViews)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([projectId, views]) => {
        const project = data.projects.find((item) => item.id === projectId);
        return {
          name: project?.title ?? projectId,
          views,
        };
      });
  }, [data]);

  if (!data) return null;

  return (
    <section className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4">
          <p className="text-xs uppercase text-neutral-500">Portfolio Visits</p>
          <p className="mt-2 text-2xl font-semibold text-white">{data.analytics.portfolioVisits}</p>
        </div>
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4">
          <p className="text-xs uppercase text-neutral-500">Resume Downloads</p>
          <p className="mt-2 text-2xl font-semibold text-white">{data.analytics.resumeDownloads}</p>
        </div>
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4">
          <p className="text-xs uppercase text-neutral-500">Contact Form Submissions</p>
          <p className="mt-2 text-2xl font-semibold text-white">{data.analytics.contactFormSubmissions}</p>
        </div>
      </div>

      <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4">
        <h2 className="text-lg font-semibold text-white">Most Viewed Projects</h2>
        <div className="mt-3 space-y-2">
          {topProjects.length ? (
            topProjects.map((item) => (
              <div key={item.name} className="flex items-center justify-between rounded-lg border border-neutral-800 bg-neutral-900 p-2 text-sm">
                <span className="text-neutral-200">{item.name}</span>
                <span className="text-neutral-400">{item.views}</span>
              </div>
            ))
          ) : (
            <p className="text-sm text-neutral-400">No project views available yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}
