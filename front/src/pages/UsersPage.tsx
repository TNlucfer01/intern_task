import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import type { User } from "../api/types/user.types";
import { getUserColumns } from "../features/users/components/UserColumns";
import {
  UserDialog,
  type UserFormValues,
} from "../features/users/components/UserDialog";
import { useUsers } from "../features/users/hooks/useUsers";
import { DataTable } from "../components/DataTable";
import { PageHeader } from "../components/PageHeader";
import { WorkspaceLayout } from "../components/WorkspaceLayout";
import { Button } from "../components/ui/button";

export function UsersPage() {
  const { users, departments, isLoading, error, deletingId, create, update, remove } =
    useUsers();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);

  const columns = useMemo(
    () =>
      getUserColumns({
        departments,
        onEdit: (user) => {
          setEditing(user);
          setDialogOpen(true);
        },
        onDelete: remove,
        deletingId,
      }),
    [departments, deletingId, remove],
  );

  async function handleSubmit(data: UserFormValues) {
    const assigned_department =
      data.assigned_department === "" ? null : Number(data.assigned_department);
    if (editing) {
      await update(editing.id, {
        name: data.name,
        email: data.email,
        role: data.role,
        title: data.title || null,
        assigned_department,
      });
    } else {
      await create({ ...data, assigned_department });
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
            New user
          </Button>
        }
        description="Manage workspace access, roles, and team assignments."
        eyebrow="Workspace"
        title="Users"
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
          Loading users…
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={users}
          emptyMessage="No users found. Create your first user to get started."
          searchPlaceholder="Search users..."
        />
      )}
      <UserDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        user={editing}
        departments={departments}
        onSubmit={handleSubmit}
      />
    </WorkspaceLayout>
  );
}
