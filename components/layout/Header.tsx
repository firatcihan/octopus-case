import React from "react";
import Image from "next/image";

export function Header() {
  return (
    <header className="flex items-center justify-between px-10 h-[92px] bg-white border-b border-gray-100">
      <div className="flex items-center">
        <Image
          src="/header-logo.png"
          alt="Octopus Logo"
          width={150}
          height={40}
          className="object-contain"
        />
      </div>
      <div className="flex items-center gap-6">
        <button className="text-gray-400 hover:text-gray-600">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
        <button className="text-gray-400 hover:text-gray-600">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        </button>
        <button className="text-gray-400 hover:text-gray-600">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
        </button>
        <div className="flex items-center gap-3 ml-2 cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-semibold text-sm">
            SG
          </div>
          <span className="text-sm font-medium text-gray-700">Selin Gülce</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-400"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>
    </header>
  );
}
