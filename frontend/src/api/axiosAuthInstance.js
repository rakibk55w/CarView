import axios from "axios";
// import axiosInstance from "./axiosInstance";
import { authService } from "../service/authService";

const axiosAuthInstance = axios.create({
    baseURL: "http://localhost:5431/api",
    withCredentials: true,
});

// let isRefreshing = false;

// let failedQueue = [];

// const processQueue = (error, token = null) => {
//     failedQueue.forEach((promise) => {
//         if (error) {
//             promise.reject(error);
//         } else {
//             promise.resolve(token);
//         }
//     });

//     failedQueue = [];
// };

axiosAuthInstance.interceptors.request.use(
    (config) => {
        const accessToken = authService.getAccessToken();

        if (accessToken) {
            config.headers.Authorization =
                `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosAuthInstance.interceptors.response.use(
    (response) => {
        return response;
    },

    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status !== 401 ||
            !authService.getAccessToken() ||
            originalRequest._retry
        ) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

    //     if (isRefreshing) {
    //         return new Promise((resolve, reject) => {
    //             failedQueue.push({
    //                 resolve,
    //                 reject,
    //             });
    //         }).then((token) => {
    //             originalRequest.headers.Authorization =
    //                 `Bearer ${token}`;

    //             return axiosAuthInstance(originalRequest);
    //         });
    //     }

    //     isRefreshing = true;

    //     try {
    //         const newAccessToken = await authService.refreshAccessToken();

    //         processQueue(
    //             null,
    //             newAccessToken
    //         );

    //         originalRequest.headers.Authorization =
    //             `Bearer ${newAccessToken}`;

    //         return axiosAuthInstance(
    //             originalRequest
    //         );

    //     } catch (refreshError) {
    //         processQueue(refreshError);

    //         authService.clearAccessToken();

    //         return Promise.reject(refreshError);

    //     } finally {
    //         isRefreshing = false;
    //     }
        try {
            const newAccessToken = await authService.refreshAccessToken();

            originalRequest.headers.Authorization =
                `Bearer ${newAccessToken}`;

            return axiosAuthInstance(
                originalRequest
            );

        } catch (refreshError) {
            authService.clearAccessToken();

            return Promise.reject(
                refreshError
            );
        }
    }
);

export default axiosAuthInstance;