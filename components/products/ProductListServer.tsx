import { PRODUCTS_PER_PAGE } from "@/lib/constants/app";
import { ProductList } from "./ProductList";
import type { ProductsResponse } from "@/lib/types/product.types";

interface ProductListServerProps {
  productsDataPromise: Promise<ProductsResponse>;
  currentPage: number;
}

export async function ProductListServer({
  productsDataPromise,
  currentPage,
}: ProductListServerProps) {
  const productsData = await productsDataPromise;

  return (
    <ProductList
      products={productsData.products}
      total={productsData.total}
      currentPage={currentPage}
      totalPages={Math.ceil(productsData.total / PRODUCTS_PER_PAGE)}
    />
  );
}
