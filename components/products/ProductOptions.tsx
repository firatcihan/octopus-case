"use client";

import { useState } from "react";

const COLORS = [
  { id: "silver", name: "Silver", hex: "#d1d5db" },
  { id: "black", name: "Black", hex: "#000000" },
];

const FEATURES = [
  {
    id: "f1",
    title: "Ürün Özellik 1",
    description: "Lorem Ipsum Dolar Sit Amet",
  },
  {
    id: "f2",
    title: "Ürün Özellik 1",
    description: "Lorem Ipsum Dolar Sit Amet",
  },
  {
    id: "f3",
    title: "Ürün Özellik 1",
    description: "Lorem Ipsum Dolar Sit Amet",
  },
  {
    id: "f4",
    title: "Ürün Özellik 1",
    description: "Lorem Ipsum Dolar Sit Amet",
  },
];

export function ProductOptions() {
  const [selectedColor, setSelectedColor] = useState("black");
  const [selectedFeature, setSelectedFeature] = useState("f1");

  return (
    <div className="flex flex-col gap-14">
      {/* Color Selection */}
      <div>
        <h3 className="text-base font-bold text-black mb-3">Renk Seç:</h3>
        <div className="flex gap-4">
          {COLORS.map((color) => (
            <button
              key={color.id}
              onClick={() => setSelectedColor(color.id)}
              className={`flex items-center w-[145px] h-[45px] rounded-none border transition-all ${
                selectedColor === color.id
                  ? "border-transparent bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]"
                  : "border-gray-200 bg-white hover:bg-gray-50"
              }`}
            >
              <div className="flex gap-2.5 py-3 px-5">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: color.hex }}
                />
                <span
                  className={`text-sm font-medium ${selectedColor === color.id ? "text-gray-900" : "text-gray-400"}`}
                >
                  {color.name}
                </span>
              </div>
              {selectedColor === color.id && (
                <div className="w-5 h-5 rounded-full bg-[#5cb85c] flex items-center justify-center">
                  <svg
                    width="10"
                    height="8"
                    viewBox="0 0 10 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 4L3.5 6.5L9 1"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Feature Selection */}
      <div>
        <h3 className="text-base font-bold text-black mb-3">Özellik Seç:</h3>
        <div className="grid grid-cols-2 gap-4 w-fit">
          {FEATURES.map((feature) => (
            <button
              key={feature.id}
              onClick={() => setSelectedFeature(feature.id)}
              className={`flex flex-col items-start p-4 w-[189px] h-[100px] rounded-none border text-left transition-all ${
                selectedFeature === feature.id
                  ? "border-transparent bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]"
                  : "border-gray-200 bg-white hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span
                  className={`text-sm font-medium ${selectedFeature === feature.id ? "text-black" : "text-[#8D8D8D]"}`}
                >
                  {feature.title}
                </span>
                {selectedFeature === feature.id && (
                  <div className="w-5 h-5 rounded-full bg-[#5cb85c] flex items-center justify-center flex-shrink-0 ml-2">
                    <svg
                      width="10"
                      height="8"
                      viewBox="0 0 10 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 4L3.5 6.5L9 1"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <span
                className={`text-sm font-medium leading-relaxed ${selectedFeature === feature.id ? "text-[#1E1E21]" : "text-[#C0C0C0]"}`}
              >
                {feature.description}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
