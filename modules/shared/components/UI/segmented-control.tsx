"use client";

import { cn } from "@/lib/utils";
import * as React from "react";

interface SegmentedControlContextValue {
  value: string;
  onValueChange?: (value: string) => void;
}

const SegmentedControlContext = React.createContext<SegmentedControlContextValue | null>(null);

function useSegmentedControlContext(componentName: string) {
  const context = React.useContext(SegmentedControlContext);

  if (!context) {
    throw new Error(`${componentName} must be used within SegmentedControl`);
  }

  return context;
}

function SegmentedControl({
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
    <SegmentedControlContext.Provider value={{ value: currentValue, onValueChange: handleValueChange }}>
      <div
        data-slot='segmented-control'
        role='tablist'
        className={cn(
          "inline-flex w-fit items-center gap-1 rounded-xl bg-muted p-1 shadow-inner",
          className
        )}
      >
        {children}
      </div>
    </SegmentedControlContext.Provider>
  );
}

function SegmentedControlItem({
  value,
  className,
  ...props
}: React.ComponentProps<"button"> & { value: string }) {
  const context = useSegmentedControlContext("SegmentedControlItem");
  const isActive = context.value === value;

  return (
    <button
      type='button'
      role='tab'
      aria-selected={isActive}
      data-state={isActive ? "active" : "inactive"}
      data-slot='segmented-control-item'
      className={cn(
        "grow inline-flex min-w-28 items-center justify-center rounded-lg px-3 py-1.5 text-sm font-medium transition-all outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        isActive
          ? "bg-background text-foreground shadow-sm"
          : "text-muted-foreground hover:bg-background/60 hover:text-foreground",
        className
      )}
      onClick={() => context.onValueChange?.(value)}
      {...props}
    />
  );
}

export { SegmentedControl, SegmentedControlItem };