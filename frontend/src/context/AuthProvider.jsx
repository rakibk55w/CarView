import { useState } from "react";
import AuthContext from "./AuthContext";

export default function AuthProvider({ children }) {
    const [accessToken, setAccessToken] = useState(null);

    const login = (token) => {
        setAccessToken(token);
    };

    const logout = () => {
        setAccessToken(null);
    };

    const value = {
        accessToken,
        isAuthenticated: Boolean(accessToken),
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}