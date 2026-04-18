"use client";

import { DataTable } from "@/modules/shared/components/Table";
import { ColumnDef } from "@tanstack/react-table";
import { DeliveryBasedOnRate } from "../../interfaces/trip";
import { useMemo } from "react";
import { createActionsColumn, createCommonTripColumns } from "./tripTableColumns";
import { formatCurrency } from "@/modules/shared/utils/formatters";

interface DeliveriesBasedOnRateTableProps {
  data: DeliveryBasedOnRate[];
}

export function TripsOnFlatRateTable({ data }: DeliveriesBasedOnRateTableProps) {
  const columns = useMemo<ColumnDef<DeliveryBasedOnRate>[]>(
    () => [
      ...createCommonTripColumns<DeliveryBasedOnRate>(),
      {
        accessorKey: "rate",
        header: "Rate",
        cell: ({ row }) => formatCurrency(row.original.rate),
      },
      {
        accessorKey: "carrierFee",
        header: "Carrier Fee",
        cell: ({ row }) => {
          const rate = row.original.rate;
          const carrierFee = row.original.carrierFee;
          const feeAmount = rate * carrierFee;
          return formatCurrency(feeAmount);
        },
      },
      {
        accessorKey: "totalPayment",
        header: "Total Payment",
        cell: ({ row }) => formatCurrency(row.original.totalPayment),
      },
      createActionsColumn<DeliveryBasedOnRate>(),
    ],
    []
  );

  return <DataTable columns={columns} data={data} />;
}
