import type { ColumnDef } from "@tanstack/react-table";
import { Building2, SquarePen } from "lucide-react";
import type { Department } from "../../../api/types/dept.types";
import { Button } from "../../../components/ui/button";
import { DeleteConfirmation } from "../../../components/DeleteConfirmation";

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "—"
    : new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(date);
}

interface GetColumnsOptions {
  onEdit: (department: Department) => void;
  onDelete: (id: number) => void;
  deletingId: number | null;
}

export function getDepartmentColumns({
  onEdit,
  onDelete,
  deletingId,
}: GetColumnsOptions): ColumnDef<Department, unknown>[] {
  return [
    {
      accessorKey: "name",
      header: "Department",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-700">
            <Building2 className="size-4" />
          </div>
          <div>
            <p className="font-medium">{row.original.name}</p>
            <p className="text-xs text-muted-foreground">ID {row.original.id}</p>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <span className="block max-w-sm truncate text-muted-foreground">
          {row.original.description}
        </span>
      ),
    },
    {
      accessorKey: "updatedAt",
      header: "Last updated",
      cell: ({ row }) => (
        <span className="text-muted-foreground">
          {formatDate(row.original.updatedAt)}
        </span>
      ),
    },
    {
      id: "actions",
      enableGlobalFilter: false,
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-1">
          <Button
            aria-label={`Edit ${row.original.name}`}
            onClick={() => onEdit(row.original)}
            size="sm"
            variant="ghost"
          >
            <SquarePen />
            Edit
          </Button>
          <DeleteConfirmation
            disabled={deletingId === row.original.id}
            onConfirm={() => void onDelete(row.original.id)}
            recordName={row.original.name}
          />
        </div>
      ),
    },
  ];
}