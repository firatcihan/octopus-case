"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
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
        <Image
          src="/assets/icons/chevron-down.svg"
          alt=""
          width={20}
          height={20}
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
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
            <Image src="/assets/icons/logout.svg" alt="" width={16} height={16} />
            Çıkış Yap
          </button>
        </div>
      )}
    </div>
  );
}
