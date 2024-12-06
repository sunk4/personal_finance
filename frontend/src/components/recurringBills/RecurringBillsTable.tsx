import { BsThreeDots } from "react-icons/bs";
import { RecurringTransactionDto } from "../../api";
import formatDate from "../../utils/formatDate";
import { useState } from "react";
import ModalDeleteGoal from "../goals/ModalDeleteGoal";

type RecurringBillsTableProps = {
  recurringBills: RecurringTransactionDto[];
  deleteItem: (id: string) => Promise<void>;
};

const RecurringBillsTable: React.FC<RecurringBillsTableProps> = ({
  recurringBills,
  deleteItem,
}) => {
  const [openOptionId, setOpenOptionId] = useState<string | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

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
  return (
    <ul className="my-6">
      <li className="p-2 flex justify-between items-center">
        <p className="text-gray-400 text-xs w-1/6 text-center">Accout</p>
        <p className="text-gray-400 text-xs w-1/6 text-center">Name</p>
        <p className="text-gray-400 text-xs w-1/6 text-center">Category</p>
        <p className="text-gray-400 text-xs w-1/6 text-center">Frequency</p>
        <p className="text-gray-400 text-xs w-1/6 text-center">Start Date</p>
        <p className="text-gray-400 text-xs w-1/6 text-center">End Date</p>
        <p className="text-gray-400 text-xs w-1/6 text-center">Amount</p>
        <p className="text-gray-400 text-xs w-1/6 text-center"></p>
      </li>
      <hr />
      {recurringBills && recurringBills.length > 0 ? (
        recurringBills.map((bill: RecurringTransactionDto) => (
          <div key={bill.id}>
            <li className="p-2 flex justify-between items-center">
              <p className="text-center text-xs font-bold w-1/6">
                {bill.account?.name}
              </p>
              <p className="text-center text-xs font-bold w-1/6">{bill.name}</p>
              <p className="text-gray-400 text-xs text-center w-1/6">
                {bill.category?.name}
              </p>
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
                <button onClick={() => handleOpenOptions(bill.id)}>
                  <BsThreeDots />
                </button>
              </p>
              {openOptionId === bill.id && !openDeleteModal && (
                <div className="absolute right-10 rounded-lg bg-white p-2">
                  <button className="text-sm">Edit</button>
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
        ))
      ) : (
        <li className="p-2 text-center text-gray-400 text-xs">
          No upcoming bills
        </li>
      )}
      {openDeleteModal && (
        <ModalDeleteGoal
          openOptionId={openOptionId}
          deleteItem={deleteItem}
          handleDeleteOpenModal={handleDeleteOpenModal}
          handleOpenOptions={handleOpenOptions}
          title={"Delete Bill?"}
        />
      )}
    </ul>
  );
};

export default RecurringBillsTable;
