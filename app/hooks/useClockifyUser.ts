"use client";
import { useEffect, useState } from "react";

interface ClockifyUser {
  userId: string;
  workspaceId: string;
  name: string;
  email: string;
}

export const useClockifyUser = () => {
  const [userInfo, setUserInfo] = useState<ClockifyUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiKey = localStorage.getItem("clockifyApiKey");
    console.log("api key", apiKey);
    if (!apiKey) {
      setError("Clockify API key not found in localStorage.");
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await fetch("https://api.clockify.me/api/v1/user", {
          headers: {
            "X-Api-Key": apiKey,
          },
        });

        if (!response.ok) {
          throw new Error("Invalid API key or network error");
        }

        const user = await response.json();

        const userData: ClockifyUser = {
          userId: user.id,
          workspaceId: user.activeWorkspace,
          name: user.name,
          email: user.email,
        };
        console.log("userdata", userData);
        setUserInfo(userData);
        localStorage.setItem("clockifyUserInfo", JSON.stringify(userData));
      } catch (err: any) {
        console.error("Failed to fetch user data")
        setError(err.message || "Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    const cached = localStorage.getItem("clockifyUserInfo");
    fetchUser()
  }, []);

  return { userInfo, loading, error };
};
