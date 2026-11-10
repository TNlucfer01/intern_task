import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { DataTable } from "@/components/DataTable";
import { PageHeader } from "@/components/PageHeader";
import { WorkspaceLayout } from "@/components/WorkspaceLayout";
import { Button } from "@/components/ui/button";
import type { Department } from "./../api/types/dept.types";
import { DepartmentDialog } from "../features/departments/components/DepartmentDialog";
import { getDepartmentColumns } from "../features/departments/components/DepartmentColumns";
import { useDepartments } from "../features/departments/hooks/useDepartments";

export function DepartmentsPage() {
  const { departments, isLoading, error, deletingId, create, update, remove } =
    useDepartments();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Department | null>(null);

  const columns = useMemo(
    () =>
      getDepartmentColumns({
        onEdit: (department) => {
          setEditing(department);
          setDialogOpen(true);
        },
        onDelete: remove,
        deletingId,
      }),
    [deletingId, remove],
  );

  async function handleSubmit(data: { name: string; description: string }) {
    if (editing) {
      await update(editing.id, data);
    } else {
      await create(data);
    }
  }

  return (
    <WorkspaceLayout>
      <PageHeader
        eyebrow="Workspace"
        title="Departments"
        description="Organize people and work into the teams that keep your projects moving."
        action={
          <Button
            onClick={() => {
              setEditing(null);
              setDialogOpen(true);
            }}
          >
            <Plus />
            New department
          </Button>
        }
      />

      {error && (
        <div
          className="mb-4 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
          role="alert"
        >
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="rounded-xl border bg-card p-10 text-center text-sm text-muted-foreground">
          Loading departments…
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={departments}
          emptyMessage="No departments found. Create your first department to get started."
          searchPlaceholder="Search departments..."
        />
      )}

      <DepartmentDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        department={editing}
        onSubmit={handleSubmit}
      />
    </WorkspaceLayout>
  );
}
