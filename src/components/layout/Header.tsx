"use client";

import { Navbar } from "./Navbar";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <Navbar />
    </header>
  );
} 