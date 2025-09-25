"use client";

import React from "react";
import { Header } from "@/components/Header";
import Silk from "@/components/Silk";
import { DollarSign, Coins, CreditCard, History, TrendingUp, BarChart3 } from "lucide-react";

export default function DashboardPage() {
  // Mock data for the dashboard
  const dashboardData = {
    totalValue: 12345.67,
    oritCoinBalance: 100,
    aptBalance: 10,
    recentTransactions: [
      { id: "1", type: "buy", amount: 10, asset: "OritCoin", timestamp: "2025-09-24 10:00" },
      { id: "2", type: "sell", amount: 5, asset: "OritCoin", timestamp: "2025-09-24 10:15" },
    ],
  };

  return (
    <>
      <Header />
      <div className="relative bg-black min-h-screen overflow-hidden">
        <Silk
          speed={3.5}
          scale={1}
          color="#1A202C"
          noiseIntensity={1.3}
          rotation={60}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
        />
        <div className="relative z-10 py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-12 flex items-center justify-center gap-4">
              <BarChart3 className="text-cyan-400" size={48} />
              Dashboard
            </h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-gray-900/90 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-cyan-400 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <DollarSign className="text-cyan-400" size={32} />
                  <h3 className="text-lg font-semibold text-white">Total Value</h3>
                </div>
                <p className="text-3xl font-bold text-white">${dashboardData.totalValue.toFixed(2)}</p>
              </div>
              <div className="bg-gray-900/90 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-green-400 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <Coins className="text-green-400" size={32} />
                  <h3 className="text-lg font-semibold text-white">OritCoin Balance</h3>
                </div>
                <p className="text-3xl font-bold text-white">{dashboardData.oritCoinBalance} OritCoin</p>
              </div>
              <div className="bg-gray-900/90 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-purple-400 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <CreditCard className="text-purple-400" size={32} />
                  <h3 className="text-lg font-semibold text-white">APT Balance</h3>
                </div>
                <p className="text-3xl font-bold text-white">{dashboardData.aptBalance} APT</p>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-gray-900/90 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                <History className="text-orange-400" size={28} />
                Recent Transactions
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-400 border-b border-gray-700">
                      <th className="pb-3">Type</th>
                      <th className="pb-3">Amount</th>
                      <th className="pb-3">Asset</th>
                      <th className="pb-3">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData.recentTransactions.map((transaction) => (
                      <tr key={transaction.id} className="border-b border-gray-800">
                        <td className="py-3 text-white flex items-center gap-2">
                          <TrendingUp className={transaction.type === 'buy' ? 'text-green-400' : 'text-red-400'} size={16} />
                          {transaction.type}
                        </td>
                        <td className="py-3 text-white">{transaction.amount}</td>
                        <td className="py-3 text-white">{transaction.asset}</td>
                        <td className="py-3 text-gray-300">{transaction.timestamp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}