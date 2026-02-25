import Image from "next/image";
import { LoginForm } from "../../components/auth/LoginForm";

export default function Login() {
  return (
    <div className="flex min-h-screen bg-white font-sans">
      {/* Left Column */}
      <div className="flex flex-col bg-[#F8F9FA] py-12 relative justify-between flex-825">
        {/* Logo */}
        <div className="px-12">
          <Image
            src="/logo.png"
            alt="Octopus Logo"
            width={180}
            height={40}
            className="object-contain"
            priority
          />
        </div>
        {/* px ile oynayarak düzeltme yapabilirsin */}
        <div className="grow flex flex-col justify-center px-[165px]">
          {/* Illustration */}
          <div className="flex justify-center mb-[64px]">
            <Image
              src="/login-image.png"
              alt="Content Creator Illustration"
              width={411}
              height={411}
              className="object-contain"
              priority
            />
          </div>

          {/* Text Content */}
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

      {/* Right Column */}
      <div className="flex-615 flex items-center justify-center p-8">
        <LoginForm />
      </div>
    </div>
  );
}
