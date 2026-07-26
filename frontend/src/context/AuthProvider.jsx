import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { authService } from "../service/authService"

export default function AuthProvider({ children }) {
    const [accessToken, setAccessToken] = useState(null);
    const [isInitializing, setIsInitializing] = useState(true);
    const [hasLoggedOut, setHasLoggedOut] = useState(false);

    const login = (token) => {
        setAccessToken(token);
        authService.setAccessToken(token);
        setHasLoggedOut(false);
    };

    const updateAccessToken = (token) => {
        setAccessToken(token);
        authService.setAccessToken(token);
    };

    const logout = () => {
        setAccessToken(null);
        authService.clearAccessToken();
        setHasLoggedOut(true);
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
        isAuthenticated: Boolean(accessToken),
        isInitializing,
        hasLoggedOut,
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