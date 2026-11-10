export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  title: string | null;
  assigned_department: number | null;
  createdAt: string;
  updatedAt: string;
}

export type AuthenticatedUser = Pick<User, "id" | "name" | "email">;
export type user = AuthenticatedUser;

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  role?: string;
  title?: string | null;
  assigned_department?: number | null;
}

export type UpdateUserInput = Partial<
  Pick<User, "name" | "email" | "role" | "title" | "assigned_department">
>;