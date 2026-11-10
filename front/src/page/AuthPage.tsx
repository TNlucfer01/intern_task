import { useState } from "react";
import { LoginForm } from "../features/auth/components/LoginForm";
import { RegisterForm } from "../features/auth/components/RegisterForm";
import { SignedInPanel } from "../features/auth/components/SignedInPanel";
import { useAuth } from "../context/authContext";

export function AuthPage() {
  const { user, logout } = useAuth();
  const [tab, setTab] = useState<"login" | "register">("login");
  const [logoutError, setLogoutError] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLogoutError("");
    setLoggingOut(true);
    try {
      await logout();
      setTab("login");
    } catch (cause) {
      setLogoutError(
        cause instanceof Error
          ? cause.message
          : "Unable to sign out. Please try again.",
      );
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-light via-card to-secondary-light px-4">
      <div className="w-full max-w-md">
        <div className="overflow-hidden rounded-card border border-border-line bg-card shadow-card">
          <div className="bg-gradient-to-r from-primary to-secondary px-8 py-6 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-white">Welcome</h1>
            <p className="mt-1 text-sm text-primary-light">
              {tab === "login"
                ? "Sign in to your account"
                : "Create a new account"}
            </p>
          </div>
          <div className="flex border-b border-border-line">
            {(["login", "register"] as const).map((currentTab) => (
              <button
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  tab === currentTab
                    ? "border-b-2 border-primary text-primary"
                    : "text-text-muted hover:text-text-main"
                }`}
                key={currentTab}
                onClick={() => setTab(currentTab)}
                type="button"
              >
                {currentTab === "login" ? "Sign In" : "Register"}
              </button>
            ))}
          </div>
          <div className="px-8 py-7">
            {user ? (
              <SignedInPanel
                loggingOut={loggingOut}
                logoutError={logoutError}
                onLogout={() => void handleLogout()}
                user={user}
              />
            ) : tab === "login" ? (
              <LoginForm onSwitchToRegister={() => setTab("register")} />
            ) : (
              <RegisterForm onSwitchToLogin={() => setTab("login")} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
