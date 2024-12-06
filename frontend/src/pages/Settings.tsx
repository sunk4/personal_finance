import React, { useEffect, useState } from "react";
import { AccountControllerApi, AccountDto, CreateAccountRequest } from "../api";
import { getConfiguration } from "../config/config";
import { useAuth } from "react-oidc-context";
import useAccount from "../hooks/useAccount";
import TableAccounts from "../components/settings/TableAccounts";
import ModalAddAccount from "../components/settings/ModalAddAccount";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { accountValidator } from "../validators/accountValidator";

const Settings: React.FC = () => {
  const { user } = useAuth();
  const { accounts, error, isLoading, mutate } = useAccount(user);
  const [accountId, setAccountId] = useState(() => {
    return localStorage.getItem("accountId") || "";
  });

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    if (e.target instanceof HTMLSelectElement) {
      setAccountId(e.target.value);
    }
  };

  useEffect(() => {
    localStorage.setItem("accountId", accountId);
  }, [accountId]);

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm<AccountDto>({
    resolver: yupResolver(accountValidator) as unknown as Resolver<AccountDto>,
  });

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const onClickOpenModal = (): void => {
    setIsModalOpen(true);
  };

  const onClickCloseModal = (): void => {
    reset();
    setIsModalOpen(false);
  };

  const onSubmitAccount = async (data: AccountDto): Promise<void> => {
    const config = getConfiguration(user);
    const api = new AccountControllerApi(config);

    try {
      const request: CreateAccountRequest = {
        accountDto: data,
      };

      await api.createAccount(request);
      reset();
      mutate();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding money to goal:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching goals:</div>;

  return (
    <>
      <div className="mb-4 flex justify-between">
        {isModalOpen && (
          <ModalAddAccount
            onSubmitAccount={onSubmitAccount}
            onClickCloseModal={onClickCloseModal}
            handleSubmit={handleSubmit}
            errors={errors}
            register={register}
          />
        )}
        <h1 className="text-lg font-bold ">Settings</h1>
        <div className="flex gap-2">
          <select
            onChange={handleSelectChange}
            value={accountId}
            className="w-full text-sm p-2 border bg-white rounded"
          >
            {accounts &&
              accounts.map((option) => (
                <option key={option.id} value={option.id} className="text-sm">
                  {option.name}
                </option>
              ))}
          </select>
          {accounts && (
            <button
              onClick={onClickOpenModal}
              className="rounded-lg bg-black text-white px-4 py-2 font-semibold text-sm"
            >
              Add Account
            </button>
          )}
        </div>
      </div>
      <section className="bg-white rounded-xl p-10">
        {accounts ? (
          <TableAccounts accounts={accounts} />
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-2xl font-semibold mb-4">
              Welcome! {user && user.profile.name}
            </h2>
            <p className="text-lg mb-6">
              Please create your account to get started.
            </p>
            <button
              onClick={onClickOpenModal}
              className="rounded-lg bg-black text-white px-4 py-2 font-semibold text-sm"
            >
              Add Account
            </button>
          </div>
        )}
      </section>
    </>
  );
};
export default Settings;
