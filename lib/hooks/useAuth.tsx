"use client";
import { useEffect, useState } from "react";

type User = { id: string; email: string; role: string } | null;

export function useAuth() {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => setUser(data.user))
      .finally(() => setIsLoading(false));
  }, []);

  return { user, isLoggedIn: !!user, isLoading };
}