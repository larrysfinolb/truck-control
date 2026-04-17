"use client";

import { cn } from "@/lib/utils";
import * as React from "react";

interface TabsContextValue {
  value: string;
  onValueChange?: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

function useTabsContext(componentName: string) {
  const context = React.useContext(TabsContext);

  if (!context) {
    throw new Error(`${componentName} must be used within Tabs`);
  }

  return context;
}

function Tabs({
  value,
  defaultValue,
  onValueChange,
  className,
  children,
}: React.PropsWithChildren<{
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}>) {
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");

  const currentValue = value ?? internalValue;

  const handleValueChange = React.useCallback(
    (nextValue: string) => {
      if (value === undefined) {
        setInternalValue(nextValue);
      }

      onValueChange?.(nextValue);
    },
    [onValueChange, value]
  );

  return (
    <TabsContext.Provider value={{ value: currentValue, onValueChange: handleValueChange }}>
      <div data-slot='tabs' className={cn("flex flex-col", className)}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

function TabsList({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot='tabs-list'
      className={cn(
        "inline-flex w-full items-center gap-1 border-b bg-transparent p-0 text-sm",
        className
      )}
      {...props}
    />
  );
}

function TabsTrigger({ value, className, ...props }: React.ComponentProps<"button"> & { value: string }) {
  const context = useTabsContext("TabsTrigger");
  const isActive = context.value === value;

  return (
    <button
      type='button'
      role='tab'
      aria-selected={isActive}
      data-state={isActive ? "active" : "inactive"}
      data-slot='tabs-trigger'
      className={cn(
        "-mb-px inline-flex min-w-28 items-center justify-center border-b-2 border-transparent px-3 py-2 text-sm font-medium transition-colors focus-visible:border-ring focus-visible:ring-ring/50 outline-none focus-visible:ring-[3px]",
        isActive
          ? "border-primary text-foreground"
          : "text-muted-foreground hover:border-border hover:text-foreground",
        className
      )}
      onClick={() => context.onValueChange?.(value)}
      {...props}
    />
  );
}

function TabsContent({ value, className, ...props }: React.ComponentProps<"div"> & { value: string }) {
  const context = useTabsContext("TabsContent");
  const isActive = context.value === value;

  if (!isActive) {
    return null;
  }

  return <div data-slot='tabs-content' role='tabpanel' className={cn("outline-none", className)} {...props} />;
}

export { Tabs, TabsContent, TabsList, TabsTrigger };