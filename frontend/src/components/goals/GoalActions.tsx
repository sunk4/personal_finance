interface GoalActionsProps {
  goalId: string | undefined;
  handleAddMoneyOpenModal: (id: string | undefined) => void;
  handleWithdrawMoneyOpenModal: (id: string | undefined) => void;
}

const GoalActions: React.FC<GoalActionsProps> = ({
  goalId,
  handleAddMoneyOpenModal,
  handleWithdrawMoneyOpenModal,
}) => {
  return (
    <div className="flex justify-center mt-4 gap-2">
      <button
        onClick={() => handleAddMoneyOpenModal(goalId)}
        className="rounded-lg bg-ivory-sand px-4 py-2 font-semibold text-sm"
      >
        Add Money
      </button>
      <button
        onClick={() => handleWithdrawMoneyOpenModal(goalId)}
        className="rounded-lg bg-ivory-sand px-4 py-2 font-semibold text-sm"
      >
        Withdraw Money
      </button>
    </div>
  );
};

export default GoalActions;
