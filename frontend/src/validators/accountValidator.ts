import * as yup from "yup";

export const accountValidator = yup.object().shape({
  name: yup.string().required("Name is required"),
  balance: yup
    .number()
    .typeError("Balance must be a number")
    .required("Balance is required"),
  accountType: yup.string().required("Account type is required"),
  status: yup.string().required("Status is required"),
});
