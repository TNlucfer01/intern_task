import { useEffect, useState, type FormEvent } from "react";
import type { CreateTaskInput, Task } from "../../../api/types/task.types";
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

type TaskForm = Omit<CreateTaskInput, "assignedTo" | "associatedProject" | "timeTaken"> & {
  assignedTo: number | "";
  associatedProject: number | "";
  timeTaken: number | "";
};

const emptyForm: TaskForm = {
  title: "",
  description: "",
  assignedTo: "",
  associatedProject: "",
  deadline: null,
  completedAt: null,
  timeTaken: "",
};

function dateInputValue(value: string | null | undefined) {
  return value ? value.slice(0, 10) : "";
}

interface TaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task?: Task | null;
  onSubmit: (data: CreateTaskInput) => Promise<void>;
}

export function TaskDialog({ open, onOpenChange, task, onSubmit }: TaskDialogProps) {
  const [form, setForm] = useState<TaskForm>(emptyForm);
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const isEditing = Boolean(task);

  useEffect(() => {
    if (open) {
      setForm(
        task
          ? {
              title: task.title,
              description: task.description ?? "",
              assignedTo: task.assignedTo,
              associatedProject: task.associatedProject,
              deadline: dateInputValue(task.deadline),
              completedAt: dateInputValue(task.completedAt),
              timeTaken: task.timeTaken ?? "",
            }
          : emptyForm,
      );
      setFormError(null);
    }
  }, [open, task]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setFormError(null);
    try {
      await onSubmit({
        title: form.title,
        description: form.description || null,
        assignedTo: Number(form.assignedTo),
        associatedProject: Number(form.associatedProject),
        deadline: form.deadline || null,
        completedAt: form.completedAt || null,
        timeTaken: form.timeTaken === "" ? null : Number(form.timeTaken),
      });
      onOpenChange(false);
    } catch (cause) {
      setFormError(cause instanceof Error ? cause.message : "Unable to save task.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit task" : "Create task"}</DialogTitle>
          <DialogDescription>
            Describe the work and connect it with a teammate and project.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4" onSubmit={(event) => void handleSubmit(event)}>
          <FormField id="task-title" label="Task title">
            <Input
              autoFocus
              id="task-title"
              onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
              placeholder="e.g. Prepare launch checklist"
              required
              value={form.title}
            />
          </FormField>
          <FormField id="task-description" label="Description">
            <Textarea
              id="task-description"
              onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
              placeholder="Add context or acceptance criteria..."
              value={form.description ?? ""}
            />
          </FormField>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField id="task-assigned-to" label="Assignee user ID">
              <Input
                id="task-assigned-to"
                min={1}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    assignedTo: event.target.value ? Number(event.target.value) : "",
                  }))
                }
                placeholder="User ID"
                required
                type="number"
                value={form.assignedTo}
              />
            </FormField>
            <FormField id="task-project" label="Project ID">
              <Input
                id="task-project"
                min={1}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    associatedProject: event.target.value ? Number(event.target.value) : "",
                  }))
                }
                placeholder="Project ID"
                required
                type="number"
                value={form.associatedProject}
              />
            </FormField>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField id="task-deadline" label="Deadline">
              <Input
                id="task-deadline"
                onChange={(event) => setForm((current) => ({ ...current, deadline: event.target.value }))}
                type="date"
                value={dateInputValue(form.deadline)}
              />
            </FormField>
            <FormField id="task-completed-at" label="Completed on">
              <Input
                id="task-completed-at"
                onChange={(event) => setForm((current) => ({ ...current, completedAt: event.target.value }))}
                type="date"
                value={dateInputValue(form.completedAt)}
              />
            </FormField>
          </div>
          <FormField id="task-time-taken" label="Time taken (minutes)">
            <Input
              id="task-time-taken"
              min={0}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  timeTaken: event.target.value ? Number(event.target.value) : "",
                }))
              }
              placeholder="Optional"
              type="number"
              value={form.timeTaken}
            />
          </FormField>
          {formError && <p className="text-sm text-destructive" role="alert">{formError}</p>}
          <DialogFooter>
            <Button disabled={isSaving} onClick={() => onOpenChange(false)} type="button" variant="outline">
              Cancel
            </Button>
            <Button disabled={isSaving} type="submit">
              {isSaving ? "Saving..." : isEditing ? "Save changes" : "Create task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
