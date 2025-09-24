"use client";

import { useState } from "react";
import Image from "next/image";
import { WalletSelector } from "./WalletSelector";
import { Menu, X } from "lucide-react";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-black text-white w-full">
      <div className="flex items-center justify-between px-4 py-3 max-w-screen-xl mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-2 font-bold text-3xl tracking-loose">
        <Image
          src="/logo.png"
          alt="Orit Trading Logo"
          width={50}
          height={40}
          priority
        />rîT
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6 items-center">
          <a href="#features" className="hover:text-gray-300 transition">
            Features
          </a>
          <a href="#pricing" className="hover:text-gray-300 transition">
            Pricing
          </a>
          <a href="#about" className="hover:text-gray-300 transition">
            About
          </a>
          <WalletSelector />
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-black px-4 pb-4 space-y-4">
          <a
            href="#features"
            className="block hover:text-gray-300 transition"
            onClick={() => setMenuOpen(false)}
          >
            Features
          </a>
          <a
            href="#pricing"
            className="block hover:text-gray-300 transition"
            onClick={() => setMenuOpen(false)}
          >
            Pricing
          </a>
          <a
            href="#about"
            className="block hover:text-gray-300 transition"
            onClick={() => setMenuOpen(false)}
          >
            About
          </a>
          <div className="pt-2">
            <WalletSelector />
          </div>
        </div>
      )}
    </header>
  );
}
