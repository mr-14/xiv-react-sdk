import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { SimpleForm, MultiColumnForm } from '../src/Form'
import { Text } from '../src/Field'

const fields = [
  { id: 'fld1', component: Text, props: { label: 'Field 1' } },
  { id: 'fld2', component: Text, props: { label: 'Field 2' } },
  { id: 'fld3', component: Text, props: { label: 'Field 3' } },
  { id: 'fld4', component: Text, props: { label: 'Field 4' } },
  { id: 'fld5', component: Text, props: { label: 'Field 5' } },
  { id: 'fld6', component: Text, props: { label: 'Field 6' } },
]

storiesOf('Form/SimpleForm', module)
  .addDecorator(story => (
    <div style={{ width: 500 }}>
      {story()}
    </div>
  ))
  .add('default', () => {
    return <SimpleForm fields={fields} onFieldChange={action('Field changed')} />
  })

storiesOf('Form/MultiColumnForm', module)
  .addDecorator(story => (
    <div style={{ width: 600 }}>
      {story()}
    </div>
  ))
  .add('default', () => {
    return <MultiColumnForm fields={fields} onFieldChange={action('Field changed')} />
  })  
