"use client";

import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/auth";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../stores/useAuthStore";

export const useLogin = () => {
  const authStore = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: ({ data }) => {
      authStore.login(data.accessToken);
      router.push("/");
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};
