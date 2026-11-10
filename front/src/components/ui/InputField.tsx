export default function InputField({
  label,
  id,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  id: string;
  type?: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-text-main">
        {label}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="w-full rounded-btn border border-border-line bg-card px-4 py-2.5 text-sm text-text-main outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}
