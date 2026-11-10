import { useCallback, useEffect, useState } from "react";
import { departmentApi, userApi } from "../../../api/endpoints";
import type { Department } from "../../../api/types/dept.types";
import type { CreateUserInput, UpdateUserInput, User } from "../../../api/types/user.types";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const [usersResult, departmentsResult] = await Promise.allSettled([
      userApi.getAllUsers(),
      departmentApi.getAllDepartments(),
    ]);

    if (usersResult.status === "fulfilled") {
      setUsers(usersResult.value);
    } else {
      setError(
        usersResult.reason instanceof Error
          ? usersResult.reason.message
          : "Unable to load users.",
      );
    }

    if (departmentsResult.status === "fulfilled") {
      setDepartments(departmentsResult.value);
    } else {
      setError((current) =>
        current ??
        (departmentsResult.reason instanceof Error
          ? departmentsResult.reason.message
          : "Unable to load departments for user assignment."),
      );
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const create = async (input: CreateUserInput) => {
    const created = await userApi.createUser(input);
    setUsers((current) => [created, ...current]);
    return created;
  };

  const update = async (id: number, input: UpdateUserInput) => {
    const updated = await userApi.updateUser(id, input);
    setUsers((current) => current.map((user) => (user.id === id ? updated : user)));
    return updated;
  };

  const remove = async (id: number) => {
    setDeletingId(id);
    setError(null);
    try {
      await userApi.deleteUser(id);
      setUsers((current) => current.filter((user) => user.id !== id));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to delete user.");
    } finally {
      setDeletingId(null);
    }
  };

  return {
    users,
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
