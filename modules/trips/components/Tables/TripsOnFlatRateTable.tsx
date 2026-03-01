"use client";

import { DataTable } from "@/modules/shared/components/Table";
import { ColumnDef } from "@tanstack/react-table";
import { CircleUserIcon } from "lucide-react";
import { DeliveryBasedOnRate } from "../../interfaces/deliveryResponse";

interface DeliveriesBasedOnRateTableProps {
  data: DeliveryBasedOnRate[];
}

const COLUMNS: ColumnDef<DeliveryBasedOnRate>[] = [
  {
    accessorKey: "index",
    header: "#",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.original.pickupDate);
      return date.toLocaleDateString();
    },
  },
  {
    accessorKey: "vehicle",
    header: "Vehicle",
  },
  {
    accessorKey: "driver",
    header: "Driver",
    cell: ({ row }) => {
      const driverName: string = row.original.driver;
      return (
        <span className='flex items-center gap-2'>
          <CircleUserIcon /> {driverName}
        </span>
      );
    },
  },
  {
    accessorKey: "origin",
    header: "Origin",
  },
  {
    accessorKey: "destination",
    header: "Destination",
  },
  {
    accessorKey: "rate",
    header: "Rate",
    cell: ({ row }) => {
      const rate: number = row.original.rate;
      return Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(rate);
    },
  },
  {
    accessorKey: "carrierFee",
    header: "Carrier Fee",
    cell: ({ row }) => {
      const carrierFee: number = row.original.carrierFee;
      return Intl.NumberFormat("en-US", { style: "percent" }).format(carrierFee);
    },
  },
];

export function TripsOnFlatRateTable({ data }: DeliveriesBasedOnRateTableProps) {
  return <DataTable columns={COLUMNS} data={data} />;
}
