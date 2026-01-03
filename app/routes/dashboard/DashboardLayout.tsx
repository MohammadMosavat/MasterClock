"use client";

import { Box, Tabs, Tab, Container } from "@mui/material";
import { Outlet, useNavigate, useParams, useLocation } from "react-router";

export default function DashboardLayout() {
  const { userId } = useParams<{ userId: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { label: "Settings", path: `/dashboard/${userId}` },
    // { label: "Settings", path: `/dashboard/${userId}/settings` },
  ];

  const currentTab = tabs.findIndex((tab) => location.pathname === tab.path);

  return (
    <Container maxWidth="lg" sx={{ px: 4, pt: 3 }}>
      <Tabs
        value={currentTab === -1 ? 0 : currentTab}
        onChange={(_, index) => navigate(tabs[index].path)}
        sx={{
          mb: 4,
          "& .MuiTab-root": { textTransform: "none", fontWeight: 600 },
        }}
      >
        {tabs.map((tab) => (
          <Tab key={tab.path} label={tab.label} />
        ))}
      </Tabs>
      <Outlet context={{ userId }} />
    </Container>
  );
}
