import { navbarData } from "../../data/navbarData";
import NavLinkComponent from "./NavLinkComponent";

type NavbarProps = {
  handleLogout: () => void;
};

const Navbar: React.FC<NavbarProps> = ({ handleLogout }) => {
  return (
    <nav className="bg-dark-slate-blue text-white flex lg:flex-col lg:w-1/5 w-full h-16 sm:h-auto justify-around lg:justify-start lg:items-start p-4 rounded-t-lg lg:rounded-l-none lg:rounded-r-lg">
      <h1 className="text-2xl font-bold p-2 lg:block hidden">finance</h1>
      {navbarData.map((item, index) => (
        <NavLinkComponent key={index} {...item} />
      ))}
      <button
        className="bg-dark-slate-blue text-white rounded-lg px-5 py-3 mb-4 lg:mb-0"
        onClick={handleLogout}
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
