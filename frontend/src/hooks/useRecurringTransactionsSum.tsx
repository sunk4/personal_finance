import { User } from "oidc-client-ts";
import useSwr from "swr";
import apiFetcher from "../config/apiFetcher";

const useRecurringTransactionsSum = (user: User | null | undefined) => {
  const { data, error, isLoading, mutate } = useSwr<number>(
    user ? ["recurringTransactionsSum"] : null,
    () =>
      apiFetcher(
        (apiClients) =>
          apiClients.recurringTransactionApi.getRecurringTransactionsSum(),
        user
      )
  );

  return {
    sum: data,
    error,
    isLoading,
    mutate,
  };
};

export default useRecurringTransactionsSum;
