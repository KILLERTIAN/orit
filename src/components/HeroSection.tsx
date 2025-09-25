"use client";

import React from "react";
import Silk from "./Silk";

export function HeroSection() {
  return (
    <section className="relative h-full min-h-screen w-full flex items-center justify-center text-center text-white overflow-hidden bg-black">
      <Silk
        speed={5}
        scale={1}
        color="#7B7481"
        noiseIntensity={1.5}
        rotation={0}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
      />

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
