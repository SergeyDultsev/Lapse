export interface IResponse<DATA> {
    data: DATA,
    statusCode: number;
    message: string,
}

export interface IPagination<T> {
    data: T,
    meta: {
        totalItems: number,
        page: number,
        limit: number,
        lastPage: number
    }
}