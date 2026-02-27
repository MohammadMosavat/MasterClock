import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import { useClockifyWorkspaces } from "~/hooks/useClockifyWorkspaces";
import { useClockifyTimeEntries } from "~/hooks/useWorkspaceTimeEntries";
import { parseISODurationToMinutes, minutesToHuman } from "~/utils/time";
import type { ClockifyTimeEntry } from "~/types";

import { Card, CardContent } from "~/components/ui/card";
import { Loader2, Clock, LayoutGrid } from "lucide-react";

interface WorkspaceStat {
  id: string;
  name: string;
  totalMinutes: number;
  entriesCount: number;
}

export default function DashboardPage() {
  const { userId } = useOutletContext<{ userId: string }>();

  const {
    workspaces,
    fetchWorkspaces,
    loading: workspaceLoading,
    error: workspaceError,
  } = useClockifyWorkspaces();

  const {
    timeEntries,
    fetchAllTimeEntries,
    loading: entriesLoading,
    error: entriesError,
  } = useClockifyTimeEntries();

  const [workspaceStats, setWorkspaceStats] = useState<WorkspaceStat[]>([]);

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  useEffect(() => {
    if (!workspaces?.length) return;

    const loadAll = async () => {
      const stats: WorkspaceStat[] = [];

      for (const ws of workspaces) {
        await fetchAllTimeEntries(ws.id, userId);

        const totalMinutes = timeEntries.reduce(
          (sum: number, entry: ClockifyTimeEntry) =>
            sum + parseISODurationToMinutes(entry.timeInterval.duration),
          0,
        );

        stats.push({
          id: ws.id,
          name: ws.name,
          totalMinutes,
          entriesCount: timeEntries.length,
        });
      }

      setWorkspaceStats(stats);
    };

    loadAll();
  }, [workspaces]);

  if (workspaceLoading || entriesLoading)
    return (
      <div className="flex justify-center mt-16">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-400" />
      </div>
    );

  if (workspaceError || entriesError)
    return (
      <p className="text-red-400 text-sm">Failed to load dashboard data.</p>
    );

  return (
    <div>
      {workspaceStats.length === 0 ? (
        <Card className="border border-white/10 bg-white/5 backdrop-blur">
          <CardContent className="px-5 py-6">
            <p className="text-white/50 text-sm">
              No workspace data available.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {workspaceStats.map((ws) => (
            <Card
              key={ws.id}
              className="border border-white/10 bg-white/5 backdrop-blur
                         hover:border-indigo-500/50 transition-colors"
            >
              <CardContent className="px-5 py-5 space-y-3">
                {/* Workspace name */}
                <div className="flex items-center gap-2">
                  <LayoutGrid className="h-4 w-4 text-indigo-400 shrink-0" />
                  <h3 className="font-semibold text-white truncate">
                    {ws.name}
                  </h3>
                </div>

                {/* Total time */}
                <p className="text-3xl font-bold text-white tabular-nums">
                  {minutesToHuman(ws.totalMinutes)}
                </p>

                {/* Entry count */}
                <div className="flex items-center gap-1.5 text-white/50 text-sm">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{ws.entriesCount} time entries</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
