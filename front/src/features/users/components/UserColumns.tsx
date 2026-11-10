import type { ColumnDef } from "@tanstack/react-table";
import { SquarePen, UserRound } from "lucide-react";
import type { Department } from "../../../api/types/dept.types";
import type { User } from "../../../api/types/user.types";
import { DeleteConfirmation } from "../../../components/DeleteConfirmation";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "—"
    : new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(date);
}

interface GetColumnsOptions {
  departments: Department[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
  deletingId: number | null;
}

export function getUserColumns({
  departments,
  onEdit,
  onDelete,
  deletingId,
}: GetColumnsOptions): ColumnDef<User, unknown>[] {
  const departmentNames = new Map(
    departments.map((department) => [department.id, department.name]),
  );

  return [
    {
      accessorKey: "name",
      header: "User",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-700">
            <UserRound className="size-4" />
          </div>
          <div>
            <p className="font-medium">{row.original.name}</p>
            <p className="text-xs text-muted-foreground">ID {row.original.id}</p>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <span className="text-muted-foreground">{row.original.email}</span>
      ),
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <Badge variant={row.original.role.toUpperCase() === "ADMIN" ? "default" : "secondary"}>
          {row.original.role}
        </Badge>
      ),
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <span className="text-muted-foreground">{row.original.title || "—"}</span>
      ),
    },
    {
      id: "department",
      accessorFn: (user) =>
        user.assigned_department
          ? departmentNames.get(user.assigned_department) ??
            `Department #${user.assigned_department}`
          : "",
      header: "Department",
      cell: ({ row }) => (
        <span className="text-muted-foreground">
          {row.original.assigned_department
            ? departmentNames.get(row.original.assigned_department) ??
              `Department #${row.original.assigned_department}`
            : "—"}
        </span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Joined",
      cell: ({ row }) => (
        <span className="text-muted-foreground">{formatDate(row.original.createdAt)}</span>
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
