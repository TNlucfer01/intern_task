import { useEffect, useState, type FormEvent } from "react";
import type { CreateTaskInput, Task } from "../../../api/types/task.types";
import type { Project } from "../../../api/types/project.types";
import type { User } from "../../../api/types/user.types";
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
import { TaskRelationPicker } from "./TaskRelationPicker";

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
  users: User[];
  projects: Project[];
  isLoadingOptions: boolean;
  optionsError: string | null;
  onSubmit: (data: CreateTaskInput) => Promise<void>;
}

export function TaskDialog({
  open,
  onOpenChange,
  task,
  users,
  projects,
  isLoadingOptions,
  optionsError,
  onSubmit,
}: TaskDialogProps) {
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
    if (form.assignedTo === "" || form.associatedProject === "") {
      setFormError("Select both an assignee and a project.");
      return;
    }
    if (optionsError) {
      setFormError("Unable to load users or projects. Close and reopen this form to retry.");
      return;
    }
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
            <FormField id="task-assigned-to" label="Assignee">
              <TaskRelationPicker
                id="task-assigned-to"
                disabled={isLoadingOptions || Boolean(optionsError)}
                emptyMessage="No users found."
                onChange={(assignedTo) =>
                  setForm((current) => ({ ...current, assignedTo }))
                }
                options={users.map((user) => ({
                  id: user.id,
                  label: user.name,
                  description: user.email,
                }))}
                placeholder={isLoadingOptions ? "Loading users..." : "Search users..."}
                value={form.assignedTo}
              />
            </FormField>
            <FormField id="task-project" label="Project">
              <TaskRelationPicker
                id="task-project"
                disabled={isLoadingOptions || Boolean(optionsError)}
                emptyMessage="No projects found."
                onChange={(associatedProject) =>
                  setForm((current) => ({ ...current, associatedProject }))
                }
                options={projects.map((project) => ({
                  id: project.id,
                  label: project.name,
                  description: project.status,
                }))}
                placeholder={isLoadingOptions ? "Loading projects..." : "Search projects..."}
                value={form.associatedProject}
              />
            </FormField>
          </div>
          {optionsError && (
            <p className="text-sm text-destructive" role="alert">
              {optionsError}
            </p>
          )}
          <div className={`grid gap-4 ${isEditing ? "sm:grid-cols-2" : ""}`}>
            <FormField id="task-deadline" label="Deadline">
              <Input
                id="task-deadline"
                onChange={(event) => setForm((current) => ({ ...current, deadline: event.target.value }))}
                type="date"
                value={dateInputValue(form.deadline)}
              />
            </FormField>
            {isEditing && (
              <FormField id="task-completed-at" label="Completed on">
                <Input
                  id="task-completed-at"
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      completedAt: event.target.value,
                    }))
                  }
                  type="date"
                  value={dateInputValue(form.completedAt)}
                />
              </FormField>
            )}
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
            <Button disabled={isSaving || isLoadingOptions || Boolean(optionsError)} type="submit">
              {isSaving ? "Saving..." : isEditing ? "Save changes" : "Create task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
