import { Navigate, Outlet } from "react-router-dom";
import { ADMIN_LOGIN_SLUG, useAuth } from "../../context/AuthContext";

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-950 text-neutral-200">
        Loading admin...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={ADMIN_LOGIN_SLUG} replace />;
  }

  return <Outlet />;
}
