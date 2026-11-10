import { useEffect, useState, type FormEvent } from "react";
import type { CreateProjectInput, Project } from "../../../api/types/project.types";
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

const emptyForm: CreateProjectInput = {
  name: "",
  description: "",
  status: "Planning",
  deadline: null,
  completedAt: null,
};

function dateInputValue(value: string | null | undefined) {
  return value ? value.slice(0, 10) : "";
}

interface ProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project?: Project | null;
  onSubmit: (data: CreateProjectInput) => Promise<void>;
}

export function ProjectDialog({
  open,
  onOpenChange,
  project,
  onSubmit,
}: ProjectDialogProps) {
  const [form, setForm] = useState<CreateProjectInput>(emptyForm);
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const isEditing = Boolean(project);

  useEffect(() => {
    if (open) {
      setForm(
        project
          ? {
              name: project.name,
              description: project.description,
              status: project.status,
              deadline: dateInputValue(project.deadline),
              completedAt: dateInputValue(project.completedAt),
            }
          : emptyForm,
      );
      setFormError(null);
    }
  }, [open, project]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setFormError(null);
    try {
      await onSubmit({
        ...form,
        deadline: form.deadline || null,
        completedAt: form.completedAt || null,
      });
      onOpenChange(false);
    } catch (cause) {
      setFormError(cause instanceof Error ? cause.message : "Unable to save project.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit project" : "Create project"}</DialogTitle>
          <DialogDescription>
            Set up the project details and target dates for your team.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4" onSubmit={(event) => void handleSubmit(event)}>
          <FormField id="project-name" label="Project name">
            <Input
              autoFocus
              id="project-name"
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              placeholder="e.g. Website refresh"
              required
              value={form.name}
            />
          </FormField>
          <FormField id="project-description" label="Description">
            <Textarea
              id="project-description"
              onChange={(event) =>
                setForm((current) => ({ ...current, description: event.target.value }))
              }
              placeholder="What is this project working toward?"
              required
              value={form.description}
            />
          </FormField>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField id="project-status" label="Status">
              <Input
                id="project-status"
                onChange={(event) => setForm((current) => ({ ...current, status: event.target.value }))}
                placeholder="Planning"
                required
                value={form.status}
              />
            </FormField>
            <FormField id="project-deadline" label="Deadline">
              <Input
                id="project-deadline"
                onChange={(event) => setForm((current) => ({ ...current, deadline: event.target.value }))}
                type="date"
                value={dateInputValue(form.deadline)}
              />
            </FormField>
          </div>
          {isEditing && (
            <FormField id="project-completed-at" label="Completed on">
              <Input
                id="project-completed-at"
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
          {formError && <p className="text-sm text-destructive" role="alert">{formError}</p>}
          <DialogFooter>
            <Button disabled={isSaving} onClick={() => onOpenChange(false)} type="button" variant="outline">
              Cancel
            </Button>
            <Button disabled={isSaving} type="submit">
              {isSaving ? "Saving..." : isEditing ? "Save changes" : "Create project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
