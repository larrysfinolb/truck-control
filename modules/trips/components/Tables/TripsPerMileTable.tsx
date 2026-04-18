"use client";

import { DataTable } from "@/modules/shared/components/Table";
import { ColumnDef } from "@tanstack/react-table";
import { DeliveryBasedOnMileage } from "../../interfaces/trip";
import { useMemo } from "react";
import { createActionsColumn, createCommonTripColumns } from "./tripTableColumns";
import { formatCurrency, formatNumber } from "@/modules/shared/utils/formatters";

interface DeliveriesBasedOnMileageTableProps {
  data: DeliveryBasedOnMileage[];
}

export function TripsPerMileTable({ data }: DeliveriesBasedOnMileageTableProps) {
  const columns = useMemo<ColumnDef<DeliveryBasedOnMileage>[]>(
    () => [
      ...createCommonTripColumns<DeliveryBasedOnMileage>(),
      {
        accessorKey: "miles",
        header: "Miles",
        cell: ({ row }) => formatNumber(row.original.miles),
      },
      {
        accessorKey: "ratePerMile",
        header: "Rate Per Miles",
        cell: ({ row }) => formatCurrency(row.original.ratePerMile),
      },
      {
        accessorKey: "deadheadMiles",
        header: "DeadHead Miles",
        cell: ({ row }) => formatNumber(row.original.deadheadMiles),
      },
      {
        accessorKey: "ratePerDeadheadMile",
        header: "Rate Per DeadHead Miles",
        cell: ({ row }) => formatCurrency(row.original.ratePerDeadheadMile),
      },
      {
        accessorKey: "totalPayment",
        header: "Total Payment",
        cell: ({ row }) => formatCurrency(row.original.totalPayment),
      },
      createActionsColumn<DeliveryBasedOnMileage>(),
    ],
    []
  );

  return <DataTable columns={columns} data={data} />;
}
