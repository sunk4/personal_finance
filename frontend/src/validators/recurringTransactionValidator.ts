import * as yup from "yup";

export const recurringTransactionValidator = yup.object().shape({
  name: yup.string().required("Name is required"),
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .required("Amount is required")
    .positive("Amount must be positive"),
  frequency: yup.string().required("Frequency is required"),
  startDate: yup
    .date()
    .typeError("Start date must be a valid date")
    .required("Start date is required"),
  endDate: yup
    .date()
    .typeError("End date must be a valid date")
    .min(yup.ref("startDate"), "End date cannot be before start date")
    .required("End date is required"),
});
