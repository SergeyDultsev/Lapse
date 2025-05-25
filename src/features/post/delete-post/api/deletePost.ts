import useApi from "@shared/utils/useApi";
import {getCookie} from "cookies-next";

async function deletePost(post_id: string): Promise<void> {
    const API_URL: string = `${process.env.NEXT_PUBLIC_API_URL}/post/${post_id}`;
    const response = await useApi(API_URL, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${getCookie('auth_token')}`,
        },
        credentials: 'include',
        mode: 'cors',
        cache: 'no-store'
    })

    console.log(response.data.data)
    if(response?.data) return { data: response.data.data };
}

export default deletePost;