"use client";

import { useState, MouseEvent, useEffect, useCallback } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedIndex = images.indexOf(selectedImage);

  const handleNextImage = useCallback(() => {
    const nextIndex = (selectedIndex + 1) % images.length;
    setSelectedImage(images[nextIndex]);
  }, [images, selectedIndex]);

  const handlePrevImage = useCallback(() => {
    const prevIndex = (selectedIndex - 1 + images.length) % images.length;
    setSelectedImage(images[prevIndex]);
  }, [images, selectedIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      if (e.key === "ArrowRight") handleNextImage();
      if (e.key === "ArrowLeft") handlePrevImage();
      if (e.key === "Escape") setIsModalOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, handleNextImage, handlePrevImage]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      width: rect.width,
      height: rect.height,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div
        className="relative aspect-square w-full bg-[#f8fafc] rounded-lg overflow-hidden flex items-center justify-center p-8 cursor-zoom-in group"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onMouseMove={handleMouseMove}
        onClick={() => setIsModalOpen(true)}
      >
        <Image
          src={selectedImage}
          alt={title}
          fill
          className={`object-contain p-8 transition-opacity duration-300 ${isHovering ? "opacity-0" : "opacity-100"}`}
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />

        {/* Zoom Effect Layer */}
        {isHovering && (
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              backgroundImage: `url(${selectedImage})`,
              backgroundPosition: `${(mousePos.x / mousePos.width) * 100}% ${(mousePos.y / mousePos.height) * 100}%`,
              backgroundSize: "250%",
              backgroundRepeat: "no-repeat",
            }}
          />
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(image)}
              className={`relative w-24 h-24 flex-shrink-0 bg-white overflow-hidden border transition-colors ${
                selectedImage === image
                  ? "border-black"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <Image
                src={image}
                alt={`${title} thumbnail ${index + 1}`}
                fill
                className="object-contain p-2"
                sizes="96px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Zoom Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 lg:p-10 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 text-white w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50 cursor-pointer border border-white/20"
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {/* Previous Button */}
          {images.length > 1 && (
            <button
              className="absolute left-4 lg:left-10 text-white w-14 h-14 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all z-50 cursor-pointer border border-white/20 hover:scale-110"
              onClick={(e) => {
                e.stopPropagation();
                handlePrevImage();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
          )}

          <div
            className="relative w-full h-full max-w-6xl max-h-[85vh] cursor-default flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full transition-transform duration-300">
              <Image
                key={selectedImage} // forces refresh animation on image change
                src={selectedImage}
                alt={`${title} - view ${selectedIndex + 1}`}
                fill
                className="object-contain drop-shadow-2xl animate-in zoom-in-95 duration-300"
                sizes="100vw"
                priority
                quality={100}
              />
            </div>
            {/* Image Counter */}
            {images.length > 1 && (
              <div className="absolute bottom-[-2rem] text-white/50 text-sm font-medium bg-black/50 px-4 py-1.5 rounded-full backdrop-blur-sm">
                {selectedIndex + 1} / {images.length}
              </div>
            )}
          </div>

          {/* Next Button */}
          {images.length > 1 && (
            <button
              className="absolute right-4 lg:right-10 text-white w-14 h-14 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all z-50 cursor-pointer border border-white/20 hover:scale-110"
              onClick={(e) => {
                e.stopPropagation();
                handleNextImage();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
