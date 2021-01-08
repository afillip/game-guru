import { BoardGameInteraction, BoardGameKind } from '../enums';

export interface IBoardGame {
  id: string;
  name: string;
  minNumPlayers: number;
  maxNumPlayers: number;
  description: string;
  teacherNotes: string;
  version: string;
  kind: BoardGameKind[];
  releaseDate: Date;
  photos: string[];
  linkToRules: string;
  linkToYoutube: string;
  playerInteraction: BoardGameInteraction;
  publisher: string;

  /**
   * This will reference whether or not the game contains expansions
   * if it does, those references will be in another table
   */
  expansion: boolean;

  /**
   *
   * number of minutes a typical playthrough would take
   */
  avgDuration: number;

  /**
   *
   * number of minutes it would take new players to play through game
   */
  firstPlaythroughDuration: number;
}
