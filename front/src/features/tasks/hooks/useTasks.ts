import { useCallback, useEffect, useState } from "react";
import { projectApi, taskApi, userApi } from "../../../api/endpoints";
import type { Project } from "../../../api/types/project.types";
import type { CreateTaskInput, Task } from "../../../api/types/task.types";
import type { User } from "../../../api/types/user.types";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingOptions, setIsLoadingOptions] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [optionsError, setOptionsError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setIsLoadingOptions(true);
    setError(null);
    setOptionsError(null);
    const [tasksResult, usersResult, projectsResult] = await Promise.allSettled([
      taskApi.getAllTasks(),
      userApi.getAllUsers(),
      projectApi.getAllProjects(),
    ]);

    if (tasksResult.status === "fulfilled") {
      setTasks(tasksResult.value);
    } else {
      setError(
        tasksResult.reason instanceof Error
          ? tasksResult.reason.message
          : "Unable to load tasks.",
      );
    }

    const optionErrors: string[] = [];
    if (usersResult.status === "fulfilled") {
      setUsers(usersResult.value);
    } else {
      optionErrors.push(
        usersResult.reason instanceof Error
          ? usersResult.reason.message
          : "Unable to load users.",
      );
    }
    if (projectsResult.status === "fulfilled") {
      setProjects(projectsResult.value);
    } else {
      optionErrors.push(
        projectsResult.reason instanceof Error
          ? projectsResult.reason.message
          : "Unable to load projects.",
      );
    }
    if (optionErrors.length) setOptionsError(optionErrors.join(" "));

    setIsLoading(false);
    setIsLoadingOptions(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const create = async (input: CreateTaskInput) => {
    const created = await taskApi.createTask(input);
    setTasks((current) => [created, ...current]);
    return created;
  };

  const update = async (id: number, input: CreateTaskInput) => {
    const updated = await taskApi.updateTask(id, input);
    setTasks((current) => current.map((task) => (task.id === id ? updated : task)));
    return updated;
  };

  const remove = async (id: number) => {
    setDeletingId(id);
    setError(null);
    try {
      await taskApi.deleteTask(id);
      setTasks((current) => current.filter((task) => task.id !== id));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to delete task.");
    } finally {
      setDeletingId(null);
    }
  };

  return {
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
    reload: load,
  };
}
