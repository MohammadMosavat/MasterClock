import { useState } from "react";
import { useNavigate } from "react-router";
import { clearApiKey, getApiKey } from "~/utils/auth";

import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { Copy, Check, LogOut } from "lucide-react";

export default function DashboardSettings() {
  const navigate = useNavigate();
  const apiKey = getApiKey();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!apiKey) return;
    await navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-base font-semibold text-white">API Key</h2>

      {/* API key display */}
      <div
        className="flex items-center gap-2 rounded-xl border border-indigo-500/50
                   bg-white/5 px-4 py-3"
      >
        <span className="flex-1 font-mono text-sm text-white/80">
          {apiKey ? `${apiKey.slice(0, 6)}••••••••` : "No API Key"}
        </span>

        {apiKey && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleCopy}
                  className="flex h-7 w-7 items-center justify-center rounded-lg
                             text-white/50 hover:bg-white/10 hover:text-white
                             transition-colors"
                  aria-label="Copy API key"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-400" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                {copied ? "Copied!" : "Copy API Key"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      {/* Logout */}
      <Button
        variant="outline"
        onClick={() => {
          clearApiKey();
          navigate("/");
        }}
        className="border-red-500/50 text-red-400 hover:bg-red-500/10
                   hover:text-red-300 hover:border-red-400 rounded-xl"
      >
        <LogOut className="h-4 w-4 mr-2" />
        Clear API Key & Logout
      </Button>
    </div>
  );
}
