import type { ColumnDef } from "@tanstack/react-table";
import { BriefcaseBusiness, SquarePen } from "lucide-react";
import type { Project } from "../../../api/types/project.types";
import { DeleteConfirmation } from "../../../components/DeleteConfirmation";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";

function formatDate(value: string | null) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "—"
    : new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(date);
}

function statusVariant(status: string) {
  const normalized = status.trim().toLowerCase();
  if (normalized.includes("complete")) return "default" as const;
  if (normalized.includes("hold")) return "destructive" as const;
  return "secondary" as const;
}

interface GetColumnsOptions {
  onEdit: (project: Project) => void;
  onDelete: (id: number) => void;
  deletingId: number | null;
}

export function getProjectColumns({
  onEdit,
  onDelete,
  deletingId,
}: GetColumnsOptions): ColumnDef<Project, unknown>[] {
  return [
    {
      accessorKey: "name",
      header: "Project",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
            <BriefcaseBusiness className="size-4" />
          </div>
          <div className="min-w-0">
            <p className="font-medium">{row.original.name}</p>
            <p className="max-w-sm truncate text-xs text-muted-foreground">
              {row.original.description}
            </p>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={statusVariant(row.original.status)}>{row.original.status}</Badge>
      ),
    },
    {
      accessorKey: "deadline",
      header: "Deadline",
      cell: ({ row }) => (
        <span className="text-muted-foreground">{formatDate(row.original.deadline)}</span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Created",
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
