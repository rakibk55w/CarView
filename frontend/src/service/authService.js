import axiosInstance from "../api/axiosInstance";

let accessToken = null;

let onTokenRefresh = null;

let onLogout = null;

let refreshPromise = null;

export const authService = {
    getAccessToken() {
        return accessToken;
    },

    setAccessToken(token) {
        accessToken = token;

        if (onTokenRefresh) {
            onTokenRefresh(token);
        }
    },

    clearAccessToken() {
        accessToken = null;

        if (onLogout) {
            onLogout();
        }
    },

    setTokenRefreshHandler(callback) {
        onTokenRefresh = callback;
    },

    setLogoutHandler(callback) {
        onLogout = callback;
    },

    async refreshAccessToken() {
        if (!refreshPromise) {
            refreshPromise = axiosInstance
            .post("/auth/refresh-token")
            .then((response) => {
                const newAccessToken = response.data.access_token;

                this.setAccessToken(
                    newAccessToken
                );

                return newAccessToken;
            })
            .finally(() => {
                refreshPromise = null;
            });
        }

        return refreshPromise;
    },
};