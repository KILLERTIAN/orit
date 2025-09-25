"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TrendingUp, DollarSign, Clock } from "lucide-react";
import AssetSelector from "./AssetSelector";
import CandlestickChart from "./CandlestickChart";
import { fetchCandlestickData, fetchAssetInfo, CandlestickData } from "@/utils/marketData";

interface TradePanelProps {}

interface Transaction {
  id: string;
  type: "buy" | "sell";
  amount: number;
  price: number; // Price at which the transaction occurred
  timestamp: string;
  profit_loss?: number; // Optional: calculated profit/loss for this transaction
}

export default function TradePanel({}: TradePanelProps) {
  const [selectedAsset, setSelectedAsset] = useState("AAPL");
  const [currentPrice, setCurrentPrice] = useState(0);
  const [balance, setBalance] = useState(10000); // Starting balance in USD
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [candlestickData, setCandlestickData] = useState<CandlestickData[]>([]);
  const [totalProfitLoss, setTotalProfitLoss] = useState(0);
  const [successPercentage, setSuccessPercentage] = useState(0);
  const [assetInfo, setAssetInfo] = useState<{ name: string; change24h: number } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch asset info
        const info = await fetchAssetInfo(selectedAsset);
        if (info) {
          setCurrentPrice(info.currentPrice);
          setAssetInfo({ name: info.name, change24h: info.change24h });
        }

        // Fetch candlestick data
        const data = await fetchCandlestickData(selectedAsset);
        setCandlestickData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 30000); // Fetch data every 30 seconds

    return () => clearInterval(intervalId);
  }, [selectedAsset]);

  useEffect(() => {
    // Calculate total profit/loss and success percentage whenever transactions or current price change
    let totalPL = 0;
    let successfulTrades = 0;
    const updatedTransactions = transactions.map((tx) => {
      let profit_loss = 0;
      if (tx.type === "buy") {
        profit_loss = (currentPrice - tx.price) * tx.amount;
      } else { // sell
        profit_loss = (tx.price - currentPrice) * tx.amount;
      }
      return { ...tx, profit_loss };
    });

    updatedTransactions.forEach((tx) => {
      totalPL += tx.profit_loss;
      if (tx.profit_loss > 0) {
        successfulTrades++;
      }
    });

    setTransactions(updatedTransactions);
    setTotalProfitLoss(totalPL);
    setSuccessPercentage(transactions.length > 0 ? (successfulTrades / transactions.length) * 100 : 0);
  }, [transactions.length, currentPrice]);


  const handleBuy = () => {
    if (parseFloat(amount) <= 0 || isNaN(parseFloat(amount))) {
      alert("Please enter a valid amount.");
      return;
    }
    const amountNum = parseFloat(amount);
    if (balance >= amountNum * currentPrice) {
      setBalance(balance - amountNum * currentPrice);
      setTransactions([
        ...transactions,
        { id: Date.now().toString(), type: "buy", amount: amountNum, price: currentPrice, timestamp: new Date().toLocaleString(), profit_loss: 0 },
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
    setBalance(balance + amountNum * currentPrice);
    setTransactions([
      ...transactions,
      { id: Date.now().toString(), type: "sell", amount: amountNum, price: currentPrice, timestamp: new Date().toLocaleString(), profit_loss: 0 },
    ]);
    setAmount("");
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-800 rounded-md">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <TrendingUp className="text-cyan-400" size={24} />
        Advanced Trading
      </h2>

      <AssetSelector selectedAsset={selectedAsset} onAssetChange={setSelectedAsset} />

      <div className="bg-gray-900 rounded-md p-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <DollarSign className="text-green-400" size={20} />
          Price Chart
        </h3>
        <div className="w-full h-64">
          <CandlestickChart data={candlestickData} height={250} />
        </div>
        <div className="flex justify-between items-center mt-2">
          <p className="text-sm text-gray-400">
            Current Price: ${currentPrice.toFixed(2)}
          </p>
          {assetInfo && (
            <p className={`text-sm ${assetInfo.change24h >= 0 ? "text-green-400" : "text-red-400"}`}>
              24h: {assetInfo.change24h >= 0 ? "+" : ""}{assetInfo.change24h.toFixed(2)}%
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <Input
          type="number"
          placeholder="Amount"
          className="bg-gray-700 text-white"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Button onClick={handleBuy} className="bg-green-600 hover:bg-green-700">Buy</Button>
        <Button onClick={handleSell} className="bg-red-600 hover:bg-red-700">Sell</Button>
      </div>

      <div className="bg-gray-900 rounded-md p-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <DollarSign className="text-yellow-400" size={20} />
          Your Balance
        </h3>
        <p className="text-2xl">${balance.toFixed(2)} USD</p>
      </div>

      {/* New section for Profit/Loss, Success Rate, and Total Profit */}
      <div className="bg-gray-900 rounded-md p-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <DollarSign className="text-purple-400" size={20} />
          Trading Performance
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
          <div>
            <p className="text-gray-400">Total P/L:</p>
            <p className={`text-xl ${totalProfitLoss >= 0 ? "text-green-500" : "text-red-500"}`}>
              ${totalProfitLoss.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-gray-400">Success Rate:</p>
            <p className="text-xl text-white">{successPercentage.toFixed(2)}%</p>
          </div>
          <div>
            <p className="text-gray-400">Total Profit:</p>
            <p className="text-xl text-green-500">
              ${transactions.filter(tx => tx.profit_loss && tx.profit_loss > 0).reduce((sum, tx) => sum + tx.profit_loss!, 0).toFixed(2)}
            </p>
          </div>
        </div>
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
                <th>Asset</th>
                <th>Amount</th>
                <th>Price</th>
                <th>P/L</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className={`capitalize ${transaction.type === "buy" ? "text-green-500" : "text-red-500"}`}>
                    {transaction.type}
                  </td>
                  <td>{selectedAsset}</td>
                  <td>{transaction.amount.toFixed(4)}</td>
                  <td>${transaction.price.toFixed(2)}</td>
                  <td className={transaction.profit_loss && transaction.profit_loss >= 0 ? "text-green-500" : "text-red-500"}>
                    {transaction.profit_loss ? `$${transaction.profit_loss.toFixed(2)}` : "N/A"}
                  </td>
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