"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

export function CartBadge() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  function handleMouseEnter() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  }

  function handleMouseLeave() {
    closeTimer.current = setTimeout(() => setOpen(false), 220);
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger */}
      <button className="relative flex items-center text-gray-400 hover:text-gray-600 cursor-pointer">
        <Image src="/assets/icons/cart.svg" alt="Sepet" width={24} height={24} />
        {totalItems > 0 && (
          <span className="absolute -top-1.5 -right-1.5 bg-[#00B500] text-white text-[10px] font-bold rounded-full min-w-4 h-4 flex items-center justify-center px-0.5 leading-none">
            {totalItems > 99 ? "99+" : totalItems}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-[calc(100%+12px)] w-96 bg-white rounded-xl shadow-xl border border-[#E2E8F0] z-50 flex flex-col">
          {/* Header */}
          <div className="px-5 py-4 border-b border-[#E2E8F0]">
            <span className="text-[17px] font-semibold text-[#1E293B]">
              Sepetim
            </span>
            {totalItems > 0 && (
              <span className="ml-2 text-[14px] text-[#94A3B8]">
                ({totalItems} ürün)
              </span>
            )}
          </div>

          {/* Items */}
          {items.length === 0 ? (
            <div className="px-5 py-10 text-center text-[#94A3B8] text-base">
              Sepetiniz boş
            </div>
          ) : (
            <ul className="max-h-80 overflow-y-auto divide-y divide-[#F1F5F9]">
              {items.map((item) => (
                <li key={item.id} className="flex items-center gap-4 px-5 py-4 hover:bg-[#F8FAFC] transition-colors">
                  <Link
                    href={`/products/${item.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-4 flex-1 min-w-0"
                  >
                    <div className="w-16 h-16 bg-[#F3F4F6] rounded-lg shrink-0 overflow-hidden relative">
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        fill
                        sizes="64px"
                        className="object-contain p-1.5"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-medium text-[#1E293B] truncate">
                        {item.title}
                      </p>
                      <p className="text-[13px] text-[#94A3B8] mt-1">
                        {item.quantity} × ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </Link>
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <span className="text-[15px] font-semibold text-[#1E293B]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-[12px] text-[#94A3B8] hover:text-red-500 transition-colors cursor-pointer"
                    >
                      Kaldır
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* Footer */}
          <div className="px-5 py-4 border-t border-[#E2E8F0] flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-[15px] text-[#1E293B] font-medium">
                Toplam
              </span>
              <span className="text-[18px] font-bold text-[#1E293B]">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <button
              disabled={items.length === 0}
              className="w-full bg-[#00B500] hover:bg-[#008c01] disabled:opacity-50 disabled:cursor-not-allowed text-white text-[15px] font-medium py-3 rounded-lg transition-colors cursor-pointer"
            >
              Siparişi Tamamla
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
