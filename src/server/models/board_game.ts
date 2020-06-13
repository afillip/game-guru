import { IBoardGame } from '../../contracts/interfaces/IBoardGame';
import { BoardGameInteraction, BoardGameKind } from '../../contracts/enums';
import { GameModelToIndexRefEnum } from '../enums/GameModelToIndexRefEnum';

export class BoardGame implements IBoardGame {
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

  expansion: boolean;

  avgDuration: number;

  firstPlaythroughDuration: number;

  playerInteraction: BoardGameInteraction;

  publisher: string;

  constructor() {}

  public hydrateFromListValueArray(listValue: any[]) {
    this.id = listValue[GameModelToIndexRefEnum.id];
    this.name = listValue[GameModelToIndexRefEnum.name];
    this.minNumPlayers = listValue[GameModelToIndexRefEnum.minNumPlayers];
    this.maxNumPlayers = listValue[GameModelToIndexRefEnum.maxNumPlayers];
    this.expansion = listValue[GameModelToIndexRefEnum.expansion];
    this.description = listValue[GameModelToIndexRefEnum.description];
    this.teacherNotes = listValue[GameModelToIndexRefEnum.teacherNotes];
    this.version = listValue[GameModelToIndexRefEnum.version];
    this.kind = listValue[GameModelToIndexRefEnum.kind].split(',');
    this.releaseDate = listValue[GameModelToIndexRefEnum.releaseDate];
    this.photos = listValue[GameModelToIndexRefEnum.photos].split(',');
    this.linkToRules = listValue[GameModelToIndexRefEnum.linkToRules];
    this.linkToYoutube = listValue[GameModelToIndexRefEnum.linkToYoutube];
    this.playerInteraction =
      listValue[GameModelToIndexRefEnum.playerInteraction];
    this.publisher = listValue[GameModelToIndexRefEnum.publisher];
    this.avgDuration = listValue[GameModelToIndexRefEnum.avgDuration];
    this.firstPlaythroughDuration =
      listValue[GameModelToIndexRefEnum.firstPlaythroughDuration];
  }
}
