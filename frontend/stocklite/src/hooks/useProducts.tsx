
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";
import type { Product } from "../api/productApi";

export const useProducts = () => {
    const axiosPrivate = useAxiosPrivate();

    return useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const response = await axiosPrivate.get<Product[]>("/products/");
            return response.data;
        }
    });
};
