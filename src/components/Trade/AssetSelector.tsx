"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface Asset {
  symbol: string;
  name: string;
  type: "stock" | "crypto";
}

const assets: Asset[] = [
  { symbol: "AAPL", name: "Apple Inc.", type: "stock" },
  { symbol: "NVDA", name: "Nvidia Corporation", type: "stock" },
  { symbol: "GOOGL", name: "Alphabet Inc.", type: "stock" },
  { symbol: "ETH", name: "Ethereum", type: "crypto" },
  { symbol: "USDC", name: "USD Coin", type: "crypto" },
  { symbol: "USDT", name: "Tether", type: "crypto" },
  { symbol: "BTC", name: "Bitcoin", type: "crypto" },
  { symbol: "ADA", name: "Cardano", type: "crypto" },
];

interface AssetSelectorProps {
  selectedAsset: string;
  onAssetChange: (asset: string) => void;
}

export default function AssetSelector({ selectedAsset, onAssetChange }: AssetSelectorProps) {
  const selectedAssetData = assets.find(asset => asset.symbol === selectedAsset);

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">Select Asset</label>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-full bg-gray-700 text-white border-gray-600 hover:bg-gray-600 justify-between"
          >
            <div className="flex items-center gap-2">
              <span className="font-semibold">{selectedAssetData?.symbol || "Choose an asset"}</span>
              {selectedAssetData && (
                <>
                  <span className="text-gray-400">{selectedAssetData.name}</span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    selectedAssetData.type === "stock" ? "bg-blue-600" : "bg-green-600"
                  }`}>
                    {selectedAssetData.type}
                  </span>
                </>
              )}
            </div>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-gray-800 text-white border-gray-600 w-full">
          {assets.map((asset) => (
            <DropdownMenuItem
              key={asset.symbol}
              onClick={() => onAssetChange(asset.symbol)}
              className="hover:bg-gray-700 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="font-semibold">{asset.symbol}</span>
                <span className="text-gray-400">{asset.name}</span>
                <span className={`text-xs px-2 py-1 rounded ${
                  asset.type === "stock" ? "bg-blue-600" : "bg-green-600"
                }`}>
                  {asset.type}
                </span>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}