import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'board-game-grid',
  styleUrl: 'board-game-grid.scss',
})
export class BoardGameGrid {
  render() {
    return (
      <Host>
        <div class="cell"></div>
        <div class="cell showcase"></div>
        <div class="cell"></div>

        <div class="cell big-left"></div>
        <div class="cell"></div>
        <div class="cell big-right"></div>

        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>

        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>

        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
      </Host>
    );
  }
}
