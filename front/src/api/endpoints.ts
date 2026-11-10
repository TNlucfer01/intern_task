import { api } from "./client";
import type {
  AuthenticatedUser,
  CreateUserInput,
  UpdateUserInput,
  User,
} from "./types/user.types";
import type {
  CreateProjectInput,
  Project,
  UpdateProjectInput,
} from "./types/project.types";
import type {
  CreateDepartmentInput,
  Department,
  UpdateDepartmentInput,
} from "./types/dept.types";
import type {
  CreateTaskInput,
  Task,
  UpdateTaskInput,
} from "./types/task.types";

export const auth = {
  register: (name: string, email: string, password: string) =>
    api.post<{ message: string; user: AuthenticatedUser }>(
      "/api/auth/register",
      { name, email, password },
    ),
  login: (email: string, password: string) =>
    api.post<{ message: string; user: AuthenticatedUser }>(
      "/api/auth/login",
      { email, password },
    ),
  logout: () => api.post<{ message: string }>("/api/auth/logout", {}),
  me: () =>
    api.get<{ message: string; user: AuthenticatedUser }>("/api/auth/me"),
};

export const userApi = {
  getUserById: (id: number) => api.get<User>(`/api/users/${id}`),
  getAllUsers: () => api.get<User[]>("/api/users"),
  createUser: (input: CreateUserInput) => api.post<User>("/api/users", input),
  updateUser: (id: number, input: UpdateUserInput) =>
    api.update<User>(`/api/users/${id}`, input),
  deleteUser: (id: number) =>
    api.del<{ message: string }>(`/api/users/${id}`),
};

export const projectApi = {
  getProjectById: (id: number) => api.get<Project>(`/api/projects/${id}`),
  getAllProjects: () => api.get<Project[]>("/api/projects"),
  createProject: (input: CreateProjectInput) =>
    api.post<Project>("/api/projects", input),
  updateProject: (id: number, input: UpdateProjectInput) =>
    api.update<Project>(`/api/projects/${id}`, input),
  deleteProject: (id: number) =>
    api.del<{ message: string }>(`/api/projects/${id}`),
};

export const departmentApi = {
  getDepartmentById: (id: number) => api.get<Department>(`/api/departments/${id}`),
  getAllDepartments: () => api.get<Department[]>("/api/departments"),
  createDepartment: (input: CreateDepartmentInput) =>
    api.post<Department>("/api/departments", input),
  updateDepartment: (id: number, input: UpdateDepartmentInput) =>
    api.update<Department>(`/api/departments/${id}`, input),
  deleteDepartment: (id: number) =>
    api.del<{ message: string }>(`/api/departments/${id}`),
};

export const taskApi = {
  getTaskById: (id: number) => api.get<Task>(`/api/tasks/${id}`),
  getAllTasks: () => api.get<Task[]>("/api/tasks"),
  createTask: (input: CreateTaskInput) => api.post<Task>("/api/tasks", input),
  updateTask: (id: number, input: UpdateTaskInput) =>
    api.update<Task>(`/api/tasks/${id}`, input),
  deleteTask: (id: number) => api.del<{ message: string }>(`/api/tasks/${id}`),
};
