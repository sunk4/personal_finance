import React from "react";
import { IoCloseOutline } from "react-icons/io5";

interface ModalHeaderProps {
  title: string;
  onClickCloseModal: () => void;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  onClickCloseModal,
}) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-semibold flex-grow text-center">{title}</h2>
      <button type="button" onClick={onClickCloseModal} className="ml-auto">
        <IoCloseOutline />
      </button>
    </div>
  );
};

export default ModalHeader;
