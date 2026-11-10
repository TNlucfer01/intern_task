import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";


function PrivateRoutes() {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (!isAuthenticated) {
        return <Navigate to="/auth" state={{ from: location }} replace />;
    }
    return <Outlet />;
}

export default PrivateRoutes;