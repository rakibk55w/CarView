let accessToken = null;

let onTokenRefresh = null;

let onLogout = null;

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
};