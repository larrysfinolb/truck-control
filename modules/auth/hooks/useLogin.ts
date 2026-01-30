"use client";

import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/auth";
import { useRouter } from "next/navigation";
import { authStorage } from "../utils/authStorage";

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: ({ data }) => {
      authStorage.setToken(data.accessToken);
      router.push("/");
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};
