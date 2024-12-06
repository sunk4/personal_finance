import React from "react";
import { AccountDto } from "../../api";
import { useForm, UseFormRegister } from "react-hook-form";
import { IoCloseOutline } from "react-icons/io5";
import accountTypeOptions from "../../data/accountTypeOptions";
import statusOptions from "../../data/statusOptions";

type ModalAddAccountProps = {
  onSubmitAccount: (data: AccountDto) => Promise<void>;
  register: UseFormRegister<AccountDto>;
  handleSubmit: ReturnType<typeof useForm<AccountDto>>["handleSubmit"];
  errors: ReturnType<typeof useForm<AccountDto>>["formState"]["errors"];
  onClickCloseModal: () => void;
};

const ModalAddAccount: React.FC<ModalAddAccountProps> = ({
  onSubmitAccount,
  register,
  handleSubmit,
  errors,
  onClickCloseModal,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex-grow text-center">
            Add Account
          </h2>
          <button type="button" onClick={onClickCloseModal} className="ml-auto">
            <IoCloseOutline />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmitAccount)}>
          <div className="mb-4">
            <input
              {...register("name")}
              placeholder="Account Name"
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
              {...register("balance")}
              placeholder="Balance"
              type="number"
              className="w-full text-sm p-2 border border-gray-300 rounded"
            />
            {errors.balance && (
              <span className="text-red-500 text-sm">
                {typeof errors.balance?.message === "string" &&
                  errors.balance.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <select
              {...register("accountType")}
              className="w-full text-sm p-2 border border-gray-300 rounded bg-white"
            >
              <option value="">Select Account Type</option>
              {accountTypeOptions.map((option) => (
                <option key={option.key} value={option.key} className="text-sm">
                  {option.value}
                </option>
              ))}
            </select>
            {errors.accountType && (
              <span className="text-red-500 text-sm">
                {typeof errors.accountType?.message === "string" &&
                  errors.accountType.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <select
              {...register("status")}
              className="w-full text-sm p-2 border border-gray-300 rounded bg-white"
            >
              <option value="">Select Status</option>
              {statusOptions.map((option) => (
                <option key={option.key} value={option.key} className="text-sm">
                  {option.value}
                </option>
              ))}
            </select>
            {errors.status && (
              <span className="text-red-500 text-sm">
                {typeof errors.status?.message === "string" &&
                  errors.status.message}
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
export default ModalAddAccount;
