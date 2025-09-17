import './storybook.scss';
import type { Preview } from '@storybook/react-vite';
import '../src/components/styles/index.scss';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    options: {
      storySort: {
        order: ['Welcome', 'Charts', 'Legend'],
      },
    },
  },

  tags: ['autodocs'],
};
export default preview;
