import React from "react";
import getPageRange from "../utils/getPageRange";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex justify-center items-center space-x-4">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 0))}
        disabled={currentPage === 0}
        className="rounded-md border-x border-y border-gray-400 px-3 py-1 text-sm"
      >
        Prev
      </button>
      {getPageRange(currentPage, totalPages).map((index) => (
        <button
          key={index}
          onClick={() => onPageChange(index)}
          className={`rounded-md text-sm border-x border-y border-gray-400 px-3 py-1 ${currentPage === index ? "bg-ivory-sand text-white border-white" : ""}`}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages - 1))}
        disabled={currentPage === totalPages - 1}
        className="rounded-md text-sm border-x border-y border-gray-400 px-3 py-1"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
