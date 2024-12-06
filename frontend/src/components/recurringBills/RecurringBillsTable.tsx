import { BsThreeDots } from "react-icons/bs";
import {
  CategoryDto,
  GetRecurringTransactionRequest,
  RecurringTransactionControllerApi,
  RecurringTransactionDto,
} from "../../api";
import formatDate from "../../utils/formatDate";
import { useEffect, useState } from "react";
import ModalDeleteGoal from "../goals/ModalDeleteGoal";
import ModalAddRecurringTransaction from "./ModalAddRecurringTransaction";
import { useForm } from "react-hook-form";
import { getConfiguration } from "../../config/config";
import { User } from "oidc-client-ts";

type RecurringBillsTableProps = {
  recurringBills: RecurringTransactionDto[];
  deleteItem: (id: string) => Promise<void>;
  setIsUpdating: (isUpdating: boolean) => void;
  isUpdating: boolean;
  onSubmitRecurringBill: (data: RecurringTransactionDto) => Promise<void>;
  register: ReturnType<typeof useForm>["register"];
  handleSubmit: ReturnType<typeof useForm>["handleSubmit"];
  errors: ReturnType<typeof useForm>["formState"]["errors"];
  onClickCloseModal: () => void;
  categories: CategoryDto[] | undefined;
  user: User | undefined | null;
  setValue: ReturnType<typeof useForm>["setValue"];
  openOptionId: string | null;
  setOpenOptionId: (id: string | null) => void;
};

const RecurringBillsTable: React.FC<RecurringBillsTableProps> = ({
  recurringBills,
  deleteItem,
  setIsUpdating,
  isUpdating,
  onSubmitRecurringBill,
  register,
  handleSubmit,
  errors,
  onClickCloseModal,
  categories,
  user,
  setValue,
  openOptionId,
  setOpenOptionId,
}) => {
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [recurringTransaction, setRecurringTransaction] =
    useState<RecurringTransactionDto | null>(null);

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

  const handleUpdateOpenModal = (): void => {
    setIsUpdating(!isUpdating);
  };

  useEffect(() => {
    if (openOptionId) {
      const fetchRecurringTransaction = async () => {
        const requestParameters: GetRecurringTransactionRequest = {
          recurringTransactionId: openOptionId,
        };
        const config = getConfiguration(user);
        const api = new RecurringTransactionControllerApi(config);
        try {
          const data = await api.getRecurringTransaction(requestParameters);
          setRecurringTransaction(data);
        } catch (error) {
          console.error("Error fetching the recurring bill:", error);
        }
      };

      fetchRecurringTransaction();
    }
  }, [openOptionId, user]);
  return (
    <ul className="my-6">
      <li className="p-2 flex justify-between items-center">
        <p className="text-gray-400 text-xs w-1/6 text-center">Account name</p>
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
      {isUpdating && (
        <ModalAddRecurringTransaction
          onSubmitRecurringBill={onSubmitRecurringBill}
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          onClickCloseModal={onClickCloseModal}
          categories={categories}
          isUpdating={isUpdating}
          setIsUpdating={setIsUpdating}
          recurringTransaction={recurringTransaction}
          setValue={setValue}
        />
      )}
    </ul>
  );
};

export default RecurringBillsTable;
