"use client";

import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import Silk from "@/components/Silk";
import { TrendingUp, Shield, Zap, Users, BarChart3, Copy } from "lucide-react";

function App() {
  return (
    <>
      <Header />
      <HeroSection />

      {/* Features Section */}
      <section className="relative bg-black py-20 overflow-hidden">
        <Silk
          speed={3}
          scale={0.8}
          color="#4A5568"
          noiseIntensity={1}
          rotation={45}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
        />
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16">
            Why Choose Orit Trading?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-cyan-400 transition-all duration-300">
              <Shield className="text-cyan-400 mb-4" size={48} />
              <h3 className="text-xl font-semibold text-white mb-3">Secure & Decentralized</h3>
              <p className="text-gray-300">Trade with confidence on the Aptos blockchain with unparalleled security and transparency.</p>
            </div>
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-green-400 transition-all duration-300">
              <Zap className="text-green-400 mb-4" size={48} />
              <h3 className="text-xl font-semibold text-white mb-3">Lightning Fast</h3>
              <p className="text-gray-300">Experience ultra-fast transactions and real-time trading with Aptos' high-performance network.</p>
            </div>
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-purple-400 transition-all duration-300">
              <Copy className="text-purple-400 mb-4" size={48} />
              <h3 className="text-xl font-semibold text-white mb-3">Copy Trading</h3>
              <p className="text-gray-300">Follow successful traders and replicate their strategies with our innovative copy trading feature.</p>
            </div>
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-400 transition-all duration-300">
              <BarChart3 className="text-blue-400 mb-4" size={48} />
              <h3 className="text-xl font-semibold text-white mb-3">Advanced Analytics</h3>
              <p className="text-gray-300">Gain insights with comprehensive analytics and performance tracking tools.</p>
            </div>
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-yellow-400 transition-all duration-300">
              <Users className="text-yellow-400 mb-4" size={48} />
              <h3 className="text-xl font-semibold text-white mb-3">Community Driven</h3>
              <p className="text-gray-300">Join a thriving community of traders and benefit from collective wisdom and support.</p>
            </div>
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-red-400 transition-all duration-300">
              <TrendingUp className="text-red-400 mb-4" size={48} />
              <h3 className="text-xl font-semibold text-white mb-3">Low Fees</h3>
              <p className="text-gray-300">Enjoy competitive trading fees and maximize your profits with our cost-effective platform.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-gray-900 to-black py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Trading?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of traders on the most secure and efficient decentralized trading platform.
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl text-lg font-semibold shadow-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300">
            Get Started Now
          </button>
        </div>
      </section>
    </>
  );
}

export default App;
