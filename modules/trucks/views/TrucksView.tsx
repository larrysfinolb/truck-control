"use client";

import { usePageTitle } from "@/modules/shared/hooks/usePageTitle";
import { useState } from "react";
import { useTrucks } from "../hooks/useTrucks";
import { TrucksLayout } from "../layouts/TrucksLayout";
import { CreateTruck } from "../components/Dialogs/CreateTruck";
import { TrucksListTable } from "../components/Tables/ExpensesList";

export default function TrucksView() {
  usePageTitle("Trucks");

  const [params, _setParams] = useState({
    page: 1,
    limit: 100,
  });

  const { data: trucks } = useTrucks(params);

  return (
    <TrucksLayout>
      <div className='flex justify-end'>
        <CreateTruck />
      </div>
      <TrucksListTable data={trucks?.data || []} />
    </TrucksLayout>
  );
}
