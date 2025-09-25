"use client";

import React from "react";
import { Header } from "@/components/Header";
import Silk from "@/components/Silk";
import { DollarSign, Coins, CreditCard, History, TrendingUp, BarChart3, Loader2 } from "lucide-react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useQuery } from "@tanstack/react-query";
import { getAccountAPTBalance } from "@/view-functions/getAccountBalance";
import { getTrades, type Trade } from "@/view-functions/getTrades";

export default function DashboardPage() {
  const { account } = useWallet();
  const address = account?.address?.toString() ?? "";

  const { data: aptBalance, isLoading: aptLoading } = useQuery({
    queryKey: ["aptBalance", address],
    enabled: !!address,
    queryFn: async () => {
      if (!address) return 0;
      return await getAccountAPTBalance({ accountAddress: address });
    },
  });

  const { data: trades, isLoading: tradesLoading } = useQuery({
    queryKey: ["trades", address],
    enabled: !!address,
    queryFn: async () => {
      if (!address) return [] as Trade[];
      return await getTrades(address);
    },
  });

  // Mock data for now
  const oritCoinBalance = 100;
  const totalValue = (aptBalance || 0) / 100000000 + oritCoinBalance * 1.5; // Mock calculation

  const recentTransactions = trades?.slice(-5).map((trade, index) => ({
    id: index.toString(),
    type: Number(trade.amount_out) > Number(trade.amount_in) ? "sell" : "buy",
    amountIn: Number(trade.amount_in),
    amountOut: Number(trade.amount_out),
    profitLoss: Number(trade.profit_loss),
    timestamp: new Date().toLocaleString(), // Mock timestamp
  })) || [];

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
            <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-12 flex items-center justify-center gap-4 animate-fade-in">
              <BarChart3 className="text-cyan-400 animate-pulse" size={48} />
              Dashboard
            </h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-gray-900/90 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-cyan-400 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <DollarSign className="text-cyan-400" size={32} />
                  <h3 className="text-lg font-semibold text-white">Total Value</h3>
                </div>
                {aptLoading ? (
                  <Loader2 className="animate-spin text-cyan-400" size={32} />
                ) : (
                  <p className="text-3xl font-bold text-white">${totalValue.toFixed(2)}</p>
                )}
              </div>
              <div className="bg-gray-900/90 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-green-400 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <Coins className="text-green-400" size={32} />
                  <h3 className="text-lg font-semibold text-white">OritCoin Balance</h3>
                </div>
                <p className="text-3xl font-bold text-white">{oritCoinBalance} OritCoin</p>
              </div>
              <div className="bg-gray-900/90 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-purple-400 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <CreditCard className="text-purple-400" size={32} />
                  <h3 className="text-lg font-semibold text-white">APT Balance</h3>
                </div>
                {aptLoading ? (
                  <Loader2 className="animate-spin text-purple-400" size={32} />
                ) : (
                  <p className="text-3xl font-bold text-white">{(aptBalance || 0) / 100000000} APT</p>
                )}
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-gray-900/90 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                <History className="text-orange-400" size={28} />
                Recent Transactions
              </h3>
              <div className="overflow-x-auto">
                {tradesLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="animate-spin text-orange-400" size={32} />
                  </div>
                ) : (
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-gray-400 border-b border-gray-700">
                        <th className="pb-3">Type</th>
                        <th className="pb-3">Amount In</th>
                        <th className="pb-3">Amount Out</th>
                        <th className="pb-3">P/L</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentTransactions.map((transaction) => (
                        <tr key={transaction.id} className="border-b border-gray-800">
                          <td className="py-3 text-white flex items-center gap-2">
                            <TrendingUp className={transaction.type === 'buy' ? 'text-green-400' : 'text-red-400'} size={16} />
                            {transaction.type}
                          </td>
                          <td className="py-3 text-white">{transaction.amountIn}</td>
                          <td className="py-3 text-white">{transaction.amountOut}</td>
                          <td className="py-3 text-gray-300">{transaction.profitLoss}</td>
                        </tr>
                      ))}
                      {recentTransactions.length === 0 && (
                        <tr>
                          <td colSpan={4} className="py-8 text-center text-gray-400">
                            No recent transactions
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}