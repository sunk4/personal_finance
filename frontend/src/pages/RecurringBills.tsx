import { useAuth } from "react-oidc-context";
import useRecurringBills from "../hooks/useRecurringBills";
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
import { recurringTransactionValidator } from "../validators/recurringTransactionValidator";
import Header from "../components/common/Header";
import TotalBillsCard from "../components/recurringBills/TotalBillsCard";
import SearchForm from "../components/recurringBills/SearchForm";

const RecurringBills: React.FC = () => {
  const { user } = useAuth();

  const [name, setName] = useState<string>("");
  const [searchName, setSearchName] = useState<string>("");
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [openOptionId, setOpenOptionId] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const { sum } = useRecurringTransactionsSum(user);
  const { recurringBills, isLoading, error, mutate } = useRecurringBills(
    user,
    searchName
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
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
    setIsUpdating(false);
    setOpenOptionId(null);
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

      if (isUpdating) {
        await api.updateRecurringTransaction({
          recurringTransactionId: openOptionId || "",
          recurringTransactionDto:
            formattedData as unknown as RecurringTransactionDto,
        });
        setIsUpdating(false);
        setOpenOptionId(null);
      } else {
        const request: CreateRecurringTransactionRequest = {
          recurringTransactionDto:
            formattedData as unknown as RecurringTransactionDto,
        };
        await api.createRecurringTransaction(request);
      }
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
      {openCreateModal && (
        <ModalAddRecurringTransaction
          onSubmitRecurringBill={onSubmitRecurringBill}
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          onClickCloseModal={onClickCloseModal}
        />
      )}
      <Header onClickOpenModal={onClickOpenCreateModal} text="Reccuring bill" />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 ">
        <TotalBillsCard sum={sum} />
        <div className="col-span-2 bg-white rounded-xl p-10">
          <SearchForm
            name={name}
            setName={setName}
            handleSubmitSearch={handleSubmitSearch}
          />
          <RecurringBillsTable
            recurringBills={recurringBills ?? []}
            deleteItem={deleteReccuringBill}
            setIsUpdating={setIsUpdating}
            isUpdating={isUpdating}
            onSubmitRecurringBill={onSubmitRecurringBill}
            register={register}
            handleSubmit={handleSubmit}
            errors={errors}
            onClickCloseModal={onClickCloseModal}
            user={user}
            setValue={setValue}
            openOptionId={openOptionId}
            setOpenOptionId={setOpenOptionId}
          />
        </div>
      </div>
    </>
  );
};
export default RecurringBills;
