import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import Navbar from "./components/sharedLayout/Navbar";

const SharedLayout: React.FC = () => {
  const { signoutRedirect } = useAuth();
  const navigate = useNavigate();
  const handleLogout = (): void => {
    signoutRedirect();
  };
  useEffect(() => {
    if (localStorage.getItem("accountId") === null) {
      navigate("/settings");
    }
  }, [navigate]);

  return (
    <div className="flex flex-col-reverse lg:flex-row bg-ivory-sand min-h-screen">
      <Navbar handleLogout={handleLogout} />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};
export default SharedLayout;
