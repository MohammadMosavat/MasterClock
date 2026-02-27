import { useEffect } from "react";
import { useClockifyUser } from "~/hooks/useClockifyUser";
import TimeEntriesList from "~/components/WorkspaceTimeEntries";

import { Card, CardContent } from "~/components/ui/card";
import { Loader2, User, Mail, Building2 } from "lucide-react";

export default function WorkspaceDetailsPage() {
  const { user, loading: userLoading, fetchUser } = useClockifyUser();

  useEffect(() => {
    fetchUser();
  }, []);

  if (userLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-400" />
      </div>
    );

  return (
    <main className="mx-auto max-w-4xl px-4 pt-28 pb-12">
      {/* Workspace Header */}
      <Card className="border border-white/10 bg-white/5 backdrop-blur mb-6">
        <CardContent className="px-6 py-5 space-y-3">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-indigo-400" />
            <h1 className="text-2xl font-semibold text-white">
              Workspace Details
            </h1>
          </div>

          <div className="flex items-center gap-2 text-white/70 text-sm">
            <User className="h-4 w-4 text-white/40" />
            <span>{user?.name ?? "Unknown"}</span>
          </div>

          <div className="flex items-center gap-2 text-white/70 text-sm">
            <Mail className="h-4 w-4 text-white/40" />
            <span>{user?.email ?? "Unknown"}</span>
          </div>
        </CardContent>
      </Card>

      {/* Time Entries */}
      <TimeEntriesList userId={user?.id} />
    </main>
  );
}
