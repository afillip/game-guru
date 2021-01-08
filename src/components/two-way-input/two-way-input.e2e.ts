import { newE2EPage } from '@stencil/core/testing';

describe('x-two-way-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<x-two-way-input></x-two-way-input>');

    const element = await page.find('x-two-way-input');
    expect(element).toHaveClass('hydrated');
  });
});
