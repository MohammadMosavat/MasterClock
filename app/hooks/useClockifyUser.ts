// ~/hooks/useClockifyUser.ts
import { useState, useEffect, useCallback } from "react";
import { getApiKey, hasApiKey } from "~/utils/auth";

export interface ClockifyUser {
  id: string;
  name: string;
  email: string;
  activeWorkspace: string;
  memberships: Array<{
    workspaceId: string;
    userId: string;
    membershipType: string;
  }>;
  imageUrl?: string;
  emailVerified?: boolean;
}

export function useClockifyUser() {
  const [user, setUser] = useState<ClockifyUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    const apiKey = getApiKey();
    if (!apiKey) {
      setError("API key not found");
      setUser(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${import.meta.env.VITE_CLOCKIFY_API_URL}/user`, {
        headers: {
          "X-Api-Key": apiKey,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch user: ${res.status}`);
      }

      const data: ClockifyUser = await res.json();
      setUser(data);
    } catch (err: any) {
      setError(err.message || "Unknown error");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { user, fetchUser, loading, error };
}
