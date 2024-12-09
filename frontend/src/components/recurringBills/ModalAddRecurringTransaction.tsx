import React, { useEffect } from "react";
import { useForm, UseFormSetValue } from "react-hook-form";
import { RecurringTransactionDto } from "../../api";
import { IoCloseOutline } from "react-icons/io5";
import frequencyOptions from "../../data/frequencyOptions";
import { format } from "date-fns";

type ModalAddRecurringTransactionProps = {
  onSubmitRecurringBill: (data: RecurringTransactionDto) => Promise<void>;
  register: ReturnType<typeof useForm<RecurringTransactionDto>>["register"];
  handleSubmit: ReturnType<
    typeof useForm<RecurringTransactionDto>
  >["handleSubmit"];
  errors: ReturnType<
    typeof useForm<RecurringTransactionDto>
  >["formState"]["errors"];
  onClickCloseModal: () => void;
  setIsUpdating?: (isUpdating: boolean) => void;
  isUpdating?: boolean;
  recurringTransaction?: RecurringTransactionDto | null;
  setValue?: UseFormSetValue<RecurringTransactionDto>;
};

const ModalAddRecurringTransaction: React.FC<
  ModalAddRecurringTransactionProps
> = ({
  handleSubmit,
  onSubmitRecurringBill,
  register,
  errors,
  onClickCloseModal,
  isUpdating,
  recurringTransaction,
  setValue,
}) => {
  useEffect(() => {
    if (isUpdating && recurringTransaction && setValue) {
      setValue("name", recurringTransaction.name);
      setValue("amount", recurringTransaction.amount);
      setValue(
        "startDate",
        format(recurringTransaction.startDate, "yyyy-MM-dd") as unknown as Date
      );
      setValue(
        "endDate",
        format(recurringTransaction.endDate, "yyyy-MM-dd") as unknown as Date
      );
      setValue("frequency", recurringTransaction.frequency);
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
