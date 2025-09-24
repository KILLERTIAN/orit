import { InputTransactionData } from "@aptos-labs/wallet-adapter-react";
import { MODULE_ADDRESS } from "@/constants";

export type ExecuteTradeArgs = {
  amountIn: bigint | number;
  amountOut: bigint | number;
};

// Initialize per-account trade storage
export const initAccount = (): InputTransactionData => ({
  data: {
    function: `${MODULE_ADDRESS}::trading::init_account`,
    functionArguments: [],
  },
});

// Record a trade
export const executeTrade = ({ amountIn, amountOut }: ExecuteTradeArgs): InputTransactionData => ({
  data: {
    function: `${MODULE_ADDRESS}::trading::execute_trade`,
    functionArguments: [amountIn, amountOut],
  },
});