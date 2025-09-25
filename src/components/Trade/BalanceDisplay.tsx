import React from "react";

export default function BalanceDisplay({ balance }: { balance: number }) {
  return (
    <div className="bg-gray-900 rounded-md p-4">
      <h3 className="text-lg font-semibold">Your Balance</h3>
      <p className="text-2xl">{balance.toFixed(2)} OritCoin</p>
    </div>
  );
}