import React from "react";
import { AccountDto } from "../../api";
import { useForm, UseFormRegister } from "react-hook-form";
import accountTypeOptions from "../../data/accountTypeOptions";
import statusOptions from "../../data/statusOptions";
import SubmitButton from "../common/SubmitButton";
import TextInputField from "../common/TextInputField";
import NumberInputField from "../common/NumberInputField";
import SelectInputField from "../common/SelectInputField";
import ModalHeader from "../common/ModalHeader";

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
        <ModalHeader
          title="Add Account"
          onClickCloseModal={onClickCloseModal}
        />
        <form onSubmit={handleSubmit(onSubmitAccount)}>
          <TextInputField
            registerProps={register("name")}
            placeholder="Account Name"
            errors={errors.name}
          />
          <NumberInputField
            registerProps={register("balance")}
            placeholder="Balance"
            errors={errors.balance}
          />
          <SelectInputField
            registerProps={register("accountType")}
            options={accountTypeOptions}
            errors={errors.accountType}
          />
          <SelectInputField
            registerProps={register("status")}
            options={statusOptions}
            errors={errors.status}
          />
          <SubmitButton text="Save" />
        </form>
      </div>
    </div>
  );
};
export default ModalAddAccount;
