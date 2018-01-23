import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { ViewTable } from '../src/Table'

storiesOf('ViewTable', module)
  .add('Default', () => {
    const columns = [
      { id: 'col1', label: 'Column 1' },
      { id: 'col2', label: 'Column 2' },
      { id: 'col3', label: 'Column 3' },
    ]
    return <ViewTable columns={columns} />
  })