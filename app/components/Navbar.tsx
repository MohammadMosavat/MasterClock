"use client";

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { useClockifyUser } from "~/hooks/useClockifyUser";
import { hasApiKey } from "~/utils/auth";

import { Button } from "~/components/ui/button";
import { Clock, Loader2, LayoutDashboard, Home, Layers } from "lucide-react";

const NAV_LINKS = [
  { to: "/", label: "Home", icon: Home },
  { to: "/workspaces", label: "Workspaces", icon: Layers },
];

export default function Navbar() {
  const apikey = hasApiKey() ?? null;
  const { fetchUser, loading, user } = useClockifyUser();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (apikey) fetchUser();
  }, [apikey]);

  // Shrink navbar on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isDashboardReady = apikey && user?.id;

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300"
      style={{ paddingTop: scrolled ? "8px" : "16px" }}
    >
      <nav
        className={`flex items-center gap-2 rounded-2xl border px-4 shadow-xl
                    transition-all duration-300
                    ${
                      scrolled
                        ? "border-white/10 bg-black/60 backdrop-blur-xl py-2"
                        : "border-white/15 bg-white/8 backdrop-blur-md py-2.5"
                    }`}
      >
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-2 pr-3 mr-1 border-r border-white/10"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 shadow-lg shadow-indigo-500/30">
            <Clock className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="font-bold text-sm text-white tracking-tight">
            MasterClock
          </span>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-0.5">
          {NAV_LINKS.map(({ to, label, icon: Icon }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm
                            font-medium transition-all duration-150
                            ${
                              isActive
                                ? "bg-white/10 text-white"
                                : "text-white/50 hover:text-white hover:bg-white/8"
                            }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="ml-1 pl-2 border-l border-white/10">
          {!isDashboardReady ? (
            <Button
              asChild
              size="sm"
              className="rounded-xl h-8 px-4 text-xs font-semibold
                         bg-indigo-600 hover:bg-indigo-500 text-white
                         shadow-md shadow-indigo-500/25"
            >
              <Link to="/get-started">Get Started</Link>
            </Button>
          ) : (
            <Button
              asChild={!loading}
              size="sm"
              disabled={loading}
              className="rounded-xl h-8 px-4 text-xs font-semibold
                         bg-indigo-600 hover:bg-indigo-500 text-white
                         shadow-md shadow-indigo-500/25
                         disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-1.5">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Loading
                </span>
              ) : (
                <Link
                  to={`/dashboard/${user!.id}`}
                  className="flex items-center gap-1.5"
                >
                  <LayoutDashboard className="h-3.5 w-3.5" />
                  Dashboard
                </Link>
              )}
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
}
