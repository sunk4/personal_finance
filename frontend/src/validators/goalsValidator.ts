import * as yup from "yup";

export const goalsValidator = yup.object().shape({
  goalName: yup.string().required("Goal name is required"),
  targetAmount: yup
    .number()
    .typeError("Target amount must be a number")
    .required("Target amount is required")
    .positive("Target amount must be positive"),
  startDate: yup
    .date()
    .typeError("Start date must be a valid date")
    .required("Start date is required"),
  targetDate: yup
    .date()
    .typeError("Target date must be a valid date")
    .min(yup.ref("startDate"), "Target date cannot be before start date")
    .required("Target date is required"),
});

export const goalsAddMoneyValidator = yup.object().shape({
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .required("Amount is required")
    .positive("Amount must be positive"),
});
