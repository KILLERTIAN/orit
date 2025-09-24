"use client";

import React from "react";

export function HeroSection() {
  return (
    <section className="relative h-[80vh] flex items-center justify-center text-center text-white overflow-hidden bg-black">
      {/* Animated dark silk background */}
      <div className="absolute inset-0 -z-10">
        <div className="w-full h-full bg-[radial-gradient(circle_at_20%_30%,#111,transparent_40%),radial-gradient(circle_at_80%_70%,#222,transparent_40%)] animate-[pulse_12s_infinite_alternate]" />
      </div>

      {/* Subtle blurred glowing orb */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <div className="relative w-[28rem] h-[28rem] bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 rounded-full mix-blend-lighten filter blur-3xl opacity-20 animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-20 p-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight text-white">
          Decentralized Trading on Aptos
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 mb-10">
          Empowering traders with secure, transparent, and efficient copy trading.
        </p>
        <button className="px-10 py-4 bg-white text-black rounded-xl text-lg font-semibold shadow-lg hover:bg-gray-200 transition-all duration-300">
          Start Trading
        </button>
      </div>
    </section>
  );
}
