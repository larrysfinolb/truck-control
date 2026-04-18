"use client";

import { Button } from "@/modules/shared/components/UI/button";
import { ConfirmDialog } from "@/modules/shared/components/ConfirmDialog";
import { ColumnDef } from "@tanstack/react-table";
import { Library, Trash2 } from "lucide-react";
import Link from "next/link";
import { useDeleteDelivery } from "../../hooks/useTrips";
import { Delivery } from "../../interfaces/trip";

type BaseTripRow = Pick<Delivery, "id" | "pickupDate" | "vehicle" | "driver" | "origin" | "destination">;

function TripTableActions({ deliveryId }: { deliveryId: string }) {
  const { mutateAsync: deleteTrip } = useDeleteDelivery();

  return (
    <div className='flex gap-2'>
      <Button size='icon-sm' variant='outline' tooltip='Details' asChild>
        <Link href={`/trips/${deliveryId}`}>
          <Library />
        </Link>
      </Button>

      <ConfirmDialog
        title='Delete Trip?'
        description='This will permanently delete this trip and all associated data. Are you sure you want to proceed?'
        confirmText='Delete'
        confirmVariant='destructive'
        onConfirm={async () => await deleteTrip(deliveryId)}
        icon={<Trash2 className='text-destructive' />}
      >
        <Button size='icon-sm' variant='outline' tooltip='Delete' className='text-destructive hover:bg-destructive/10'>
          <Trash2 />
        </Button>
      </ConfirmDialog>
    </div>
  );
}

export function createCommonTripColumns<T extends BaseTripRow>(): ColumnDef<T>[] {
  return [
    {
      id: "index",
      header: "#",
      cell: ({ row }) => row.index + 1,
    },
    {
      id: "date",
      header: "Date",
      cell: ({ row }) => {
        const date = new Date(row.original.pickupDate);
        return date.toLocaleDateString();
      },
    },
    {
      id: "vehicle",
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
      id: "driver",
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
  ];
}

export function createActionsColumn<T extends Pick<Delivery, "id">>(): ColumnDef<T> {
  return {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <TripTableActions deliveryId={row.original.id} />,
  };
}
