import { newE2EPage } from '@stencil/core/testing';

describe('board-game-grid', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<board-game-grid></board-game-grid>');

    const element = await page.find('board-game-grid');
    expect(element).toHaveClass('hydrated');
  });
});
