import Image from "next/image";

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
          <button className="text-[#94A3B8]">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
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
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.9999 22C17.4999 22 21.9999 17.5 21.9999 12C21.9999 6.5 17.4999 2 11.9999 2C6.49994 2 1.99994 6.5 1.99994 12C1.99994 17.5 6.49994 22 11.9999 22Z"
                stroke="#94A3B8"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 8V13"
                stroke="#94A3B8"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11.996 16H12.005"
                stroke="#94A3B8"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button className="text-gray-400 hover:text-gray-600">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.0199 20.5299C9.68993 20.5299 7.35993 20.1599 5.14993 19.4199C4.30993 19.1299 3.66993 18.5399 3.38993 17.7699C3.09993 16.9999 3.19993 16.1499 3.65993 15.3899L4.80993 13.4799C5.04993 13.0799 5.26993 12.2799 5.26993 11.8099V8.91992C5.26993 5.19992 8.29993 2.16992 12.0199 2.16992C15.7399 2.16992 18.7699 5.19992 18.7699 8.91992V11.8099C18.7699 12.2699 18.9899 13.0799 19.2299 13.4899L20.3699 15.3899C20.7999 16.1099 20.8799 16.9799 20.5899 17.7699C20.2999 18.5599 19.6699 19.1599 18.8799 19.4199C16.6799 20.1599 14.3499 20.5299 12.0199 20.5299ZM12.0199 3.66992C9.12993 3.66992 6.76993 6.01992 6.76993 8.91992V11.8099C6.76993 12.5399 6.46993 13.6199 6.09993 14.2499L4.94993 16.1599C4.72993 16.5299 4.66993 16.9199 4.79993 17.2499C4.91993 17.5899 5.21993 17.8499 5.62993 17.9899C9.80993 19.3899 14.2399 19.3899 18.4199 17.9899C18.7799 17.8699 19.0599 17.5999 19.1899 17.2399C19.3199 16.8799 19.2899 16.4899 19.0899 16.1599L17.9399 14.2499C17.5599 13.5999 17.2699 12.5299 17.2699 11.7999V8.91992C17.2699 6.01992 14.9199 3.66992 12.0199 3.66992Z"
                fill="#94A3B8"
              />
              <path
                d="M13.8807 3.93993C13.8107 3.93993 13.7407 3.92993 13.6707 3.90993C13.3807 3.82993 13.1007 3.76993 12.8307 3.72993C11.9807 3.61993 11.1607 3.67993 10.3907 3.90993C10.1107 3.99993 9.81066 3.90993 9.62066 3.69993C9.43066 3.48993 9.37066 3.18993 9.48066 2.91993C9.89066 1.86993 10.8907 1.17993 12.0307 1.17993C13.1707 1.17993 14.1707 1.85993 14.5807 2.91993C14.6807 3.18993 14.6307 3.48993 14.4407 3.69993C14.2907 3.85993 14.0807 3.93993 13.8807 3.93993Z"
                fill="#94A3B8"
              />
              <path
                d="M12.0195 22.8101C11.0295 22.8101 10.0695 22.4101 9.36947 21.7101C8.66947 21.0101 8.26947 20.0501 8.26947 19.0601H9.76947C9.76947 19.6501 10.0095 20.2301 10.4295 20.6501C10.8495 21.0701 11.4295 21.3101 12.0195 21.3101C13.2595 21.3101 14.2695 20.3001 14.2695 19.0601H15.7695C15.7695 21.1301 14.0895 22.8101 12.0195 22.8101Z"
                fill="#94A3B8"
              />
            </svg>
          </button>
        </div>
        <div className="flex items-center gap-2 ml-2.5">
          <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-semibold text-sm">
            SG
          </div>
          <span className="text-base leading-[26px] font-normal text-gray-700">
            Selin Gülce
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
      </div>
    </header>
  );
}
