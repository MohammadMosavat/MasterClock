import { useEffect } from "react";
import { Link } from "react-router";
import { useClockifyWorkspaces } from "~/hooks/useClockifyWorkspaces";

import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Loader2, LayoutGrid } from "lucide-react";

export default function WorkspacePage() {
  const { workspaces, loading, error, fetchWorkspaces } =
    useClockifyWorkspaces();

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center mt-28">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-400" />
      </div>
    );

  if (error)
    return <p className="mt-8 text-center text-red-400">Error: {error}</p>;

  if (workspaces.length === 0)
    return (
      <p className="mt-8 text-center text-white/60">No workspaces found.</p>
    );

  return (
    <main className="mx-auto max-w-4xl px-4 pt-28 pb-12">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <LayoutGrid className="h-6 w-6 text-indigo-400" />
        <h1 className="text-2xl font-semibold text-white">
          Clockify Workspaces
        </h1>
      </div>

      {/* Workspace list */}
      <div className="flex flex-col gap-3">
        {workspaces.map((ws) => (
          <Card
            key={ws.id}
            className="border border-white/10 bg-white/5 backdrop-blur
                       hover:border-indigo-500/50 transition-colors"
          >
            <CardContent className="flex items-center justify-between px-5 py-4">
              <span className="text-base font-medium text-white">
                {ws.name}
              </span>
              <Button
                asChild
                size="sm"
                className="rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white"
              >
                <Link to={`/workspace/${ws.id}`}>View</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
