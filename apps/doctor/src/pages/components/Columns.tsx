"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/router";

export const columns: ColumnDef<any>[] = [
  {
    header: "ID",
    accessorKey: "_id",
  },
  {
    header: "Reason for Visit",
    accessorKey: "reasonForVisit",
  },
  {
    header: "Description",
    accessorKey: "description",
  },
  {
    header: "Booking Date",
    accessorKey: "bookingDate",
    cell: (info: any) => new Date(info.getValue()).toLocaleString(),
  },
  {
    header: "Created At",
    accessorKey: "createdAt",
    cell: (info: any) => new Date(info.getValue()).toLocaleString(),
  },
  {
    header: "Updated At",
    accessorKey: "updatedAt",
    cell: (info: any) => new Date(info.getValue()).toLocaleString(),
  },
  {
    header: "Actions",
    accessorKey: "actions",
    cell: (info: any) => {
      const router = useRouter(); // ✅ Move useRouter inside the cell function
      const id = info.row.original._id;

      return (
        <div className="flex space-x-2">
          {/* Edit Button */}
          <Button
            variant="default"
            onClick={() => router.push(`/editAppointment/${id}`)}
          >
            Edit
          </Button>
          {/* Delete Button */}
          <Button variant="destructive">Delete</Button>
        </div>
      );
    },
  },
];
