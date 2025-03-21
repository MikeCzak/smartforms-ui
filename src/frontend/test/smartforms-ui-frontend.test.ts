import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import type { SmartformsUiFrontend } from '../src/smartforms-ui-frontend.js';
import '../src/smartforms-ui-frontend.js';

describe('SmartformsUiFrontend', () => {
  let element: SmartformsUiFrontend;
  beforeEach(async () => {
    element = await fixture(
      html`<smartforms-ui-frontend></smartforms-ui-frontend>`,
    );
  });

  it('renders main', () => {
    const main = element.shadowRoot!.querySelector('main')!;
    expect(main).to.exist;
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
