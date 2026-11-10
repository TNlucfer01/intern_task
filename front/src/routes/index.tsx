import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthPage } from "../page/AuthPage";
import { DashboardPage } from "../page/dashBoard";
import { DepartmentsPage } from "../page/DepartmentsPage";
import { ProjectsPage } from "../page/ProjectsPage";
import { TasksPage } from "../page/TasksPage";
import { UsersPage } from "../page/UsersPage";
import PublicRoutes from "./publicRouter";
import PrivateRoutes from "./protectedRoutes";

const NotFound = () => (
  <main className="flex min-h-screen items-center justify-center p-8 text-center">
    <div>
      <p className="text-sm font-semibold uppercase tracking-wider text-primary">404</p>
      <h1 className="mt-2 text-2xl font-semibold">Page not found</h1>
      <p className="mt-2 text-sm text-muted-foreground">The page you requested does not exist.</p>
    </div>
  </main>
);

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/auth" element={<AuthPage />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/departments" element={<DepartmentsPage />} />
          <Route path="/users" element={<UsersPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}