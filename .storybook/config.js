import { configure } from '@storybook/react';

function loadStories() {
  require('../stories/Drawer.js');
  require('../stories/List.js');
  require('../stories/Bar.js');
  require('../stories/Popover.js');
  // require('../stories/ViewTable.js');
}

configure(loadStories, module);