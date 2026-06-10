import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { ADMIN_DASHBOARD_ROOT, useAuth } from "../context/AuthContext";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (isAuthenticated) {
    return <Navigate to={ADMIN_DASHBOARD_ROOT} replace />;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    const result = await login({ emailOrUsername, password, rememberMe });
    setSubmitting(false);

    if (!result.ok) {
      setError(result.message ?? "Login failed.");
      return;
    }

    navigate(ADMIN_DASHBOARD_ROOT, { replace: true });
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-neutral-950 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-neutral-700/50 bg-neutral-900/70 p-6 backdrop-blur-sm sm:p-8">
        <h1 className="text-2xl font-semibold text-white">Admin Login</h1>
        <p className="mt-2 text-sm text-neutral-400">
          Sign in to manage portfolio content.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-neutral-300">
              Email or Username
            </label>
            <input
              type="text"
              required
              value={emailOrUsername}
              onChange={(event) => setEmailOrUsername(event.target.value)}
              className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2.5 text-sm text-white focus:border-accent-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-neutral-300">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2.5 text-sm text-white focus:border-accent-500 focus:outline-none"
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-neutral-300">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
            />
            Remember me
          </label>

          {error ? (
            <p className="rounded-lg border border-rose-600/40 bg-rose-950/30 px-3 py-2 text-sm text-rose-200">
              {error}
            </p>
          ) : null}

          <Button type="submit" size="lg" className="w-full" disabled={submitting}>
            {submitting ? "Signing in..." : "Login"}
          </Button>
        </form>
      </div>
    </section>
  );
}
