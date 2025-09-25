"use client";

import React from "react";
import { Header } from "@/components/Header";
import { Trading } from "@/components/Trading";
import TradePanel from "@/components/Trade/TradePanel";
import Silk from "@/components/Silk";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Card, CardContent } from "@/components/ui/card";

export default function TradePage() {
  const { connected } = useWallet();

  return (
    <>
      <Header />
      <div className="relative bg-black min-h-screen overflow-hidden">
        <Silk
          speed={4}
          scale={1.2}
          color="#2D3748"
          noiseIntensity={1.2}
          rotation={30}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
        />
        <div className="relative z-10 py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-12 animate-fade-in">
              Trade on Aptos
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Blockchain Trading */}
              <Card className="bg-gray-900/90 backdrop-blur-sm border-gray-700 text-white hover:border-cyan-400 transition-all duration-300 transform hover:scale-[1.02]">
                <CardContent className="p-6">
                  <Trading />
                </CardContent>
              </Card>

              {/* Mock Trading Panel */}
              <div className="bg-gray-900/90 backdrop-blur-sm rounded-xl border border-gray-700 p-6 hover:border-purple-400 transition-all duration-300 transform hover:scale-[1.02]">
                <TradePanel />
              </div>
            </div>

            {!connected && (
              <div className="text-center mt-12">
                <p className="text-xl text-gray-300 mb-4">Connect your wallet to start trading</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}