import { User } from "oidc-client-ts";
import useSwr from "swr";
import { PageResponseTransactionDto } from "../api";
import apiFetcher from "../config/apiFetcher";

const useTransactions = (
  user: User | null | undefined,
  page: number,
  transactionType: string | undefined,
  sort: string,
  accountId: string | undefined
) => {
  const { data, error, isLoading, mutate } = useSwr<PageResponseTransactionDto>(
    user ? ["transactions", page, transactionType, sort, accountId] : null,
    () =>
      apiFetcher(
        (apiClients) =>
          apiClients.transactionApi.getTransactions({
            page,
            transactionType,
            sort,
            accountId,
          }),
        user
      )
  );

  return {
    transactions: data,
    error,
    isLoading,
    mutate,
  };
};

export default useTransactions;
