import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { TemporaryDrawer, DrawerHeader } from '../src/Drawer'
import Divider from 'material-ui/Divider'
import { NavList } from '../src/List'
import InboxIcon from 'material-ui-icons/MoveToInbox'
import DraftsIcon from 'material-ui-icons/Drafts'
import SendIcon from 'material-ui-icons/Send'

const navItems = [
  { label: 'Item 1-1', icon: <InboxIcon />, onClick: action('clicked 1-1') },
  {
    label: 'Item 1-2', icon: <DraftsIcon />, onClick: action('clicked 1-2'), divider: true, subItems: [
      { label: 'Item 1-2-1', onClick: action('clicked 1-2-1') },
      { label: 'Item 1-2-2', onClick: action('clicked 1-2-2') },
    ]
  },
  { label: 'Item 2-1', icon: <SendIcon />, onClick: action('clicked 2-1') },
]

storiesOf('Drawer/Temporary', module)
  .add('default', () => (
    <TemporaryDrawer open>
      <NavList items={navItems} />
    </TemporaryDrawer>
  ))
  .add('hidden', () => <TemporaryDrawer>Empty</TemporaryDrawer>)
  .add('with header', () => (
    <TemporaryDrawer open>
      <DrawerHeader label="Header" />
      <Divider />
      <NavList items={navItems} />
    </TemporaryDrawer>
  ))
