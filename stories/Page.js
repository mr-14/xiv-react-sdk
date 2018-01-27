import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { SimplePage, ListPage } from '../src/Page'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import AddIcon from 'material-ui-icons/Add'

storiesOf('Page/SimplePage', module)
  .add('default', () => {
    return (
      <SimplePage title='Simple Page Title'>
        <Typography>Simple Page Content</Typography>
      </SimplePage>
    )
  })

storiesOf('Page/ListPage', module)
  .add('default', () => {
    const actions = (
      <IconButton onClick={action('Add clicked')}><AddIcon /></IconButton>
    )
    return (
      <ListPage title='Simple List Page Title' actionPanel={actions}>
        <Typography>Simple List Page Content</Typography>
      </ListPage>
    )
  })
