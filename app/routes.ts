import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("workspaces", "routes/workspace/workspace.tsx"),
  route("workspace/:workspaceId", "routes/workspace/workspaceDetailsPage.tsx"),
  route("get-started", "routes/getStarted.tsx"),
  layout("routes/dashboard/DashboardLayout.tsx", [
    // route("dashboard/:userId", "routes/dashboard/MainContent/dashboard.tsx"),
    route(
      "dashboard/:userId",
      "routes/dashboard/MainContent/settings.tsx"
    ),
  ]),
] satisfies RouteConfig;
