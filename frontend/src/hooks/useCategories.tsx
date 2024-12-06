import { User } from "oidc-client-ts";
import { CategoryDto } from "../api";
import useSwr from "swr";
import apiFetcher from "../config/apiFetcher";

const useCategories = (user: User | null | undefined) => {
  const { data, error, isLoading, mutate } = useSwr<CategoryDto[]>(
    user ? ["categories"] : null,
    () =>
      apiFetcher((apiClients) => apiClients.categoryApi.getCategories(), user)
  );

  return {
    categories: data,
    error,
    isLoading,
    mutate,
  };
};

export default useCategories;
