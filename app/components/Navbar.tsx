"use client";

import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useEffect } from "react";
import { Link } from "react-router";
import { useClockifyUser } from "~/hooks/useClockifyUser";
import { hasApiKey } from "~/utils/auth";

export default function Navbar() {
  const apikey = hasApiKey() ?? null;
  const { fetchUser, loading, user } = useClockifyUser();

  useEffect(() => {
    if (apikey) {
      fetchUser();
    }
  }, [apikey]);

  return (
    <AppBar
      position="sticky"
      sx={{
        width: "fit-content", // responsive width
        mx: "auto", // centers horizontally
        borderRadius: 3, // optional rounded corners
        background: "rgba(255, 255, 255, 0.2)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(5px)",
        top: 16,
      }}
    >
      <Toolbar sx={{ gap: 2 }}>
        <Typography
          component={Link}
          to="/"
          sx={{
            fontWeight: 700,
            textDecoration: "none",
            color: "text.primary",
          }}
        >
          MasterClock
        </Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button component={Link} to="/">
            Home
          </Button>

          <Button component={Link} to="/workspaces">
            Workspaces
          </Button>

          {!apikey || !user?.id ? (
            <Button component={Link} to="/get-started" variant="contained">
              Get Started
            </Button>
          ) : (
            <Button
              component={Link}
              to={`/dashboard/${user?.id}`}
              variant="contained"
              disabled={loading || !user?.id}
            >
              Dashboard
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
