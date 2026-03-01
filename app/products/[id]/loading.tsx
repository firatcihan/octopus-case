import { Header } from "@/components/layout/Header";

export default function ProductDetailLoading() {
  return (
    <div className="min-h-screen bg-white flex flex-col pb-24">
      <Header />

      <main className="flex-1 max-w-360 w-full mx-auto px-8 py-8 animate-pulse">
        <div className="flex flex-col lg:flex-row gap-10.5">
          {/* Left Side - Image Gallery Skeleton */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <div className="w-full aspect-square bg-gray-200 rounded-lg"></div>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-24 h-24 bg-gray-200 rounded-lg"
                ></div>
              ))}
            </div>
          </div>

          {/* Right Side - Product Details Skeleton */}
          <div className="w-full lg:w-1/2 flex flex-col gap-14">
            <div>
              <div className="h-10 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="space-y-2">
                <div className="h-5 bg-gray-200 rounded w-full"></div>
                <div className="h-5 bg-gray-200 rounded w-5/6"></div>
                <div className="h-5 bg-gray-200 rounded w-4/6"></div>
              </div>
            </div>

            {/* Options Skeleton */}
            <div className="flex flex-col gap-14">
              <div>
                <div className="h-5 bg-gray-200 w-24 rounded mb-3"></div>
                <div className="flex gap-4">
                  <div className="w-[145px] h-[45px] bg-gray-200"></div>
                  <div className="w-[145px] h-[45px] bg-gray-200"></div>
                </div>
              </div>

              <div>
                <div className="h-5 bg-gray-200 w-24 rounded mb-3"></div>
                <div className="grid grid-cols-2 gap-4 w-fit">
                  <div className="w-[189px] h-[100px] bg-gray-200"></div>
                  <div className="w-[189px] h-[100px] bg-gray-200"></div>
                  <div className="w-[189px] h-[100px] bg-gray-200"></div>
                  <div className="w-[189px] h-[100px] bg-gray-200"></div>
                </div>
              </div>
            </div>

            {/* Reviews Skeleton */}
            <div className="mt-8">
              <div className="h-6 bg-gray-200 w-48 rounded mb-6"></div>
              <div className="space-y-6">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div
                    key={i}
                    className="border-b border-gray-100 pb-6 w-full max-w-xl"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-5 bg-gray-200 w-32 rounded"></div>
                      <div className="h-4 bg-gray-200 w-20 rounded"></div>
                    </div>
                    <div className="h-4 bg-gray-200 w-24 rounded mb-3"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 w-full rounded"></div>
                      <div className="h-4 bg-gray-200 w-5/6 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Sticky Bar Skeleton */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50">
        <div className="px-9 h-25 flex items-center justify-between animate-pulse">
          {/* Left Side Skeleton */}
          <div className="flex items-center h-full flex-1 hidden md:flex">
            <div className="h-full flex items-center pr-8">
              <div className="h-6 w-32 bg-gray-200 rounded"></div>
            </div>
            <div className="w-px h-full bg-gray-200" />
            <div className="pl-8 flex flex-col justify-center flex-1 gap-2">
              <div className="h-5 w-48 bg-gray-200 rounded"></div>
              <div className="h-4 w-64 bg-gray-200 rounded"></div>
            </div>
          </div>

          {/* Right Side Skeleton */}
          <div className="flex items-center justify-end gap-4 pl-8 w-full md:w-auto">
            <div className="h-10 w-24 bg-gray-200 rounded"></div>
            <div className="w-[140px] h-[48px] bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
