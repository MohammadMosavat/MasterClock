"use client";

import { useEffect, useMemo } from "react";
import { Link } from "react-router";
import { hasApiKey } from "~/utils/auth";
import { useClockifyUser } from "~/hooks/useClockifyUser";

import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Clock, Zap, ShieldCheck, LayoutDashboard } from "lucide-react";

// ─── Feature card data ───────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: Zap,
    title: "Fast & Efficient",
    description:
      "Streamline your workflow with real-time time tracking and instant reporting.",
  },
  {
    icon: ShieldCheck,
    title: "Secure by Default",
    description:
      "Your data is protected with industry-standard encryption and access controls.",
  },
  {
    icon: LayoutDashboard,
    title: "Powerful Dashboard",
    description:
      "Get a bird's-eye view of your team's productivity with rich visual analytics.",
  },
];

// ─── Component ───────────────────────────────────────────────────────────────
const Home = () => {
  const apikey = hasApiKey() ?? null;
  const { fetchUser, user } = useClockifyUser();

  useEffect(() => {
    if (apikey) fetchUser();
  }, [apikey]);

  /** Destination / state of the CTA button */
  const ctaButton = useMemo(() => {
    const isLoading = apikey && !user?.id;
    const to = apikey ? `/dashboard/${user?.id}` : "/get-started";
    const label = apikey ? "Go to Dashboard" : "Get Started";

    return (
      <Button
        asChild={!isLoading}
        size="lg"
        disabled={isLoading}
        className="rounded-xl px-8 py-6 text-base font-semibold shadow-lg
                   bg-indigo-600 hover:bg-indigo-500 text-white
                   disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <Clock className="h-4 w-4 animate-spin" />
            Loading…
          </span>
        ) : (
          <Link to={to}>{label}</Link>
        )}
      </Button>
    );
  }, [apikey, user]);

  return (
    <main className="min-h-screen bg-[#1a1b2e] text-white">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="flex flex-col items-center justify-center gap-6 px-4 py-28 text-center">
        <Badge
          variant="outline"
          className="border-indigo-400 text-indigo-300 text-sm px-4 py-1"
        >
          ✦ Time Tracking Reimagined
        </Badge>

        <h1 className="text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl">
          Welcome to <span className="text-indigo-400">MasterClock</span>
        </h1>

        <p className="max-w-xl text-lg text-slate-300">
          The modern platform that makes your workflow efficient, secure, and
          effortless — from solo freelancers to growing teams.
        </p>

        {ctaButton}
      </section>

      <Separator className="bg-white/10 mx-auto max-w-4xl" />

      {/* ── About ────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <h2 className="mb-4 text-3xl font-bold">About MasterClock</h2>
        <p className="text-slate-400 text-base leading-relaxed">
          MasterClock is built on top of the Clockify API, giving you a
          beautiful and opinionated interface to manage time entries, projects,
          and team activity — all in one place. Whether you're tracking billable
          hours or analysing productivity trends, we've got you covered.
        </p>
      </section>

      {/* ── Feature cards ────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="grid gap-6 sm:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <Card
              key={title}
              className="border border-white/10 bg-white/5 backdrop-blur
                         text-white hover:border-indigo-500/60 transition-colors"
            >
              <CardHeader className="pb-2">
                <div
                  className="mb-3 flex h-10 w-10 items-center justify-center
                                rounded-lg bg-indigo-600/20 text-indigo-400"
                >
                  <Icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg">{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-400">
                  {description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
