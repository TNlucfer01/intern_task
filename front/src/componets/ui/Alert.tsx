function Alert({ type, message }: { type: "error" | "success"; message: string }) {
  const styles =
    type === "error"
      ? "bg-error-light border-error-border text-error"
      : "bg-success-light border-success-border text-success";

  return (
    <div className={`rounded-btn border px-4 py-3 text-sm font-medium ${styles}`}>
      {message}
    </div>
  );
}

export default Alert;
