import * as yup from "yup";

export const transactionValidators = yup.object().shape({
  transactionType: yup
    .string()
    .oneOf(["DEPOSIT", "WITHDRAWAL", "TRANSFER", "PAYMENT", "RECURRING"])
    .required("Transaction type is required"),
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .required("Amount is required")
    .positive("Amount must be positive"),
  transactionDate: yup
    .date()
    .typeError("Transaction date must be a valid date")
    .required("Transaction date is required"),
  reference: yup.string().required("Reference is required"),
});
