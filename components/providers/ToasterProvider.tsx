"use client";

import { Toaster } from "react-hot-toast";

export function ToasterProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3000,
        style: {
          borderRadius: "8px",
          background: "#fff",
          fontSize: "14px",
        },
        success: {
          style: {
            color: "#00B500",
          },
          iconTheme: {
            primary: "#00B500",
            secondary: "#fff",
          },
        },
        error: {
          style: {
            color: "#EF4444",
          },
          iconTheme: {
            primary: "#EF4444",
            secondary: "#fff",
          },
        },
      }}
    />
  );
}
