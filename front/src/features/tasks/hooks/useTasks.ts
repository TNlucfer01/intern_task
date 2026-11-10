import { useCallback, useEffect, useState } from "react";
import { taskApi } from "../../../api/endpoints";
import type { CreateTaskInput, Task } from "../../../api/types/task.types";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      setTasks(await taskApi.getAllTasks());
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to load tasks.");
    } finally {
      setIsLoading(false);
    }
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

  return { tasks, isLoading, error, deletingId, create, update, remove, reload: load };
}
