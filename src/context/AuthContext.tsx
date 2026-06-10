import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { firebaseAuth, isFirebaseConfigured } from "../lib/firebase";

const AUTH_STORAGE_KEY = "portfolio-admin-auth";
export const ADMIN_LOGIN_SLUG = "/admin-login-unique-slug";
export const ADMIN_DASHBOARD_ROOT = `${ADMIN_LOGIN_SLUG}/dashboard`;

const FALLBACK_ADMIN_EMAIL =
  import.meta.env.VITE_ADMIN_EMAIL ?? "admin@portfolio.local";
const FALLBACK_ADMIN_PASSWORD =
  import.meta.env.VITE_ADMIN_PASSWORD ?? "admin123";

interface AuthContextValue {
  isAuthenticated: boolean;
  currentUser: string | null;
  loading: boolean;
  login: (input: {
    emailOrUsername: string;
    password: string;
    rememberMe: boolean;
  }) => Promise<{ ok: boolean; message?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) {
      setLoading(false);
      return;
    }

    try {
      const parsed = JSON.parse(raw) as {
        user: string;
        expiresAt: number;
      };

      if (parsed.expiresAt > Date.now()) {
        setIsAuthenticated(true);
        setCurrentUser(parsed.user);
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(
    async ({ emailOrUsername, password, rememberMe }: { emailOrUsername: string; password: string; rememberMe: boolean }) => {
      const normalized = emailOrUsername.trim().toLowerCase();

      if (!normalized || !password) {
        return { ok: false, message: "Email/username and password are required." };
      }

      if (isFirebaseConfigured && firebaseAuth) {
        try {
          const credential = await signInWithEmailAndPassword(
            firebaseAuth,
            normalized,
            password,
          );
          const expiryMs = rememberMe ? 30 * 24 * 60 * 60 * 1000 : 12 * 60 * 60 * 1000;
          const authPayload = {
            user: credential.user.email ?? normalized,
            expiresAt: Date.now() + expiryMs,
          };
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authPayload));
          setCurrentUser(authPayload.user);
          setIsAuthenticated(true);
          return { ok: true };
        } catch {
          return { ok: false, message: "Invalid credentials." };
        }
      }

      const usernameMatches =
        normalized === FALLBACK_ADMIN_EMAIL.toLowerCase() || normalized === "admin";
      const passwordMatches = password === FALLBACK_ADMIN_PASSWORD;

      if (!usernameMatches || !passwordMatches) {
        return { ok: false, message: "Invalid credentials." };
      }

      const expiryMs = rememberMe ? 30 * 24 * 60 * 60 * 1000 : 12 * 60 * 60 * 1000;
      const authPayload = {
        user: FALLBACK_ADMIN_EMAIL,
        expiresAt: Date.now() + expiryMs,
      };
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authPayload));
      setCurrentUser(authPayload.user);
      setIsAuthenticated(true);
      return { ok: true };
    },
    [],
  );

  const logout = useCallback(async () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    if (isFirebaseConfigured && firebaseAuth) {
      await signOut(firebaseAuth);
    }
    setCurrentUser(null);
    setIsAuthenticated(false);
  }, []);

  const value = useMemo(
    () => ({ isAuthenticated, currentUser, loading, login, logout }),
    [currentUser, isAuthenticated, loading, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
