import type { ColumnDef } from "@tanstack/react-table";
import { CheckCircle2, Circle, SquarePen } from "lucide-react";
import type { Task } from "../../../api/types/task.types";
import { DeleteConfirmation } from "../../../components/DeleteConfirmation";
import { Button } from "../../../components/ui/button";

function formatDate(value: string | null) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "—"
    : new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(date);
}

interface GetColumnsOptions {
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  deletingId: number | null;
}

export function getTaskColumns({
  onEdit,
  onDelete,
  deletingId,
}: GetColumnsOptions): ColumnDef<Task, unknown>[] {
  return [
    {
      accessorKey: "title",
      header: "Task",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div
            className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${
              row.original.completedAt
                ? "bg-emerald-100 text-emerald-700"
                : "bg-amber-100 text-amber-700"
            }`}
          >
            {row.original.completedAt ? (
              <CheckCircle2 className="size-4" />
            ) : (
              <Circle className="size-4" />
            )}
          </div>
          <div className="min-w-0">
            <p className="font-medium">{row.original.title}</p>
            <p className="max-w-sm truncate text-xs text-muted-foreground">
              {row.original.description || "No description"}
            </p>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "assignedTo",
      header: "Assignee",
      cell: ({ row }) => (
        <span className="text-muted-foreground">User #{row.original.assignedTo}</span>
      ),
    },
    {
      accessorKey: "associatedProject",
      header: "Project",
      cell: ({ row }) => (
        <span className="text-muted-foreground">
          Project #{row.original.associatedProject}
        </span>
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
      accessorKey: "completedAt",
      header: "Status",
      cell: ({ row }) =>
        row.original.completedAt ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-1 text-xs font-medium">
            <CheckCircle2 className="size-3" />
            Completed
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs font-medium">
            <Circle className="size-3" />
            Open
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
            aria-label={`Edit ${row.original.title}`}
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
            recordName={row.original.title}
          />
        </div>
      ),
    },
  ];
}
