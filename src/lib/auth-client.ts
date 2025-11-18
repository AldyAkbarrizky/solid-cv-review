"use client";

import Cookies from "js-cookie";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";
export const AUTH_COOKIE_KEY = "auth_token";
export const SESSION_EXPIRED_MESSAGE = "session_expired";
const DAY_IN_SECONDS = 86400;
const MIN_COOKIE_LIFETIME_DAYS = 1 / 24; // 1 hour fallback

type FetchHeaders = HeadersInit | undefined;

export interface AuthFetchOptions extends RequestInit {
  skipAuth?: boolean;
  retryOnUnauthorized?: boolean;
}

export const setAuthToken = (token: string, expiresInSeconds?: number) => {
  const ttlSeconds = expiresInSeconds ?? DAY_IN_SECONDS;
  const expiresInDays = Math.max(ttlSeconds / DAY_IN_SECONDS, MIN_COOKIE_LIFETIME_DAYS);
  Cookies.set(AUTH_COOKIE_KEY, token, { expires: expiresInDays, path: "/" });
};

export const getAuthToken = (): string | null => Cookies.get(AUTH_COOKIE_KEY) ?? null;

export const clearAuthToken = () => {
  Cookies.remove(AUTH_COOKIE_KEY, { path: "/" });
};

export const redirectToLoginWithMessage = (
  message = SESSION_EXPIRED_MESSAGE,
  from?: string
) => {
  clearAuthToken();

  if (typeof window === "undefined") return;

  const loginUrl = new URL("/login", window.location.origin);
  if (message) {
    loginUrl.searchParams.set("message", message);
  }

  const currentPath = window.location.pathname;
  const redirectFrom =
    from ?? (currentPath && currentPath !== "/login" ? currentPath : undefined);

  if (redirectFrom) {
    loginUrl.searchParams.set("from", redirectFrom);
  }

  const target = loginUrl.toString();
  if (window.location.href !== target) {
    window.location.replace(target);
  }
};

export const refreshAccessToken = async (): Promise<string | null> => {
  if (!API_BASE_URL) return null;

  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      return null;
    }

    const result = await response.json();
    const token = result?.data?.token ?? result?.token;
    const expiresIn = result?.data?.expiresIn ?? result?.expiresIn;

    if (!token) {
      return null;
    }

    setAuthToken(token, expiresIn);
    return token;
  } catch (error) {
    console.error("Failed to refresh access token:", error);
    return null;
  }
};

export const authFetch = async (
  endpoint: string,
  options: AuthFetchOptions = {}
): Promise<Response> => {
  const {
    skipAuth = false,
    retryOnUnauthorized = true,
    headers: incomingHeaders,
    ...rest
  } = options;

  const headers = new Headers(incomingHeaders as FetchHeaders);
  let token = getAuthToken();

  if (!skipAuth) {
    if (!token) {
      redirectToLoginWithMessage();
      throw new Error("Unauthorized");
    }
    headers.set("Authorization", `Bearer ${token}`);
  }

  const targetUrl = endpoint.startsWith("http")
    ? endpoint
    : `${API_BASE_URL}${endpoint}`;

  const executeFetch = () =>
    fetch(targetUrl, {
      ...rest,
      headers,
      credentials: "include",
    });

  let response = await executeFetch();

  if (response.status !== 401 || skipAuth) {
    return response;
  }

  if (retryOnUnauthorized) {
    const refreshedToken = await refreshAccessToken();

    if (refreshedToken) {
      headers.set("Authorization", `Bearer ${refreshedToken}`);
      response = await executeFetch();
      if (response.status !== 401) {
        return response;
      }
    }
  }

  redirectToLoginWithMessage();
  throw new Error("Unauthorized");
};
