"use client";

import { Outlet, useNavigate, useParams, useLocation } from "react-router";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";

export default function DashboardLayout() {
  const { userId } = useParams<{ userId: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { label: "Overview", path: `/dashboard/${userId}` },
    // { label: "Settings", path: `/dashboard/${userId}/settings` },
  ];

  const currentTab =
    tabs.find((tab) => location.pathname === tab.path)?.path ?? tabs[0].path;

  return (
    <main className="mx-auto max-w-5xl px-4 pt-28 pb-12">
      <Tabs value={currentTab} onValueChange={(path) => navigate(path)}>
        <TabsList className="mb-6 bg-white/5 border border-white/10">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.path}
              value={tab.path}
              className="font-semibold text-white/60
                         data-[state=active]:bg-indigo-600
                         data-[state=active]:text-white"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <Outlet context={{ userId }} />
    </main>
  );
}
