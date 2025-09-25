"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, DollarSign, Clock } from "lucide-react";

interface TradePanelProps {}

interface Transaction {
  id: string;
  type: "buy" | "sell";
  amount: number;
  price: number;
  timestamp: string;
}

export default function TradePanel({}: TradePanelProps) {
  const [oritCoinPrice, setOritCoinPrice] = useState(12.50);
  const [balance, setBalance] = useState(100);
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: "1", type: "buy", amount: 10, price: 12.00, timestamp: "2025-09-24 10:00" },
    { id: "2", type: "sell", amount: 5, price: 12.50, timestamp: "2025-09-24 10:15" },
  ]);

  const handleBuy = () => {
    if (parseFloat(amount) <= 0 || isNaN(parseFloat(amount))) {
      alert("Please enter a valid amount.");
      return;
    }
    const amountNum = parseFloat(amount);
    if (balance >= amountNum * oritCoinPrice) {
      setBalance(balance - amountNum * oritCoinPrice);
      setTransactions([
        ...transactions,
        { id: Date.now().toString(), type: "buy", amount: amountNum, price: oritCoinPrice, timestamp: new Date().toLocaleString() },
      ]);
    } else {
      alert("Insufficient balance.");
    }
    setAmount("");
  };

  const handleSell = () => {
    if (parseFloat(amount) <= 0 || isNaN(parseFloat(amount))) {
      alert("Please enter a valid amount.");
      return;
    }
    const amountNum = parseFloat(amount);
    setBalance(balance + amountNum * oritCoinPrice);
    setTransactions([
      ...transactions,
      { id: Date.now().toString(), type: "sell", amount: amountNum, price: oritCoinPrice, timestamp: new Date().toLocaleString() },
    ]);
    setAmount("");
  };

  const chartData = useMemo(() => {
    // Generate some dummy chart data
    const data = [];
    let price = oritCoinPrice;
    for (let i = 0; i < 20; i++) {
      price += (Math.random() - 0.5) * 0.5; // Random price fluctuation
      if (price < 0) price = 0.5;
      data.push({ time: i, price: price.toFixed(2) });
    }
    return data;
  }, [oritCoinPrice]);

  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-800 rounded-md">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <TrendingUp className="text-cyan-400" size={24} />
        Trade OritCoin
      </h2>

      <div className="bg-gray-900 rounded-md p-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <DollarSign className="text-green-400" size={20} />
          Price Chart
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#666" />
            <XAxis dataKey="time" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Area type="monotone" dataKey="price" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>
        <p className="text-sm text-gray-400 mt-2">Current Price: ${oritCoinPrice.toFixed(2)}</p>
      </div>

      <div className="flex items-center space-x-3">
        <Input
          type="number"
          placeholder="Amount"
          className="bg-gray-700 text-white"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Button onClick={handleBuy}>Buy</Button>
        <Button onClick={handleSell}>Sell</Button>
      </div>

      <div className="bg-gray-900 rounded-md p-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <DollarSign className="text-yellow-400" size={20} />
          Your Balance
        </h3>
        <p className="text-2xl">{balance.toFixed(2)} OritCoin</p>
      </div>

      <div className="bg-gray-900 rounded-md p-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Clock className="text-orange-400" size={20} />
          Transaction History
        </h3>
        {transactions.length === 0 ? (
          <p className="text-gray-400">No transactions yet.</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400">
                <th>Type</th>
                <th>Amount</th>
                <th>Price</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.type}</td>
                  <td>{transaction.amount.toFixed(2)}</td>
                  <td>${transaction.price.toFixed(2)}</td>
                  <td>{transaction.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}