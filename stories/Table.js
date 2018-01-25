import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { ViewTable } from '../src/Table'

const columns = [
  { id: 'col1', label: 'Col 1' },
  { id: 'col2', label: 'Col 2' },
  { id: 'col3', label: 'Col 3' },
]

const values = [
  { col1: 'val 1-1', col2: 'val 1-2', col3: 'val 1-3' },
  { col1: 'val 2-1', col2: 'val 2-2', col3: 'val 2-3' },
  { col1: 'val 3-1', col2: 'val 3-2', col3: 'val 3-3' },
]

storiesOf('Table', module)
  .add('ViewTable: default', () => {
    return <ViewTable columns={columns} values={values} />
  })
