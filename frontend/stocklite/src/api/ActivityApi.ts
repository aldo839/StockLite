import api from "./axios";

export interface Activity {
    id: number,
    description: string,
    dataTime: string,
    type: ActivityType
}

export type ActivityType = "GET_ALL_PRODUCT" | "CREATE_PRODUCT" | "UPDATE_PRODUCT" | "DELETE_PRODUCT" | "ADD_PRODUCT" | "REMOVE_PRODUCT" | "GET_PRODUCT_BY_ID";

export const fetchActivities = async () => {

    const response = await api.get<Activity[]>('/activities/');

    return response.data;
}

