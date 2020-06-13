import { ICreateGameResponseBody } from './ICreateGameResponseBody';

export interface ICreateGameResponse {
    data: ICreateGameResponseBody;
    headers: any;
    status: number;
    statusText: string;
}