
import { useEffect } from "react";
import axiosPrivate from "../api/axiosPrivate";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
    const { auth } = useAuth();

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                if (auth.accessToken) {
                    config.headers.Authorization =
                        `Bearer ${auth.accessToken}`;
                }

                return config;
            },
            (error) => Promise.reject(error)
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
        };
    }, [auth.accessToken]);

    return axiosPrivate;
};

export default useAxiosPrivate;
