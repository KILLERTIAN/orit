import React from "react";

export default function PriceDisplay({ price }: { price: number }) {
  return (
    <div className="bg-gray-900 rounded-md p-4">
      <h3 className="text-lg font-semibold">Current Price</h3>
      <p className="text-2xl">${price.toFixed(2)}</p>
    </div>
  );
}