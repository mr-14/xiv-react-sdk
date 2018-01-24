import { configure } from '@storybook/react';

function loadStories() {
  require('../stories/Drawer.js');
  // require('../stories/ViewTable.js');
  // You can require as many stories as you need.
}

configure(loadStories, module);