import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/products/Sidebar";
import { ProductList } from "@/components/products/ProductList";
import { ProductsProvider } from "@/store/productsContext";
import { getProductsApi, getCategoriesApi } from "@/lib/api/products";
import { PRODUCTS_PER_PAGE } from "@/lib/constants/app";

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

  const [productsData, categoriesList] = await Promise.all([
    getProductsApi(search, categories, page),
    getCategoriesApi(),
  ]);

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      <Header />

      <main className="flex-1 max-w-360 w-full mx-auto px-8 py-8 flex gap-12">
        <ProductsProvider
          categories={categoriesList}
          currentSearch={search}
          currentCategories={categories}
          currentPage={page}
        >
          <Sidebar />
          <ProductList
            products={productsData.products}
            total={productsData.total}
            currentPage={page}
            totalPages={Math.ceil(productsData.total / PRODUCTS_PER_PAGE)}
          />
        </ProductsProvider>
      </main>
    </div>
  );
}
