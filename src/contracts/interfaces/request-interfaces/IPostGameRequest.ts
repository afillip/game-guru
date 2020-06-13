import { Request } from 'express';
import { IBoardGame } from '../IBoardGame';

export interface IPostGameRequest extends Request {
    body: IBoardGame;
}