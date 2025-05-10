const useApi = async (url: string, option?: RequestInit) => {
    let data: object|null = null;
    let isLoading: boolean = true;
    let error: string = "";

    try {
        const response = await fetch(url, option);
        data = await response.json();

        if (!response.ok) {
            console.error('Ошибка сервера:', data);
            return;
        }
    } catch (e) {
        if(e instanceof Error) error = e.message;
    } finally {
        isLoading = false;
    }

    return {data, isLoading, error}
}

export default useApi;