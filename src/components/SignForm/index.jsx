import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

export const SignForm = ({ onSubmit, error, loading }) => {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  const handleSubmit = (value) => {
    value.preventDefault()
    onSubmit(email, pass)
    setEmail('')
    setPass('')
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Control type="text" value={email} onChange={(e) => {setEmail(e.target.value)}} />
        <Form.Control type="password" value={pass} onChange={(e) => {setPass(e.target.value)}} />
        <Button variant="primary" type="submit" disabled={loading}>войти</Button>
      </Form>
      {error && <div>{error}</div>}
    </>
  )
}