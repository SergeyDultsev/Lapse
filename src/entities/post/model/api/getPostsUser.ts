import useApi from "@/shared/utils/useApi";

async function getPostsUser(user_id: string): Promise<void>{
    const API_URL : string = `${process.env.NEXT_PUBLIC_API_URL}/post/user/${user_id}`;
    const response = await useApi(API_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        credentials: 'include',
        mode: 'cors',
        cache: 'no-store'
    });

    if(response?.data) return { data: response.data.data };

    return { };
}

export default getPostsUser;