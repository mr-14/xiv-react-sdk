import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { AppBar } from '../src/Bar'
import MenuIcon from 'material-ui-icons/Menu'
import LocalPostOfficeIcon from 'material-ui-icons/LocalPostOffice'
import NearMeIcon from 'material-ui-icons/NearMe'
import IconButton from 'material-ui/IconButton'

storiesOf('Bar', module)
  .add('AppBar: default', () => {
    return <AppBar title="My App Bar" />
  })
  .add('AppBar: with menu', () => {
    const menuButton = (
      <IconButton
        color="inherit"
        onClick={action('Menu clicked')}
      >
        <MenuIcon />
      </IconButton>
    )
    return <AppBar title="My App Bar" leftToolbar={menuButton} />
  })
  .add('AppBar: with actions', () => {
    const actions = (
      <div>
        <IconButton
          color="inherit"
          onClick={action('Location clicked')}
        >
          <NearMeIcon />
        </IconButton>
        <IconButton
          color="inherit"
          onClick={action('Mail clicked')}
        >
          <LocalPostOfficeIcon />
        </IconButton>
      </div>
    )
    return <AppBar title="My App Bar" rightToolbar={actions} />
  })
