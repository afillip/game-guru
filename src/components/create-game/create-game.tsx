import { Component, Host, h, Listen } from '@stencil/core';
import { createGame } from '../../api';
import { BoardGameInteraction, BoardGameKind } from '../../contracts/enums';
import { IBoardGame } from '../../contracts/interfaces/IBoardGame';

@Component({
  tag: 'create-game',
  styleUrl: 'create-game.scss',
})
export class CreateGame {
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

  expansion: boolean;

  avgDuration: number;

  firstPlaythroughDuration: number;

  @Listen('inputChange')
  onInputChange(evt: CustomEvent<{ [K in keyof IBoardGame]: string }>) {
    const key = Object.keys(evt.detail)[0];
    this[key] = evt.detail[key];
  }

  postGame() {
    createGame({
      name: this.name,
      minNumPlayers: this.minNumPlayers,
      maxNumPlayers: this.maxNumPlayers,
      description: this.description,
      teacherNotes: this.teacherNotes,
      version: this.version,
      kind: this.kind,
      releaseDate: this.releaseDate,
      photos: this.photos,
      linkToRules: this.linkToRules,
      linkToYoutube: this.linkToYoutube,
      expansion: this.expansion,
      avgDuration: this.avgDuration,
      firstPlaythroughDuration: this.firstPlaythroughDuration,
      playerInteraction: this.playerInteraction,
      publisher: this.publisher,
    });
  }

  render() {
    return (
      <Host>
        <h3>Add a new board game</h3>

        <form>
          <two-way-input name="name" data-label="Name" />
          <span />
          <two-way-input name="minNumPlayers" type="number" data-label="Min players" />
          <two-way-input name="maxNumPlayers" type="number" data-label="Max players" />
          {/* prettier-ignore */}
          <two-way-input name="description" type="textarea" data-label="Description" class="textarea" />
          {/* prettier-ignore */}
          <two-way-input name="teacherNotes" type="textarea" data-label="Notes for teaching" class="textarea" />
          <two-way-input name="avgDuration" type="number" data-label="Average duration" />
          {/* prettier-ignore */}
          <two-way-input name="firstPlaythroughDuration" type="number" data-label="New player duration" />
          <choice-from-enum enum={BoardGameKind} data-label="Kind of game" />
          <choice-from-enum enum={BoardGameInteraction} data-label="Player interaction" />
          <two-way-input name="version" data-label="Version" />
          <two-way-input name="releaseDate" type="date" data-label="Release date" />
          <two-way-input name="publisher" data-label="Publisher" />
          <two-way-input name="photos" data-label="Photo(s)" />
          <two-way-input name="linkToRules" data-label="Link to rules" />
          <two-way-input name="linkToYoutube" data-label="Link to PDF" />
          <two-way-input name="expansion" type="checkbox" data-label="Has expansions?" />
        </form>
      </Host>
    );
  }
}
