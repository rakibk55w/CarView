import useAuth from "../../hooks/useAuth";
import { Navigate } from "react-router-dom"

export default function ProtectedRoute({ children }) {
    const { 
        isAuthenticated, 
        isInitializing, 
        hasLoggedOut 
    } = useAuth();

    if (isInitializing) {
        return null;
    }

    if (!isAuthenticated) {
        if (hasLoggedOut) {
            return <Navigate to="/" replace />;
        }
        
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
};