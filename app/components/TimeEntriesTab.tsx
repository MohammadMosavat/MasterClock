import { useEffect, useState } from "react";
import type { ClockifyTimeEntry } from "~/types";
import { Card, CardContent, Typography, Stack, Divider } from "@mui/material";
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
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  return (
    <Card
      variant="outlined"
      sx={{
        width: "100%",
        mb: 3,
        borderRadius: 2,
        boxShadow: 2,
        transition: "0.2s",
        "&:hover": {
          boxShadow: 4,
          transform: "translateY(-2px)",
        },
      }}
    >
      <CardContent>
        <Stack spacing={2}>
          {/* HEADER: TITLE + DATE */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            spacing={1}
          >
            <Typography variant="h6" fontWeight={600}>
              {entries.description || "No description"}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {entryDate}
            </Typography>
          </Stack>

          <Divider />

          {/* TIME DETAILS */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 3 }}
            flexWrap="wrap"
          >
            <TimeEntriesItems
              title="Start"
              value={new Date(entries.timeInterval.start).toLocaleString()}
              loading={false}
            />
            <TimeEntriesItems
              title="End"
              value={new Date(entries.timeInterval.end).toLocaleString()}
              loading={false}
            />
            <TimeEntriesItems
              title="Duration"
              value={formatDuration(entries.timeInterval.duration)}
              loading={false}
            />
            <TimeEntriesItems
              title="Project"
              value={loading ? "Loading..." : projectName}
              loading={false}
            />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TimeEntriesTab;

const TimeEntriesItems = ({
  title,
  value,
  loading,
}: {
  title: string;
  value: string;
  loading: boolean;
}) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      display={"flex"}
      alignItems={"center"}
      gap={1}
    >
      <Typography variant="body1" fontWeight={500}>
        {title}:
      </Typography>
      {loading ? "Loading..." : value}
    </Typography>
  );
};
