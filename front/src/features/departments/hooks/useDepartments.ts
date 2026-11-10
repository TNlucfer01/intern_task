import { useCallback, useEffect, useState } from "react";
import { departmentApi } from "../../../api/endpoints";
import type { CreateDepartmentInput, Department } from "../../../api/types/dept.types";

export function useDepartments() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await departmentApi.getAllDepartments();
      setDepartments(result);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to load departments.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const create = async (input: CreateDepartmentInput) => {
    const created = await departmentApi.createDepartment(input);
    setDepartments((current) => [created, ...current]);
    return created;
  };

  const update = async (id: number, input: CreateDepartmentInput) => {
    const updated = await departmentApi.updateDepartment(id, input);
    setDepartments((current) =>
      current.map((item) => (item.id === id ? updated : item)),
    );
    return updated;
  };

  const remove = async (id: number) => {
    setDeletingId(id);
    setError(null);
    try {
      await departmentApi.deleteDepartment(id);
      setDepartments((current) => current.filter((item) => item.id !== id));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to delete department.");
      throw cause;
    } finally {
      setDeletingId(null);
    }
  };

  return {
    departments,
    isLoading,
    error,
    deletingId,
    create,
    update,
    remove,
    reload: load,
  };
}