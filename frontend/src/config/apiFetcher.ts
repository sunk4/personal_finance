/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "oidc-client-ts";
import { getConfiguration } from "./config";
import {
  TransactionControllerApi,
  GoalsControllerApi,
  AccountControllerApi,
  RecurringTransactionControllerApi,
} from "../api";

export const apiFetcher = (
  apiCall: (client: any) => Promise<any>,
  user: User | null | undefined
) => {
  if (!user) {
    throw new Error("User is not authenticated");
  }
  const config = getConfiguration(user);
  if (!config) {
    throw new Error("Failed to generate API configuration");
  }

  const transactionApi = new TransactionControllerApi(config);
  const goalsApi = new GoalsControllerApi(config);
  const accountApi = new AccountControllerApi(config);
  const recurringTransactionApi = new RecurringTransactionControllerApi(config);

  return apiCall({
    transactionApi,
    goalsApi,
    accountApi,
    recurringTransactionApi,
  });
};

export default apiFetcher;
