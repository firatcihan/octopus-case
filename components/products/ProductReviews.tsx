"use client";

import { useState } from "react";
import Image from "next/image";
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
        <Image
          key={star}
          src={
            star <= rating
              ? "/assets/icons/star-filled.svg"
              : "/assets/icons/star-empty.svg"
          }
          alt=""
          width={14}
          height={14}
        />
      ))}
    </div>
  );
}

export function ProductReviews({ reviews }: ProductReviewsProps) {
  const [expandedReviews, setExpandedReviews] = useState<
    Record<number, boolean>
  >({});
  const [showAll, setShowAll] = useState(false);

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
        {(showAll ? reviews : reviews.slice(0, 2)).map((review, index) => {
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
                    className="text-[#00B500] text-[18px] font-medium ml-1"
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
          <Button
            onClick={() => setShowAll((prev) => !prev)}
            className="bg-[#1e293b] hover:bg-[#0f172a] text-white text-sm font-medium px-6.5 py-3 h-auto rounded-lg"
          >
            {showAll ? "Daha Az Göster" : "Tümünü Gör"}
          </Button>
        </div>
      )}
    </div>
  );
}
