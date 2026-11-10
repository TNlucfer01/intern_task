import { useMemo } from "react";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../../../components/ui/combobox";

export interface RelationOption {
  id: number;
  label: string;
  description?: string;
}

export function TaskRelationPicker({
  id,
  options,
  value,
  onChange,
  placeholder,
  emptyMessage,
  disabled = false,
}: {
  id: string;
  options: RelationOption[];
  value: number | "";
  onChange: (value: number | "") => void;
  placeholder: string;
  emptyMessage: string;
  disabled?: boolean;
}) {
  const optionLabels = useMemo(
    () => new Map(options.map((option) => [String(option.id), option.label])),
    [options],
  );
  const items = useMemo(
    () => options.map((option) => String(option.id)),
    [options],
  );

  return (
    <Combobox
      autoHighlight
      disabled={disabled}
      items={items}
      itemToStringLabel={(item) => optionLabels.get(item) ?? ""}
      onValueChange={(nextValue) => onChange(nextValue ? Number(nextValue) : "")}
      value={value === "" ? null : String(value)}
    >
      <ComboboxInput
        aria-label={placeholder}
        id={id}
        placeholder={placeholder}
        showClear
        showTrigger
      />
      <ComboboxContent>
        <ComboboxEmpty>{emptyMessage}</ComboboxEmpty>
        <ComboboxList>
          {options.map((option) => (
            <ComboboxItem key={option.id} value={String(option.id)}>
              <span className="flex min-w-0 flex-col">
                <span className="truncate">{option.label}</span>
                {option.description && (
                  <span className="truncate text-xs text-muted-foreground">
                    {option.description}
                  </span>
                )}
              </span>
            </ComboboxItem>
          ))}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
