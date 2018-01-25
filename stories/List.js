import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { NavList } from '../src/List'
import ChevronRightIcon from 'material-ui-icons/ChevronRight'

storiesOf('List', module)
  .add('NavList: default', () => {
    const items = [
      { label: 'Item 1-1', icon: <ChevronRightIcon />, onClick: action('clicked 1-1') },
      {
        label: 'Item 1-2', icon: <ChevronRightIcon />, onClick: action('clicked 1-2'), divider: true, subItems: [
          {
            label: 'Item 1-2-1', icon: <ChevronRightIcon />, onClick: action('clicked 1-2-1'), subItems: [
              { label: 'Item 1-2-1-1', icon: <ChevronRightIcon />, onClick: action('clicked 1-2-1-1') },
              { label: 'Item 1-2-1-2', icon: <ChevronRightIcon />, onClick: action('clicked 1-2-1-2') },
            ]
          },
          { label: 'Item 1-2-2', icon: <ChevronRightIcon />, onClick: action('clicked 1-2-2') },
        ]
      },
      { label: 'Item 2-1', icon: <ChevronRightIcon />, onClick: action('clicked 2-1') },
      { label: 'Item 2-2', icon: <ChevronRightIcon />, onClick: action('clicked 2-2') },
    ]
    return <NavList items={items} />
  })
