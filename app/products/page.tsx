import React from "react";
import { Header } from "../../components/layout/Header";
import { Sidebar } from "../../components/products/Sidebar";
import { ProductCard, Product } from "../../components/products/ProductCard";
import { Pagination } from "../../components/ui/Pagination";

const mockProducts: Product[] = Array.from({ length: 9 }).map((_, i) => ({
  id: `product-${i}`,
  title: "Godin Session HT RN Elektro...",
  category: "Elektronik Gitar",
  price: "$1.703",
  rating: 4,
  imageUrl:
    "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?q=80&w=1000&auto=format&fit=crop",
}));

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
      <Header />

      <main className="flex-1 max-w-360 w-full mx-auto px-8 py-8 flex gap-12">
        <Sidebar />

        <div className="flex-1 flex flex-col gap-6">
          <h1 className="text-[20px] font-bold text-[#1E293B]">
            56 ürün listeleniyor
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {mockProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <Pagination />
        </div>
      </main>
    </div>
  );
}
