import { NavLink } from "react-router-dom";

type NavLinkComponentProps = {
  to: string;
  icon: JSX.Element;
  label: string;
};

const NavLinkComponent: React.FC<NavLinkComponentProps> = ({
  to,
  icon,
  label,
}) => (
  <NavLink
    className={({ isActive }) =>
      isActive
        ? "m-2 flex flex-col lg:flex-row items-center text-ivory-sand font-bold text-center"
        : "m-2 flex flex-col lg:flex-row items-center hover:text-ivory-sand text-center"
    }
    to={to}
  >
    {icon}
    <span className="hidden sm:block">{label}</span>
  </NavLink>
);

export default NavLinkComponent;
