import { Request } from 'express';
import { IBoardGame } from '../../../contracts/interfaces/IBoardGame';

export interface ICreateGameRequest extends Request {
  body: Omit<IBoardGame, 'id'>;
}
