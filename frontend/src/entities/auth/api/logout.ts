export const logout = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}auth/logout`;
    const response = await fetch(url, {
        method: 'POST',
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