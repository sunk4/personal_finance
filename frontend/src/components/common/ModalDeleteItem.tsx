import React from "react";
import { IoCloseOutline } from "react-icons/io5";

type ModalDeleteItemProps = {
  openOptionId: string | null;
  handleDeleteOpenModal: () => void;
  deleteItem: (id: string) => Promise<void>;
  handleOpenOptions: (id: string | undefined) => void;
  title: string;
};

const ModalDeleteItem: React.FC<ModalDeleteItemProps> = ({
  openOptionId,
  handleDeleteOpenModal,
  deleteItem,
  handleOpenOptions,
  title,
}) => {
  const handleDeleteGoal = (): void => {
    deleteItem(openOptionId || "");
    handleDeleteOpenModal();
    handleOpenOptions("");
  };

  const handleGoBack = (): void => {
    handleDeleteOpenModal();
    handleOpenOptions("");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex-grow text-center">
            {title}
          </h2>
          <button
            type="button"
            onClick={handleDeleteOpenModal}
            className="ml-auto"
          >
            <IoCloseOutline />
          </button>
        </div>
        <p className="text-sm">
          Are you sure you want to delete this item? This action cannot be
          reversed, and all the data inside it will be removed forever.
        </p>

        <button
          type="submit"
          onClick={() => handleDeleteGoal()}
          className="w-full rounded-lg bg-red-500 text-white px-4 py-2 font-semibold text-sm my-2"
        >
          Yes, confirm deletion
        </button>
        <button
          onClick={() => handleGoBack()}
          className="w-full rounded-lg bg-ivory-sand  px-4 py-2 font-semibold text-sm"
        >
          I want to go back
        </button>
      </div>
    </div>
  );
};
export default ModalDeleteItem;
