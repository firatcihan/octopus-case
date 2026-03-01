import Image from "next/image";
import { UserProfile } from "./UserProfile";

export function Header() {
  return (
    <header className="flex items-center justify-between px-10 h-[92px] bg-white border-b border-[#E2E8F0]">
      <div className="flex items-center">
        <Image
          src="/header-logo.png"
          alt="Octopus Logo"
          width={170}
          height={35}
          className="object-contain"
        />
      </div>
      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-4">
          <div className="text-[#94A3B8]">
            <Image
              src="/assets/icons/search-header.svg"
              alt=""
              width={24}
              height={24}
            />
          </div>
          <div className="text-gray-400 hover:text-gray-600">
            <Image src="/assets/icons/info.svg" alt="" width={24} height={24} />
          </div>
          <div className="text-gray-400 hover:text-gray-600">
            <Image src="/assets/icons/bell.svg" alt="" width={24} height={24} />
          </div>
          <div className="text-gray-400 hover:text-gray-600">
            <Image src="/assets/icons/cart.svg" alt="" width={24} height={24} />
          </div>
        </div>
        <UserProfile />
      </div>
    </header>
  );
}
