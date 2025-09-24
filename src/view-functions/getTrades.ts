import { aptosClient } from "@/utils/aptosClient";
import { MODULE_ADDRESS } from "@/constants";
import { Types } from "aptos";

export type Trade = {
  trader: string;
  amount_in: bigint;
  amount_out: bigint;
  profit_loss: bigint;
};

export async function getTrades(address: string): Promise<Trade[]> {
  if (!MODULE_ADDRESS) {
    throw new Error("MODULE_ADDRESS is not defined");
  }

  try {
    const resources = await aptosClient().getAccountResources({ accountAddress: address });

    const tradesResource = resources.find(
      (r) => r.type === `${MODULE_ADDRESS}::trading::Trades`
    );

    if (!tradesResource) {
      console.log("Trades resource not found for account:", address);
      return [];
    }

    const history = (tradesResource.data as any).history as any[];

    return history.map((trade: any) => ({
      trader: trade.trader,
      amount_in: BigInt(trade.amount_in),
      amount_out: BigInt(trade.amount_out),
      profit_loss: BigInt(trade.profit_loss),
    }));
  } catch (error: any) {
    console.error("Error fetching trades:", error);
    return [];
  }
}