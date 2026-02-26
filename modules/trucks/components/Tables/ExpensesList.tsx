import { DataTable } from "@/modules/shared/components/Table";
import { ColumnDef } from "@tanstack/react-table";
import { Truck } from "../../interfaces/truckResponse";

interface TrucksListTableProps {
  data: Truck[];
}

const COLUMNS: ColumnDef<Truck>[] = [
  {
    accessorKey: "index",
    header: "#",
  },
  {
    accessorKey: "make",
    header: "Make",
  },
  {
    accessorKey: "model",
    header: "Model",
  },
  {
    accessorKey: "year",
    header: "Year",
  },
  {
    accessorKey: "color",
    header: "Color",
  },
  {
    accessorKey: "licensePlate",
    header: "License Plate",
  },
  {
    accessorKey: "vin",
    header: "VIN",
  },
];

export function TrucksListTable({ data }: TrucksListTableProps) {
  return <DataTable columns={COLUMNS} data={data} />;
}
