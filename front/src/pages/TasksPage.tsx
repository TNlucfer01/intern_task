import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import type { Task } from "../api/types/task.types";
import { getTaskColumns } from "../features/tasks/components/TaskColumns";
import { TaskDialog } from "../features/tasks/components/TaskDialog";
import { useTasks } from "../features/tasks/hooks/useTasks";
import { DataTable } from "../components/DataTable";
import { PageHeader } from "../components/PageHeader";
import { WorkspaceLayout } from "../components/WorkspaceLayout";
import { Button } from "../components/ui/button";

export function TasksPage() {
  const {
    tasks,
    users,
    projects,
    isLoading,
    isLoadingOptions,
    error,
    optionsError,
    deletingId,
    create,
    update,
    remove,
  } = useTasks();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Task | null>(null);

  const columns = useMemo(
    () =>
      getTaskColumns({
        onEdit: (task) => {
          setEditing(task);
          setDialogOpen(true);
        },
        onDelete: remove,
        deletingId,
        users,
        projects,
      }),
    [deletingId, projects, remove, users],
  );

  async function handleSubmit(input: Parameters<typeof create>[0]) {
    if (editing) {
      await update(editing.id, input);
    } else {
      await create(input);
    }
  }

  return (
    <WorkspaceLayout>
      <PageHeader
        action={
          <Button
            onClick={() => {
              setEditing(null);
              setDialogOpen(true);
            }}
          >
            <Plus />
            New task
          </Button>
        }
        description="Create actionable work, assign it to a teammate, and keep due dates on track."
        eyebrow="Workspace"
        title="Tasks"
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
          Loading tasks…
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={tasks}
          emptyMessage="No tasks found. Create your first task to get started."
          searchPlaceholder="Search tasks..."
        />
      )}
      <TaskDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        task={editing}
        users={users}
        projects={projects}
        isLoadingOptions={isLoadingOptions}
        optionsError={optionsError}
        onSubmit={handleSubmit}
      />
    </WorkspaceLayout>
  );
}
