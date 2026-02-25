"use client";

import React from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Checkbox } from "../ui/Checkbox";

export function LoginForm() {
  return (
    <div className="w-full max-w-[400px]">
      <div className="text-center mb-10">
        <h2 className="text-[32px] font-bold text-[#1E293B] mb-2">
          Welcome Octopus!
        </h2>
        <p className="text-[#94A3B8] text-[14px]">
          Manage your smart signage, watch your company grow.
        </p>
      </div>

      <form>
        {/* Email Field */}
        <div className="mb-5">
          <label className="block text-[14px] font-semibold text-[#1A202C] mb-2">
            E-mail Address*
          </label>
          <Input type="email" placeholder="Enter your e-mail address" />
        </div>

        {/* Password Field */}
        <div className="mb-3">
          <label className="block text-[14px] font-semibold text-[#1A202C] mb-2">
            Password*
          </label>
          <div className="relative">
            <Input type="password" placeholder="Enter your password" />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A0AEC0] hover:text-[#718096] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Remember Me */}
        <div className="flex items-center mb-7">
          <Checkbox id="remember" />
          <label
            htmlFor="remember"
            className="ml-2 text-[14px] text-[#1E293B] select-none"
          >
            Remember me?
          </label>
        </div>

        {/* Login Button */}
        <Button type="button" fullWidth>
          Login
        </Button>
      </form>
    </div>
  );
}
