import { DimensionEnum } from '../enums/DimensionEnum';
import { ListValueFormat } from './ICreateGameRequestValueRange';

export interface IGetGamesResponse {
    data: IGetGamesResponseBody;
    headers: any;
    status: number;
    statusText: string;
}

export interface IGetGamesResponseBody {
    range: string;
    majorDimension: DimensionEnum;
    values: ListValueFormat;
}