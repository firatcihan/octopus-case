import React from "react";
import Image from "next/image";
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
      <Image
        src="/assets/icons/check-checkbox.svg"
        alt=""
        width={14}
        height={14}
        className="absolute pointer-events-none opacity-0 peer-checked:opacity-100 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
});

Checkbox.displayName = "Checkbox";
