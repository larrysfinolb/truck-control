"use client";

import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/auth";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: ({ data }) => {
      localStorage.setItem("token", data.accessToken);
      router.push("/");
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};
