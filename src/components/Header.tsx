"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { WalletSelector } from "./WalletSelector";
import { Menu, X } from "lucide-react";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-black/20 backdrop-blur-md fixed top-0 left-0 right-0 z-[100] rounded-xl shadow-lg text-white w-full">
      <div className="flex items-center justify-between px-4 py-3 max-w-screen-xl mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-2 font-bold text-3xl tracking-wider text-white">
          <Link href="/" className="flex items-center cursor-pointer"> 
          <Image
            src="/logo.png"
            alt="Orit Trading Logo"
            width={50}
            height={40}
            priority
          />rîT
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6 items-center">
          <Link href="/trade" className="hover:text-gray-300 transition">
            Trade
          </Link>
          <Link href="/dashboard" className="hover:text-gray-300 transition">
            Dashboard
          </Link>
          <Link href="/copy-trading" className="hover:text-gray-300 transition">
            Copy Trading
          </Link>
          <Link href="/analytics" className="hover:text-gray-300 transition">
            Analytics
          </Link>
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
          <Link
            href="/trade"
            className="block hover:text-gray-300 transition"
            onClick={() => setMenuOpen(false)}
          >
            Trade
          </Link>
          <Link
            href="/dashboard"
            className="block hover:text-gray-300 transition"
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            href="/copy-trading"
            className="block hover:text-gray-300 transition"
            onClick={() => setMenuOpen(false)}
          >
            Copy Trading
          </Link>
          <Link
            href="/analytics"
            className="block hover:text-gray-300 transition"
            onClick={() => setMenuOpen(false)}
          >
            Analytics
          </Link>
          <div className="pt-2">
            <WalletSelector />
          </div>
        </div>
      )}
    </header>
  );
}
