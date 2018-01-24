import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { NavList } from '../src/List'
import SendIcon from 'material-ui-icons/Send'

storiesOf('List', module)
  .add('NavList: default', () => {
    const groups = [
      [
        { label: 'Item 1-1', icon: <SendIcon />, onClick: action('clicked 1-1') },
        {
          label: 'Item 1-2', icon: <SendIcon />, onClick: action('clicked 1-2'), subItems: [
            [
              { label: 'Item 1-2-1', icon: <SendIcon />, onClick: action('clicked 1-2-1') },
              { label: 'Item 1-2-2', icon: <SendIcon />, onClick: action('clicked 1-2-2') },
            ]
          ]
        },
      ],
      [
        { label: 'Item 2-1', icon: <SendIcon />, onClick: action('clicked 2-1') },
        { label: 'Item 2-2', icon: <SendIcon />, onClick: action('clicked 2-2') },
      ],
    ]
    return <NavList groups={groups} />
  })
