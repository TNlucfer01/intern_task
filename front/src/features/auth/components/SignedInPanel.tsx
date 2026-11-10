import type { AuthenticatedUser } from "../../../api/types/user.types";
import Alert from "../../../components/ui/Alert";

export function SignedInPanel({
  user,
  logoutError,
  loggingOut,
  onLogout,
}: {
  user: AuthenticatedUser;
  logoutError: string;
  loggingOut: boolean;
  onLogout: () => void;
}) {
  return (
    <div className="flex flex-col gap-4 text-center">
      <Alert type="success" message={`Signed in successfully. Welcome, ${user.name}!`} />
      <p className="text-sm text-text-muted">{user.email}</p>
      {logoutError && <Alert type="error" message={logoutError} />}
      <button
        className="w-full rounded-btn bg-primary py-2.5 text-sm font-semibold text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
        type="button"
        onClick={onLogout}
        disabled={loggingOut}
      >
        {loggingOut ? "Signing out…" : "Sign Out"}
      </button>
    </div>
  );
}
