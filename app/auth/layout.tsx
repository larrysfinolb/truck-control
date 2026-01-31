import { GuestGuard } from "@/modules/auth/components/GuestGuard";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return <GuestGuard>{children}</GuestGuard>;
}
