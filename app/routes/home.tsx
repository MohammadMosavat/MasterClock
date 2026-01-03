"use client";

import { Box, Typography, Button, Container } from "@mui/material";
import { Link } from "react-router";
import { useEffect, useMemo } from "react";
import { hasApiKey } from "~/utils/auth";
import { useClockifyUser } from "~/hooks/useClockifyUser";

const Home = () => {
  const apikey = hasApiKey() ?? null;
  const { fetchUser, user } = useClockifyUser();

  useEffect(() => {
    if (apikey) {
      fetchUser();
    }
  }, [apikey]);

  console.log("Rendering button with user:", user);
  const validButton = useMemo(() => {
    return (
      <Button
        component={Link}
        variant="contained"
        color="secondary"
        size="large"
        sx={{ borderRadius: 3 }}
        to={apikey ? `/dashboard/${user?.id}` : "/get-started"}
        disabled={apikey && !user?.id}
      >
        {apikey ? "Go to Dashboard" : "Get Started"}
      </Button>
    );
  }, [apikey, user]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box
        sx={{
          height: { xs: "60vh", sm: "70vh" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          color: "#fff",
          px: 2,
          borderRadius: 16,
          bgcolor: "secondary.light",
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: 700, mb: 2 }}>
          Welcome to MasterClock
        </Typography>
        <Typography variant="h6" sx={{ maxWidth: 600, mb: 4 }}>
          We provide amazing services that help your business grow and succeed
          in the digital world.
        </Typography>
        {validButton}
      </Box>

      <Box sx={{ py: 8, px: { xs: 2, sm: 4, md: 8 } }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, textAlign: "center", mb: 4 }}
        >
          About Our Website
        </Typography>
        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            maxWidth: 800,
            mx: "auto",
            mb: 6,
          }}
        >
          MasterClock is a modern platform designed to make your workflow
          efficient, secure, and user-friendly. We specialize in providing
          solutions that are tailored to your needs, from productivity tools to
          business management features.
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;
