"use client";

import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Card,
  CardContent,
  Chip,
  Link,
  Divider,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  Visibility,
  VisibilityOff,
  Save,
  Delete,
  CheckCircle,
  Timer,
} from "@mui/icons-material";

const ClockifyApiSetup: React.FC = () => {
  const theme = useTheme();

  const [apiKey, setApiKey] = useState<string>("");
  const [savedKey, setSavedKey] = useState<string>("");
  const [showKey, setShowKey] = useState<boolean>(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error" | "info";
  } | null>(null);

  useEffect(() => {
    const saved = Cookies.get("clockify_api_key");
    if (saved) setSavedKey(saved);
  }, []);

  const handleSave = (): void => {
    if (!apiKey.trim()) {
      setMessage({ text: "Please enter an API key", type: "error" });
      return;
    }

    if (apiKey.length < 20) {
      setMessage({
        text: "API key seems too short. Please check and try again.",
        type: "error",
      });
      return;
    }

    Cookies.set("clockify_api_key", apiKey.trim(), {
      expires: 365,
      sameSite: "strict",
      path: "/",
    });

    setSavedKey(apiKey.trim());
    setMessage({ text: "API key saved successfully!", type: "success" });
    setApiKey("");

    setTimeout(() => setMessage(null), 3000);
  };

  const handleClear = (): void => {
    Cookies.remove("clockify_api_key", { path: "/" });
    setSavedKey("");
    setApiKey("");
    setMessage({ text: "API key removed from cookies", type: "info" });

    setTimeout(() => setMessage(null), 3000);
  };

  const maskApiKey = (key: string): string => {
    if (key.length <= 8) return key;
    return `${key.substring(0, 8)}...${key.substring(key.length - 8)}`;
  };

  const steps = [
    {
      number: 1,
      title: "Log in to Clockify",
      description: (
        <>
          Go to{" "}
          <Link
            href="https://app.clockify.me/login"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 600,
            }}
          >
            app.clockify.me
          </Link>{" "}
          and log in to your account.
        </>
      ),
    },
    {
      number: 2,
      title: "Go to Preferences",
      description:
        'Click your profile avatar in the top-right corner and choose "Preferences".',
    },
    {
      number: 3,
      title: "Navigate to Advanced Tab",
      description: 'Inside Preferences, open the "Advanced" tab at the top.',
    },
    {
      number: 4,
      title: "Manage API Key",
      description:
        'Scroll down to the "Manage API Key" section to see your key.',
    },
    {
      number: 5,
      title: "Copy the API Key",
      description: 'Click the "Copy" button next to the API key.',
    },
    {
      number: 6,
      title: "Paste Below",
      description: "Paste your key in the field below and click Save.",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: theme.palette.background.default,
        py: 4,
        px: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            backgroundColor: theme.palette.background.paper,
          }}
        >
          {/* Header */}
          <Box
            sx={{
              background: `linear-gradient(
                135deg,
                ${theme.palette.primary.main} 0%,
                ${theme.palette.secondary.main} 100%
              )`,
              color: theme.palette.primary.contrastText,
              py: 6,
              px: 4,
              textAlign: "center",
            }}
          >
            <Timer sx={{ fontSize: 64, mb: 2 }} />
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              Clockify API Setup
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Connect your Clockify account to get started
            </Typography>
          </Box>

          <Box sx={{ p: 4 }}>
            {/* Tutorial */}
            <Typography
              variant="h4"
              fontWeight="bold"
              gutterBottom
              sx={{ mb: 4, color: theme.palette.text.primary }}
            >
              📚 How to Get Your API Key
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {steps.map((step) => (
                <Card
                  key={step.number}
                  sx={{
                    backgroundColor: theme.palette.background.paper,
                    borderLeft: `4px solid ${theme.palette.primary.main}`,
                  }}
                >
                  <CardContent sx={{ display: "flex", gap: 2 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold",
                      }}
                    >
                      {step.number}
                    </Box>

                    <Box>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        sx={{ color: theme.palette.text.primary }}
                      >
                        {step.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: theme.palette.text.secondary }}
                      >
                        {step.description}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>

            <Divider sx={{ my: 6 }} />

            {/* API Input */}
            <Typography
              variant="h4"
              fontWeight="bold"
              gutterBottom
              sx={{ mb: 4, color: theme.palette.text.primary }}
            >
              🔑 Enter Your API Key
            </Typography>

            {message && (
              <Alert
                severity={message.type}
                sx={{ mb: 3 }}
                onClose={() => setMessage(null)}
              >
                {message.text}
              </Alert>
            )}

            {savedKey && (
              <Card
                sx={{
                  mb: 3,
                  backgroundColor: theme.palette.background.paper,
                  borderLeft: `4px solid ${theme.palette.primary.main}`,
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Typography variant="subtitle2">
                      Current API Key:
                    </Typography>
                    <Chip
                      icon={<CheckCircle />}
                      label="Saved"
                      size="small"
                      sx={{
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                      }}
                    />
                  </Box>

                  <Typography
                    component="code"
                    sx={{
                      fontFamily: "monospace",
                      wordBreak: "break-all",
                    }}
                  >
                    {showKey ? savedKey : maskApiKey(savedKey)}
                  </Typography>

                  <Button
                    size="small"
                    onClick={() => setShowKey(!showKey)}
                    sx={{ mt: 1 }}
                  >
                    {showKey ? "Hide" : "Show"} Full Key
                  </Button>
                </CardContent>
              </Card>
            )}

            <TextField
              fullWidth
              label="Paste Your API Key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              type={showKey ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowKey(!showKey)}>
                      {showKey ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: theme.palette.background.paper,
                },
              }}
            />

            <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<Save />}
                onClick={handleSave}
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  "&:hover": {
                    backgroundColor: theme.palette.primary.dark,
                  },
                }}
              >
                Save API Key
              </Button>

              <Button
                fullWidth
                variant="outlined"
                startIcon={<Delete />}
                onClick={handleClear}
                disabled={!savedKey}
                sx={{
                  borderColor: theme.palette.primary.main,
                  color: theme.palette.primary.main,
                }}
              >
                Clear Key
              </Button>
            </Box>

            <Alert severity="info">
              Your API key is stored in browser cookies for 365 days.
            </Alert>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ClockifyApiSetup;
