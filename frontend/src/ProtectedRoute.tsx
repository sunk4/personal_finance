import { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
