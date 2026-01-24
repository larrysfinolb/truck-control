"use client";

import { useEffect } from "react";
import { useUIStore } from "../stores/useUIStore";

export function usePageTitle(title: string) {
  const setPageTitle = useUIStore((state) => state.setPageTitle);

  useEffect(() => {
    setPageTitle(title);
  }, [title, setPageTitle]);
}
