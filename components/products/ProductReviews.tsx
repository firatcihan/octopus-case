"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

interface ProductReviewsProps {
  reviews: Review[];
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-3.5 h-3.5 ${
            star <= rating ? "text-[#FFC700]" : "text-[#FFC700]/25"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function ProductReviews({ reviews }: ProductReviewsProps) {
  const [expandedReviews, setExpandedReviews] = useState<
    Record<number, boolean>
  >({});

  const toggleExpand = (index: number) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  if (!reviews || reviews.length === 0) {
    return null;
  }

  return (
    <div>
      <h3 className="text-base font-bold text-black mb-4">Ürün Yorumları</h3>

      <div className="flex flex-col gap-6 mb-4">
        {reviews.slice(0, 2).map((review, index) => {
          const isExpanded = expandedReviews[index];
          const isLong = review.comment.length > 150;

          return (
            <div key={index} className="flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <span className="font-medium text-lg text-black">
                  {review.reviewerName}
                </span>
                <StarRating rating={review.rating} />
              </div>

              <p className="text-black font-normal text-lg leading-relaxed">
                {isExpanded || !isLong
                  ? review.comment
                  : `${review.comment.substring(0, 150)}... `}
                {isLong && (
                  <button
                    onClick={() => toggleExpand(index)}
                    className="text-[#00d632] font-bold hover:underline ml-1"
                  >
                    {isExpanded ? "Daha az göster" : "Daha fazla göster"}
                  </button>
                )}
              </p>
            </div>
          );
        })}
      </div>

      {reviews.length > 2 && (
        <div>
          <Button className="bg-[#1e293b] hover:bg-[#0f172a] text-white text-sm font-medium px-6 py-2.5 h-auto rounded-lg">
            Tümünü Gör
          </Button>
        </div>
      )}
    </div>
  );
}
