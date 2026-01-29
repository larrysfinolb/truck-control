"use client";

import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/auth";
import { useRouter } from "next/navigation";

export const useSignup = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: authApi.signup,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      router.push("/");
    },
    onError: (error) => {
      console.error("Signup failed:", error);
    },
  });
};
