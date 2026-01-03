import { useState, useCallback } from "react";
import type { ClockifyProject } from "~/types";
import { getApiKey } from "~/utils/auth";

export function useClockifyProjects() {
  const [projects, setProjects] = useState<ClockifyProject[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(
    async (workspaceId: string, projectId: string | null) => {
      const apiKey = getApiKey() || "";
      if (!apiKey) {
        setError("Clockify API key is missing");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_CLOCKIFY_API_URL
          }/workspaces/${workspaceId}/projects`,
          {
            headers: {
              "X-Api-Key": apiKey,
            },
          }
        );

        if (!res.ok) {
          throw new Error(`Error fetching projects: ${res.statusText}`);
        }

        const data: ClockifyProject[] = await res.json();
        if (projectId) {
          const getProjectById = data.filter((data) => data.id == projectId);
          setProjects(getProjectById);
        } else {
          setProjects(data);
        }
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { projects, loading, error, fetchProjects };
}
