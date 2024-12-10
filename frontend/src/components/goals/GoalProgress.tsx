import formatDate from "../../utils/formatDate";

interface GoalProgressProps {
  goal: {
    targetAmount: number;
    remainingAmount?: number;
    startDate: Date;
    targetDate: Date;
  };
}

const GoalProgress: React.FC<GoalProgressProps> = ({ goal }) => {
  return (
    <>
      {goal.targetAmount && (
        <>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className={`h-2 rounded-full ${
                goal.remainingAmount !== undefined &&
                ((goal.targetAmount - goal.remainingAmount) /
                  goal.targetAmount) *
                  100 >=
                  100
                  ? "bg-green-600"
                  : "bg-warm-beige"
              }`}
              style={{
                width: `${
                  goal.remainingAmount !== undefined
                    ? ((goal.targetAmount - goal.remainingAmount) /
                        goal.targetAmount) *
                        100 <=
                      100
                      ? ((goal.targetAmount - goal.remainingAmount) /
                          goal.targetAmount) *
                        100
                      : 100
                    : 0
                }%`,
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
        </>
      )}
    </>
  );
};

export default GoalProgress;
