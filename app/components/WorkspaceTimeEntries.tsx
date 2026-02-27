import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router";
import { useClockifyTimeEntries } from "~/hooks/useWorkspaceTimeEntries";
import type { ClockifyTimeEntry } from "~/types";
import TimeEntriesTab from "./TimeEntriesTab";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Card, CardContent } from "~/components/ui/card";
import { Loader2, ChevronUp, Clock } from "lucide-react";

interface TimeEntriesListProps {
  userId?: string;
}

const parseDurationToSeconds = (duration: string) => {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  return (
    Number(match[1] || 0) * 3600 +
    Number(match[2] || 0) * 60 +
    Number(match[3] || 0)
  );
};

const formatSeconds = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s
    .toString()
    .padStart(2, "0")}`;
};

const TimeEntriesList = ({ userId }: TimeEntriesListProps) => {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { error, fetchAllTimeEntries, loading, timeEntries } =
    useClockifyTimeEntries();

  const [searchParams, setSearchParams] = useSearchParams();
  const startDate = searchParams.get("start") || "";
  const endDate = searchParams.get("end") || "";

  const [startInput, setStartInput] = useState(startDate);
  const [endInput, setEndInput] = useState(endDate);

  const hasActiveFilters = Boolean(startDate || endDate);

  useEffect(() => {
    if (workspaceId && userId) {
      fetchAllTimeEntries(workspaceId, userId, {
        start: startDate || undefined,
        end: endDate || undefined,
      });
    }
  }, [workspaceId, userId, startDate, endDate]);

  const totalSeconds = useMemo(
    () =>
      timeEntries.reduce(
        (sum, e) => sum + parseDurationToSeconds(e.timeInterval.duration),
        0,
      ),
    [timeEntries],
  );

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (startInput) params.set("start", startInput);
    if (endInput) params.set("end", endInput);
    setSearchParams(params);
  };

  const clearFilters = () => {
    setStartInput("");
    setEndInput("");
    setSearchParams({});
  };

  if (loading)
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-400" />
      </div>
    );

  if (error) return <p className="py-2 text-red-400">Error: {error}</p>;

  return (
    <>
      {/* ── Filters ───────────────────────────────────────────────────── */}
      <Card className="border border-white/10 bg-white/5 backdrop-blur mb-4">
        <CardContent className="px-5 py-4">
          <div className="flex flex-col sm:flex-row gap-3 items-end">
            <div className="flex-1 space-y-1">
              <Label className="text-white/60 text-xs">Start date</Label>
              <Input
                type="date"
                value={startInput}
                onChange={(e) => setStartInput(e.target.value)}
                className="bg-white/5 border-white/10 text-white
                           [color-scheme:dark] focus:ring-indigo-500"
              />
            </div>
            <div className="flex-1 space-y-1">
              <Label className="text-white/60 text-xs">End date</Label>
              <Input
                type="date"
                value={endInput}
                onChange={(e) => setEndInput(e.target.value)}
                className="bg-white/5 border-white/10 text-white
                           [color-scheme:dark] focus:ring-indigo-500"
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={applyFilters}
                className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg"
              >
                Apply
              </Button>
              {hasActiveFilters && (
                <Button
                  onClick={clearFilters}
                  variant="outline"
                  className="border-white/20 text-white/80 hover:bg-white/10 rounded-lg"
                >
                  Clear
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Total time ────────────────────────────────────────────────── */}
      <Card className="border border-white/10 bg-white/5 backdrop-blur mb-4">
        <CardContent className="flex items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2 font-semibold text-white">
            <Clock className="h-4 w-4 text-indigo-400" />
            Total Time
          </div>
          <span className="font-semibold text-indigo-400 tabular-nums">
            {formatSeconds(totalSeconds)}
          </span>
        </CardContent>
      </Card>

      {/* ── Entries list ──────────────────────────────────────────────── */}
      {timeEntries.length === 0 ? (
        <p className="text-white/50 text-center py-6">No time entries found.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {timeEntries.map((entry: ClockifyTimeEntry) => (
            <li key={entry.id}>
              <TimeEntriesTab entries={entry} workspaceId={workspaceId!} />
            </li>
          ))}
        </ul>
      )}

      {/* ── Scroll to top FAB ─────────────────────────────────────────── */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center
                   justify-center rounded-full bg-indigo-600 text-white shadow-lg
                   hover:bg-indigo-500 transition-colors"
        aria-label="Scroll to top"
      >
        <ChevronUp className="h-5 w-5" />
      </button>
    </>
  );
};

export default TimeEntriesList;
