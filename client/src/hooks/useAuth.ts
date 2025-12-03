import { useQuery } from "@tanstack/react-query";

export function useAuth() {
  const { data, isLoading } = useQuery({
    queryKey: ["auth-user"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/user");

        if (!res.ok) {
          return { user: null, isAuthenticated: false };
        }

        const data = await res.json();
        return { user: data.user, isAuthenticated: !!data.user };
      } catch {
        return { user: null, isAuthenticated: false };
      }
    },
    retry: false,
  });

  return {
    user: data?.user ?? null,
    isAuthenticated: data?.isAuthenticated ?? false,
    isLoading,
  };
}
