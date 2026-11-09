import { api } from "./client";
import type { user } from "./types/user.types";
export const auth = {
  register: (name: string, email: string, password: string) =>
    api.post<{ message: string }>("/api/auth/register", {
      name,
      email,
      password,
    }),
  login: (email: string, password: string) =>
    api.post<{
      message: string;
      user: user;
    }>("/api/auth/login", { email, password }),
  logout: () => api.post<{ message: string }>("/api/auth/logout", {}),
  me: () =>
    api.get<{
      message: string;
      user: user;
    }>("/api/auth/me"),
};
