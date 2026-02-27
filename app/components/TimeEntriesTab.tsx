import { useEffect, useState } from "react";
import type { ClockifyTimeEntry } from "~/types";
import { Card, CardContent } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { Loader2 } from "lucide-react";
import formatDuration from "~/utils/formatDuration";
import { useClockifyProjects } from "~/hooks/useClockifyProjects";

interface TimeEntriesTabProps {
  entries: ClockifyTimeEntry;
  workspaceId: string | null;
}

const TimeEntriesTab = ({ entries, workspaceId }: TimeEntriesTabProps) => {
  const { projects, loading, fetchProjects } = useClockifyProjects();
  const [projectName, setProjectName] = useState("N/A");

  useEffect(() => {
    if (workspaceId && entries.projectId) {
      fetchProjects(workspaceId, entries.projectId);
    }
  }, [workspaceId, entries.projectId]);

  useEffect(() => {
    if (projects.length && entries.projectId) {
      const project = projects.find((p) => p.id === entries.projectId);
      setProjectName(project?.name || "N/A");
    }
  }, [projects, entries.projectId]);

  const entryDate = new Date(entries.timeInterval.start).toLocaleDateString(
    undefined,
    { year: "numeric", month: "short", day: "numeric" },
  );

  return (
    <Card
      className="w-full border border-white/10 bg-white/5 backdrop-blur
                 transition-all duration-200 hover:-translate-y-0.5
                 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10"
    >
      <CardContent className="px-5 py-4 space-y-3">
        {/* Header: description + date */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <h3 className="text-base font-semibold text-white">
            {entries.description || "No description"}
          </h3>
          <span className="text-xs text-white/50 shrink-0">{entryDate}</span>
        </div>

        <Separator className="bg-white/10" />

        {/* Time details */}
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <EntryItem
            title="Start"
            value={new Date(entries.timeInterval.start).toLocaleString()}
          />
          <EntryItem
            title="End"
            value={new Date(entries.timeInterval.end).toLocaleString()}
          />
          <EntryItem
            title="Duration"
            value={formatDuration(entries.timeInterval.duration)}
          />
          <EntryItem title="Project" value={projectName} loading={loading} />
        </div>
      </CardContent>
    </Card>
  );
};

export default TimeEntriesTab;

// ── Sub-component ────────────────────────────────────────────────────────────
const EntryItem = ({
  title,
  value,
  loading = false,
}: {
  title: string;
  value: string;
  loading?: boolean;
}) => (
  <div className="flex items-center gap-1.5 text-sm">
    <span className="font-medium text-white/80">{title}:</span>
    {loading ? (
      <Loader2 className="h-3.5 w-3.5 animate-spin text-indigo-400" />
    ) : (
      <span className="text-white/50">{value}</span>
    )}
  </div>
);
