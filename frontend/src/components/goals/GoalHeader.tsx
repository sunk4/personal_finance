import { BsThreeDots } from "react-icons/bs";
import { GoalsDto } from "../../api";

interface GoalHeaderProps {
  goal: GoalsDto;
  openOptionId: string | null;
  openDeleteModal: boolean;
  handleOpenOptions: (id: string | undefined) => void;
  handleUpdateOpenModal: () => void;
  handleDeleteOpenModal: () => void;
}

const GoalHeader: React.FC<GoalHeaderProps> = ({
  goal,
  openOptionId,
  openDeleteModal,
  handleOpenOptions,
  handleUpdateOpenModal,
  handleDeleteOpenModal,
}) => {
  return (
    <>
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
    </>
  );
};

export default GoalHeader;
