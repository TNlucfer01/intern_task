import { PageHeader } from "../components/PageHeader";
import { WorkspaceLayout } from "../components/WorkspaceLayout";
import { WorkspaceSections } from "../features/dashboard/components/WorkspaceSections";

export function DashboardPage() {
  return (
    <WorkspaceLayout>
      <PageHeader
        description="A clear view of the work, teams, and projects in your workspace."
        eyebrow="Your workspace"
        title="Good to see you"
      />
      <WorkspaceSections />
      
      <section className="mt-8 rounded-xl border bg-card p-6 shadow-sm sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Get started
        </p>
        <h2 className="mt-2 text-xl font-semibold tracking-tight">
          Turn your next goal into a plan.
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          Create a project, break it into tasks, then assign each task to the
          teammate responsible for moving it forward.
        </p>
      </section>
    </WorkspaceLayout>
  );
}
