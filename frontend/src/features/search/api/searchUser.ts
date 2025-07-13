import useApi from "@/shared/utils/useApi";
import {getCookie} from "cookies-next";

async function searchUser(query: string): Promise<void>{
    const API_URL : string = `${process.env.NEXT_PUBLIC_API_URL}/search/user?query=${query}`;
    const response = await useApi(API_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${getCookie('auth_token')}`,
        },
        credentials: 'include',
        mode: 'cors',
        cache: 'no-store'
    });

    if (response?.data) return { data: response.data.data };

    return { };
}

export default searchUser;