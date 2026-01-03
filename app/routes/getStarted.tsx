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
import {
  Visibility,
  VisibilityOff,
  Save,
  Delete,
  CheckCircle,
  Timer,
} from "@mui/icons-material";

const ClockifyApiSetup: React.FC = () => {
  const [apiKey, setApiKey] = useState<string>("");
  const [savedKey, setSavedKey] = useState<string>("");
  const [showKey, setShowKey] = useState<boolean>(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error" | "info";
  } | null>(null);

  useEffect(() => {
    // Get API key from cookies using js-cookie
    const saved = Cookies.get("clockify_api_key");
    if (saved) {
      setSavedKey(saved);
    }
  }, []);

  const handleSave = (): void => {
    if (!apiKey.trim()) {
      setMessage({ text: "Please enter an API key", type: "error" });
      document.location.reload();
      return;
    }

    if (apiKey.length < 20) {
      setMessage({
        text: "API key seems too short. Please check and try again.",
        type: "error",
      });
      return;
    }

    // Save to cookies using js-cookie
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
    // Remove from cookies using js-cookie
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
            sx={{ color: "#231942", fontWeight: 600 }}
          >
            app.clockify.me
          </Link>{" "}
          and log in to your account.
        </>
      ),
      bgColor: "#e0b1cb",
      borderColor: "#e0b1cb",
      backgroundColor: "#e0b1cb20",
    },
    {
      number: 2,
      title: "Go to Preferences",
      description:
        'Click on your profile picture or avatar in the top-right corner, then select "Preferences" from the dropdown menu.',
      bgColor: "#231942",
      borderColor: "#231942",
      backgroundColor: "#23194220",
    },
    {
      number: 3,
      title: "Navigate to Advanced Tab",
      description:
        'In the Preferences page, find and click on the "Advanced" tab at the top of the page.',
      bgColor: "#e0b1cb",
      borderColor: "#e0b1cb",
      backgroundColor: "#e0b1cb20",
    },
    {
      number: 4,
      title: "Manage API Key",
      description:
        'Scroll down to find the "Manage API Key" section. You\'ll see your API key displayed there.',
      bgColor: "#231942",
      borderColor: "#231942",
      backgroundColor: "#23194220",
    },
    {
      number: 5,
      title: "Copy the API Key",
      description:
        'Click the "Copy" button next to your API key to copy it to your clipboard.',
      bgColor: "#e0b1cb",
      borderColor: "#e0b1cb",
      backgroundColor: "#e0b1cb20",
    },
    {
      number: 6,
      title: "Paste Below",
      description:
        'Paste your API key in the input field below and click "Save API Key" to store it securely.',
      bgColor: "#231942",
      borderColor: "#231942",
      backgroundColor: "#23194220",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 4,
        px: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={8}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              background: "linear-gradient(135deg, #e0b1cb 0%, #231942 100%)",
              color: "white",
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

          {/* Content */}
          <Box sx={{ p: 4 }}>
            {/* Tutorial Section */}
            <Box sx={{ mb: 6 }}>
              <Typography
                variant="h4"
                fontWeight="bold"
                gutterBottom
                sx={{
                  mb: 4,
                  color: "#231942",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                📚 How to Get Your API Key
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {steps.map((step) => (
                  <Card
                    key={step.number}
                    sx={{
                      backgroundColor: step.backgroundColor,
                      borderLeft: `4px solid ${step.borderColor}`,
                      boxShadow: "none",
                    }}
                  >
                    <CardContent sx={{ display: "flex", gap: 2, p: 3 }}>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          backgroundColor: step.bgColor,
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "bold",
                          fontSize: 18,
                          flexShrink: 0,
                        }}
                      >
                        {step.number}
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          sx={{ mb: 1, color: "#231942" }}
                        >
                          {step.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ lineHeight: 1.6 }}
                        >
                          {step.description}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Box>

            <Divider sx={{ my: 6 }} />

            {/* API Key Input Section */}
            <Box>
              <Typography
                variant="h4"
                fontWeight="bold"
                gutterBottom
                sx={{
                  mb: 4,
                  color: "#231942",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                🔑 Enter Your API Key
              </Typography>

              {/* Status Message */}
              {message && (
                <Alert
                  severity={message.type}
                  sx={{ mb: 3 }}
                  onClose={() => setMessage(null)}
                >
                  {message.text}
                </Alert>
              )}

              {/* Current Saved Key */}
              {savedKey && (
                <Card
                  sx={{
                    mb: 3,
                    backgroundColor: "#e0b1cb20",
                    borderLeft: "4px solid #e0b1cb",
                    boxShadow: "none",
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 2,
                      }}
                    >
                      <Typography variant="subtitle2" color="text.secondary">
                        Current API Key:
                      </Typography>
                      <Chip
                        icon={<CheckCircle />}
                        label="Saved"
                        size="small"
                        sx={{
                          backgroundColor: "#231942",
                          color: "white",
                          fontWeight: "bold",
                        }}
                      />
                    </Box>
                    <Box
                      sx={{
                        backgroundColor: "white",
                        p: 2,
                        borderRadius: 1,
                        border: "1px solid #e0b1cb",
                        mb: 1,
                      }}
                    >
                      <Typography
                        variant="body2"
                        component="code"
                        sx={{
                          fontFamily: "monospace",
                          wordBreak: "break-all",
                          color: "#231942",
                        }}
                      >
                        {showKey ? savedKey : maskApiKey(savedKey)}
                      </Typography>
                    </Box>
                    <Button
                      size="small"
                      onClick={() => setShowKey(!showKey)}
                      sx={{ color: "#231942", fontWeight: 600 }}
                    >
                      {showKey ? "👁️ Hide" : "👁️ Show"} Full Key
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Input Field */}
              <TextField
                fullWidth
                label="Paste Your API Key Here"
                variant="outlined"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Paste your Clockify API key..."
                type={showKey ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowKey(!showKey)}
                        edge="end"
                      >
                        {showKey ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: { fontFamily: "monospace" },
                }}
                sx={{
                  mb: 3,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#e0b1cb",
                      borderWidth: 2,
                    },
                    "&:hover fieldset": {
                      borderColor: "#e0b1cb",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#231942",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#231942",
                    fontWeight: 600,
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#231942",
                  },
                }}
              />

              {/* Buttons */}
              <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  startIcon={<Save />}
                  onClick={handleSave}
                  sx={{
                    background:
                      "linear-gradient(135deg, #e0b1cb 0%, #231942 100%)",
                    fontWeight: "bold",
                    py: 1.5,
                    textTransform: "none",
                    fontSize: 16,
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #d09bb8 0%, #1a1231 100%)",
                      transform: "scale(1.02)",
                    },
                    transition: "all 0.3s",
                  }}
                >
                  Save API Key
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  size="large"
                  startIcon={<Delete />}
                  onClick={handleClear}
                  disabled={!savedKey}
                  sx={{
                    borderColor: "#e0b1cb",
                    color: "#231942",
                    fontWeight: "bold",
                    py: 1.5,
                    textTransform: "none",
                    fontSize: 16,
                    borderWidth: 2,
                    "&:hover": {
                      borderColor: "#231942",
                      backgroundColor: "#f5f5f5",
                      borderWidth: 2,
                    },
                  }}
                >
                  Clear Key
                </Button>
              </Box>

              {/* Info Box */}
              <Alert
                severity="info"
                icon={<span style={{ fontSize: 24 }}>ℹ️</span>}
                sx={{
                  backgroundColor: "#e0b1cb30",
                  border: "1px solid #e0b1cb",
                  "& .MuiAlert-message": {
                    color: "#231942",
                  },
                }}
              >
                <Typography variant="body2">
                  <strong>Note:</strong> Your API key will be stored securely in
                  your browser cookies and will remain saved for 365 days. The
                  key is only accessible from this browser.
                </Typography>
              </Alert>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ClockifyApiSetup;
