import { ISheetsAccess } from './ISheetsAccess';

export interface IGoogleSheetsAPI {
    sheetsAccess: ISheetsAccess;
    spreadsheetId: string;
}