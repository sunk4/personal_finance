/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "oidc-client-ts";
import { Configuration } from "../api/runtime";

const basePath = import.meta.env.VITE_API_BASE_URL;

export const getConfiguration = (user: User | null | undefined) => {
  if (!user) {
    return;
  }
  return new Configuration({
    basePath: basePath.replace(/\/+$/, ""),
    accessToken: user?.access_token,
  });
};
