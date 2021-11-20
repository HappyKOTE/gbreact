import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleCheckbox } from "../../store/profile/actions";
import { Form } from 'react-bootstrap'

function Profile() {
  const checkboxValue = useSelector(state => state.checkbox)
  const name = useSelector(state => state.name)
  const dispatch = useDispatch()

  const handleChange = () => {
    dispatch(toggleCheckbox)
  }

  return (
    <div className="p-3">
      <h1 className="p-0 m-0">профиль</h1>
      <Form className="mt-3">
        <Form.Group className="mb-3" controlId="basicCheckbox">
          <Form.Check type="checkbox" checked={checkboxValue} onChange={handleChange} label={name} />
        </Form.Group>
      </Form>
    </div>
  )
}

export default Profile
