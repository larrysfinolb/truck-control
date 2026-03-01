"use client";

import { DataTable } from "@/modules/shared/components/Table";
import { ColumnDef } from "@tanstack/react-table";
import { DeliveryBasedOnMileage } from "../../interfaces/deliveryResponse";

interface DeliveriesBasedOnMileageTableProps {
  data: DeliveryBasedOnMileage[];
}

const COLUMNS: ColumnDef<DeliveryBasedOnMileage>[] = [
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
    accessorKey: "miles",
    header: "Miles",
    cell: ({ row }) => {
      const miles: number = row.original.miles;
      return Intl.NumberFormat("en-US").format(miles);
    },
  },
  {
    accessorKey: "ratePerMile",
    header: "Rate per Mile",
    cell: ({ row }) => {
      const ratePerMile: number = row.original.ratePerMile;
      return Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(ratePerMile);
    },
  },
  {
    accessorKey: "milesDeadhead",
    header: "Deadhead Miles",
    cell: ({ row }) => {
      const milesDeadhead: number = row.original.deadheadMiles;
      return Intl.NumberFormat("en-US").format(milesDeadhead);
    },
  },
  {
    accessorKey: "ratePerMileDeadhead",
    header: "Deadhead Rate per Mile",
    cell: ({ row }) => {
      const ratePerMileDeadhead: number = row.original.ratePerDeadheadMile;
      return Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(ratePerMileDeadhead);
    },
  },
  {
    accessorKey: "totalPayment",
    header: "Total Payment",
    cell: ({ row }) => {
      const totalPayment: number = row.original.totalPayment;
      return Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(totalPayment);
    },
  },
];

export function TripsPerMileTable({ data }: DeliveriesBasedOnMileageTableProps) {
  return <DataTable columns={COLUMNS} data={data} />;
}
