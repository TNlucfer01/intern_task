import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { auth } from "../../../api/endpoints";
import Alert from "../../../components/ui/Alert";
import InputField from "../../../components/ui/InputField";

export function RegisterForm({
  onSwitchToLogin,
}: {
  onSwitchToLogin?: () => void;
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    try {
      const response = await auth.register(
        formData.name,
        formData.email,
        formData.password,
      );
      setMessage(response.message);
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={(event) => void handleSubmit(event)}>
      <InputField
        label="Full Name"
        id="reg-name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="John Doe"
      />
      <InputField
        label="Email Address"
        id="reg-email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="you@example.com"
      />
      <InputField
        label="Password"
        id="reg-password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="••••••••"
      />
      {error && <Alert type="error" message={error} />}
      {message && <Alert type="success" message={message} />}
      <button
        className="w-full rounded-btn bg-primary py-2.5 text-sm font-semibold text-white shadow-soft transition hover:bg-primary-hover active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        disabled={loading}
        type="submit"
      >
        {loading ? "Creating account…" : "Create Account"}
      </button>
      {onSwitchToLogin && (
        <p className="text-center text-sm text-text-muted">
          Already have an account?{" "}
          <button
            className="font-medium text-primary hover:text-primary-hover hover:underline"
            onClick={onSwitchToLogin}
            type="button"
          >
            Sign in
          </button>
        </p>
      )}
    </form>
  );
}
