import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface TextInputFieldProps {
  registerProps: UseFormRegisterReturn;
  placeholder: string;
  errors?: FieldError;
}

const TextInputField: React.FC<TextInputFieldProps> = ({
  registerProps,
  placeholder,
  errors,
}) => {
  return (
    <div className="mb-4">
      <input
        {...registerProps}
        placeholder={placeholder}
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

export default TextInputField;
