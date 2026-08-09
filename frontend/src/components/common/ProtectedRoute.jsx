import useAuth from "../../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom"

export default function ProtectedRoute() {
    const { 
        isAuthenticated, 
        isInitializing, 
    } = useAuth();

    if (isInitializing) {
        return null;
    }

    if (!isAuthenticated) { 
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
};