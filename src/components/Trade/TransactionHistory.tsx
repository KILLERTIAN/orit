import React from "react";

interface Transaction {
  id: string;
  type: "buy" | "sell";
  amount: number;
  price: number;
  timestamp: string;
}

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export default function TransactionHistory({ transactions }: TransactionHistoryProps) {
  return (
    <div className="bg-gray-900 rounded-md p-4">
      <h3 className="text-lg font-semibold">Transaction History</h3>
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
  );
}