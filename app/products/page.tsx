import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/products/Sidebar";
import { ProductList } from "@/components/products/ProductList";
import { ProductsProvider } from "@/store/productsContext";
import { getProductsApi, getCategoriesApi } from "@/lib/api/products";
import { PRODUCTS_PER_PAGE } from "@/lib/constants/app";

interface ProductsPageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    page?: string;
  }>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;

  const search = params.q ?? "";
  const category = params.category ?? "";
  const page = Math.max(1, Number(params.page) || 1);

  const [productsData, categories] = await Promise.all([
    getProductsApi(search, category, page),
    getCategoriesApi(),
  ]);

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      <Header />

      <main className="flex-1 max-w-360 w-full mx-auto px-8 py-8 flex gap-12">
        <ProductsProvider
          categories={categories}
          currentSearch={search}
          currentCategory={category}
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
