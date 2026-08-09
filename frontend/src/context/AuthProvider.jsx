import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { authService } from "../service/authService";
import decodeAccessToken from "../utils/decodeAccessToken";

export default function AuthProvider({ children }) {
    const [accessToken, setAccessToken] = useState(null);
    const [isInitializing, setIsInitializing] = useState(true);


    const getUserFromToken = (token) => {
        const decodedToken = decodeAccessToken(token);

        if (!decodedToken) {
            return null;
        }

        return {
            id: decodedToken.id,
            role: decodedToken.role,
        };
    };

    const user = getUserFromToken(accessToken);

    const login = (token) => {
        setAccessToken(token);
        authService.setAccessToken(token);
    };

    const updateAccessToken = (token) => {
        setAccessToken(token);
        authService.setAccessToken(token);
    };

    const logout = () => {
        setAccessToken(null);
        authService.clearAccessToken();
    };

    useEffect(() => {
        authService.setTokenRefreshHandler(
            (token) => {
                setAccessToken(token);
            }
        );

        authService.setLogoutHandler(
            () => {
                setAccessToken(null);
            }
        );

        return () => {
            authService.setTokenRefreshHandler(null);
            authService.setLogoutHandler(null);
        };
    }, []);

    useEffect(() => {
        const restoreSession = async () => {
            try {
                await authService.refreshAccessToken();
            } catch {
                authService.clearAccessToken();
            } finally {
                setIsInitializing(false);
            }
        };

        restoreSession();
    }, []);

    const value = {
        accessToken,
        user,
        isAuthenticated: Boolean(accessToken),
        isInitializing,
        login,
        updateAccessToken,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}