import { ICreateGameRequestValueRange } from './ICreateGameRequestValueRange';
import { ValueInputOption } from '../enums/ValueInputOptionEnum';

export interface ICreateGameRequest {
    spreadsheetId: string;
    range: string;
    resource: ICreateGameRequestValueRange,
    valueInputOption: ValueInputOption
}