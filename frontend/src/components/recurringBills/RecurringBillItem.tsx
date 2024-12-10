import { BsThreeDots } from "react-icons/bs";
import { RecurringTransactionDto } from "../../api";

interface RecurringBillItemProps {
  bill: RecurringTransactionDto;
  openOptionId: string | null;
  openDeleteModal: boolean;
  handleOpenOptions: (id: string) => void;
  handleUpdateOpenModal: () => void;
  handleDeleteOpenModal: () => void;
  formatDate: (date: Date) => string;
}

const RecurringBillItem: React.FC<RecurringBillItemProps> = ({
  bill,
  openOptionId,
  openDeleteModal,
  handleOpenOptions,
  handleUpdateOpenModal,
  handleDeleteOpenModal,
  formatDate,
}) => {
  return (
    <div key={bill.id}>
      <li className="p-2 flex justify-between items-center">
        <p className="text-center text-xs font-bold w-1/6">
          {bill.account?.name}
        </p>
        <p className="text-center text-xs font-bold w-1/6">{bill.name}</p>

        <p className="text-gray-400 text-xs text-center w-1/6">
          {bill.frequency}
        </p>
        <p className="text-gray-400 text-xs text-center w-1/6">
          {formatDate(bill.startDate)}
        </p>
        <p className="text-gray-400 text-xs text-center w-1/6">
          {formatDate(bill.endDate)}
        </p>
        <p className="text-center w-1/6 text-xs">
          €{bill.amount?.toFixed(2) ?? "N/A"}
        </p>
        <p className="text-center w-1/6 text-xs">
          <button onClick={() => bill.id && handleOpenOptions(bill.id)}>
            <BsThreeDots />
          </button>
        </p>
        {openOptionId === bill.id && !openDeleteModal && (
          <div className="absolute right-10 rounded-lg bg-white p-2">
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
      </li>
      <hr />
    </div>
  );
};

export default RecurringBillItem;
