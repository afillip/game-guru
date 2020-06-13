import { newE2EPage } from '@stencil/core/testing';

describe('search-bar', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<search-bar></search-bar>');

    const element = await page.find('search-bar');
    expect(element).toHaveClass('hydrated');
  });
});
