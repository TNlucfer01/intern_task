import { useEffect, useState, type FormEvent } from "react";
import type { Department } from "../../../api/types/dept.types";
import type { CreateUserInput, User } from "../../../api/types/user.types";
import { FormField } from "../../../components/FormField";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";

export type UserFormValues = Omit<CreateUserInput, "assigned_department"> & {
  assigned_department: number | "";
};

const emptyForm: UserFormValues = {
  name: "",
  email: "",
  password: "",
  role: "EMPLOYEE",
  title: "",
  assigned_department: "",
};

interface UserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: User | null;
  departments: Department[];
  onSubmit: (data: UserFormValues) => Promise<void>;
}

export function UserDialog({
  open,
  onOpenChange,
  user,
  departments,
  onSubmit,
}: UserDialogProps) {
  const [form, setForm] = useState<UserFormValues>(emptyForm);
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const isEditing = Boolean(user);

  useEffect(() => {
    if (open) {
      setForm(
        user
          ? {
              name: user.name,
              email: user.email,
              password: "",
              role: user.role,
              title: user.title ?? "",
              assigned_department: user.assigned_department ?? "",
            }
          : emptyForm,
      );
      setFormError(null);
    }
  }, [open, user]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setFormError(null);
    try {
      await onSubmit(form);
      onOpenChange(false);
    } catch (cause) {
      setFormError(cause instanceof Error ? cause.message : "Unable to save user.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit user" : "Create user"}</DialogTitle>
          <DialogDescription>
            Add user details and assign their workspace role and department.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4" onSubmit={(event) => void handleSubmit(event)}>
          <FormField id="user-name" label="Full name">
            <Input
              autoFocus
              id="user-name"
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              placeholder="e.g. Alex Morgan"
              required
              value={form.name}
            />
          </FormField>
          <FormField id="user-email" label="Email">
            <Input
              autoComplete="email"
              id="user-email"
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              placeholder="name@company.com"
              required
              type="email"
              value={form.email}
            />
          </FormField>
          {!isEditing && (
            <FormField id="user-password" label="Temporary password">
              <Input
                autoComplete="new-password"
                id="user-password"
                minLength={8}
                onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                required
                type="password"
                value={form.password}
              />
            </FormField>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField id="user-role" label="Role">
              <select
                className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                id="user-role"
                onChange={(event) => setForm((current) => ({ ...current, role: event.target.value }))}
                value={form.role}
              >
                <option value="EMPLOYEE">Employee</option>
                <option value="ADMIN">Admin</option>
              </select>
            </FormField>
            <FormField id="user-title" label="Job title">
              <Input
                id="user-title"
                onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                placeholder="e.g. Designer"
                value={form.title ?? ""}
              />
            </FormField>
          </div>
          <FormField id="user-department" label="Department">
            <select
              className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              id="user-department"
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  assigned_department: event.target.value ? Number(event.target.value) : "",
                }))
              }
              value={form.assigned_department}
            >
              <option value="">No department</option>
              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
          </FormField>
          {formError && <p className="text-sm text-destructive" role="alert">{formError}</p>}
          <DialogFooter>
            <Button disabled={isSaving} onClick={() => onOpenChange(false)} type="button" variant="outline">
              Cancel
            </Button>
            <Button disabled={isSaving} type="submit">
              {isSaving ? "Saving..." : isEditing ? "Save changes" : "Create user"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
