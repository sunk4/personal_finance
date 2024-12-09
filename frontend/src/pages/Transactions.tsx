import React, { useState } from "react";
import { useAuth } from "react-oidc-context";
import useTransactions from "../hooks/useTransactions";
import Pagination from "../components/Pagination";
import Table from "../components/transactions/Table";
import { yupResolver } from "@hookform/resolvers/yup";
import { Resolver, useForm } from "react-hook-form";
import {
  CreateTransactionRequest,
  TransactionControllerApi,
  TransactionDto,
} from "../api";
import { transactionValidators } from "../validators/transactionValidators";
import { getConfiguration } from "../config/config";
import ModalAddTransaction from "../components/transactions/ModalAddTransaction";
import useAccount from "../hooks/useAccount";
import Header from "../components/common/Header";

const Transactions: React.FC = () => {
  const { user } = useAuth();
  const [page, setPage] = useState<number>(0);
  const [transactionType, setTransactionType] = useState<string | undefined>(
    undefined
  );
  const [sort, setSort] = useState<string>("latest");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const { accounts } = useAccount(user);
  const [accountId, setAccountId] = useState<string | undefined>(undefined);

  const { transactions, error, isLoading, mutate } = useTransactions(
    user,
    page,
    transactionType,
    sort,
    accountId
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TransactionDto>({
    resolver: yupResolver(
      transactionValidators
    ) as unknown as Resolver<TransactionDto>,
  });

  const onClickOpenModal = (): void => {
    setIsCreateModalOpen(true);
  };

  const onClickCloseModal = (): void => {
    reset();
    setIsCreateModalOpen(false);
  };

  const onSubmitTransaction = async (data: TransactionDto): Promise<void> => {
    const config = getConfiguration(user);
    const api = new TransactionControllerApi(config);

    try {
      const formattedData = {
        ...data,
        transactionDate: data.transactionDate
          ? new Date(data.transactionDate)
          : new Date(),
        account: {
          id: localStorage.getItem("accountId") || "",
        },
      };

      const request: CreateTransactionRequest = {
        transactionDto: formattedData as unknown as TransactionDto,
      };
      await api.createTransaction(request);
      mutate();
      reset();
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error("Error adding goal:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching transactions</div>;

  return (
    <>
      {isCreateModalOpen && (
        <ModalAddTransaction
          onSubmitTransaction={onSubmitTransaction}
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          onClickCloseModal={onClickCloseModal}
        />
      )}
      <Header onClickOpenModal={onClickOpenModal} text="Transaction" />
      <section className="bg-white rounded-xl p-10">
        {transactions && (
          <Table
            transactions={transactions}
            setSort={setSort}
            sort={sort}
            setTransactionType={setTransactionType}
            transactionType={transactionType}
            accounts={accounts}
            setAccountId={setAccountId}
            user={user}
          />
        )}
        <Pagination
          currentPage={page}
          totalPages={transactions?.totalPages ?? 0}
          onPageChange={setPage}
        />
      </section>
    </>
  );
};

export default Transactions;
