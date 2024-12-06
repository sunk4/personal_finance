import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import SharedLayout from "./SharedLayout";
import { useAuth } from "react-oidc-context";
import NotFound from "./pages/NotFound";
import OverView from "./pages/OverView";
import Transactions from "./pages/Transactions";
import Goals from "./pages/Goals";
import RecurringBills from "./pages/RecurringBills";
import Settings from "./pages/Settings";

const App = () => {
  const auth = useAuth();

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<SharedLayout />}>
            <Route path="/overview" element={<OverView />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/recurring_bills" element={<RecurringBills />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>

        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
