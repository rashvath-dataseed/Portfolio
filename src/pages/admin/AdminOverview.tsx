import { useMemo } from "react";
import { usePortfolio } from "../../context/PortfolioContext";

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4">
      <p className="text-xs uppercase tracking-wide text-neutral-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
    </div>
  );
}

export default function AdminOverview() {
  const { data, loading } = usePortfolio();

  const mostViewedProjects = useMemo(() => {
    if (!data) return [];
    return [...data.projects]
      .map((project) => ({
        project,
        views: data.analytics.projectViews[project.id] ?? 0,
      }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 5);
  }, [data]);

  if (loading || !data) {
    return <p className="text-neutral-300">Loading dashboard...</p>;
  }

  return (
    <section className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard label="Total Projects" value={data.projects.length} />
        <StatCard label="Total Skills" value={data.skills.length} />
        <StatCard label="Experience Entries" value={data.experience.length} />
        <StatCard label="Certifications" value={data.certifications.length} />
        <StatCard
          label="Last Updated"
          value={new Date(data.lastUpdated).toLocaleString()}
        />
      </div>

      <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4">
        <h2 className="text-lg font-semibold text-white">Quick Actions</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href="/admin-login-unique-slug/dashboard/projects"
            className="rounded-lg bg-accent-600 px-3 py-2 text-sm font-medium text-white"
          >
            Quick Add Project
          </a>
          <a
            href="/admin-login-unique-slug/dashboard/skills"
            className="rounded-lg bg-accent-600 px-3 py-2 text-sm font-medium text-white"
          >
            Quick Add Skill
          </a>
          <a
            href="/"
            className="rounded-lg border border-neutral-700 px-3 py-2 text-sm font-medium text-neutral-200"
          >
            View Portfolio
          </a>
        </div>
      </div>

      <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4">
        <h2 className="text-lg font-semibold text-white">Most Viewed Projects</h2>
        <div className="mt-3 space-y-2 text-sm">
          {mostViewedProjects.length ? (
            mostViewedProjects.map(({ project, views }) => (
              <div key={project.id} className="flex items-center justify-between rounded-md bg-neutral-900 p-2">
                <span className="text-neutral-200">{project.title}</span>
                <span className="text-neutral-400">{views} views</span>
              </div>
            ))
          ) : (
            <p className="text-neutral-400">No project views tracked yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}
