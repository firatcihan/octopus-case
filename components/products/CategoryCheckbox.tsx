"use client";

import React from "react";
import { Checkbox } from "../ui/Checkbox";

interface CategoryCheckboxProps {
  id: string;
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export function CategoryCheckbox({
  id,
  label,
  checked,
  onChange,
}: CategoryCheckboxProps) {
  return (
    <div className="flex items-center gap-2.5 group cursor-pointer">
      <Checkbox
        className="border-black rounded-none"
        id={id}
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <label
        htmlFor={id}
        className="text-sm text-black transition-colors cursor-pointer"
      >
        {label}
      </label>
    </div>
  );
}
