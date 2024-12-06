import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { GoalsDto } from "../../api";
import { IoCloseOutline } from "react-icons/io5";
import { format } from "date-fns";

type ModalAddGoalProps = {
  onSubmitGoal: (data: GoalsDto) => Promise<void>;
  register: ReturnType<typeof useForm>["register"];
  handleSubmit: ReturnType<typeof useForm>["handleSubmit"];
  errors: ReturnType<typeof useForm>["formState"]["errors"];
  onClickCloseModal: () => void;
  isUpdating?: boolean;
  goal?: GoalsDto | null;
  setValue?: ReturnType<typeof useForm>["setValue"];
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
        goal?.startDate ? format(goal?.startDate, "yyyy-MM-dd") : ""
      );
      setValue(
        "targetDate",
        goal?.targetDate ? format(goal?.targetDate, "yyyy-MM-dd") : ""
      );
    }
  }, [goal, setValue, isUpdating]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex-grow text-center">
            Add Goal
          </h2>
          <button type="button" onClick={onClickCloseModal} className="ml-auto">
            <IoCloseOutline />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmitGoal)}>
          <div className="mb-4">
            <input
              {...register("goalName")}
              placeholder="Goal Name"
              className="w-full text-sm p-2 border border-gray-300 rounded"
            />
            {errors.goalName && (
              <span className="text-red-500 text-sm">
                {typeof errors.goalName?.message === "string" &&
                  errors.goalName.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <input
              {...register("targetAmount")}
              placeholder="Target Amount"
              step={0.01}
              type="number"
              className="w-full text-sm p-2 border border-gray-300 rounded"
            />
            {errors.targetAmount && (
              <span className="text-red-500 text-sm">
                {typeof errors.targetAmount.message === "string" &&
                  errors.targetAmount.message}
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
              {...register("targetDate")}
              placeholder="Target Date"
              type="date"
              className="w-full text-sm p-2 border border-gray-300 rounded"
            />
            {errors.targetDate && (
              <span className="text-red-500 text-sm">
                {typeof errors.targetDate?.message === "string" &&
                  errors.targetDate.message}
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

export default ModalAddGoal;
