import { useState } from "react";
import { getApiKey } from "~/utils/auth";

export interface ClockifyWorkspace {
  id: string;
  name: string;
}

export function useClockifyWorkspaces() {
  const [workspaces, setWorkspaces] = useState<ClockifyWorkspace[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWorkspaces = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_CLOCKIFY_API_URL}/workspaces`,
        {
          headers: {
            "X-Api-Key": getApiKey()!,
          },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch workspaces");
      const data = await res.json();
      setWorkspaces(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { workspaces, loading, error, fetchWorkspaces };
}
