"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Checkbox } from "../ui/Checkbox";
import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const login = useAuthStore((s) => s.login);
  const isLoading = useAuthStore((s) => s.isLoading);
  const error = useAuthStore((s) => s.error);
  const clearError = useAuthStore((s) => s.clearError);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearError();

    try {
      await login(username, password);
      toast.success("Giriş başarılı!");
      const redirectTo = searchParams.get("redirect");
      const safePath = redirectTo?.startsWith("/") ? redirectTo : "/products";
      router.push(safePath);
    } catch {
      toast.error("Kullanıcı adı veya şifre hatalı!");
    }
  };

  return (
    <div className="w-full max-w-100">
      <div className="text-center mb-10">
        <h2 className="text-[32px] font-bold text-[#1E293B] mb-2">
          Welcome Octopus!
        </h2>
        <p className="text-[#94A3B8] text-[14px]">
          Manage your smart signage, watch your company grow.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Username Field */}
        <div className="mb-5">
          <label className="block text-[14px] font-semibold text-[#1A202C] mb-2">
            Username*
          </label>
          <Input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        {/* Password Field */}
        <div className="mb-3">
          <label className="block text-[14px] font-semibold text-[#1A202C] mb-2">
            Password*
          </label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A0AEC0] hover:text-[#718096] transition-colors"
            >
              <Image
                src={
                  showPassword
                    ? "/assets/icons/eye.svg"
                    : "/assets/icons/eye-off.svg"
                }
                alt=""
                width={20}
                height={20}
              />
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-2 mb-4 p-3 text-[13px] text-red-600 bg-red-50 border border-red-200 rounded-lg">
            <Image
              src="/assets/icons/alert-circle.svg"
              alt=""
              width={16}
              height={16}
              className="shrink-0"
            />
            <p className="font-medium">{error}</p>
          </div>
        )}

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
        <Button type="submit" fullWidth disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
}
