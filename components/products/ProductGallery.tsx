"use client";

import { useState, MouseEvent } from "react";
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 lg:p-10 backdrop-blur-sm cursor-zoom-out animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          <button
            className="absolute top-6 right-6 text-white text-4xl w-12 h-12 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors z-50 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(false);
            }}
          >
            &times;
          </button>
          <div
            className="relative w-full h-full max-w-6xl max-h-[85vh] cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt={title}
              fill
              className="object-contain drop-shadow-2xl"
              sizes="100vw"
              priority
              quality={100}
            />
          </div>
        </div>
      )}
    </div>
  );
}
