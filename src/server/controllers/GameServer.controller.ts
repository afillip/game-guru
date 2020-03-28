import { Controller, Get, Post } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { Request, Response } from 'express';
import { GoogleSheetAPIAuth } from '../models/google_sheets_api';
import { IGoogleSheetsAPI } from '../interfaces/IGoogleSheetsApi';

@Controller('api/games')
export class GameController {

    public googleSheetsApi: IGoogleSheetsAPI;

    constructor() {
        this.googleSheetsApi = new GoogleSheetAPIAuth();
    }

    @Post()
    private async _createGame(req: Request, res: Response) {

        const values: Array<Array<string | number | boolean>> = [
            ["auto entered", 2, (Math.random() * 5).toFixed()],
        ];
        const resource = {
            values
        };

        const request = {
            spreadsheetId: this.googleSheetsApi.spreadsheetId,
            range: 'GameData!A2:C',
            resource,
            valueInputOption: 'USER_ENTERED'
        };

        try {
            const response = await this.googleSheetsApi.sheetsAccess.spreadsheets.values.append(request)
    
            console.log(response.data);
            res.status(200).send(response.statusText);
            
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                error: error.message,
            });
        }
    }

    @Get()
    private async _getGames(req: Request, res: Response) {

        console.log(req.body);

        try {

            const response = await this.googleSheetsApi.sheetsAccess.spreadsheets.values.get({
                spreadsheetId: this.googleSheetsApi.spreadsheetId,
                range: 'GameData!A2:C',
            });

            const rows = response.data.values;

            if (rows.length) {
                // Print columns A and C, which correspond to indices 0 and 2.
                rows.map((row) => {
                    console.log(`${row[0]}, ${row[2]}`);
                });
                return res.status(200).json({
                    message: rows,
                });
            } else {
                console.log('No data found.');
                Logger.Err(response.statusText, true);
                return res.status(400).json({
                    error: 'Error',
                });
            }
            
        } catch (error) {
            console.log('The API returned an error: ' + error);
        }

    }

    @Get(':name')
    private async _getGame(req: Request, res: Response) {

        const { name } = req.params;

        try {
            
            const response = await this.googleSheetsApi.sheetsAccess.spreadsheets.values.get({
                spreadsheetId: this.googleSheetsApi.spreadsheetId,
                range: 'GameData!A2:C',
            });
    
            const rows = response.data.values;

            if (rows.length) {

                let foundRow = rows.filter((row) => {
                    let gameName:string = row[0];
                    console.log(gameName);
                    return gameName.toLowerCase() === name.toLowerCase();
                })

                return res.status(200).json({
                    message: foundRow[0],
                });
            } else {
                console.log('No data found.');

            }

        } catch (error) {
            console.log('The API returned an error: ' + error);
            Logger.Err(error, true);
            return res.status(400).json({
                error: 'ERROR',
            });
        }
    }
}
