import React from "react";

export function Pagination() {
  return (
    <div className="flex justify-center items-center gap-2 mt-12 mb-8">
      <button className="text-[14px] font-medium text-[#64748B] hover:text-[#1E293B] px-2">
        Prev
      </button>
      <button className="w-8 h-8 rounded-md bg-[#00B500] text-white text-[14px] font-medium flex items-center justify-center">
        1
      </button>
      <button className="w-8 h-8 rounded-md bg-white border border-[#E2E8F0] text-[#1E293B] text-[14px] font-medium flex items-center justify-center hover:bg-gray-50">
        2
      </button>
      <button className="w-8 h-8 rounded-md bg-white border border-[#E2E8F0] text-[#1E293B] text-[14px] font-medium flex items-center justify-center hover:bg-gray-50">
        3
      </button>
      <span className="text-[#64748B] px-1">...</span>
      <button className="w-8 h-8 rounded-md bg-white border border-[#E2E8F0] text-[#1E293B] text-[14px] font-medium flex items-center justify-center hover:bg-gray-50">
        10
      </button>
      <button className="text-[14px] font-medium text-[#1E293B] hover:text-[#00B500] px-2">
        Next
      </button>
    </div>
  );
}
