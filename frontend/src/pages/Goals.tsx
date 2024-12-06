import { useAuth } from "react-oidc-context";
import useGoals from "../hooks/useGoals";
import GoalsGrid from "../components/goals/GoalsGrid";
import { Resolver, useForm } from "react-hook-form";
import {
  AddAmountRequest,
  CreateGoalRequest,
  GoalsControllerApi,
  GoalsDto,
} from "../api";
import { getConfiguration } from "../config/config";
import { useState } from "react";
import ModalAddGoal from "../components/goals/ModalAddGoal";
import { yupResolver } from "@hookform/resolvers/yup";
import { goalsValidator } from "../validators/goalsValidator";

const Goals: React.FC = () => {
  const { user } = useAuth();

  const { goals, error, isLoading, mutate } = useGoals(user);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<GoalsDto>({
    resolver: yupResolver(goalsValidator) as Resolver<GoalsDto>,
  });

  const onSubmitGoal = async (data: GoalsDto): Promise<void> => {
    const config = getConfiguration(user);
    const api = new GoalsControllerApi(config);

    try {
      const formattedData = {
        ...data,
        startDate: data.startDate ? new Date(data.startDate) : new Date(),
        targetDate: data.targetDate ? new Date(data.targetDate) : new Date(),
      };

      const request: CreateGoalRequest = { goalsDto: formattedData };
      await api.createGoal(request);
      mutate();
      reset();
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error("Error adding goal:", error);
    }
  };

  const addMoneytoGoal = async (data: AddAmountRequest): Promise<void> => {
    const config = getConfiguration(user);
    const api = new GoalsControllerApi(config);

    try {
      await api.addAmount(data);
      mutate();
    } catch (error) {
      console.error("Error adding money to goal:", error);
    }
  };

  const deleteGoal = async (id: string): Promise<void> => {
    const config = getConfiguration(user);
    const api = new GoalsControllerApi(config);

    try {
      await api.deleteGoal({ goalId: id });
      mutate();
    } catch (error) {
      console.error("Error deleting goal:", error);
    }
  };

  const onClickOpenModal = (): void => {
    setIsCreateModalOpen(true);
  };

  const onClickCloseModal = (): void => {
    reset();
    setIsCreateModalOpen(false);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching goals:</div>;

  return (
    <>
      <div className="mb-4 flex justify-between">
        <h1 className="text-lg font-bold ">Goals</h1>
        <button
          onClick={onClickOpenModal}
          className="rounded-lg bg-black text-white px-4 py-2 font-semibold text-sm"
        >
          Add Goal
        </button>
      </div>
      {isCreateModalOpen && (
        <ModalAddGoal
          onSubmitGoal={onSubmitGoal}
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          onClickCloseModal={onClickCloseModal}
        />
      )}
      {goals && (
        <GoalsGrid
          goals={goals}
          deleteGoal={deleteGoal}
          addMoneytoGoal={addMoneytoGoal}
        />
      )}
    </>
  );
};
export default Goals;
