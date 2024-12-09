import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface NumberInputFieldProps {
  registerProps: UseFormRegisterReturn;
  placeholder: string;
  step?: number;
  errors?: FieldError;
}

const NumberInputField: React.FC<NumberInputFieldProps> = ({
  registerProps,
  placeholder,
  step,
  errors,
}) => {
  return (
    <div className="mb-4">
      <input
        {...registerProps}
        placeholder={placeholder}
        step={step}
        type="number"
        className="w-full text-sm p-2 border border-gray-300 rounded"
      />
      {errors && (
        <span className="text-red-500 text-sm">
          {typeof errors.message === "string" && errors.message}
        </span>
      )}
    </div>
  );
};

export default NumberInputField;
