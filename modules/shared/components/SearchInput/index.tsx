import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/modules/shared/components/UI/input";
import { cn } from "@/lib/utils";

type SearchInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, value, onChange, ...props }, ref) => {
    return (
      <div className={cn("relative flex items-center w-full", className)}>
        <Search className='absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none' />
        <Input ref={ref} value={value} onChange={onChange} className='pl-9' type='search' {...props} />
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";
