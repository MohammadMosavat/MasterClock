import { useState, useEffect, useMemo } from "react";
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  Button,
} from "@mui/material";
import AlertDialog from "./AlertDialog";

const ClockifyConnect = () => {
  const [apiKey, setApiKey] = useState("");
  const [userID, setUserID] = useState<string | null>(null);

  useEffect(() => {
    const savedKey = localStorage.getItem("clockifyApiKey") || "";
    const userInfo = localStorage.getItem("clockifyUserInfo");

    setApiKey(savedKey);
    if (userInfo) {
      try {
        const parsed = JSON.parse(userInfo);
        setUserID(parsed.userId || null);
      } catch {
        setUserID(null);
      }
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (apiKey.trim()) {
        localStorage.setItem("clockifyApiKey", apiKey.trim());
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [apiKey]);

  const isConnected = useMemo(() => !!userID, [userID]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  };

  return isConnected ? (
    <Button variant="outlined" color="success">
      {isConnected ? "Connected" : "connect"} to Clockify
    </Button>
  ) : (
    <AlertDialog valueButton="Connect to Clockify" optionsButton={null}>
      <DialogTitle>Connect to your Clockify account</DialogTitle>

      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>
          To use Clockify features, you need to provide your personal API Key.
          <br />
          You can find your API key in your Clockify account under:
          <strong> Profile → Preferences → Advanced → API </strong>.
        </DialogContentText>

        <DialogContentText sx={{ mb: 2 }}>
          👉{" "}
          <p style={{ color: "#1976d2", textDecoration: "underline" }}>
            Go to Clockify API Key page
          </p>
        </DialogContentText>

        <TextField
          fullWidth
          label="Paste your Clockify API Key"
          placeholder="e.g. 1c5fe302e15b48f89f8a9b422cb5cbb1"
          variant="outlined"
          size="small"
          value={apiKey}
          onChange={handleChange}
        />
      </DialogContent>
    </AlertDialog>
  );
};

export default ClockifyConnect;
