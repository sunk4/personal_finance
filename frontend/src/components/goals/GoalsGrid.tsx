import {
  AddAmountRequest,
  GetGoalRequest,
  GoalsControllerApi,
  GoalsDto,
} from "../../api";
import { BsThreeDots } from "react-icons/bs";
import formatDate from "../../utils/formatDate";
import { useEffect, useState } from "react";
import ModalDeleteGoal from "./ModalDeleteGoal";
import ModalAddMoney from "./ModalAddMoney";
import { useForm } from "react-hook-form";
import { User } from "oidc-client-ts";
import { getConfiguration } from "../../config/config";
import ModalAddGoal from "./ModalAddGoal";

interface GoalsGridProps {
  goals: GoalsDto[];
  deleteGoal: (id: string) => Promise<void>;
  addMoneytoGoal: (data: AddAmountRequest) => Promise<void>;
  openOptionId: string | null;
  setOpenOptionId: (id: string | null) => void;
  user: User | undefined | null;
  setValue: ReturnType<typeof useForm>["setValue"];
  isUpdating: boolean;
  setIsUpdating: (isUpdating: boolean) => void;
  onSubmitGoal: (data: GoalsDto) => Promise<void>;
  register: ReturnType<typeof useForm>["register"];
  handleSubmit: ReturnType<typeof useForm>["handleSubmit"];
  errors: ReturnType<typeof useForm>["formState"]["errors"];
  onClickCloseModal: () => void;
}

const GoalsGrid: React.FC<GoalsGridProps> = ({
  goals,
  deleteGoal,
  addMoneytoGoal,
  openOptionId,
  setOpenOptionId,
  user,
  setValue,
  isUpdating,
  setIsUpdating,
  onSubmitGoal,
  register,
  handleSubmit,
  errors,
  onClickCloseModal,
}) => {
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openAddMoneyModal, setOpenAddMoneyModal] = useState<boolean>(false);
  const [openWithdrawMoneyModal, setOpenWithdrawMoneyModal] =
    useState<boolean>(false);
  const [selectedGoalId, setSelectedGoalId] = useState<
    string | null | undefined
  >(null);
  const [goal, setGoal] = useState<GoalsDto | null>(null);

  const handleOpenOptions = (id: string | undefined): void => {
    if (openOptionId === id) {
      setOpenOptionId(null);
    } else {
      setOpenOptionId(id || null);
    }
  };

  const handleDeleteOpenModal = (): void => {
    setOpenDeleteModal((prev) => !prev);
  };

  const handleAddMoneyOpenModal = (id: string | null | undefined): void => {
    setSelectedGoalId(id);
    setOpenAddMoneyModal((prev) => !prev);
  };

  const handleWithdrawMoneyOpenModal = (
    id: string | null | undefined
  ): void => {
    setSelectedGoalId(id);
    setOpenWithdrawMoneyModal((prev) => !prev);
  };

  const handleCloseModal = (): void => {
    setOpenAddMoneyModal(false);
    setOpenWithdrawMoneyModal(false);
  };
  const handleUpdateOpenModal = (): void => {
    setIsUpdating(!isUpdating);
  };

  useEffect(() => {
    if (openOptionId) {
      const fetchRecurringTransaction = async () => {
        const requestParameters: GetGoalRequest = {
          goalId: openOptionId,
        };
        const config = getConfiguration(user);
        const api = new GoalsControllerApi(config);
        try {
          const data = await api.getGoal(requestParameters);
          setGoal(data);
        } catch (error) {
          console.error("Error fetching the recurring bill:", error);
        }
      };

      fetchRecurringTransaction();
    }
  }, [openOptionId, user]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
      {openDeleteModal && (
        <ModalDeleteGoal
          openOptionId={openOptionId}
          deleteItem={deleteGoal}
          handleDeleteOpenModal={handleDeleteOpenModal}
          handleOpenOptions={handleOpenOptions}
          title={"Delete Goal?"}
        />
      )}
      {(openAddMoneyModal || openWithdrawMoneyModal) && (
        <ModalAddMoney
          addMoneytoGoal={addMoneytoGoal}
          handleAddMoneyOpenModal={() => handleAddMoneyOpenModal(null)}
          goalId={selectedGoalId}
          openWithdrawMoneyModal={openWithdrawMoneyModal}
          handleWithdrawMoneyOpenModal={() =>
            handleWithdrawMoneyOpenModal(null)
          }
          handleCloseModal={handleCloseModal}
        />
      )}
      {isUpdating && (
        <ModalAddGoal
          onSubmitGoal={onSubmitGoal}
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          onClickCloseModal={onClickCloseModal}
          goal={goal}
          setValue={setValue}
          isUpdating={isUpdating}
        />
      )}
      {goals.map((goal: GoalsDto) => (
        <div key={goal.id} className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold">{goal.goalName}</h2>
            <div className="relative inline-block">
              <button onClick={() => handleOpenOptions(goal.id)}>
                <BsThreeDots />
              </button>
              {openOptionId === goal.id && !openDeleteModal && (
                <div className="absolute right-10 -top-2 rounded-lg bg-white p-2">
                  <button onClick={handleUpdateOpenModal} className="text-sm">
                    Edit
                  </button>
                  <hr />
                  <button
                    onClick={handleDeleteOpenModal}
                    className="text-sm text-red-500"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray-400 text-xs">Total saved</p>
            <p className="text-xl font-bold">
              €{goal.currentAmount?.toFixed(2) ?? "N/A"}
            </p>
          </div>
          {goal.targetAmount && (
            <>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className={`h-2 rounded-full ${goal.remainingAmount !== undefined && ((goal.targetAmount - goal.remainingAmount) / goal.targetAmount) * 100 >= 100 ? "bg-green-600" : "bg-warm-beige"}`}
                  style={{
                    width: `${goal.remainingAmount !== undefined ? (((goal.targetAmount - goal.remainingAmount) / goal.targetAmount) * 100 <= 100 ? ((goal.targetAmount - goal.remainingAmount) / goal.targetAmount) * 100 : 100) : 0}%`,
                  }}
                ></div>
              </div>
              <div className="flex justify-between mt-2">
                <p className="text-gray-400 text-xs font-semibold">
                  {goal.remainingAmount !== undefined
                    ? (
                        ((goal.targetAmount - goal.remainingAmount) /
                          goal.targetAmount) *
                        100
                      ).toFixed(2)
                    : "N/A"}
                  %
                </p>
                <p className="text-gray-400 text-xs">
                  Target of €{goal.targetAmount?.toFixed(2) ?? "N/A"}
                </p>
              </div>
              <div className="flex justify-between mt-2">
                <p className="text-gray-400 text-xs">
                  {formatDate(goal.startDate)}
                </p>
                <p className="text-gray-400 text-xs font-semibold">
                  {formatDate(goal.targetDate)}
                </p>
              </div>
              <div className="flex justify-center mt-4 gap-2">
                <button
                  onClick={() => handleAddMoneyOpenModal(goal.id)}
                  className="rounded-lg bg-ivory-sand px-4 py-2 font-semibold text-sm"
                >
                  Add Money
                </button>
                <button
                  onClick={() => handleWithdrawMoneyOpenModal(goal.id)}
                  className="rounded-lg bg-ivory-sand px-4 py-2 font-semibold text-sm"
                >
                  Withdraw Money
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default GoalsGrid;
