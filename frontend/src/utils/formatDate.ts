import { format } from "date-fns";

const formatDate = (date: Date | undefined) => {
  if (!date) return "N/A";
  return format(date, "dd MMM yyyy");
};

export default formatDate;
