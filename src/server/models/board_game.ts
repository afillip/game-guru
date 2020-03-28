import { IBoardGame } from '../interfaces/IBoardGame';

export class BoardGame implements IBoardGame {

    name: string;
    
    minNumPlayers: number;

    maxNumPlayers: number;

    description: string;

    version: string;

    // eg: hidden movement, deck building, drafting etc.... maybe we have this as an enum
    kind: string;

    releaseDate: Date;

    photo: string;

    linkToRules: string;

    linkToYoutube: string;
    
    // this could potentially be a link to another Board Game object or just a url or whatever
    expansion: boolean;

    // minutes -> maybe have complex object containing duration for new player, learning etc
    duration: number;

    // potentially an enum -> coop, comptetitive, team, traitor
    playerInteraction: string;

    publisher: string;

    constructor() {

    }
}