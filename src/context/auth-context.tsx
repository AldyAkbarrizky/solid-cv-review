"use client";

import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  API_BASE_URL,
  authFetch,
  clearAuthToken,
  getAuthToken,
} from "@/lib/auth-client";

type AuthUser = {
  id: number;
  name: string;
  email: string;
  role?: string;
  emailVerified?: boolean;
};

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  refreshSession: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const loadSession = useCallback(async () => {
    const token = getAuthToken();

    if (!token) {
      setUser(null);
      setIsCheckingAuth(false);
      return;
    }

    try {
      const response = await authFetch("/settings/me");

      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      const result = await response.json();
      setUser(result.data?.user ?? null);
    } catch (error) {
      console.error("Failed to load auth session:", error);
      setUser(null);
    } finally {
      setIsCheckingAuth(false);
    }
  }, []);

  useEffect(() => {
    loadSession();
  }, [loadSession]);

  const refreshSession = useCallback(async () => {
    setIsCheckingAuth(true);
    await loadSession();
  }, [loadSession]);

  const logout = useCallback(async () => {
    try {
      const token = getAuthToken();
      const headers: HeadersInit = token
        ? { Authorization: `Bearer ${token}` }
        : {};

      if (API_BASE_URL) {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: "POST",
          headers,
          credentials: "include",
        });
      }
    } catch (error) {
      console.error("Failed to logout:", error);
    } finally {
      clearAuthToken();
      setUser(null);
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isCheckingAuth,
      refreshSession,
      logout,
    }),
    [isCheckingAuth, logout, refreshSession, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
