import { configure } from '@storybook/react';

function loadStories() {
  require('../stories/Drawer.js');
  require('../stories/List.js');
  require('../stories/Bar.js');
  require('../stories/Popover.js');
  require('../stories/Table.js');
  // require('../stories/Field.js');
  require('../stories/Notification.js');
}

configure(loadStories, module);