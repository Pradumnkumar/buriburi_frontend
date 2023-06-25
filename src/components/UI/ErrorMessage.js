import React from 'react'
import { Alert } from 'react-bootstrap'

function ErrorMessage({ variant, children }) {
  return (
    <Alert variant={variant}>
      {children}
    </Alert>
  )
}

export default ErrorMessage;