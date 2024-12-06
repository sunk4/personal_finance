import { User } from "oidc-client-ts";
import { GoalsDto } from "../api";
import useSwr from "swr";
import apiFetcher from "../config/apiFetcher";

const useGoals = (user: User | null | undefined) => {
  const { data, error, isLoading, mutate } = useSwr<GoalsDto[]>(
    user ? ["goals"] : null,
    () => apiFetcher((apiClients) => apiClients.goalsApi.getGoals(), user)
  );

  return {
    goals: data,
    error,
    isLoading,
    mutate,
  };
};

export default useGoals;
