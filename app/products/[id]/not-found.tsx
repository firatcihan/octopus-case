import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";

export default function ProductNotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <div className="flex-1 flex flex-col items-center justify-center gap-6 text-center px-8">
        <div className="text-8xl font-bold text-[#00B500]">404</div>
        <div className="flex flex-col gap-2">
          <div className="text-2xl font-bold text-[#1E293B]">
            Aradığınız ürün bulunamadı
          </div>
          <p className="text-[#94A3B8] text-base">
            Bu ürün mevcut değil veya kaldırılmış olabilir.
          </p>
        </div>
        <Link href="/products">
          <Button className="w-40 cursor-pointer">Ürünlere Dön</Button>
        </Link>
      </div>
    </div>
  );
}
