import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Paper,
} from "@mui/material";
import { useEffect } from "react";
import TimeEntriesList from "~/components/WorkspaceTimeEntries";
import { useClockifyUser } from "~/hooks/useClockifyUser";

export default function WorkspaceDetailsPage() {
  const { user, loading: userLoading, fetchUser } = useClockifyUser();

  useEffect(() => {
    fetchUser();
  }, []);

  if (userLoading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Workspace Header */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" fontWeight={600} component="h1" gutterBottom>
          Workspace Details
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {user?.name || "Unknown"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user?.email || "Unknown"}
        </Typography>
      </Paper>

      {/* Time Entries List */}
      <Box>
        <TimeEntriesList userId={user?.id} />
      </Box>
    </Container>
  );
}
