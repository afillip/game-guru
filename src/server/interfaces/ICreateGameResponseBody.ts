export interface ICreateGameResponseBody {
    spreadsheetId: string,
    tableRange: string,
    updates: IUpdateValuesResponse
}

interface IUpdateValuesResponse {
    spreadsheetId: string;
    updatedRange: string;
    updatedRows: number;
    updatedColumns: number;
    updatedCells: number;
}