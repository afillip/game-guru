import { IAppendDataRequestValueRange } from './IAppendDataRequestValueRange';
import { ValueInputOption } from '../enums/ValueInputOptionEnum';

export interface IAppendDataRequest {
    spreadsheetId: string;
    range: string;
    resource: IAppendDataRequestValueRange,
    valueInputOption: ValueInputOption
}