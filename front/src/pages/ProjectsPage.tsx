import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import type { Project } from "../api/types/project.types";
import { getProjectColumns } from "../features/projects/components/ProjectColumns";
import { ProjectDialog } from "../features/projects/components/ProjectDialog";
import { useProjects } from "../features/projects/hooks/useProjects";
import { DataTable } from "../components/DataTable";
import { PageHeader } from "../components/PageHeader";
import { WorkspaceLayout } from "../components/WorkspaceLayout";
import { Button } from "../components/ui/button";

export function ProjectsPage() {
  const { projects, isLoading, error, deletingId, create, update, remove } =
    useProjects();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);

  const columns = useMemo(
    () =>
      getProjectColumns({
        onEdit: (project) => {
          setEditing(project);
          setDialogOpen(true);
        },
        onDelete: remove,
        deletingId,
      }),
    [deletingId, remove],
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
            New project
          </Button>
        }
        description="Plan initiatives, track their progress, and keep deadlines in view."
        eyebrow="Workspace"
        title="Projects"
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
          Loading projects…
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={projects}
          emptyMessage="No projects found. Create your first project to get started."
          searchPlaceholder="Search projects..."
        />
      )}
      <ProjectDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        project={editing}
        onSubmit={handleSubmit}
      />
    </WorkspaceLayout>
  );
}
