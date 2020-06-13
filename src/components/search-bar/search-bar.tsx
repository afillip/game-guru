import { Component, Host, h } from '@stencil/core';
import { BoardGameInteraction, BoardGameKind } from '../../contracts/enums';

@Component({
  tag: 'search-bar',
  styleUrl: 'search-bar.scss',
})
export class SearchBar {
  render() {
    return (
      <Host>
        <input class="" type="text" />
        <button>Search</button>
        <details>
          <summary>Advanced</summary>
          <choice-from-enum
            enum={BoardGameInteraction}
            legend="Interaction"
            form-field="player-interaction"
          />
          <choice-from-enum
            enum={BoardGameKind}
            legend="Game mechanics"
            form-field="game-mechanics"
          />
        </details>
      </Host>
    );
  }
}
