import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Notification from '../src/Notification'

storiesOf('Notification', module)
  .add('Notification: default', () => (
    <Notification message={"Hello World"} handleReset={action('Reset message')} />
  ))
