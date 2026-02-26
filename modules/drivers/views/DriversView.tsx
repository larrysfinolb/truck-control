"use client";

import { usePageTitle } from "@/modules/shared/hooks/usePageTitle";
import { useState } from "react";
import { DriversLayout } from "../layouts/DriversLayout";
import { CreateDriver } from "../components/Dialogs/CreateDriver";
import { useDrivers } from "../hooks/useDrivers";
import { DriversListTable } from "../components/Tables/DriversList";

export default function DriversView() {
  usePageTitle("Drivers");

  const [params, _setParams] = useState({
    page: 1,
    limit: 100,
  });

  const { data: drivers } = useDrivers(params);

  return (
    <DriversLayout>
      <div className='flex justify-end'>
        <CreateDriver />
      </div>
      <DriversListTable data={drivers?.data || []} />
    </DriversLayout>
  );
}
