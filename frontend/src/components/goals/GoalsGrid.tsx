import {
  AddAmountRequest,
  GetGoalRequest,
  GoalsControllerApi,
  GoalsDto,
} from "../../api";
import { useEffect, useState } from "react";
import ModalDeleteItem from "../common/ModalDeleteItem";
import ModalAddMoney from "./ModalAddMoney";
import { useForm } from "react-hook-form";
import { User } from "oidc-client-ts";
import { getConfiguration } from "../../config/config";
import ModalAddGoal from "./ModalAddGoal";
import GoalActions from "./GoalActions";
import GoalProgress from "./GoalProgress";
import GoalHeader from "./GoalHeader";

interface GoalsGridProps {
  goals: GoalsDto[];
  deleteGoal: (id: string) => Promise<void>;
  addMoneytoGoal: (data: AddAmountRequest) => Promise<void>;
  openOptionId: string | null;
  setOpenOptionId: (id: string | null) => void;
  user: User | undefined | null;
  setValue: ReturnType<typeof useForm<GoalsDto>>["setValue"];
  isUpdating: boolean;
  setIsUpdating: (isUpdating: boolean) => void;
  onSubmitGoal: (data: GoalsDto) => Promise<void>;
  handleSubmit: ReturnType<typeof useForm<GoalsDto>>["handleSubmit"];
  errors: ReturnType<typeof useForm>["formState"]["errors"];
  onClickCloseModal: () => void;
  register: ReturnType<typeof useForm<GoalsDto>>["register"];
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
        <ModalDeleteItem
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
          <GoalHeader
            goal={goal}
            handleOpenOptions={handleOpenOptions}
            openOptionId={openOptionId}
            handleDeleteOpenModal={handleDeleteOpenModal}
            handleUpdateOpenModal={handleUpdateOpenModal}
            openDeleteModal={openDeleteModal}
          />

          <GoalProgress goal={goal} />

          <GoalActions
            goalId={goal.id}
            handleAddMoneyOpenModal={handleAddMoneyOpenModal}
            handleWithdrawMoneyOpenModal={handleWithdrawMoneyOpenModal}
          />
        </div>
      ))}
    </div>
  );
};

export default GoalsGrid;
