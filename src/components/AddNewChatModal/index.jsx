import React, { useRef, useState, useEffect } from 'react'
import { Button, InputGroup, Form, Modal } from 'react-bootstrap'
import { currentDateTime } from '../../utils/currentDateTime'
import { useSelector, useDispatch } from "react-redux"
import { addChat } from "../../store/chats/actions"

function AddNewChatModal(props) {
  const [newChatName, setNewChatName] = useState('')
  const chats = useSelector(state => state.chats.chats)
  const dispatch = useDispatch()
  const newChatsInput = useRef()

  const createNewChatId = () => {
    let errors = 0
    const uuid = `f${(~~(Math.random()*1e8)).toString(16)}`
    for (let i = 0; i === chats.length; i++) {
      if (uuid === chats[i].chatId) {
        errors++
      }
    }
    if (errors === 0) {
      return uuid
    } else {
      createNewChatId()
    }
  }

  useEffect(() => {
    newChatsInput.current?.focus()
  },
  // eslint-disable-next-line
  [props.showAddChatModal])

  const saveNewChat = (event) => {
    if (newChatName) {
      const chatId = createNewChatId()
      const object = {
        'chatName': newChatName,
        'id': chatId,
        'chatLog': [
          {
            'authorName': 'system',
            'message': 'Добро пожаловать в новый чат',
            'timestamp': currentDateTime()
          }
        ]
      }
      dispatch(addChat(object))
      props.setShowAddChatModal(false)
      setNewChatName('')
    }
    event.preventDefault()
  }

  return (
    <Modal show={props.showAddChatModal} onHide={()=> props.setShowAddChatModal(false)}>
      <Modal.Body>
        <Form onSubmit={saveNewChat}>
          <InputGroup>
            <Form.Control
              type="text"
              className="border-0 rounded bg-transparent"
              placeholder="имя нового чата"
              value={newChatName}
              onChange={(event)=> setNewChatName(event.target.value)}
              ref={newChatsInput}
            />
            <Button variant="primary" type="submit" className="rounded border-0 ms-2">добавить</Button>
          </InputGroup>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default AddNewChatModal
