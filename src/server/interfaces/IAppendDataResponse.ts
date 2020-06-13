import { IAppendDataResponseBody } from './IAppendDataResponseBody';

export interface IAppendDataResponse {
    data: IAppendDataResponseBody;
    headers: any;
    status: number;
    statusText: string;
}