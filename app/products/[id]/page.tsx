import { Metadata } from "next";
import { Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { getSingleProductApi } from "@/lib/api/products";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductOptions } from "@/components/products/ProductOptions";
import { ProductReviews } from "@/components/products/ProductReviews";
import { ProductStickyBar } from "@/components/products/ProductStickyBar";

function ProductOptionsSkeleton() {
  return (
    <div className="flex flex-col gap-14 animate-pulse">
      <div>
        <div className="h-4 w-20 bg-gray-200 rounded mb-3" />
        <div className="flex gap-4">
          <div className="w-[145px] h-[45px] bg-gray-200 rounded" />
          <div className="w-[145px] h-[45px] bg-gray-200 rounded" />
        </div>
      </div>
      <div>
        <div className="h-4 w-24 bg-gray-200 rounded mb-3" />
        <div className="grid grid-cols-2 gap-4 w-fit">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="w-[189px] h-[100px] bg-gray-200 rounded" />
          ))}
        </div>
      </div>
    </div>
  );
}

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await getSingleProductApi(resolvedParams.id);

  return {
    title: product.title,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const product = await getSingleProductApi(resolvedParams.id);

  return (
    <div className="min-h-screen bg-white flex flex-col pb-24">
      <Header />

      <div className="flex-1 max-w-360 w-full mx-auto px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-10.5">
          <div className="w-full lg:w-1/2">
            <ProductGallery images={product.images} title={product.title} />
          </div>

          <div className="w-full lg:w-1/2 flex flex-col gap-14">
            <div>
              <h1 className="text-[40px] font-bold text-black mb-4 leading-tight">
                {product.title}
              </h1>
              <p className="text-[#888888] font-normal text-xl leading-relaxed">
                {product.description}
              </p>
            </div>

            <Suspense fallback={<ProductOptionsSkeleton />}>
              <ProductOptions />
            </Suspense>

            <ProductReviews reviews={product.reviews || []} />
          </div>
        </div>
      </div>

      <ProductStickyBar product={product} />
    </div>
  );
}
