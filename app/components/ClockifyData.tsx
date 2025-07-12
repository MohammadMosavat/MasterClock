"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Button,
  Stack,
  TextField,
} from "@mui/material";
import Formatted from "~/functions/formatted";
import formatDuration from "~/functions/formattedDurations";
import { useClockifyUser } from "~/hooks/useClockifyUser";

const PAGE_SIZE = 10;

const ClockifyData = () => {
  const { userInfo } = useClockifyUser();
  const [apiKey, setApiKey] = useState<string>("");
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  useEffect(() => {
    const stored = localStorage.getItem("clockifyApiKey");
    if (stored) setApiKey(stored);
  }, []);

  useEffect(() => {
    if (!userInfo || !apiKey) return;

    const fetchEntries = async () => {
      setLoading(true);
      try {
        let allEntries: any[] = [];
        let currentPage = 1;
        let hasMore = true;

        const startISO = startDate ? new Date(startDate).toISOString() : null;
        const endISO = endDate
          ? new Date(new Date(endDate).setHours(23, 59, 59, 999)).toISOString()
          : null;

        while (hasMore) {
          let url = `https://api.clockify.me/api/v1/workspaces/${userInfo.workspaceId}/user/${userInfo.userId}/time-entries?page=${currentPage}&page-size=${PAGE_SIZE}`;

          if (startISO && endISO) {
            url += `&start=${startISO}&end=${endISO}`;
          } else if (startISO) {
            url += `&start=${startISO}`;
          } else if (endISO) {
            url += `&end=${endISO}`;
          }

          const res = await fetch(url, {
            headers: {
              "X-Api-Key": apiKey,
            },
          });

          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }

          const data = await res.json();
          const filteredData = data.filter(
            (entry: any) => entry.description && entry.description.trim() !== ""
          );
          allEntries = allEntries.concat(filteredData);

          hasMore = data.length === PAGE_SIZE;
          currentPage++;
        }

        setEntries(allEntries);
        setHasMore(false);
      } catch (error) {
        console.error("Error fetching Clockify entries:", error);
        setEntries([]);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, [page, userInfo, apiKey, startDate, endDate]); 

  const parseISODurationToSeconds = (duration: string) => {
    if (!duration) return 0;
    const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
    const matches = duration.match(regex);
    if (!matches) return 0;

    const hours = parseInt(matches[1] || "0");
    const minutes = parseInt(matches[2] || "0");
    const seconds = parseInt(matches[3] || "0");
    return hours * 3600 + minutes * 60 + seconds;
  };

  const formatSecondsToHMS = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  const totalSeconds = entries.reduce((acc, entry) => {
    return acc + parseISODurationToSeconds(entry.timeInterval?.duration || "");
  }, 0);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      p={4}
      sx={{ width: "100%", mx: "auto" }}
    >
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 4 }}>
        Time Entries
      </Typography>

      <Stack direction="row" spacing={2} mb={3}>
        <TextField
          label="Start Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          sx={{ maxWidth: 180 }}
        />
        <TextField
          label="End Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          sx={{ maxWidth: 180 }}
        />
        <Button
          onClick={() => setPage(1)}
          variant="contained"
          sx={{ alignSelf: "center" }}
        >
          Filter
        </Button>
      </Stack>

      <Typography variant="h6" sx={{ mb: 3 }}>
        Total Duration: {formatSecondsToHMS(totalSeconds)}
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <List
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {entries.length === 0 ? (
              <Typography>No entries found.</Typography>
            ) : (
              entries.map((entry) => (
                <ListItem
                  key={entry.id}
                  disablePadding
                  sx={{
                    pl: "16px",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      boxShadow:
                        "0 4px 20px rgba(0,0,0,0.1), 0 7px 12px rgba(0,0,0,0.12)",
                      backgroundColor: "background.paper",
                    },
                    backgroundColor: "transparent",
                    borderStyle: "solid",
                    borderColor: "primary.main",
                    borderLeftWidth: "2px",
                  }}
                >
                  <ListItemText
                    primary={entry.description || "No description"}
                    primaryTypographyProps={{
                      fontWeight: 600,
                      fontSize: "18px",
                      textTransform: "capitalize",
                      color: "primary.main",
                    }}
                    secondaryTypographyProps={{
                      color: "primary.main",
                      fontWeight: 500,
                    }}
                    secondary={`Start: ${
                      Formatted(entry.timeInterval?.start) ?? "N/A"
                    } | End: ${
                      Formatted(entry.timeInterval?.end) ?? "N/A"
                    } | Duration: ${
                      formatDuration(entry.timeInterval?.duration) ?? "N/A"
                    }`}
                  />
                </ListItem>
              ))
            )}
          </List>

          <Stack direction="row" spacing={2} mt={3}>
            <Button
              variant="outlined"
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1 || loading}
            >
              Previous
            </Button>

            <Typography
              variant="body1"
              sx={{ display: "flex", alignItems: "center", fontWeight: 600 }}
            >
              Page {page}
            </Typography>

            <Button
              variant="outlined"
              onClick={() => setPage((p) => (hasMore ? p + 1 : p))}
              disabled={!hasMore || loading}
            >
              Next
            </Button>
          </Stack>
        </>
      )}
    </Box>
  );
};

export default ClockifyData;
