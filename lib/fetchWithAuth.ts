"use client";

import { useAuthStore } from "@/store/authStore";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL environment variable is not defined");
}

export async function fetchWithAuth<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const { tokens, refreshAuth, logout } = useAuthStore.getState();

  if (!tokens?.accessToken) {
    logout();
    throw new Error("No access token available");
  }

  const makeRequest = async (token: string): Promise<Response> => {
    return fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });
  };

  let response = await makeRequest(tokens.accessToken);

  if (response.status === 401) {
    const refreshed = await refreshAuth();
    if (refreshed) {
      const newTokens = useAuthStore.getState().tokens;
      if (newTokens?.accessToken) {
        response = await makeRequest(newTokens.accessToken);
      }
    }
  }

  if (!response.ok) {
    if (response.status === 401) {
      logout();
    }
    const body = await response
      .json()
      .catch(() => ({ message: "Request failed" }));
    throw new Error(body.message ?? "Request failed");
  }

  return response.json() as Promise<T>;
}
