import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import MaterialForm from '../src/components/form-renderer/material-form.js';



describe('Material Form', () => {
  let element: MaterialForm;

  const mc: Object =
    {
      "name": "country1",
      "type": "choice",
      "label": "Country",
      "options": ["Austria", "Canada", "Germany", "UK", "France"],
      "required": false,
      "selectionType": "multiple"
    }

    const sc: Object =
    {
      "name": "country2",
      "type": "choice",
      "label": "Country",
      "options": ["Austria", "Canada", "Germany", "UK", "France"],
      "required": true,
      "selectionType": "single"
    }
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
