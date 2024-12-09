import React from "react";

interface SubmitButtonProps {
  text: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ text }) => {
  return (
    <button
      type="submit"
      className="w-full rounded-lg bg-black text-white px-4 py-2 font-semibold text-sm"
    >
      {text}
    </button>
  );
};

export default SubmitButton;
