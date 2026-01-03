import { useState } from "react";
import { getApiKey } from "~/utils/auth";

export function useClockifyWorkspaceDetails() {
  const [workspace, setWorkspace] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const fetchWorkspace = (workspaceId: string) => {
    if (!workspaceId) return;

    setLoading(true);
    setError(null);

    fetch(
      `${import.meta.env.VITE_CLOCKIFY_API_URL}/workspaces/${workspaceId}`,
      {
        headers: {
          "X-Api-Key": getApiKey()!,
        },
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch workspace details");
        return res.json();
      })
      .then((data) => {
        setWorkspace(data);
        const userId = data.memberships?.[0]?.userId || null;
        setUserId(userId);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  return { workspace, userId, loading, error, fetchWorkspace };
}
