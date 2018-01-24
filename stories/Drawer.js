import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { TemporaryDrawer } from '../src/Drawer'

storiesOf('Drawer', module)
  .add('Temporary Drawer', () => {
    return <TemporaryDrawer open />
  })