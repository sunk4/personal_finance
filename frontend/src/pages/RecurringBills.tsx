import { useAuth } from "react-oidc-context";
import useRecurringBills from "../hooks/useRecurringBills";
import { FaWallet } from "react-icons/fa";
import useRecurringTransactionsSum from "../hooks/useRecurringTransactionsSum";
import { useState } from "react";
import RecurringBillsTable from "../components/recurringBills/RecurringBillsTable";
import { getConfiguration } from "../config/config";
import {
  CreateRecurringTransactionRequest,
  RecurringTransactionControllerApi,
  RecurringTransactionDto,
} from "../api";
import ModalAddRecurringTransaction from "../components/recurringBills/ModalAddRecurringTransaction";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useCategories from "../hooks/useCategories";
import { recurringTransactionValidator } from "../validators/recurringTransactionValidator";

const RecurringBills: React.FC = () => {
  const { user } = useAuth();

  const [name, setName] = useState<string>("");
  const [searchName, setSearchName] = useState<string>("");
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const { sum } = useRecurringTransactionsSum(user);
  const { recurringBills, isLoading, error, mutate } = useRecurringBills(
    user,
    searchName
  );
  const { categories } = useCategories(user);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RecurringTransactionDto>({
    resolver: yupResolver(
      recurringTransactionValidator
    ) as unknown as Resolver<RecurringTransactionDto>,
  });

  const handleSubmitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchName(name);
  };

  const onClickOpenCreateModal = () => {
    setOpenCreateModal(true);
  };

  const deleteReccuringBill = async (id: string): Promise<void> => {
    const config = getConfiguration(user);
    const api = new RecurringTransactionControllerApi(config);

    try {
      await api.deleteRecurringTransaction({ recurringTransactionId: id });
      mutate();
    } catch (error) {
      console.error("Error deleting reccuring bills:", error);
    }
  };

  const onClickCloseModal = (): void => {
    reset();
    setOpenCreateModal(false);
  };

  const onSubmitRecurringBill = async (
    data: RecurringTransactionDto
  ): Promise<void> => {
    const config = getConfiguration(user);
    const api = new RecurringTransactionControllerApi(config);

    try {
      const formattedData = {
        ...data,
        startDate: data.startDate ? new Date(data.startDate) : new Date(),
        targetDate: data.endDate ? new Date(data.endDate) : new Date(),
        account: {
          id: localStorage.getItem("accountId") || "",
        },
      };

      const request: CreateRecurringTransactionRequest = {
        recurringTransactionDto:
          formattedData as unknown as RecurringTransactionDto,
      };
      await api.createRecurringTransaction(request);
      mutate();
      reset();
      setOpenCreateModal(false);
    } catch (error) {
      console.error("Error adding goal:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching goals:</div>;

  return (
    <>
      <div className="mb-4 flex justify-between">
        {openCreateModal && (
          <ModalAddRecurringTransaction
            onSubmitRecurringBill={onSubmitRecurringBill}
            register={register}
            handleSubmit={handleSubmit}
            errors={errors}
            onClickCloseModal={onClickCloseModal}
            categories={categories}
          />
        )}
        <h1 className="text-lg font-bold ">Recurring Bills</h1>
        <button
          onClick={onClickOpenCreateModal}
          className="rounded-lg bg-black text-white px-4 py-2 font-semibold text-sm"
        >
          Add Reccuring bills
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 ">
        <div className="col-span-1 bg-dark-slate-blue rounded-lg p-4 flex flex-col gap-3 h-48">
          <FaWallet className="text-white" />
          <p className="text-white text-sm">Total bills</p>
          <h2 className="text-white font-bold text-xl">€{sum}</h2>
        </div>
        <div className="col-span-2 bg-white rounded-xl p-10">
          <div className="flex items-center gap-3 justify-end">
            <form onSubmit={handleSubmitSearch} className="w-full flex gap-2">
              <input
                placeholder="Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="w-full text-sm p-2 border border-gray-300 rounded"
              />
              <button
                type="submit"
                className="rounded-lg bg-black text-white px-4 py-2 font-semibold text-sm"
              >
                Search
              </button>
            </form>
          </div>
          <RecurringBillsTable
            recurringBills={recurringBills ?? []}
            deleteItem={deleteReccuringBill}
          />
        </div>
      </div>
    </>
  );
};
export default RecurringBills;
