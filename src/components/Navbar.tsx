import React from "react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          {/* Swap this with your logo image if you have one */}
          <div className="h-6 w-6 rounded-md bg-gradient-to-br from-green-600 to-emerald-400" />
          <span className="font-semibold text-gray-900">GreenCirkit</span>
        </a>

        {/* Menu */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
          <a href="/granules/buy" className="hover:text-gray-900">Granules</a>
          <a href="/epr" className="hover:text-gray-900">EPR Credits</a>
          <a href="/contact" className="hover:text-gray-900">Contact</a>
        </nav>

        {/* CTA */}
        <a
          href="/granules/sell"
          className="inline-flex items-center px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition"
        >
          Sell Scrap
        </a>
      </div>
    </header>
  );
}
