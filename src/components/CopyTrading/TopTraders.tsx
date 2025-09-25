"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { TrendingUp, TrendingDown, Users, DollarSign, Target, Copy, Filter, Search, ArrowUpDown } from "lucide-react";

interface Trader {
  id: string;
  name: string;
  avatar: string;
  totalProfit: number;
  winRate: number;
  totalTrades: number;
  followers: number;
  riskLevel: "Low" | "Medium" | "High";
  specialization: string[];
  isFollowing: boolean;
}

const mockTraders: Trader[] = [
  {
    id: "1",
    name: "CryptoKing",
    avatar: "👑",
    totalProfit: 245680,
    winRate: 78.5,
    totalTrades: 1247,
    followers: 2847,
    riskLevel: "Medium",
    specialization: ["BTC", "ETH", "Crypto"],
    isFollowing: false,
  },
  {
    id: "2",
    name: "StockMaster",
    avatar: "📈",
    totalProfit: 189450,
    winRate: 82.1,
    totalTrades: 892,
    followers: 1923,
    riskLevel: "Low",
    specialization: ["AAPL", "NVDA", "Stocks"],
    isFollowing: true,
  },
  {
    id: "3",
    name: "DeFiWizard",
    avatar: "🧙",
    totalProfit: 156780,
    winRate: 71.3,
    totalTrades: 634,
    followers: 1456,
    riskLevel: "High",
    specialization: ["DeFi", "ETH", "ADA"],
    isFollowing: false,
  },
  {
    id: "4",
    name: "TechTrader",
    avatar: "💻",
    totalProfit: 134290,
    winRate: 75.8,
    totalTrades: 756,
    followers: 1234,
    riskLevel: "Medium",
    specialization: ["GOOGL", "META", "Tech"],
    isFollowing: false,
  },
];

interface TopTradersProps {
  onViewProfile: (traderId: string) => void;
  onCopyTrades: (traderId: string) => void;
}

export default function TopTraders({ onViewProfile, onCopyTrades }: TopTradersProps) {
  const [traders, setTraders] = useState(mockTraders);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"profit" | "winRate" | "followers">("profit");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const filteredAndSortedTraders = useMemo(() => {
    let filtered = traders.filter(trader =>
      trader.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trader.specialization.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    filtered.sort((a, b) => {
      let aValue, bValue;
      switch (sortBy) {
        case "profit":
          aValue = a.totalProfit;
          bValue = b.totalProfit;
          break;
        case "winRate":
          aValue = a.winRate;
          bValue = b.winRate;
          break;
        case "followers":
          aValue = a.followers;
          bValue = b.followers;
          break;
        default:
          return 0;
      }
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    });

    return filtered;
  }, [traders, searchTerm, sortBy, sortOrder]);

  const handleFollowToggle = (traderId: string) => {
    setTraders(prev => prev.map(trader =>
      trader.id === traderId
        ? { ...trader, isFollowing: !trader.isFollowing }
        : trader
    ));
  };

  const toggleSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
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
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Top Traders</h2>
        <p className="text-gray-300">Discover successful traders and copy their strategies</p>
      </div>

      {/* Search and Sort Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <Input
            placeholder="Search traders or specializations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-800 border-gray-600 text-white"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={sortBy === "profit" ? "default" : "outline"}
            onClick={() => toggleSort("profit")}
            className="flex items-center gap-1"
          >
            <DollarSign size={14} />
            Profit
            <ArrowUpDown size={14} />
          </Button>
          <Button
            variant={sortBy === "winRate" ? "default" : "outline"}
            onClick={() => toggleSort("winRate")}
            className="flex items-center gap-1"
          >
            <Target size={14} />
            Win Rate
            <ArrowUpDown size={14} />
          </Button>
          <Button
            variant={sortBy === "followers" ? "default" : "outline"}
            onClick={() => toggleSort("followers")}
            className="flex items-center gap-1"
          >
            <Users size={14} />
            Followers
            <ArrowUpDown size={14} />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredAndSortedTraders.map((trader) => (
          <Card key={trader.id} className="bg-gray-900/90 backdrop-blur-sm border-gray-700 hover:border-purple-400 transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{trader.avatar}</div>
                  <div>
                    <CardTitle className="text-white text-lg">{trader.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={`${getRiskColor(trader.riskLevel)} text-white text-xs`}>
                        {trader.riskLevel} Risk
                      </Badge>
                      <div className="flex items-center gap-1 text-gray-400 text-sm">
                        <Users size={14} />
                        {trader.followers}
                      </div>
                    </div>
                  </div>
                </div>
                {trader.isFollowing && (
                  <Badge className="bg-purple-600 text-white">Following</Badge>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-green-400 mb-1">
                    <DollarSign size={16} />
                    <span className="text-sm font-medium">Profit</span>
                  </div>
                  <div className="text-white font-bold">${trader.totalProfit.toLocaleString()}</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-blue-400 mb-1">
                    <Target size={16} />
                    <span className="text-sm font-medium">Win Rate</span>
                  </div>
                  <div className="text-white font-bold">{trader.winRate}%</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {trader.specialization.map((spec) => (
                  <Badge key={spec} variant="outline" className="text-xs border-gray-600 text-gray-300">
                    {spec}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => onViewProfile(trader.id)}
                  variant="outline"
                  className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  View Profile
                </Button>
                <Button
                  onClick={() => {
                    handleFollowToggle(trader.id);
                    onCopyTrades(trader.id);
                  }}
                  className={`flex-1 ${
                    trader.isFollowing
                      ? "bg-purple-600 hover:bg-purple-700"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  <Copy size={16} className="mr-2" />
                  {trader.isFollowing ? "Copying" : "Copy Trades"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}