import useApi from "@/shared/utils/useApi";
import CreatePostStore from "@/features/post/create-post/store/CreatePostStore";
import {getCookie} from "cookies-next";

async function createPost(): Promise<void>{
    const API_URL : string = `${process.env.NEXT_PUBLIC_API_URL}/post/`;
    const formData = new FormData();

    Object.entries(CreatePostStore.dataForm).forEach(([key, value]) => {
        if (value instanceof File) {
            formData.append(key, value);
        } else if (value !== null && value !== undefined) {
            formData.append(key, value.toString());
        }
    });

    const response = await useApi(API_URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${getCookie('auth_token')}`
        },
        body: formData,
        credentials: 'include',
        mode: 'cors',
        cache: 'no-store'
    });

    if (response?.data) return { data: response.data.data };

    return {};
}

export default createPost;