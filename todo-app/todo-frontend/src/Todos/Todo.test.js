import React from 'react'
import { render } from '@testing-library/react'
import Todo from './Todo'

test('Single todo renders', () => {
  const todo = {
    text: 'Test it',
    done: false
  }

  const component = render(
    <Todo todo={todo} />
  )

  expect(component.container).toHaveTextContent(
    'Test it'
  )

  expect(component.container).toHaveTextContent(
    'This todo is not done'
  )
})