"use client";

import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/auth";
import { useRouter } from "next/navigation";
import { authStorage } from "../utils/authStorage";

export const useSignup = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: authApi.signup,
    onSuccess: ({ data }) => {
      authStorage.setToken(data.accessToken);
      router.push("/");
    },
    onError: (error) => {
      console.error("Signup failed:", error);
    },
  });
};
