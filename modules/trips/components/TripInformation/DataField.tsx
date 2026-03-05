import { cn } from "@/lib/utils";

interface DataFieldProps {
  label: string;
  value?: React.ReactNode;
  className?: string;
  fallback?: string;
}

export function DataField({ label, value, className, fallback = "" }: DataFieldProps) {
  const isEmpty = value === null || value === undefined || value === "";

  return (
    <div className={cn("flex flex-col space-y-1", className)}>
      <dt className='text-xs font-bold uppercase tracking-wider text-muted-foreground'>{label}</dt>
      <dd
        className={cn(
          "text-base font-semibold leading-none text-foreground",
          isEmpty && "text-muted-foreground font-normal italic"
        )}
      >
        {isEmpty ? fallback : value}
      </dd>
    </div>
  );
}
