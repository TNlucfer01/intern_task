import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthPage } from "../page/AuthPage";
import { dashBoard as DashboardPage } from "../page/dashBoard";
import { homePage as HomePage } from "../page/homePage";
import PublicRoutes from "./publicRouter";
import PrivateRoutes from "./protectedRoutes";

const NotFound = () => <div>Page not found</div>;
const TempPlaceholder = () => <div>Temporary placeholder</div>;

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/auth" element={<AuthPage />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
        <Route path="/" element={<TempPlaceholder />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}