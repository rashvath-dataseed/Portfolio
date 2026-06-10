import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import Button from "../../components/ui/Button";
import {
  ADMIN_DASHBOARD_ROOT,
  ADMIN_LOGIN_SLUG,
  useAuth,
} from "../../context/AuthContext";

const menuItems = [
  { label: "Overview", path: "" },
  { label: "Personal", path: "personal" },
  { label: "Projects", path: "projects" },
  { label: "Skills", path: "skills" },
  { label: "Experience", path: "experience" },
  { label: "Certifications", path: "certifications" },
  { label: "Education", path: "education" },
  { label: "Testimonials", path: "testimonials" },
  { label: "Contact", path: "contact" },
  { label: "Settings", path: "settings" },
  { label: "Analytics", path: "analytics" },
];

export default function AdminLayout() {
  const { currentUser, logout, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={ADMIN_LOGIN_SLUG} replace />;
  }

  const active = (path: string) => {
    const fullPath = path ? `${ADMIN_DASHBOARD_ROOT}/${path}` : ADMIN_DASHBOARD_ROOT;
    return location.pathname === fullPath;
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <header className="sticky top-0 z-20 border-b border-neutral-800 bg-neutral-950/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-lg font-semibold text-white">Portfolio Admin Dashboard</h1>
            <p className="text-xs text-neutral-400">Signed in as {currentUser ?? "Admin"}</p>
          </div>
          <div className="flex items-center gap-3">
            <Button href="/" variant="secondary" size="sm">
              View Portfolio
            </Button>
            <Button
              size="sm"
              onClick={async () => {
                await logout();
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[220px_1fr] lg:px-8">
        <aside className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-3">
          <nav className="grid gap-1">
            {menuItems.map((item) => {
              const href = item.path
                ? `${ADMIN_DASHBOARD_ROOT}/${item.path}`
                : ADMIN_DASHBOARD_ROOT;
              return (
                <Link
                  key={item.label}
                  to={href}
                  className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                    active(item.path)
                      ? "bg-accent-600 text-white"
                      : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
