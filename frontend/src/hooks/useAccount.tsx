import { User } from "oidc-client-ts";
import { AccountDto } from "../api";
import useSwr from "swr";
import apiFetcher from "../config/apiFetcher";

const useAccount = (user: User | null | undefined) => {
  const { data, error, isLoading, mutate } = useSwr<AccountDto[]>(
    user ? ["accounts"] : null,
    () => apiFetcher((apiClients) => apiClients.accountApi.getAccounts(), user)
  );

  return {
    accounts: data,
    error,
    isLoading,
    mutate,
  };
};

export default useAccount;
