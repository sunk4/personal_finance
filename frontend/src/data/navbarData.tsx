import { FaSackDollar, FaRepeat } from "react-icons/fa6";
import { HiMiniArrowsUpDown } from "react-icons/hi2";
import { IoIosSettings } from "react-icons/io";

export const navbarData = [
  {
    to: "/transactions",
    icon: <HiMiniArrowsUpDown className="mb-1 lg:mr-2 lg:mb-0" />,
    label: "Transactions",
  },
  {
    to: "/goals",
    icon: <FaSackDollar className="mb-1 lg:mr-2 lg:mb-0" />,
    label: "Goals",
  },
  {
    to: "/recurring_bills",
    icon: <FaRepeat className="mb-1 lg:mr-2 lg:mb-0" />,
    label: "Recurring Bills",
  },
  {
    to: "/settings",
    icon: <IoIosSettings className="mb-1 lg:mr-2 lg:mb-0" />,
    label: "Settings",
  },
];
