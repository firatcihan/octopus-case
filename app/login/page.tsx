import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import { LoginForm } from "../../components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Giriş Yap",
  description:
    "Octopus Mini E-Ticaret hesabınıza giriş yapın. Alışverişe başlamak için kullanıcı adı ve şifrenizi girin.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Login() {
  return (
    <div className="flex min-h-screen bg-white font-sans">
      <div className="flex flex-col bg-[#F8F9FA] py-12 relative justify-between flex-825">
        <div className="px-12">
          <Image
            src="/assets/logos/logo.png"
            alt="Octopus Logo"
            width={180}
            height={40}
            className="object-contain"
            priority
          />
        </div>
        <div className="grow flex flex-col justify-center px-41.25">
          <div className="flex justify-center mb-16">
            <Image
              src="/assets/images/login-image.png"
              alt="Content Creator Illustration"
              width={411}
              height={411}
              className="object-contain"
              priority
            />
          </div>

          <div>
            <h1 className="text-[32px] font-bold text-[#1E293B] leading-tight mb-4">
              Let Free Your Creativity with Our Intuitive Content Creator
            </h1>
            <p className="text-[#718096] text-[16px] font-normal leading-relaxed">
              No design degree is required! Effortlessly craft and design
              stunning and captivating content using our user-friendly creative
              editor. With our drag-and-drop technology, anyone can create
              amazing marketing materials in.
            </p>
          </div>
        </div>
      </div>

      <div className="flex-615 flex items-center justify-center p-8">
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
