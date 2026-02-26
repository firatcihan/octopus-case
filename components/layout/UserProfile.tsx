"use client";

import { useAuthStore } from "../../store/authStore";

export function UserProfile() {
  const user = useAuthStore((state) => state.user);

  if (!user) return null;

  const letters =
    `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase();
  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <div className="flex items-center gap-2 ml-2.5 cursor-pointer">
      <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-semibold text-sm">
        {letters}
      </div>
      <span className="text-base leading-[26px] font-normal text-gray-700">
        {fullName}
      </span>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.99965 13.9999C9.41632 13.9999 8.83298 13.7749 8.39132 13.3332L2.95798 7.89991C2.71632 7.65824 2.71632 7.25824 2.95798 7.01658C3.19965 6.77491 3.59965 6.77491 3.84132 7.01658L9.27465 12.4499C9.67465 12.8499 10.3247 12.8499 10.7247 12.4499L16.158 7.01658C16.3996 6.77491 16.7997 6.77491 17.0413 7.01658C17.283 7.25824 17.283 7.65824 17.0413 7.89991L11.608 13.3332C11.1663 13.7749 10.583 13.9999 9.99965 13.9999Z"
          fill="#1E293B"
        />
      </svg>
    </div>
  );
}
