"use client";

import { useUIStore } from "../../stores/useUIStore";

interface HeaderProps {
  children: React.ReactNode;
}

export function Header({ children }: HeaderProps) {
  const pageTitle = useUIStore((state) => state.pageTitle);

  return (
    <header className='flex h-16 shrink-0 items-center gap-2'>
      <div className='flex items-center gap-2 px-4'>
        {children}
        <h1 className='text-base font-medium'>{pageTitle}</h1>
      </div>
    </header>
  );
}
