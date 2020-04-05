export interface ICreateGameResponse {
    data: ICreateGameResponseBody;
    headers: any;
    status: number;
    statusText: string;
}

export interface ICreateGameResponseBody {
    spreadsheetId: string,
    tableRange: string,
    updates: IUpdateValuesResponse
}

export interface IUpdateValuesResponse {
    spreadsheetId: string;
    updatedRange: string;
    updatedRows: number;
    updatedColumns: number;
    updatedCells: number;
}