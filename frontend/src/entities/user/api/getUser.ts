
export const getUser = async (id: string) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
    });

    return response.json();
};