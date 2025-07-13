import useApi from "@/shared/utils/useApi";
import {getCookie} from "cookies-next";

async function getSubscribers(user_id: string): Promise<void>{
    const API_URL : string = `${process.env.NEXT_PUBLIC_API_URL}/user/${user_id}/subscriptions`;
    const response = await useApi(API_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${getCookie('auth_token')}`
        },
        credentials: 'include',
        mode: 'cors',
        cache: 'no-store'
    });

    if(response?.data.data) return { data: response.data.data };

    return { };
}

export default getSubscribers;