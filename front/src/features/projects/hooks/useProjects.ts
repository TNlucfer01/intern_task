import { useCallback, useEffect, useState } from "react";
import { projectApi } from "../../../api/endpoints";
import type { CreateProjectInput, Project } from "../../../api/types/project.types";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      setProjects(await projectApi.getAllProjects());
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to load projects.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const create = async (input: CreateProjectInput) => {
    const created = await projectApi.createProject(input);
    setProjects((current) => [created, ...current]);
    return created;
  };

  const update = async (id: number, input: CreateProjectInput) => {
    const updated = await projectApi.updateProject(id, input);
    setProjects((current) =>
      current.map((project) => (project.id === id ? updated : project)),
    );
    return updated;
  };

  const remove = async (id: number) => {
    setDeletingId(id);
    setError(null);
    try {
      await projectApi.deleteProject(id);
      setProjects((current) => current.filter((project) => project.id !== id));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to delete project.");
    } finally {
      setDeletingId(null);
    }
  };

  return { projects, isLoading, error, deletingId, create, update, remove, reload: load };
}
