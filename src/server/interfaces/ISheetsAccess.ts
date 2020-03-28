import { ISheetValueMethods } from './ISheetValueMethods';

export interface ISheetsAccess {
    spreadsheets: {values: ISheetValueMethods};
}