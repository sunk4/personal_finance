import { FaHome } from "react-icons/fa";
import { FaSackDollar, FaRepeat } from "react-icons/fa6";
import { HiMiniArrowsUpDown } from "react-icons/hi2";
import { IoIosSettings } from "react-icons/io";
import { NavLink } from "react-router-dom";

type NavbarProps = {
  handleLogout: () => void;
};

const Navbar: React.FC<NavbarProps> = ({ handleLogout }) => {
  return (
    <nav className="bg-dark-slate-blue text-white flex lg:flex-col lg:w-1/5 w-full h-16 sm:h-auto justify-around lg:justify-start lg:items-start p-4 rounded-t-lg lg:rounded-l-none lg:rounded-r-lg">
      <h1 className="text-2xl font-bold p-2 lg:block hidden">finance</h1>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "p-2 flex flex-col lg:flex-row items-center text-ivory-sand font-bold text-center"
            : "p-2 flex flex-col lg:flex-row items-center hover:text-ivory-sand text-center"
        }
        to="/overview"
      >
        <FaHome className="mb-1 lg:mr-2 lg:mb-0" />
        <span className="hidden sm:block">Overview</span>
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "p-2 flex flex-col lg:flex-row items-center text-ivory-sand font-bold text-center"
            : "p-2 flex flex-col lg:flex-row items-center hover:text-ivory-sand text-center"
        }
        to="/transactions"
      >
        <HiMiniArrowsUpDown className="mb-1 lg:mr-2 lg:mb-0" />
        <span className="hidden sm:block">Transactions</span>
      </NavLink>

      <NavLink
        className={({ isActive }) =>
          isActive
            ? "p-2 flex flex-col lg:flex-row items-center text-ivory-sand font-bold text-center"
            : "p-2 flex flex-col lg:flex-row items-center hover:text-ivory-sand text-center"
        }
        to="/goals"
      >
        <FaSackDollar className="mb-1 lg:mr-2 lg:mb-0" />
        <span className="hidden sm:block">Goals</span>
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "p-2 flex flex-col lg:flex-row items-center text-ivory-sand font-bold text-center"
            : "p-2 flex flex-col lg:flex-row items-center hover:text-ivory-sand text-center"
        }
        to="/recurring_bills"
      >
        <FaRepeat className="mb-1 lg:mr-2 lg:mb-0" />
        <span className="hidden sm:block">Recurring Bills</span>
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "p-2 flex flex-col lg:flex-row items-center text-ivory-sand font-bold text-center"
            : "p-2 flex flex-col lg:flex-row items-center hover:text-ivory-sand text-center"
        }
        to="/settings"
      >
        <IoIosSettings className="mb-1 lg:mr-2 lg:mb-0" />
        <span className="hidden sm:block">Settings</span>
      </NavLink>
      <button
        className="bg-dark-slate-blue text-white rounded-lg px-5 py-3 mb-4 lg:mb-0 "
        onClick={handleLogout}
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
