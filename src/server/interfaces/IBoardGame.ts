export interface IBoardGame {
    name: string;
    minNumPlayers: number;
    maxNumPlayers: number;
    description: string;
    version: string;
    kind: string;
    releaseDate: Date;
    photo: string;
    linkToRules: string;
    linkToYoutube: string;
    expansion: boolean;
    duration: number;
    playerInteraction: string;
    publisher: string;
}