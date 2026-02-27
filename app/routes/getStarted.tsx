"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Alert, AlertDescription } from "~/components/ui/alert";
import { Badge } from "~/components/ui/badge";
import {
  Eye,
  EyeOff,
  Save,
  Trash2,
  CheckCircle2,
  Clock,
  Info,
  ExternalLink,
} from "lucide-react";

const STEPS = [
  {
    number: 1,
    title: "Log in to Clockify",
    description: (
      <>
        Go to{" "}
        <a
          href="https://app.clockify.me/login"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-0.5"
        >
          app.clockify.me <ExternalLink className="h-3 w-3" />
        </a>{" "}
        and log in to your account.
      </>
    ),
  },
  {
    number: 2,
    title: "Go to Preferences",
    description:
      'Click your profile avatar in the top-right corner and choose "Preferences".',
  },
  {
    number: 3,
    title: "Navigate to Advanced Tab",
    description: 'Inside Preferences, open the "Advanced" tab at the top.',
  },
  {
    number: 4,
    title: "Manage API Key",
    description: 'Scroll down to the "Manage API Key" section to see your key.',
  },
  {
    number: 5,
    title: "Copy the API Key",
    description: 'Click the "Copy" button next to the API key.',
  },
  {
    number: 6,
    title: "Paste Below",
    description: "Paste your key in the field below and click Save.",
  },
];

const maskKey = (key: string) =>
  key.length <= 8 ? key : `${key.slice(0, 8)}...${key.slice(-8)}`;

export default function ClockifyApiSetup() {
  const [apiKey, setApiKey] = useState("");
  const [savedKey, setSavedKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error" | "info";
  } | null>(null);

  useEffect(() => {
    const saved = Cookies.get("clockify_api_key");
    if (saved) setSavedKey(saved);
  }, []);

  const flash = (text: string, type: "success" | "error" | "info") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleSave = () => {
    if (!apiKey.trim()) return flash("Please enter an API key.", "error");
    if (apiKey.length < 20)
      return flash(
        "API key seems too short. Please check and try again.",
        "error",
      );
    Cookies.set("clockify_api_key", apiKey.trim(), {
      expires: 365,
      sameSite: "strict",
      path: "/",
    });
    setSavedKey(apiKey.trim());
    setApiKey("");
    flash("API key saved successfully!", "success");
  };

  const handleClear = () => {
    Cookies.remove("clockify_api_key", { path: "/" });
    setSavedKey("");
    setApiKey("");
    flash("API key removed from cookies.", "info");
  };

  const alertColors = {
    success: "border-green-500/30 bg-green-500/10 text-green-300",
    error: "border-red-500/30   bg-red-500/10   text-red-300",
    info: "border-indigo-500/30 bg-indigo-500/10 text-indigo-300",
  };

  return (
    <div className="min-h-screen bg-[#1a1b2e] flex items-center justify-center px-4 py-28">
      <div className="w-full max-w-4xl rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
        {/* ── Hero header ───────────────────────────────────────────── */}
        <div className="bg-gradient-to-br from-indigo-600 to-violet-600 px-8 py-12 text-center">
          <div
            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center
                          rounded-2xl bg-white/15 backdrop-blur-sm shadow-lg"
          >
            <Clock className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-1">
            Clockify API Setup
          </h1>
          <p className="text-white/75 text-sm">
            Connect your Clockify account to get started
          </p>
        </div>

        {/* ── Body ──────────────────────────────────────────────────── */}
        <div className="bg-[#1e1f35] px-8 py-8 space-y-8">
          {/* Steps */}
          <section>
            <h2 className="text-lg font-bold text-white mb-4">
              📚 How to Get Your API Key
            </h2>
            <div className="space-y-3">
              {STEPS.map((step) => (
                <div
                  key={step.number}
                  className="flex gap-4 rounded-xl border border-white/8
                             bg-white/4 px-4 py-3 border-l-4 border-l-indigo-500"
                >
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center
                                  rounded-full bg-indigo-600 text-white text-sm font-bold"
                  >
                    {step.number}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {step.title}
                    </p>
                    <p className="text-sm text-white/50 mt-0.5">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="border-t border-white/10" />

          {/* API key section */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-white">
              🔑 Enter Your API Key
            </h2>

            {/* Alert */}
            {message && (
              <div
                className={`flex items-start gap-2 rounded-xl border px-4 py-3 text-sm ${
                  alertColors[message.type]
                }`}
              >
                <Info className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{message.text}</span>
                <button
                  onClick={() => setMessage(null)}
                  className="ml-auto opacity-60 hover:opacity-100"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Saved key display */}
            {savedKey && (
              <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-4 py-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-white/60">
                    Current API Key
                  </span>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Saved
                  </Badge>
                </div>
                <code className="block text-sm font-mono text-white/80 break-all">
                  {showKey ? savedKey : maskKey(savedKey)}
                </code>
                <button
                  onClick={() => setShowKey(!showKey)}
                  className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  {showKey ? "Hide" : "Show"} full key
                </button>
              </div>
            )}

            {/* Input */}
            <div className="relative">
              <Input
                placeholder="Paste your API key here…"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                type={showKey ? "text" : "password"}
                className="bg-white/5 border-white/10 text-white pr-10
                           placeholder:text-white/30 focus:border-indigo-500 focus:ring-indigo-500"
              />
              <button
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2
                           text-white/40 hover:text-white/80 transition-colors"
                aria-label="Toggle visibility"
              >
                {showKey ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                onClick={handleSave}
                className="flex-1 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold"
              >
                <Save className="h-4 w-4 mr-2" /> Save API Key
              </Button>
              <Button
                onClick={handleClear}
                disabled={!savedKey}
                variant="outline"
                className="flex-1 rounded-xl border-white/15 text-white/70
                           hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/40
                           disabled:opacity-30"
              >
                <Trash2 className="h-4 w-4 mr-2" /> Clear Key
              </Button>
            </div>

            {/* Info footer */}
            <p className="flex items-center gap-1.5 text-xs text-white/40">
              <Info className="h-3.5 w-3.5 shrink-0" />
              Your API key is stored in browser cookies for 365 days.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
