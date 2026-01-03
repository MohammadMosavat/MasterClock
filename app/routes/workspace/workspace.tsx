import { Link as RouterLink } from "react-router";
import { useClockifyWorkspaces } from "~/hooks/useClockifyWorkspaces";
import {
  Container,
  Typography,
  Stack,
  Card,
  CardContent,
  Button,
  CircularProgress,
} from "@mui/material";
import { useEffect } from "react";

export default function WorkspacePage() {
  const { workspaces, loading, error, fetchWorkspaces } =
    useClockifyWorkspaces();

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  if (loading)
    return (
      <Stack alignItems="center" mt={6}>
        <CircularProgress />
      </Stack>
    );

  if (error)
    return (
      <Typography color="error" mt={4} align="center">
        Error: {error}
      </Typography>
    );

  if (workspaces.length === 0)
    return (
      <Typography mt={4} align="center">
        No workspaces found.
      </Typography>
    );

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Clockify Workspaces
      </Typography>

      <Stack display={"flex"} spacing={2}>
        {workspaces.map((ws) => (
          <Card key={ws.id} variant="elevation">
            <CardContent
              sx={{
                padding: "16px !important",
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                padding={0}
              >
                <Typography variant="h6">{ws.name}</Typography>
                <Button
                  component={RouterLink}
                  to={`/workspace/${ws.id}`}
                  variant="contained"
                  color="primary"
                  size="small"
                >
                  View
                </Button>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Container>
  );
}
