import { AppSidebar } from "@/modules/shared/components/Sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/modules/shared/components/UI/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { Header } from "@/modules/shared/components/Header";
import { AuthGuard } from "@/modules/auth/components/AuthGuard/AuthGuard";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className='flex h-16 shrink-0 items-center gap-2'>
            <div className='flex items-center gap-2 px-4'>
              <Header>
                <SidebarTrigger className='-ml-1' />
                <Separator orientation='vertical' className='mr-2 data-[orientation=vertical]:h-4' />
              </Header>
            </div>
          </header>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </AuthGuard>
  );
}
