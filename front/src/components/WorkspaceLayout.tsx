import type { ReactNode } from "react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "./ui/sidebar";
import Sidebar from "./Sidebar";

export function WorkspaceLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar />
      <SidebarInset className="min-h-svh">
        <header className="flex h-14 shrink-0 items-center gap-2 border-b bg-background px-4">
          <SidebarTrigger aria-label="Toggle navigation sidebar" />
          <div className="h-4 w-px bg-border" />
          <span className="text-sm font-medium text-muted-foreground">
            Workspace
          </span>
        </header>
        <div className="min-w-0 flex-1 bg-muted/40 p-4 sm:p-6 lg:p-10">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
