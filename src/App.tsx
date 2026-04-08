import { BrowserRouter as Router, useRoutes } from "react-router";
import app_routes from "./routes";
import { ToastProvider } from "./components/shared";


function AppRoutes() {
  const routes = useRoutes([...app_routes]);

  return routes;
}

export default function App() {
  return (
    <Router>
      <ToastProvider />
      <AppRoutes />
    </Router>
  );
}
