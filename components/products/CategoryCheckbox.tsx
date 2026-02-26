import React from "react";
import { Checkbox } from "../ui/Checkbox";

interface CategoryCheckboxProps {
  id: string;
  label: string;
}

export function CategoryCheckbox({ id, label }: CategoryCheckboxProps) {
  return (
    <div className="flex items-center gap-2.5 group">
      <Checkbox className="border-black rounded-none" id={id} />
      <span className="text-sm text-black transition-colors">{label}</span>
    </div>
  );
}
