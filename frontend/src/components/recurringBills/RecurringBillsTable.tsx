import {
  GetRecurringTransactionRequest,
  RecurringTransactionControllerApi,
  RecurringTransactionDto,
} from "../../api";
import formatDate from "../../utils/formatDate";
import { useEffect, useState } from "react";
import ModalDeleteItem from "../common/ModalDeleteItem";
import ModalAddRecurringTransaction from "./ModalAddRecurringTransaction";
import { useForm, UseFormSetValue } from "react-hook-form";
import { getConfiguration } from "../../config/config";
import { User } from "oidc-client-ts";
import TableHeader from "./TableHeader";
import RecurringBillItem from "./RecurringBillItem";

type RecurringBillsTableProps = {
  recurringBills: RecurringTransactionDto[];
  deleteItem: (id: string) => Promise<void>;
  setIsUpdating: (isUpdating: boolean) => void;
  isUpdating: boolean;
  onSubmitRecurringBill: (data: RecurringTransactionDto) => Promise<void>;
  register: ReturnType<typeof useForm<RecurringTransactionDto>>["register"];
  handleSubmit: ReturnType<
    typeof useForm<RecurringTransactionDto>
  >["handleSubmit"];
  errors: ReturnType<
    typeof useForm<RecurringTransactionDto>
  >["formState"]["errors"];
  onClickCloseModal: () => void;
  user: User | undefined | null;
  setValue: UseFormSetValue<RecurringTransactionDto>;
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
      {openDeleteModal && (
        <ModalDeleteItem
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
          isUpdating={isUpdating}
          setIsUpdating={setIsUpdating}
          recurringTransaction={recurringTransaction}
          setValue={setValue}
        />
      )}
      <TableHeader />
      {recurringBills && recurringBills.length > 0 ? (
        recurringBills.map((bill: RecurringTransactionDto) => (
          <RecurringBillItem
            key={bill.id}
            bill={bill}
            openOptionId={openOptionId}
            openDeleteModal={openDeleteModal}
            handleOpenOptions={handleOpenOptions}
            handleUpdateOpenModal={handleUpdateOpenModal}
            handleDeleteOpenModal={handleDeleteOpenModal}
            formatDate={formatDate}
          />
        ))
      ) : (
        <p>No recurring bills found.</p>
      )}
    </ul>
  );
};

export default RecurringBillsTable;
