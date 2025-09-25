import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface BuySellFormProps {
  onBuy: (amount: number) => void;
  onSell: (amount: number) => void;
}

export default function BuySellForm({ onBuy, onSell }: BuySellFormProps) {
  const [amount, setAmount] = useState("");

  const handleBuy = () => {
    if (amount) {
      onBuy(parseFloat(amount));
      setAmount("");
    }
  };

  const handleSell = () => {
    if (amount) {
      onSell(parseFloat(amount));
      setAmount("");
    }
  };

  return (
    <div className="bg-gray-900 rounded-md p-4">
      <h3 className="text-lg font-semibold">Buy/Sell OritCoin</h3>
      <div className="flex items-center space-x-3 mt-4">
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
    </div>
  );
}