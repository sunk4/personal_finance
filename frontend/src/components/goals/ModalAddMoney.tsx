import React from "react";
import { AddAmountRequest, AddWithdrawMoneyFromGoalDto } from "../../api";
import { Resolver, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { goalsAddMoneyValidator } from "../../validators/goalsValidator";
import ModalHeader from "../common/ModalHeader";
import NumberInputField from "../common/NumberInputField";
import SubmitButton from "../common/SubmitButton";

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
    const addWithdrawMoneyFromGoalDto: AddWithdrawMoneyFromGoalDto = {
      currentAmount: openWithdrawMoneyModal ? -data.amount : data.amount,
    };

    if (goalId) {
      const requestData: AddAmountRequest = {
        goalId,
        addWithdrawMoneyFromGoalDto,
      };
      await addMoneytoGoal(requestData);
      handleCloseModal();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <ModalHeader
          title={
            openWithdrawMoneyModal
              ? "Withdraw Money from Goal"
              : "Add Money to Goal"
          }
          onClickCloseModal={handleCloseModal}
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <NumberInputField
            registerProps={register("amount")}
            placeholder="Amount"
            errors={errors.amount}
          />

          <div className="flex items-center justify-between">
            <SubmitButton text="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
};
export default ModalAddMoney;
