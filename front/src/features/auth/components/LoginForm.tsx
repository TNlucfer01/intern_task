import { useState } from "react";
import type { FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import Alert from "../../../components/ui/Alert";
import InputField from "../../../components/ui/InputField";

export function LoginForm({
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      const from = location.state?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={(event) => void handleSubmit(event)}>
      <InputField
        label="Email Address"
        id="login-email"
        type="email"
        name="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="you@example.com"
      />
      <InputField
        label="Password"
        id="login-password"
        type="password"
        name="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="••••••••"
      />
      {error && <Alert type="error" message={error} />}
      <button
        className="w-full rounded-btn bg-primary py-2.5 text-sm font-semibold text-white shadow-soft transition hover:bg-primary-hover active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        disabled={loading}
        type="submit"
      >
        {loading ? "Signing in…" : "Sign In"}
      </button>
      {onSwitchToRegister && (
        <p className="text-center text-sm text-text-muted">
          Don&apos;t have an account?{" "}
          <button
            className="font-medium text-primary hover:text-primary-hover hover:underline"
            onClick={onSwitchToRegister}
            type="button"
          >
            Create one
          </button>
        </p>
      )}
    </form>
  );
}
