"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../stores/useAuthStore";

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const authStore = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!authStore.isAuthenticated) {
      router.replace("/auth/login");
    }
  }, [authStore.isAuthenticated, router]);

  if (!authStore.isAuthenticated) {
    return (
      <div className='flex h-screen w-full items-center justify-center bg-gray-50'>
        <p className='text-gray-500 animate-pulse'>Verificando sesión...</p>
      </div>
    );
  }

  return <>{children}</>;
};
