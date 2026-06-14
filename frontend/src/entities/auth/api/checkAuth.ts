export const checkAuth = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}auth/me`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
    });

    if (!response.ok) {
        console.error(response);
    }

    return response.json();
};