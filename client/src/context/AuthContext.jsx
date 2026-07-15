import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const AuthContext = createContext(null);

const API_BASE =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Not the session itself (that's the httpOnly cookie the server controls) —
// just a client-readable breadcrumb so we know whether it's worth asking
// the server "am I logged in?" at all. Avoids firing (and console-logging)
// a 401 on every single page load for visitors who were never logged in.
const SESSION_HINT_KEY = "psg_had_session";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); // admin | superadmin | alumni
  // Lazy init: only start in a "loading" state if a previous session hinted
  // we have something to verify. A first-time/logged-out visitor has nothing
  // to fetch, so they should never be in a loading state to begin with —
  // that avoids needing to setState(false) synchronously inside an effect.
  const [authLoading, setAuthLoading] = useState(
    () => !!localStorage.getItem(SESSION_HINT_KEY)
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ── Fetch Profile ───────────────────────────────────────────────
  const fetchProfile = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/auth/profile`, {
        credentials: "include",
      });

      if (!res.ok) throw new Error("Unauthorized");

      const data = await res.json();

      const freshUser = data?.user ?? null;

      if (freshUser) {
        // Normalize user object with required fields
        const normalizedUser = {
          ...freshUser,
          role: freshUser.role || "alumni",
          isAdmin: freshUser.isAdmin ?? false,
          isApproved: freshUser.isApproved ?? true,
        };

        setUser(normalizedUser);
        setRole(normalizedUser.role);
        setIsAuthenticated(true);
        localStorage.setItem(SESSION_HINT_KEY, "1");
      } else {
        throw new Error("No user found");
      }
    } catch {
      setUser(null);
      setRole(null);
      setIsAuthenticated(false);
      localStorage.removeItem(SESSION_HINT_KEY);
    } finally {
      setAuthLoading(false);
    }
  }, []);

  // ── Initial Load ────────────────────────────────────────────────
  // Only hit /auth/profile if a previous session hinted we might have one.
  // A first-time or logged-out visitor skips the request (and the 401) entirely
  // — authLoading is already `false` for them via the lazy useState above,
  // so there's no branch here that needs to setState synchronously.
  useEffect(() => {
    if (localStorage.getItem(SESSION_HINT_KEY)) {
      // This IS the effect's job: verify the session against the server and
      // sync the result into state. fetchProfile only calls setState after
      // its `await fetch(...)` resolves, so it can't cause a synchronous
      // cascading render — the lint rule can't see through the async
      // boundary, but this is the pattern React's own docs recommend for
      // "fetch on mount" effects.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchProfile();
    }
  }, [fetchProfile]);

  // ── Login ──────────────────────────────────────────────────────
  // Works for both email/password and social login
  const login = useCallback(
    async (userData) => {
      // Normalize user object
      const normalizedUser = {
        ...userData,
        role: userData.role || "alumni",
        isAdmin: userData.isAdmin ?? false,
        isApproved: userData.isApproved ?? true,
      };

      setUser(normalizedUser);
      setRole(normalizedUser.role);
      setIsAuthenticated(true);
      localStorage.setItem(SESSION_HINT_KEY, "1");

      // Refresh from server
      try {
        await fetchProfile();
      } catch (err) {
        console.error("Login refresh failed", err);
      }
    },
    [fetchProfile]
  );

  // ── Logout ─────────────────────────────────────────────────────
  const logout = useCallback(async () => {
    try {
      await fetch(`${API_BASE}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout request failed", err);
    }

    setUser(null);
    setRole(null);
    setIsAuthenticated(false);
    localStorage.removeItem(SESSION_HINT_KEY);
  }, []);

  // ── Refresh User ───────────────────────────────────────────────
  const refreshUser = useCallback(async () => {
    try {
      await fetchProfile();
    } catch {
      await logout();
    }
  }, [fetchProfile, logout]);

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated,
        login,
        logout,
        refreshUser,
        authLoading,

        // helper flags
        isAdmin: role === "admin",
        isSuperAdmin: role === "superadmin",
        isAlumni: role === "alumni",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// This file exports both a component (AuthProvider) and a hook (useAuth),
// which react-refresh/only-export-components flags because it means Fast
// Refresh has to do a full reload of this file instead of a fast in-place
// swap. That's a minor DX cost, not a correctness issue — splitting useAuth
// into its own file would be the "by the book" fix, but it'd mean updating
// the import in every component that currently does
// `import { useAuth } from "./context/AuthContext.jsx"`. Disabling here for
// now; happy to do the split later if the extra reloads get annoying.
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx)
    throw new Error(
      "useAuth must be used inside <AuthProvider>"
    );
  return ctx;
}