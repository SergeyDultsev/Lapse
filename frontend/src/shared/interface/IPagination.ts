export interface IPagination<T> {
    data: T,
    meta: {
        totalItems: number,
        page: number,
        limit: number,
        lastPage: number
    }
}