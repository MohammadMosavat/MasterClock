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
} from "@mui/material";
import Formatted from "~/functions/formatted";
import formatDuration from "~/functions/formattedDurations";

const PAGE_SIZE = 10;
const WORKSPACE_ID = "66e7f028e7d56d567f1f9768";
const USER_ID = "65914942b5a174054d080bfa";
const API_KEY = "MGFiM2I4MjktMzZmMi00ZDNkLTk1ZGUtMjYyYjdlNDQwNmFm";

const ClockifyData = () => {
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchEntries = async (pageNumber: number) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.clockify.me/api/v1/workspaces/${WORKSPACE_ID}/user/${USER_ID}/time-entries?page=${pageNumber}&page-size=${PAGE_SIZE}`,
        {
          headers: {
            "X-Api-Key": API_KEY,
          },
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      setEntries(data);
      setHasMore(data.length === PAGE_SIZE);
    } catch (error) {
      console.error("Error fetching Clockify entries:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries(page);
  }, [page]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      p={4}
      sx={{
        width: "100%",
        mx: "auto",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "700", mb: 4 }}>
        Time Entries
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {entries.length === 0 ? (
              <Typography>No entries found.</Typography>
            ) : (
              entries.map((entry) => (
                <ListItem
                  key={entry.id}
                  disablePadding
                  sx={{
                    mb: 2,
                    p: 2,
                    borderRadius: 2,
                    boxShadow:
                      "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
                    transition: "box-shadow 0.3s ease",
                    "&:hover": {
                      boxShadow:
                        "0 4px 20px rgba(0,0,0,0.12), 0 7px 12px rgba(0,0,0,0.24)",
                      bgcolor: "grey.50",
                    },
                  }}
                >
                  <ListItemText
                    primary={entry.description || "No description"}
                    primaryTypographyProps={{
                      fontWeight: 600,
                      fontSize: "1.1rem",
                    }}
                    secondaryTypographyProps={{
                      color: "text.secondary",
                      fontWeight: 400,
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
              sx={{ display: "flex", alignItems: "center", fontWeight: "600" }}
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
