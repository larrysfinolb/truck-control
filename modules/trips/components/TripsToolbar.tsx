"use client";

import { SearchInput } from "@/modules/shared/components/SearchInput";
import { ChangeEvent } from "react";
import { TripType } from "../enums/tripTypes";
import { CreateTripDialog } from "./CreateTripDialog";

interface TripsToolbarProps {
  activeType: TripType;
  searchTerm: string;
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function TripsToolbar({ activeType, searchTerm, onSearchChange }: TripsToolbarProps) {
  return (
    <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
      <div className='w-full sm:max-w-md'>
        <SearchInput
          className='w-full'
          placeholder='Search for a trip by...'
          value={searchTerm}
          onChange={onSearchChange}
        />
      </div>
      <CreateTripDialog key={activeType} initialType={activeType} />
    </div>
  );
}
