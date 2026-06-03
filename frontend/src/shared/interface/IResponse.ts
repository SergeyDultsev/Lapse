export interface IResponse<DATA> {
    data: DATA,
    statusCode: number;
    message: string,
}