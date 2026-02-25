import React from "react";
import { cn } from "../../lib/utils";

export const Checkbox = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, id, ...props }, ref) => {
  return (
    <div className="relative flex items-center">
      <input
        type="checkbox"
        id={id}
        ref={ref}
        className={cn(
          "peer appearance-none w-5 h-5 border border-[#CBD5E1] rounded-sm checked:bg-[#4CAF50] checked:border-[#4CAF50] transition-all cursor-pointer",
          className,
        )}
        {...props}
      />
      <svg
        className="absolute w-3.5 h-3.5 pointer-events-none opacity-0 peer-checked:opacity-100 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
  );
});

Checkbox.displayName = "Checkbox";
