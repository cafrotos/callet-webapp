import { ITransaction } from "src/types/invoice";
import { useRead } from ".";

export const useReadTransactions = () => {
  const { data: transactions, loading, loadMore: loadMoreTransactions } =
    useRead<ITransaction>("transactions");

  return { transactions, loading, loadMoreTransactions };
};
