import { useAuth } from "react-oidc-context";

const OverView = () => {
  const { user } = useAuth();

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, {user?.profile.name}!</p>
    </div>
  );
};

export default OverView;
