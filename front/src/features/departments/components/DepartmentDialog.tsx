import { useEffect, useState, type FormEvent } from "react";
import type { CreateDepartmentInput, Department } from "../../../api/types/dept.types";
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
import { Textarea } from "../../../components/ui/textarea";

const emptyForm: CreateDepartmentInput = { name: "", description: "" };

interface DepartmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  department?: Department | null;
  onSubmit: (data: CreateDepartmentInput) => Promise<void>;
}

export function DepartmentDialog({
  open,
  onOpenChange,
  department,
  onSubmit,
}: DepartmentDialogProps) {
  const [form, setForm] = useState<CreateDepartmentInput>(emptyForm);
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const isEditing = Boolean(department);

  useEffect(() => {
    if (open) {
      setForm(
        department
          ? { name: department.name, description: department.description }
          : emptyForm,
      );
      setFormError(null);
    }
  }, [open, department]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setFormError(null);
    try {
      await onSubmit(form);
      onOpenChange(false);
    } catch (cause) {
      setFormError(
        cause instanceof Error ? cause.message : "Unable to save department.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit department" : "Create department"}
          </DialogTitle>
          <DialogDescription>
            Add a clear name and description so everyone knows what this team does.
          </DialogDescription>
        </DialogHeader>

        <form className="grid gap-4" onSubmit={(e) => void handleSubmit(e)}>
          <FormField id="department-name" label="Name">
            <Input
              autoFocus
              id="department-name"
              value={form.name}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="e.g. Product"
              required
            />
          </FormField>

          <FormField id="department-description" label="Description">
            <Textarea
              id="department-description"
              value={form.description}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, description: e.target.value }))
              }
              placeholder="What does this department work on?"
              required
            />
          </FormField>

          {formError && (
            <p className="text-sm text-destructive" role="alert">
              {formError}
            </p>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={isSaving}
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving
                ? "Saving..."
                : isEditing
                  ? "Save changes"
                  : "Create department"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}