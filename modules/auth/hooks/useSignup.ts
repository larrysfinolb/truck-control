"use client";

import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/auth";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../stores/useAuthStore";

export const useSignup = () => {
  const authStore = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: authApi.signup,
    onSuccess: ({ data }) => {
      authStore.login(data.accessToken);
      router.push("/");
    },
    onError: (error) => {
      console.error("Signup failed:", error);
    },
  });
};
