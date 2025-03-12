import { html, TemplateResult } from 'lit';
import '../src/smartforms-ui-frontend.js';

export default {
  title: 'SmartformsUiFrontend',
  component: 'smartforms-ui-frontend',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  header: string;
  backgroundColor?: string;
}

const Template: Story<ArgTypes> = ({
  header,
  backgroundColor = 'white',
}: ArgTypes) => html`
  <smartforms-ui-frontend
    style="--smartforms-ui-frontend-background-color: ${backgroundColor}"
    .header=${header}
  ></smartforms-ui-frontend>
`;

export const App = Template.bind({});
App.args = {
  header: 'My app',
};
