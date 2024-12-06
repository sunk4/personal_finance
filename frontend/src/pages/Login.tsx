import { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";
import landingImage from "../assets/images/landing-image.webp";

const Login = () => {
  const navigate = useNavigate();
  const { signinRedirect, isAuthenticated } = useAuth();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/overview");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = (): void => {
    signinRedirect();
  };

  return (
    <main className="h-screen bg-ivory-sand flex flex-col lg:flex-row items-center justify-center p-4 lg:p-12">
      <section className="text-center w-4/5 lg:w-1/2">
        <h1 className="text-4xl font-bold mb-5">Personal Finance App</h1>
        <p className="text-xl mb-5">
          Track your finances effortlessly with our app. Manage your expenses,
          set budgets, and achieve your financial goals.
        </p>
        <button
          onClick={handleLogin}
          className="bg-dark-slate-blue text-white rounded-lg px-8 py-3"
        >
          Login
        </button>
      </section>
      <img
        src={landingImage}
        alt="Finance Tracker"
        className="w-4/5 lg:w-1/2 mx-auto mb-5 lg:mb-0"
      />
    </main>
  );
};
export default Login;
