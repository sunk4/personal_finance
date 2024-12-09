import React from "react";
import { useForm } from "react-hook-form";
import { TransactionDto } from "../../api";
import transactionTypes from "../../data/transactionTypes";
import ModalHeader from "../common/ModalHeader";
import TextInputField from "../common/TextInputField";
import NumberInputField from "../common/NumberInputField";
import DateInputField from "../common/DateInputField";
import SubmitButton from "../common/SubmitButton";
import SelectInputField from "../common/SelectInputField";

type ModalAddTransactionProps = {
  onSubmitTransaction: (data: TransactionDto) => Promise<void>;
  register: ReturnType<typeof useForm<TransactionDto>>["register"];
  handleSubmit: ReturnType<typeof useForm<TransactionDto>>["handleSubmit"];
  errors: ReturnType<typeof useForm<TransactionDto>>["formState"]["errors"];
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
        <ModalHeader
          title="Add Transaction"
          onClickCloseModal={onClickCloseModal}
        />
        <form onSubmit={handleSubmit(onSubmitTransaction)}>
          <TextInputField
            registerProps={register("reference")}
            placeholder="Reference"
            errors={errors.reference}
          />
          <NumberInputField
            registerProps={register("amount")}
            placeholder="Amount"
            errors={errors.amount}
          />
          <DateInputField
            registerProps={register("transactionDate")}
            placeholder="Transaction Date"
            errors={errors.transactionDate}
          />
          <SelectInputField
            registerProps={register("transactionType")}
            errors={errors.transactionType}
            options={transactionTypes}
          />
          <SubmitButton text="Save" />
        </form>
      </div>
    </div>
  );
};

export default ModalAddTransaction;
