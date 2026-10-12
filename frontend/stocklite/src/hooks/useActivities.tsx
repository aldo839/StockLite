import { useQuery } from "@tanstack/react-query"
import { fetchActivities } from "../api/ActivityApi"

export const useActivities = () => {

    return useQuery ({

        queryKey: ["activities"],
        queryFn: fetchActivities
        
    })
}