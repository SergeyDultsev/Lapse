import useApi from "@shared/utils/useApi";

async function getTierUser(user_id: string) {
    const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/tier/${user_id}`;
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

export default getTierUser;