import React, { useEffect } from "react";
import { useForm, UseFormSetValue } from "react-hook-form";
import { RecurringTransactionDto } from "../../api";
import frequencyOptions from "../../data/frequencyOptions";
import { format } from "date-fns";
import ModalHeader from "../common/ModalHeader";
import SubmitButton from "../common/SubmitButton";
import TextInputField from "../common/TextInputField";
import NumberInputField from "../common/NumberInputField";
import DateInputField from "../common/DateInputField";
import SelectInputField from "../common/SelectInputField";

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
        <ModalHeader
          title={isUpdating ? "Update Recurring Bill" : "Add Recurring Bill"}
          onClickCloseModal={onClickCloseModal}
        />
        <form onSubmit={handleSubmit(onSubmitRecurringBill)}>
          <TextInputField
            registerProps={register("name")}
            placeholder="Name"
            errors={errors.name}
          />
          <NumberInputField
            registerProps={register("amount")}
            placeholder="Amount"
            errors={errors.amount}
            step={0.01}
          />
          <DateInputField
            registerProps={register("startDate")}
            placeholder="Start Date"
            errors={errors.startDate}
          />
          <DateInputField
            registerProps={register("endDate")}
            placeholder="End Date"
            errors={errors.endDate}
          />
          <SelectInputField
            registerProps={register("frequency")}
            options={frequencyOptions}
            errors={errors.frequency}
          />
          <SubmitButton text="Submit" />
        </form>
      </div>
    </div>
  );
};

export default ModalAddRecurringTransaction;
