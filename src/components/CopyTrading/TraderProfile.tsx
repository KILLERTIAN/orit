"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, Target, Users, Copy, Calendar } from "lucide-react";

interface Trade {
  id: string;
  asset: string;
  type: "buy" | "sell";
  amount: number;
  price: number;
  timestamp: string;
  profit: number;
}

interface TraderProfile {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  totalProfit: number;
  winRate: number;
  totalTrades: number;
  followers: number;
  riskLevel: "Low" | "Medium" | "High";
  specialization: string[];
  monthlyReturn: number;
  totalReturn: number;
  trades: Trade[];
}

const mockTraderProfile: TraderProfile = {
  id: "1",
  name: "CryptoKing",
  avatar: "👑",
  bio: "Professional crypto trader with 5+ years experience. Focus on BTC and ETH with a balanced risk approach.",
  totalProfit: 245680,
  winRate: 78.5,
  totalTrades: 1247,
  followers: 2847,
  riskLevel: "Medium",
  specialization: ["BTC", "ETH", "Crypto"],
  monthlyReturn: 12.5,
  totalReturn: 156.8,
  trades: [
    {
      id: "1",
      asset: "BTC",
      type: "buy",
      amount: 0.5,
      price: 45000,
      timestamp: "2024-01-15 14:30",
      profit: 2500,
    },
    {
      id: "2",
      asset: "ETH",
      type: "sell",
      amount: 5,
      price: 3200,
      timestamp: "2024-01-14 09:15",
      profit: -800,
    },
    {
      id: "3",
      asset: "BTC",
      type: "buy",
      amount: 0.3,
      price: 43500,
      timestamp: "2024-01-13 16:45",
      profit: 1800,
    },
    {
      id: "4",
      asset: "ADA",
      type: "buy",
      amount: 1000,
      price: 0.45,
      timestamp: "2024-01-12 11:20",
      profit: 120,
    },
  ],
};

interface TraderProfileProps {
  traderId: string;
  onBack: () => void;
  onCopyTrades: (traderId: string) => void;
}

export default function TraderProfile({ traderId, onBack, onCopyTrades }: TraderProfileProps) {
  const [trader] = useState(mockTraderProfile);
  const [isCopying, setIsCopying] = useState(false);

  const handleCopyTrades = () => {
    setIsCopying(true);
    onCopyTrades(traderId);
    // Simulate API call
    setTimeout(() => setIsCopying(false), 2000);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low": return "bg-green-500";
      case "Medium": return "bg-yellow-500";
      case "High": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          onClick={onBack}
          variant="outline"
          className="border-gray-600 text-gray-300 hover:bg-gray-800"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Traders
        </Button>
      </div>

      {/* Trader Info */}
      <Card className="bg-gray-900/90 backdrop-blur-sm border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-5xl">{trader.avatar}</div>
              <div>
                <CardTitle className="text-white text-2xl">{trader.name}</CardTitle>
                <p className="text-gray-300 mt-1">{trader.bio}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className={`${getRiskColor(trader.riskLevel)} text-white`}>
                    {trader.riskLevel} Risk
                  </Badge>
                  <div className="flex items-center gap-1 text-gray-400 text-sm">
                    <Users size={14} />
                    {trader.followers} followers
                  </div>
                </div>
              </div>
            </div>
            <Button
              onClick={handleCopyTrades}
              disabled={isCopying}
              className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
              size="lg"
            >
              <Copy size={16} className="mr-2" />
              {isCopying ? "Copying..." : "Copy Trading Pattern"}
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-green-400 mb-2">
                <DollarSign size={20} />
              </div>
              <div className="text-2xl font-bold text-white">${trader.totalProfit.toLocaleString()}</div>
              <div className="text-sm text-gray-400">Total Profit</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-blue-400 mb-2">
                <Target size={20} />
              </div>
              <div className="text-2xl font-bold text-white">{trader.winRate}%</div>
              <div className="text-sm text-gray-400">Win Rate</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-purple-400 mb-2">
                <TrendingUp size={20} />
              </div>
              <div className="text-2xl font-bold text-white">{trader.monthlyReturn}%</div>
              <div className="text-sm text-gray-400">Monthly Return</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-cyan-400 mb-2">
                <Calendar size={20} />
              </div>
              <div className="text-2xl font-bold text-white">{trader.totalTrades}</div>
              <div className="text-sm text-gray-400">Total Trades</div>
            </div>
          </div>

          {/* Specializations */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">Specializations</h3>
            <div className="flex flex-wrap gap-2">
              {trader.specialization.map((spec) => (
                <Badge key={spec} variant="outline" className="border-gray-600 text-gray-300">
                  {spec}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Trades */}
      <Card className="bg-gray-900/90 backdrop-blur-sm border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Recent Trades</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {trader.trades.map((trade) => (
              <div key={trade.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-full ${
                    trade.type === "buy" ? "bg-green-600" : "bg-red-600"
                  }`}>
                    {trade.type === "buy" ? (
                      <TrendingUp size={16} className="text-white" />
                    ) : (
                      <TrendingDown size={16} className="text-white" />
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-white">
                      {trade.type.toUpperCase()} {trade.asset}
                    </div>
                    <div className="text-sm text-gray-400">{trade.timestamp}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-semibold">
                    {trade.amount} {trade.asset} @ ${trade.price}
                  </div>
                  <div className={`text-sm font-medium ${
                    trade.profit >= 0 ? "text-green-400" : "text-red-400"
                  }`}>
                    ${trade.profit >= 0 ? "+" : ""}{trade.profit}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}