import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { CategoryDto, RecurringTransactionDto } from "../../api";
import { IoCloseOutline } from "react-icons/io5";
import frequencyOptions from "../../data/frequencyOptions";
import { format } from "date-fns";

type ModalAddRecurringTransactionProps = {
  onSubmitRecurringBill: (data: RecurringTransactionDto) => Promise<void>;
  register: ReturnType<typeof useForm>["register"];
  handleSubmit: ReturnType<typeof useForm>["handleSubmit"];
  errors: ReturnType<typeof useForm>["formState"]["errors"];
  onClickCloseModal: () => void;
  categories: CategoryDto[] | undefined;
  setIsUpdating?: (isUpdating: boolean) => void;
  isUpdating?: boolean;
  recurringTransaction?: RecurringTransactionDto | null;
  setValue?: ReturnType<typeof useForm>["setValue"];
};

const ModalAddRecurringTransaction: React.FC<
  ModalAddRecurringTransactionProps
> = ({
  handleSubmit,
  onSubmitRecurringBill,
  register,
  errors,
  onClickCloseModal,
  categories,
  isUpdating,
  recurringTransaction,
  setValue,
}) => {
  useEffect(() => {
    if (isUpdating && recurringTransaction && setValue) {
      setValue("name", recurringTransaction?.name);
      setValue("amount", recurringTransaction?.amount);
      setValue(
        "startDate",
        recurringTransaction?.startDate
          ? format(recurringTransaction?.startDate, "yyyy-MM-dd")
          : ""
      );
      setValue(
        "endDate",
        recurringTransaction?.endDate
          ? format(recurringTransaction?.endDate, "yyyy-MM-dd")
          : ""
      );
      setValue("frequency", recurringTransaction?.frequency);
      if (recurringTransaction?.category) {
        setValue("category.id", recurringTransaction.category.id);
      }
    }
  }, [recurringTransaction, setValue, isUpdating]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex-grow text-center">
            {isUpdating ? "Update" : "Add"} Recurring Bill
          </h2>
          <button type="button" onClick={onClickCloseModal} className="ml-auto">
            <IoCloseOutline />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmitRecurringBill)}>
          <div className="mb-4">
            <input
              {...register("name")}
              placeholder="Name"
              className="w-full text-sm p-2 border border-gray-300 rounded"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {typeof errors.name?.message === "string" &&
                  errors.name.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <input
              {...register("amount")}
              placeholder="Amount"
              step={0.01}
              type="number"
              className="w-full text-sm p-2 border border-gray-300 rounded"
            />
            {errors.amount && (
              <span className="text-red-500 text-sm">
                {typeof errors.amount.message === "string" &&
                  errors.amount.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <input
              {...register("startDate")}
              placeholder="Start Date"
              type="date"
              className="w-full text-sm p-2 border border-gray-300 rounded"
            />
            {errors.startDate && (
              <span className="text-red-500 text-sm">
                {typeof errors.startDate?.message === "string" &&
                  errors.startDate.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <input
              {...register("endDate")}
              placeholder="End Date"
              type="date"
              className="w-full text-sm p-2 border border-gray-300 rounded"
            />
            {errors.endDate && (
              <span className="text-red-500 text-sm">
                {typeof errors.endDate?.message === "string" &&
                  errors.endDate.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <select
              {...register("frequency")}
              className="w-full text-sm p-2 border bg-white rounded"
            >
              {frequencyOptions.map((option) => (
                <option key={option.key} value={option.key} className="text-sm">
                  {option.value}
                </option>
              ))}
            </select>
            {errors.frequency && (
              <span className="text-red-500 text-sm">
                {typeof errors.frequency?.message === "string" &&
                  errors.frequency.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <select
              {...register("category.id")}
              className="w-full text-sm p-2 border bg-white rounded"
            >
              {categories &&
                categories.map((option) => (
                  <option key={option.id} value={option.id} className="text-sm">
                    {option.name}
                  </option>
                ))}
            </select>
            {errors.category && (
              <span className="text-red-500 text-sm">
                {typeof errors.category.message === "string" &&
                  errors.category.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-black text-white px-4 py-2 font-semibold text-sm"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalAddRecurringTransaction;
