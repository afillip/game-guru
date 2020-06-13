import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'home-page',
  styleUrl: 'home-page.scss',
})
export class HomePage {
  render() {
    return (
      <Host>
        <search-bar />
        {/* <board-game-grid /> */}
      </Host>
    );
  }
}
