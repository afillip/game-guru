import { Controller, Get, Post } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { Request, Response } from 'express';
import { GoogleSheetAPIAuth } from '../models/google_sheets_api';
import { IGoogleSheetsAPI } from '../interfaces/IGoogleSheetsApi';
import { ListValueFormat } from '../interfaces/IAppendDataRequestValueRange';
import { ValueInputOption } from '../enums/ValueInputOptionEnum';
import { IGetGamesResponse } from '../interfaces/IGetGamesResponse';
import { BoardGame } from '../models/board_game';
import { GameModelToIndexRefEnum } from '../enums/GameModelToIndexRefEnum';
import { Generator } from '../common/generator';
import { IBoardGame } from '../../contracts/interfaces/IBoardGame';
import { ICreateGameRequest } from '../interfaces/requests/ICreateGameRequest';
import { IAppendDataRequest } from '../interfaces/IAppendDataRequest';
import { IAppendDataResponse } from '../interfaces/IAppendDataResponse';
import { ICreateGameResponse } from '../interfaces/responses/ICreateGameResponse';

@Controller('api/games')
export class GameController {

    public googleSheetsApi: IGoogleSheetsAPI;
    private readonly _GAME_DATA_RANGE: string = `GameData!A2:Q`;
    private readonly _EXPANSION_DATA_RANGE: string = 'ExpansionData!A2:C';

    constructor() {
        this.googleSheetsApi = new GoogleSheetAPIAuth();
    }

    @Post()
    private async _createGame(req: ICreateGameRequest, res: Response) {

        const boardGame: IBoardGame = req.body;

        const values: ListValueFormat = [this._hydrateListValueArrayFromBoardGame(boardGame)];

        const request: IAppendDataRequest = {
            spreadsheetId: this.googleSheetsApi.spreadsheetId,
            range: this._GAME_DATA_RANGE,
            resource: { values },
            valueInputOption: ValueInputOption.USER_ENTERED
        };

        try {
            const response: IAppendDataResponse = await this.googleSheetsApi.sheetsAccess.spreadsheets.values.append(request)
            
            if (response.status === 200) {
                const responseBody: ICreateGameResponse = response.data;
                console.log(responseBody);
                res.status(200).send(responseBody);
            } else {
                Logger.Err(response.statusText, true);
                res.status(400).json({error: 'Error'})
            }

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

            const response: IGetGamesResponse = await this.googleSheetsApi.sheetsAccess.spreadsheets.values.get({
                spreadsheetId: this.googleSheetsApi.spreadsheetId,
                range: this._GAME_DATA_RANGE,
            });

            if (response.status === 200) {

                const rows = response.data.values;

                if (rows.length) {

                    const response = rows.map((row) => {
                        let boardGame = new BoardGame();
                        boardGame.hydrateFromListValueArray(row);
                        return boardGame;
                    });

                    return res.status(200).json({response});
                } 

            }

            Logger.Err(response.statusText, true);
            return res.status(400).json({
                error: 'Error',
            });
            
        } catch (error) {
            console.log('The API returned an error: ' + error);
            return res.status(400).json({error});
        }

    }

    // TODO: do this the right way by querying only one row in the DB
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


    // UTILITIES

    private _hydrateListValueArrayFromBoardGame(boardGame: IBoardGame): Array<any> {
        
        const listValue: Array<any> = [];

        listValue[GameModelToIndexRefEnum.id] = Generator.getGuid();
        listValue[GameModelToIndexRefEnum.name] = boardGame.name;
        listValue[GameModelToIndexRefEnum.minNumPlayers] = boardGame.minNumPlayers;
        listValue[GameModelToIndexRefEnum.maxNumPlayers] = boardGame.maxNumPlayers;
        listValue[GameModelToIndexRefEnum.expansion] = boardGame.expansion;
        listValue[GameModelToIndexRefEnum.description] = boardGame.description;
        listValue[GameModelToIndexRefEnum.teacherNotes] = boardGame.teacherNotes;
        listValue[GameModelToIndexRefEnum.version] = boardGame.version;
        listValue[GameModelToIndexRefEnum.kind] = boardGame.kind ? boardGame.kind.join(',') : '';
        listValue[GameModelToIndexRefEnum.releaseDate] = boardGame.releaseDate;
        listValue[GameModelToIndexRefEnum.photos] = boardGame.photos ? boardGame.photos.join(',') : '';
        listValue[GameModelToIndexRefEnum.linkToRules] = `https://lmgtfy.com/?q=how+to+play+${boardGame.name.replace (' ', '')}`;
        listValue[GameModelToIndexRefEnum.linkToYoutube] = boardGame.linkToYoutube;
        listValue[GameModelToIndexRefEnum.playerInteraction] = boardGame.playerInteraction;
        listValue[GameModelToIndexRefEnum.publisher] = boardGame.publisher;
        listValue[GameModelToIndexRefEnum.avgDuration] = boardGame.avgDuration;
        listValue[GameModelToIndexRefEnum.firstPlaythroughDuration] = boardGame.firstPlaythroughDuration;

        return listValue;
    }

    private _hydrateBoardGameFromListValueArray
}
