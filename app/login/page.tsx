import Image from "next/image";

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
        <div className="w-full max-w-[400px]">
          <div className="text-center mb-10">
            <h2 className="text-[28px] font-bold text-[#1E293B] mb-2">
              Welcome Octopus!
            </h2>
            <p className="text-[#94A3B8] text-[15px]">
              Manage your smart signage, watch your company grow.
            </p>
          </div>

          <form>
            {/* Email Field */}
            <div className="mb-5">
              <label className="block text-[14px] font-semibold text-[#1A202C] mb-2">
                E-mail Address*
              </label>
              <input
                type="email"
                placeholder="Enter your e-mail address"
                className="w-full px-4 py-3 rounded-lg border border-[#E2E8F0] bg-[#F8F9FA] text-[#1A202C] placeholder-[#A0AEC0] focus:bg-white focus:ring-2 focus:ring-[#00C800] focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Password Field */}
            <div className="mb-3">
              <label className="block text-[14px] font-semibold text-[#1A202C] mb-2">
                Password*
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 rounded-lg border border-[#E2E8F0] bg-[#F8F9FA] text-[#1A202C] placeholder-[#A0AEC0] focus:bg-white focus:ring-2 focus:ring-[#00C800] focus:border-transparent outline-none transition-all"
                />
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
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="peer appearance-none w-5 h-5 border border-[#CBD5E1] rounded-sm checked:bg-[#4CAF50] checked:border-[#4CAF50] transition-all cursor-pointer"
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
              <label
                htmlFor="remember"
                className="ml-2 text-[14px] text-[#1E293B] select-none"
              >
                Remember me?
              </label>
            </div>

            {/* Login Button */}
            <button
              type="button"
              className="w-full bg-[#00B500] hover:bg-[#008c01] text-white text-[14px] font-medium py-2.5 rounded-lg transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
