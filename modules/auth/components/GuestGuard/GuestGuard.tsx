"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../stores/useAuthStore";

interface GuestGuardProps {
  children: React.ReactNode;
}

export const GuestGuard = ({ children }: GuestGuardProps) => {
  const authStore = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (authStore.isAuthenticated) {
      router.replace("/");
    }
  }, [authStore.isAuthenticated, router]);

  if (authStore.isAuthenticated) {
    return (
      <div className='flex h-screen w-full items-center justify-center bg-white'>
        <div className='h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600' />
      </div>
    );
  }

  return <>{children}</>;
};
