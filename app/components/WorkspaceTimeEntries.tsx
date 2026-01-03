import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router";
import { useClockifyTimeEntries } from "~/hooks/useWorkspaceTimeEntries";
import type { ClockifyTimeEntry } from "~/types";
import TimeEntriesTab from "./TimeEntriesTab";
import {
  Box,
  CircularProgress,
  Typography,
  List,
  ListItem,
  TextField,
  Stack,
  Button,
  Paper,
  Fab,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

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
        0
      ),
    [timeEntries]
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Typography color="error" sx={{ py: 2 }}>
        Error: {error}
      </Typography>
    );

  return (
    <>
      <Paper elevation={2} sx={{ p: 2, mb: 3, borderRadius: 2 }}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            label="Start date"
            type="date"
            value={startInput}
            onChange={(e) => setStartInput(e.target.value)}
            InputLabelProps={{ shrink: true }}
            size="small"
            fullWidth
          />
          <TextField
            label="End date"
            type="date"
            value={endInput}
            onChange={(e) => setEndInput(e.target.value)}
            InputLabelProps={{ shrink: true }}
            size="small"
            fullWidth
          />
          <Button variant="contained" onClick={applyFilters}>
            Apply
          </Button>
          {hasActiveFilters && (
            <Button variant="outlined" onClick={clearFilters}>
              Clear
            </Button>
          )}
        </Stack>
      </Paper>

      <Paper
        elevation={1}
        sx={{
          p: 2,
          mb: 2,
          borderRadius: 2,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography fontWeight={600}>Total Time</Typography>
        <Typography color="primary" fontWeight={600}>
          {formatSeconds(totalSeconds)}
        </Typography>
      </Paper>

      {timeEntries.length === 0 ? (
        <Typography>No time entries found.</Typography>
      ) : (
        <List sx={{ p: 0 }}>
          {timeEntries.map((entry: ClockifyTimeEntry) => (
            <ListItem key={entry.id} sx={{ mb: 1, p: 0 }}>
              <TimeEntriesTab entries={entry} workspaceId={workspaceId!} />
            </ListItem>
          ))}
        </List>
      )}

      <Fab
        color="primary"
        onClick={scrollToTop}
        sx={{ position: "fixed", bottom: 24, right: 24 }}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </>
  );
};

export default TimeEntriesList;
