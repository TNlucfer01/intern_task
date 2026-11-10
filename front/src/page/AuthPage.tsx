import React, { useState } from "react";
import { auth } from "../api/endpoints";
import { useAuth } from "../context/authContext";
import Alert from "../componets/ui/Alert";
import InputField from "../componets/ui/input";
import { useLocation, useNavigate } from "react-router-dom";

export function Register({ onSwitchToLogin }: { onSwitchToLogin?: () => void }) {
  const [formdata, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    try {
      const res = await auth.register(formdata.name, formdata.email, formdata.password);
      setMessage(res.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <InputField
        label="Full Name"
        id="reg-name"
        name="name"
        value={formdata.name}
        onChange={handleChange}
        placeholder="John Doe"
      />
      <InputField
        label="Email Address"
        id="reg-email"
        type="email"
        name="email"
        value={formdata.email}
        onChange={handleChange}
        placeholder="you@example.com"
      />
      <InputField
        label="Password"
        id="reg-password"
        type="password"
        name="password"
        value={formdata.password}
        onChange={handleChange}
        placeholder="••••••••"
      />

      {error && <Alert type="error" message={error} />}
      {message && <Alert type="success" message={message} />}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-btn bg-primary py-2.5 text-sm font-semibold text-white transition hover:bg-primary-hover active:scale-[0.98] shadow-soft disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Creating account…" : "Create Account"}
      </button>

      {onSwitchToLogin && (
        <p className="text-center text-sm text-text-muted">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="font-medium text-primary hover:text-primary-hover hover:underline"
          >
            Sign in
          </button>
        </p>
      )}
    </form>
  );
}

export function Login({
  onSwitchToRegister,
}: {
  onSwitchToRegister?: () => void;
}) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      const state = location.state as { from?: { pathname?: string } } | null;
      const destination = state?.from?.pathname;
      navigate(
        destination?.startsWith("/") && !destination.startsWith("//")
          ? destination
          : "/dashboard",
        { replace: true },
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <InputField
        label="Email Address"
        id="login-email"
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
      />
      <InputField
        label="Password"
        id="login-password"
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
      />
      {error && <Alert type="error" message={error} />}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-btn bg-primary py-2.5 text-sm font-semibold text-white transition hover:bg-primary-hover active:scale-[0.98] shadow-soft disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Signing in…" : "Sign In"}
      </button>

      {onSwitchToRegister && (
        <p className="text-center text-sm text-text-muted">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="font-medium text-primary hover:text-primary-hover hover:underline"
          >
            Create one
          </button>
        </p>
      )}
    </form>
  );
}

// ── AuthPage – tab switcher wrapper 
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
    } catch (err) {
      setLogoutError(err instanceof Error ? err.message : "Unable to sign out. Please try again.");
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-light via-card to-secondary-light px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="rounded-card bg-card shadow-card border border-border-line overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-secondary px-8 py-6 text-center">
            <h1 className="text-2xl font-bold text-white tracking-tight">Welcome</h1>
            <p className="mt-1 text-primary-light text-sm">
              {tab === "login" ? "Sign in to your account" : "Create a new account"}
            </p>
          </div>

          {/* Tab switcher */}
          <div className="flex border-b border-border-line">
            {(["login", "register"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  tab === t
                    ? "border-b-2 border-primary text-primary"
                    : "text-text-muted hover:text-text-main"
                }`}
              >
                {t === "login" ? "Sign In" : "Register"}
              </button>
            ))}
          </div>

          {/* Form area */}
          <div className="px-8 py-7">
            {user ? (
              <div className="flex flex-col gap-4 text-center">
                <Alert type="success" message={`Signed in successfully. Welcome, ${user.name}!`} />
                <p className="text-sm text-text-muted">{user.email}</p>
                {logoutError && <Alert type="error" message={logoutError} />}
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="w-full rounded-btn bg-primary py-2.5 text-sm font-semibold text-white transition hover:bg-primary-hover disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loggingOut ? "Signing out…" : "Sign Out"}
                </button>
              </div>
            ) : tab === "login" ? (
              <Login
                onSwitchToRegister={() => setTab("register")}
              />
            ) : (
              <Register onSwitchToLogin={() => setTab("login")} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
