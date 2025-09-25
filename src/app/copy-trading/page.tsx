"use client";

import React from "react";
import { Header } from "@/components/Header";
import Silk from "@/components/Silk";
import { Copy, Users, TrendingUp, Target, Zap, Shield } from "lucide-react";

export default function CopyTradingPage() {
  return (
    <>
      <Header />
      <div className="relative bg-black min-h-screen overflow-hidden">
        <Silk
          speed={4}
          scale={0.9}
          color="#2D3748"
          noiseIntensity={1.1}
          rotation={45}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
        />
        <div className="relative z-10 py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-12 flex items-center justify-center gap-4">
              <Copy className="text-purple-400" size={48} />
              Copy Trading
            </h1>

            <p className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto">
              Follow successful traders and replicate their strategies automatically. Maximize your profits with our innovative copy trading platform.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              <div className="bg-gray-900/90 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-purple-400 transition-all duration-300">
                <Users className="text-purple-400 mb-4" size={40} />
                <h3 className="text-xl font-semibold text-white mb-3">Follow Top Traders</h3>
                <p className="text-gray-300">Browse and follow verified traders with proven track records and consistent performance.</p>
              </div>
              <div className="bg-gray-900/90 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-green-400 transition-all duration-300">
                <TrendingUp className="text-green-400 mb-4" size={40} />
                <h3 className="text-xl font-semibold text-white mb-3">Auto Replication</h3>
                <p className="text-gray-300">Your trades are automatically replicated based on the traders you follow, scaled to your investment amount.</p>
              </div>
              <div className="bg-gray-900/90 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-400 transition-all duration-300">
                <Target className="text-blue-400 mb-4" size={40} />
                <h3 className="text-xl font-semibold text-white mb-3">Risk Management</h3>
                <p className="text-gray-300">Set your own risk parameters and investment amounts to maintain control over your portfolio.</p>
              </div>
              <div className="bg-gray-900/90 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-yellow-400 transition-all duration-300">
                <Zap className="text-yellow-400 mb-4" size={40} />
                <h3 className="text-xl font-semibold text-white mb-3">Real-time Sync</h3>
                <p className="text-gray-300">Trades are executed in real-time, ensuring you never miss profitable opportunities.</p>
              </div>
              <div className="bg-gray-900/90 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-cyan-400 transition-all duration-300">
                <Shield className="text-cyan-400 mb-4" size={40} />
                <h3 className="text-xl font-semibold text-white mb-3">Secure & Transparent</h3>
                <p className="text-gray-300">All transactions are recorded on the blockchain, providing complete transparency and security.</p>
              </div>
              <div className="bg-gray-900/90 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-red-400 transition-all duration-300">
                <Copy className="text-red-400 mb-4" size={40} />
                <h3 className="text-xl font-semibold text-white mb-3">Easy to Use</h3>
                <p className="text-gray-300">Simple interface to start copying trades with just a few clicks. No complex setup required.</p>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-6">Start Copy Trading Today</h2>
              <p className="text-lg text-gray-300 mb-8">Join thousands of traders who are already profiting from copy trading.</p>
              <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl text-lg font-semibold shadow-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-300">
                Explore Traders
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}