import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CheckSquare2,
  Layers3,
  UsersRound,
} from "lucide-react";

const sections = [
  {
    to: "/tasks",
    label: "Tasks",
    description: "Assign work, manage due dates, and follow task progress.",
    icon: CheckSquare2,
    tone: "bg-amber-100 text-amber-700",
  },
  {
    to: "/projects",
    label: "Projects",
    description: "Keep project plans, status, and important dates together.",
    icon: BriefcaseBusiness,
    tone: "bg-blue-100 text-blue-700",
  },
  {
    to: "/users",
    label: "Users",
    description: "Manage workspace accounts, permissions, and team assignments.",
    icon: UsersRound,
    tone: "bg-sky-100 text-sky-700",
  },
  {
    to: "/departments",
    label: "Departments",
    description: "Manage the teams that collaborate across your workspace.",
    icon: Layers3,
    tone: "bg-violet-100 text-violet-700",
  },
];

export function WorkspaceSections() {
  return (
    <section
      aria-label="Workspace sections"
      className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      {sections.map(({ to, label, description, icon: Icon, tone }) => (
        <Link
          className="group rounded-xl border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          key={to}
          to={to}
        >
          <div className="mb-7 flex items-center justify-between">
            <span className={`flex size-11 items-center justify-center rounded-xl ${tone}`}>
              <Icon className="size-5" />
            </span>
            <ArrowUpRight className="size-4 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
          </div>
          <h2 className="text-base font-semibold">{label}</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {description}
          </p>
          <span className="mt-5 inline-block text-sm font-medium text-primary">
            Open {label.toLowerCase()}
          </span>
        </Link>
      ))}
    </section>
  );
}
