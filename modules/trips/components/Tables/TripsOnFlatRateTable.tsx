"use client";

import { DataTable } from "@/modules/shared/components/Table";
import { ColumnDef } from "@tanstack/react-table";
import { DeliveryBasedOnRate } from "../../interfaces/deliveryResponse";
import { Button } from "@/modules/shared/components/UI/button";
import { Library, Trash2 } from "lucide-react";
import Link from "next/link";
import { ConfirmDialog } from "@/modules/shared/components/ConfirmDialog";
import { useMemo } from "react";
import { useDeleteDelivery } from "../../hooks/useDeliveries";

interface DeliveriesBasedOnRateTableProps {
  data: DeliveryBasedOnRate[];
}

const ActionsCell = ({ delivery }: { delivery: DeliveryBasedOnRate }) => {
  const { mutateAsync: deleteTrip } = useDeleteDelivery();

  return (
    <div className='flex gap-2'>
      <Button size={"icon-sm"} variant={"outline"} tooltip='Details'>
        <Link href={`/trips/${delivery.id}`}>
          <Library />
        </Link>
      </Button>

      <ConfirmDialog
        title='Delete Trip?'
        description='This will permanently delete this trip and all associated data. Are you sure you want to proceed?'
        confirmText='Delete'
        confirmVariant='destructive'
        onConfirm={async () => await deleteTrip(delivery.id)}
        icon={<Trash2 className='text-destructive' />}
      >
        <Button
          size={"icon-sm"}
          variant={"outline"}
          tooltip='Delete'
          className='text-destructive hover:bg-destructive/10'
        >
          <Trash2 />
        </Button>
      </ConfirmDialog>
    </div>
  );
};

export function TripsOnFlatRateTable({ data }: DeliveriesBasedOnRateTableProps) {
  const columns = useMemo<ColumnDef<DeliveryBasedOnRate>[]>(
    () => [
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
        cell: ({ row }) => <ActionsCell delivery={row.original} />,
      },
    ],
    []
  );

  return <DataTable columns={columns} data={data} />;
}
