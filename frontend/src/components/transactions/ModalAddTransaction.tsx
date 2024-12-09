import React from "react";
import { useForm } from "react-hook-form";
import { TransactionDto } from "../../api";
import { IoCloseOutline } from "react-icons/io5";
import transactionTypes from "../../data/transactionTypes";

type ModalAddTransactionProps = {
  onSubmitTransaction: (data: TransactionDto) => Promise<void>;
  register: ReturnType<typeof useForm<TransactionDto>>["register"];
  handleSubmit: ReturnType<typeof useForm<TransactionDto>>["handleSubmit"];
  errors: ReturnType<typeof useForm>["formState"]["errors"];
  onClickCloseModal: () => void;
};

const ModalAddTransaction: React.FC<ModalAddTransactionProps> = ({
  handleSubmit,
  onSubmitTransaction,
  register,
  errors,
  onClickCloseModal,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex-grow text-center">
            Add Transaction
          </h2>
          <button type="button" onClick={onClickCloseModal} className="ml-auto">
            <IoCloseOutline />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmitTransaction)}>
          <div className="mb-4">
            <input
              {...register("reference")}
              placeholder="Reference"
              className="w-full text-sm p-2 border border-gray-300 rounded"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {typeof errors.reference?.message === "string" &&
                  errors.reference.message}
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
              {...register("transactionDate")}
              placeholder="Transaction Date"
              type="date"
              className="w-full text-sm p-2 border border-gray-300 rounded"
            />
            {errors.transactionDate && (
              <span className="text-red-500 text-sm">
                {typeof errors.transactionDate?.message === "string" &&
                  errors.transactionDate.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <select
              {...register("transactionType")}
              className="w-full text-sm p-2 border bg-white rounded"
            >
              {transactionTypes.map((option) => (
                <option key={option.key} value={option.key} className="text-sm">
                  {option.value}
                </option>
              ))}
            </select>
            {errors.transactionType && (
              <span className="text-red-500 text-sm">
                {typeof errors.transactionType?.message === "string" &&
                  errors.transactionType.message}
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

export default ModalAddTransaction;
