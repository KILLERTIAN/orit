"use client";

import React from "react";
import { Header } from "@/components/Header";
import Silk from "@/components/Silk";
import { BarChart3, TrendingUp, DollarSign, Award, Activity, PieChart } from "lucide-react";

export default function AnalyticsPage() {
  // Mock data for analytics
  const analyticsData = {
    totalTrades: 50,
    totalVolume: 50000,
    averageProfit: 12.50,
    topTrader: "0x123...",
    winRate: 68,
    totalUsers: 1250,
  };

  return (
    <>
      <Header />
      <div className="relative bg-black min-h-screen overflow-hidden">
        <Silk
          speed={3}
          scale={1.1}
          color="#1A202C"
          noiseIntensity={1.4}
          rotation={90}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
        />
        <div className="relative z-10 py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-12 flex items-center justify-center gap-4">
              <BarChart3 className="text-blue-400" size={48} />
              Analytics
            </h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <div className="bg-gray-900/90 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-400 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <Activity className="text-blue-400" size={32} />
                  <h3 className="text-lg font-semibold text-white">Total Trades</h3>
                </div>
                <p className="text-3xl font-bold text-white">{analyticsData.totalTrades}</p>
              </div>
              <div className="bg-gray-900/90 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-green-400 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <DollarSign className="text-green-400" size={32} />
                  <h3 className="text-lg font-semibold text-white">Total Volume</h3>
                </div>
                <p className="text-3xl font-bold text-white">${analyticsData.totalVolume.toFixed(2)}</p>
              </div>
              <div className="bg-gray-900/90 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-yellow-400 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <TrendingUp className="text-yellow-400" size={32} />
                  <h3 className="text-lg font-semibold text-white">Average Profit</h3>
                </div>
                <p className="text-3xl font-bold text-white">${analyticsData.averageProfit.toFixed(2)}</p>
              </div>
              <div className="bg-gray-900/90 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-purple-400 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <Award className="text-purple-400" size={32} />
                  <h3 className="text-lg font-semibold text-white">Top Trader</h3>
                </div>
                <p className="text-3xl font-bold text-white font-mono text-sm">{analyticsData.topTrader}</p>
              </div>
              <div className="bg-gray-900/90 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-cyan-400 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <PieChart className="text-cyan-400" size={32} />
                  <h3 className="text-lg font-semibold text-white">Win Rate</h3>
                </div>
                <p className="text-3xl font-bold text-white">{analyticsData.winRate}%</p>
              </div>
              <div className="bg-gray-900/90 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-red-400 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <BarChart3 className="text-red-400" size={32} />
                  <h3 className="text-lg font-semibold text-white">Total Users</h3>
                </div>
                <p className="text-3xl font-bold text-white">{analyticsData.totalUsers.toLocaleString()}</p>
              </div>
            </div>

            {/* Additional Analytics Section */}
            <div className="bg-gray-900/90 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h2 className="text-2xl font-semibold text-white mb-6">Platform Insights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-white mb-3">Trading Activity</h3>
                  <p className="text-gray-300">Monitor real-time trading activity and market trends across the platform.</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-3">Performance Metrics</h3>
                  <p className="text-gray-300">Track key performance indicators and user engagement statistics.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}