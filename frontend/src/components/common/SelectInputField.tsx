import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface SelectInputFieldProps {
  registerProps: UseFormRegisterReturn;
  options: { key: string; value: string }[];
  errors?: FieldError;
}

const SelectInputField: React.FC<SelectInputFieldProps> = ({
  registerProps,
  options,
  errors,
}) => {
  return (
    <div className="mb-4">
      <select
        {...registerProps}
        className="w-full text-sm p-2 border bg-white rounded"
      >
        {options.map((option) => (
          <option key={option.key} value={option.key} className="text-sm">
            {option.value}
          </option>
        ))}
      </select>
      {errors && (
        <span className="text-red-500 text-sm">
          {typeof errors.message === "string" && errors.message}
        </span>
      )}
    </div>
  );
};

export default SelectInputField;
