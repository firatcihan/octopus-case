import { Suspense } from "react";
import type { Metadata } from "next";
import { Sidebar } from "@/components/products/Sidebar";
import { ProductListServer } from "@/components/products/ProductListServer";
import { ProductListSkeleton } from "@/components/products/ProductList";
import { ProductsProvider } from "@/store/productsContext";
import { getCategoriesApi, getProductsApi } from "@/lib/api/products";

interface ProductsPageProps {
  searchParams: Promise<{
    q?: string;
    categories?: string;
    page?: string;
  }>;
}

export async function generateMetadata({
  searchParams,
}: ProductsPageProps): Promise<Metadata> {
  const params = await searchParams;
  const search = params.q;
  const categories = (params.categories ?? "").split(",").filter(Boolean);
  const page = params.page ? Number(params.page) : undefined;

  let title = "Ürünler";
  const parts: string[] = [];

  if (search) parts.push(`"${search}" araması`);
  if (categories.length > 0) parts.push(categories.join(", "));
  if (page && page > 1) parts.push(`Sayfa ${page}`);

  if (parts.length > 0) title = `${title} — ${parts.join(", ")}`;

  return { title };
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;

  const search = params.q ?? "";
  const categories = (params.categories ?? "").split(",").filter(Boolean);
  const page = Math.max(1, Number(params.page) || 1);

  // no waterfall
  const productsDataPromise = getProductsApi(search, categories, page);
  const categoriesList = await getCategoriesApi();

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      <main className="flex-1 max-w-360 w-full mx-auto px-8 py-8 flex gap-12">
        <ProductsProvider
          categories={categoriesList}
          currentSearch={search}
          currentCategories={categories}
          currentPage={page}
        >
          <Sidebar />
          <Suspense
            key={`${search}-${categories.join(",")}-${page}`}
            fallback={<ProductListSkeleton />}
          >
            <ProductListServer
              productsDataPromise={productsDataPromise}
              currentPage={page}
            />
          </Suspense>
        </ProductsProvider>
      </main>
    </div>
  );
}
