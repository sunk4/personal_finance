import { User } from "oidc-client-ts";
import { RecurringTransactionDto } from "../api";
import useSwr from "swr";
import apiFetcher from "../config/apiFetcher";

const useRecurringBills = (user: User | null | undefined, name: string) => {
  const { data, error, isLoading, mutate } = useSwr<RecurringTransactionDto[]>(
    user ? ["recurringBills", name] : null,
    () =>
      apiFetcher(
        (apiClients) =>
          apiClients.recurringTransactionApi.getRecurringTransactions({ name }),
        user
      )
  );

  return {
    recurringBills: data,
    error,
    isLoading,
    mutate,
  };
};

export default useRecurringBills;
