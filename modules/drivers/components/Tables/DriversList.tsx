import { DataTable } from "@/modules/shared/components/Table";
import { ColumnDef } from "@tanstack/react-table";
import { Driver } from "../../interfaces/driverResponse";
import { CircleUserIcon } from "lucide-react";

interface DriversListTableProps {
  data: Driver[];
}

const COLUMNS: ColumnDef<Driver>[] = [
  {
    accessorKey: "index",
    header: "#",
  },
  {
    accessorKey: "avatar",
    header: "Avatar",
    cell: () => {
      return <CircleUserIcon />;
    },
  },
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },
];

export function DriversListTable({ data }: DriversListTableProps) {
  return <DataTable columns={COLUMNS} data={data} />;
}
