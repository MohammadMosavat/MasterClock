import {
  Box,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useClockifyWorkspaces } from "~/hooks/useClockifyWorkspaces";
import { useClockifyTimeEntries } from "~/hooks/useWorkspaceTimeEntries";
import { parseISODurationToMinutes, minutesToHuman } from "~/utils/time";
import type { ClockifyTimeEntry } from "~/types";
import { useOutletContext } from "react-router";

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
          0
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

  if (workspaceLoading || entriesLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={8}>
        <CircularProgress />
      </Box>
    );
  }

  if (workspaceError || entriesError) {
    return (
      <Typography color="error">Failed to load dashboard data.</Typography>
    );
  }

  return (
    <Box>
      <Grid container spacing={3}>
        {workspaceStats.map((ws) => (
          <Grid item xs={12} md={6} lg={4} key={ws.id}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              }}
            >
              <Stack spacing={1}>
                <Typography variant="h6" fontWeight={700}>
                  {ws.name}
                </Typography>

                <Typography variant="h4" fontWeight={700}>
                  {minutesToHuman(ws.totalMinutes)}
                </Typography>

                <Typography color="text.secondary">
                  {ws.entriesCount} time entries
                </Typography>
              </Stack>
            </Paper>
          </Grid>
        ))}

        {workspaceStats.length === 0 && (
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography color="text.secondary">
                No workspace data available.
              </Typography>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
