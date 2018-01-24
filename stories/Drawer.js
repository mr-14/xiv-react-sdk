import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { TemporaryDrawer, DrawerHeader } from '../src/Drawer'
import Divider from 'material-ui/Divider'

storiesOf('Drawer', module)
  .add('Temporary: default', () => <TemporaryDrawer open />)
  .add('Temporary: hidden', () => <TemporaryDrawer />)
  .add('Temporary: with header', () => (
    <TemporaryDrawer open>
      <DrawerHeader label="Header" />
      <Divider />
    </TemporaryDrawer>
  ))
