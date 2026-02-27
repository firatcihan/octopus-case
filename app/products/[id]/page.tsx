import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { getSingleProductApi } from "@/lib/api/products";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductOptions } from "@/components/products/ProductOptions";
import { ProductReviews } from "@/components/products/ProductReviews";
import { ProductStickyBar } from "@/components/products/ProductStickyBar";

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

      <main className="flex-1 max-w-360 w-full mx-auto px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-10.5">
          {/* Left Side - Image Gallery */}
          <div className="w-full lg:w-1/2">
            <ProductGallery images={product.images} title={product.title} />
          </div>

          {/* Right Side - Product Details */}
          <div className="w-full lg:w-1/2 flex flex-col gap-14">
            <div>
              <h1 className="text-[40px] font-bold text-black mb-4 leading-tight">
                {product.title}
              </h1>
              <p className="text-[#888888] font-normal text-xl leading-relaxed">
                {product.description}
              </p>
            </div>

            <ProductOptions />

            <ProductReviews reviews={product.reviews || []} />
          </div>
        </div>
      </main>

      <ProductStickyBar product={product} />
    </div>
  );
}
