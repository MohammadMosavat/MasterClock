import { Box, Button, Typography, IconButton, Tooltip } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useNavigate } from "react-router";
import { clearApiKey, getApiKey } from "~/utils/auth";

export default function DashboardSettings() {
  const navigate = useNavigate();
  const apiKey = getApiKey();

  const handleCopy = async () => {
    if (!apiKey) return;
    await navigator.clipboard.writeText(apiKey);
  };

  return (
    <Box>
      <Typography variant="h6" fontWeight={600}>
        API Key
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          my: 2,
          p: 1.5,
          borderRadius: 2,
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: "primary.main",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontFamily: "monospace",
            flexGrow: 1,
          }}
        >
          {apiKey ? `${apiKey.slice(0, 6)}••••••••` : "No API Key"}
        </Typography>

        {apiKey && (
          <Tooltip title="Copy API Key">
            <IconButton size="small" onClick={handleCopy}>
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      <Button
        color="error"
        variant="outlined"
        onClick={() => {
          clearApiKey();
          navigate("/");
        }}
      >
        Clear API Key & Logout
      </Button>
    </Box>
  );
}
