import React from 'react'
import { Message } from 'semantic-ui-react'

interface Props {
  errors: any
}
const ValidationErrors: React.FC<Props> = ({ errors }) => {
  return (
    <Message error>
      {errors.length>0 && (
        <Message.List>
          {errors.map((err: any, index:any) => (
            <Message.Item key={index}>
              {err}
            </Message.Item>
          ))}
        </Message.List>
      )}
    </Message>
  )
}

export default ValidationErrors
