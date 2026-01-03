import { Box, Stack, Typography } from "@mui/material";

function ProjectsTab({ data, loading }: any) {
  if (loading) return <Typography>Loading projects...</Typography>;

  return (
    <Stack spacing={2}>
      {data.map((p: any) => (
        <Box key={p.id} p={2} border="1px solid #eee" borderRadius={2}>
          <Typography fontWeight={500}>{p.name}</Typography>
          <Typography variant="caption">{p.id}</Typography>
        </Box>
      ))}
    </Stack>
  );
}

export default ProjectsTab;