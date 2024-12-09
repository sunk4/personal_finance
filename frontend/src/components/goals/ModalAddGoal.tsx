import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { GoalsDto } from "../../api";
import { format } from "date-fns";
import DateInputField from "../common/DateInputField";
import NumberInputField from "../common/NumberInputField";
import TextInputField from "../common/TextInputField";
import SubmitButton from "../common/SubmitButton";
import ModalHeader from "../common/ModalHeader";

type ModalAddGoalProps = {
  onSubmitGoal: (data: GoalsDto) => Promise<void>;
  register: ReturnType<typeof useForm<GoalsDto>>["register"];
  handleSubmit: ReturnType<typeof useForm<GoalsDto>>["handleSubmit"];
  errors: ReturnType<typeof useForm<GoalsDto>>["formState"]["errors"];
  onClickCloseModal: () => void;
  isUpdating?: boolean;
  goal?: GoalsDto | null;
  setValue?: ReturnType<typeof useForm<GoalsDto>>["setValue"];
};

const ModalAddGoal: React.FC<ModalAddGoalProps> = ({
  handleSubmit,
  onSubmitGoal,
  register,
  errors,
  onClickCloseModal,
  isUpdating,
  goal,
  setValue,
}) => {
  useEffect(() => {
    if (isUpdating && goal && setValue) {
      setValue("goalName", goal?.goalName);
      setValue("targetAmount", goal?.targetAmount);
      setValue(
        "startDate",
        format(goal.startDate, "yyyy-MM-dd") as unknown as Date
      );
      setValue(
        "targetDate",
        format(goal.targetDate, "yyyy-MM-dd") as unknown as Date
      );
    }
  }, [goal, setValue, isUpdating]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <ModalHeader title="Add Goal" onClickCloseModal={onClickCloseModal} />
        <form onSubmit={handleSubmit(onSubmitGoal)}>
          <TextInputField
            registerProps={register("goalName")}
            placeholder="Goal Name"
            errors={errors.goalName}
          />
          <NumberInputField
            registerProps={register("targetAmount")}
            placeholder="Target Amount"
            errors={errors.targetAmount}
            step={0.01}
          />
          <DateInputField
            registerProps={register("startDate")}
            placeholder="Start Date"
            errors={errors.startDate}
          />
          <DateInputField
            registerProps={register("targetDate")}
            placeholder="Target Date"
            errors={errors.startDate}
          />
          <SubmitButton text="Save" />
        </form>
      </div>
    </div>
  );
};

export default ModalAddGoal;
