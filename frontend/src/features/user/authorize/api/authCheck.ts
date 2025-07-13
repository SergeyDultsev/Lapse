import useApi from "@shared/utils/useApi";
import { getCookie } from 'cookies-next';

async function authCheck(): Promise<void>{
    const API_URL : string = `${process.env.NEXT_PUBLIC_API_URL}/auth/auth-check`;
    const response = await useApi(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${getCookie('auth_token')}`,
        },
        credentials: 'include',
        mode: 'cors',
        cache: 'no-store'
    });

    if(response?.data) return { data: response.data };

    return false;
}

export default authCheck;