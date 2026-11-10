import { NavLink, useLocation } from "react-router-dom";
import {
  BriefcaseBusiness,
  CheckSquare2,
  Layers3,
  LayoutDashboard,
  UsersRound,
} from "lucide-react";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "./ui/sidebar";

const links = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { to: "/tasks", label: "Tasks", icon: CheckSquare2 },
  { to: "/projects", label: "Projects", icon: BriefcaseBusiness },
  { to: "/departments", label: "Departments", icon: Layers3 },
  { to: "/users", label: "Users", icon: UsersRound },
];

function Sidebar() {
  const { pathname } = useLocation();

  return (
    <ShadcnSidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-3 px-2 py-1">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <CheckSquare2 className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Taskflow</span>
            <span className="truncate text-xs text-sidebar-foreground/70">
              Workspace
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Manage</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {links.map(({ to, label, icon: Icon }) => (
                <SidebarMenuItem key={to}>
                  <SidebarMenuButton
                    isActive={pathname === to}
                    render={<NavLink to={to} />}
                    tooltip={label}
                  >
                    <Icon />
                    <span>{label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </ShadcnSidebar>
  );
}

export default Sidebar;
