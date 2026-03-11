"use client";

import { DataTable } from "@/modules/shared/components/Table";
import { ColumnDef } from "@tanstack/react-table";
import { DeliveryBasedOnRate } from "../../interfaces/deliveryResponse";
import { Button } from "@/modules/shared/components/UI/button";
import { Library } from "lucide-react";
import Link from "next/link";

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
    cell: ({ row }) => {
      const { licensePlate, model } = row.original.vehicle;
      return (
        <span className='flex items-center gap-2'>
          {licensePlate} - {model}
        </span>
      );
    },
  },
  {
    accessorKey: "driver",
    header: "Driver",
    cell: ({ row }) => {
      const { firstName, lastName } = row.original.driver;
      return (
        <span className='flex items-center gap-2'>
          {firstName} {lastName}
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
      const rate = row.original.rate;
      const carrierFee = row.original.carrierFee;
      const feeAmount = rate * carrierFee;
      return Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(feeAmount);
    },
  },
  {
    accessorKey: "totalRate",
    header: "Total Rate",
    cell: ({ row }) => {
      const totalRate: number = row.original.totalRate;
      return Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(totalRate);
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <Button size={"icon-sm"} variant={"outline"} tooltip='Details'>
          <Link href={`/trips/${row.original.id}`}>
            <Library />
          </Link>
        </Button>
      );
    },
  },
];

export function TripsOnFlatRateTable({ data }: DeliveriesBasedOnRateTableProps) {
  return <DataTable columns={COLUMNS} data={data} />;
}
