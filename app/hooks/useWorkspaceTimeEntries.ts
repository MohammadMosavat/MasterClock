import { useState } from "react";
import type { ClockifyTimeEntry } from "~/types";
import { getApiKey, hasApiKey } from "~/utils/auth";

interface TimeEntryFilters {
  start?: string;
  end?: string;
}

export function useClockifyTimeEntries() {
  const [timeEntries, setTimeEntries] = useState<ClockifyTimeEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAllTimeEntries = async (
    workspaceId: string,
    userId: string,
    filters?: TimeEntryFilters,
    pageSize = 5000
  ) => {
    if (!workspaceId || !userId) return;

    setLoading(true);
    setError(null);

    try {
      let page = 1;
      let allEntries: ClockifyTimeEntry[] = [];
      let hasMore = true;

      while (hasMore) {
        const params = new URLSearchParams({
          page: String(page),
          "page-size": String(pageSize),
        });

        if (filters?.start) {
          params.set("start", `${filters.start}T00:00:00Z`);
        }

        if (filters?.end) {
          params.set("end", `${filters.end}T23:59:59Z`);
        }

        const res = await fetch(
          `${
            import.meta.env.VITE_CLOCKIFY_API_URL
          }/workspaces/${workspaceId}/user/${userId}/time-entries?${params}`,
          {
            headers: {
              "X-Api-Key": getApiKey()!,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch time entries");
        }

        const data: ClockifyTimeEntry[] = await res.json();

        allEntries = allEntries.concat(data);

        if (data.length < pageSize) {
          hasMore = false;
        } else {
          page++;
        }
      }

      setTimeEntries(allEntries);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return {
    timeEntries,
    loading,
    error,
    fetchAllTimeEntries,
  };
}
