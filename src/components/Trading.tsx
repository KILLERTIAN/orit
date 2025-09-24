"use client";

import { useEffect, useMemo, useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { aptosClient } from "@/utils/aptosClient";
import { initAccount, executeTrade } from "@/entry-functions/trading";
import { getTrades, type Trade } from "@/view-functions/getTrades";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

export function Trading() {
  const { account, signAndSubmitTransaction } = useWallet();
  const queryClient = useQueryClient();

  const [amountIn, setAmountIn] = useState<string>("");
  const [amountOut, setAmountOut] = useState<string>("");

  const address = useMemo(() => account?.address?.toString() ?? "", [account]);

  const { data } = useQuery({
    queryKey: ["trades", address],
    enabled: !!address,
    refetchInterval: 10000,
    queryFn: async () => {
      if (!address) return [] as Trade[];
      try {
        return await getTrades(address);
      } catch (e) {
        return [] as Trade[];
      }
    },
  });

  const onInit = async () => {
    if (!account) return;
    try {
      const tx = await signAndSubmitTransaction(initAccount());
      await aptosClient().waitForTransaction({ transactionHash: tx.hash });
      queryClient.invalidateQueries({ queryKey: ["trades", address] });
      toast({ title: "Initialized" });
    } catch (e: any) {
      toast({ variant: "destructive", title: "Init failed", description: e?.message ?? String(e) });
    }
  };

  const onTrade = async () => {
    if (!account) return;
    if (!amountIn || !amountOut) return;
    try {
      const tx = await signAndSubmitTransaction(
        executeTrade({ amountIn: BigInt(amountIn), amountOut: BigInt(amountOut) })
      );
      await aptosClient().waitForTransaction({ transactionHash: tx.hash });
      queryClient.invalidateQueries({ queryKey: ["trades", address] });
      toast({ title: "Trade recorded" });
    } catch (e: any) {
      toast({ variant: "destructive", title: "Trade failed", description: e?.message ?? String(e) });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-xl font-semibold">Trading</h3>
      <div className="flex gap-3 items-end">
        <div className="flex flex-col gap-2">
          <label className="text-sm">Amount In (u64)</label>
          <Input
            disabled={!account}
            value={amountIn}
            onChange={(e) => setAmountIn(e.target.value.replace(/\D/g, ""))}
            placeholder="1000"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm">Amount Out (u64)</label>
          <Input
            disabled={!account}
            value={amountOut}
            onChange={(e) => setAmountOut(e.target.value.replace(/\D/g, ""))}
            placeholder="1200"
          />
        </div>
        <Button disabled={!account} onClick={onTrade}>Execute Trade</Button>
        <Button variant="secondary" disabled={!account} onClick={onInit}>Init Account</Button>
      </div>

      <div className="flex flex-col gap-2">
        <h4 className="text-lg font-medium">Trade History</h4>
        <div className="grid grid-cols-4 gap-2 text-sm font-medium">
          <div>Trader</div>
          <div>Amount In</div>
          <div>Amount Out</div>
          <div>P/L</div>
        </div>
        <div className="flex flex-col gap-1">
          {(data ?? []).map((t, i) => (
            <div key={i} className="grid grid-cols-4 gap-2 text-sm">
              <div className="truncate">{t.trader}</div>
              <div>{t.amount_in.toString()}</div>
              <div>{t.amount_out.toString()}</div>
              <div>{t.profit_loss.toString()}</div>
            </div>
          ))}
          {(!data || data.length === 0) && (
            <div className="text-sm text-muted-foreground">No trades yet. Initialize and submit a trade.</div>
          )}
        </div>
      </div>
    </div>
  );
}