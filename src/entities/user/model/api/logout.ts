import useApi from "@/shared/utils/useApi";

async function logout(): Promise<void>{
    const API_URL : string = `${process.env.NEXT_PUBLIC_API_URL}//auth/logout`;
    const response = await useApi(API_URL, {
        method: 'POST',
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

export default logout;