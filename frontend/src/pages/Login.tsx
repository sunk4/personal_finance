import { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";
import landingImage from "../assets/images/landing-image.webp";
import { Helmet } from "react-helmet-async";
import LoginHeader from "../components/login/LoginHeader";

const Login = () => {
  const navigate = useNavigate();
  const { signinRedirect, isAuthenticated } = useAuth();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/transactions");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = (): void => {
    signinRedirect();
  };

  return (
    <main className="h-screen bg-ivory-sand flex flex-col lg:flex-row items-center justify-center p-4 lg:p-12">
      <Helmet>
        <title>Login - Personal Finance App</title>
        <meta
          name="description"
          content="Login to your Personal Finance App account to manage your finances."
        />
      </Helmet>
      <LoginHeader onClick={handleLogin} />
      <img
        src={landingImage}
        alt="Finance Tracker"
        className="w-4/5 lg:w-1/2 mx-auto mb-5 lg:mb-0"
      />
    </main>
  );
};
export default Login;
