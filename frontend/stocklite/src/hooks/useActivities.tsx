import { useQuery } from "@tanstack/react-query"
import type { Activity } from "../api/ActivityApi"
import useAxiosPrivate from "./useAxiosPrivate"

export const useActivities = () => {

    const axiosPrivate = useAxiosPrivate();

    return useQuery ({

        queryKey: ["activities"],
        queryFn: async () => {
            const response = await axiosPrivate.get<Activity[]>("/activities/");
            return response.data;
        }

    })
}