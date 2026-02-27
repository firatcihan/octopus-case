"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../store/authStore";

export function UserProfile() {
  const user = useAuthStore((state) => state.user);
  const error = useAuthStore((state) => state.error);
  const isLoading = useAuthStore((state) => state.isLoading);
  const logout = useAuthStore((state) => state.logout);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 ml-2.5 animate-pulse">
        <div className="w-10 h-10 rounded-full bg-gray-200" />
        <div className="h-4 w-32 bg-gray-200 rounded" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 ml-2.5">
        <div className="w-10 h-10 rounded-full bg-red-100 text-red-500 flex items-center justify-center font-semibold text-sm">
          !
        </div>
        <span className="text-sm text-red-500">Kullanıcı yüklenemedi</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center gap-2 ml-2.5 animate-pulse">
        <div className="w-10 h-10 rounded-full bg-gray-200" />
        <div className="h-4 w-36 bg-gray-200 rounded" />
      </div>
    );
  }

  const letters =
    `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase();
  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="flex items-center gap-2 ml-2.5 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
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
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        >
          <path
            d="M9.99965 13.9999C9.41632 13.9999 8.83298 13.7749 8.39132 13.3332L2.95798 7.89991C2.71632 7.65824 2.71632 7.25824 2.95798 7.01658C3.19965 6.77491 3.59965 6.77491 3.84132 7.01658L9.27465 12.4499C9.67465 12.8499 10.3247 12.8499 10.7247 12.4499L16.158 7.01658C16.3996 6.77491 16.7997 6.77491 17.0413 7.01658C17.283 7.25824 17.283 7.65824 17.0413 7.89991L11.608 13.3332C11.1663 13.7749 10.583 13.9999 9.99965 13.9999Z"
            fill="#1E293B"
          />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900 truncate">
              {fullName}
            </p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            Çıkış Yap
          </button>
        </div>
      )}
    </div>
  );
}
