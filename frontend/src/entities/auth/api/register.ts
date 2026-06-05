import { IRegister } from '@entities/auth/model/types';

export const register = async (data: IRegister) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}auth/register`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
    });
    
    if (!response.ok || response.statusCode !== 200) {
        console.error(response);
    }
    
    return response.json();
};