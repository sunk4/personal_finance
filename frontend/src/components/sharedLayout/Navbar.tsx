import { TbLogout } from "react-icons/tb";
import { navbarData } from "../../data/navbarData";
import NavLinkComponent from "./NavLinkComponent";

type NavbarProps = {
  handleLogout: () => void;
};

const Navbar: React.FC<NavbarProps> = ({ handleLogout }) => {
  return (
    <nav className="bg-dark-slate-blue text-white flex lg:flex-col lg:w-1/5 w-full h-20 sm:h-auto justify-around lg:justify-start lg:items-start p-4 rounded-t-lg lg:rounded-l-none lg:rounded-r-lg">
      <h1 className="text-2xl font-bold  lg:block hidden mx-2">finance</h1>
      {navbarData.map((item, index) => (
        <NavLinkComponent key={index} {...item} />
      ))}
      <button
        className="m-2 flex flex-col lg:flex-row items-center text-ivory-sand font-bold text-center"
        onClick={handleLogout}
      >
        <TbLogout className="mb-1 lg:mr-2 lg:mb-0 text-4xl sm:text-lg" />
        <span className="hidden sm:block">Logout</span>
      </button>
    </nav>
  );
};

export default Navbar;
