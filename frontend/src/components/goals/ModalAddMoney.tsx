import React from "react";
import { AddAmountRequest, GoalsDto } from "../../api";
import { IoCloseOutline } from "react-icons/io5";
import { Resolver, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { goalsAddMoneyValidator } from "../../validators/goalsValidator";

type ModalAddMoneyProps = {
  addMoneytoGoal: (data: AddAmountRequest) => Promise<void>;
  handleAddMoneyOpenModal: () => void;
  goalId: string | null | undefined;
  openWithdrawMoneyModal?: boolean;
  handleWithdrawMoneyOpenModal: () => void;
  handleCloseModal: () => void;
};

type FormValues = {
  amount: number;
};

const ModalAddMoney: React.FC<ModalAddMoneyProps> = ({
  addMoneytoGoal,
  goalId,
  openWithdrawMoneyModal,
  handleCloseModal,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(goalsAddMoneyValidator) as Resolver<FormValues>,
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const goalsDto: GoalsDto = {
      currentAmount: openWithdrawMoneyModal ? -data.amount : data.amount,
    };

    if (goalId) {
      const requestData: AddAmountRequest = {
        goalId,
        goalsDto,
      };
      await addMoneytoGoal(requestData);
      handleCloseModal();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex-grow text-center">
            {openWithdrawMoneyModal
              ? "Withdraw Money from Goal"
              : "Add Money to Goal"}
          </h2>
          <button type="button" onClick={handleCloseModal} className="ml-auto">
            <IoCloseOutline />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full rounded-lg bg-black text-white px-4 py-2 font-semibold text-sm"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ModalAddMoney;
