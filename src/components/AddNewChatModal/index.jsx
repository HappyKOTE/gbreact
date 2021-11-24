import React, { useState } from 'react'
import { Button, InputGroup, Form, Modal } from 'react-bootstrap'
import { currentDateTime } from '../../utils/currentDateTime'

function AddNewChatModal(props) {
  const [newChatName, setNewChatName] = useState('')

  const createNewChatId = () => {
    let errors = 0
    const uuid = `f${(~~(Math.random()*1e8)).toString(16)}`
    for (let i = 0; i === props.chats.length; i++) {
      if (uuid === props.chats[i].chatId) {
        errors++
      }
    }
    if (errors === 0) {
      return uuid
    } else {
      createNewChatId()
    }
  }

  const saveNewChat = (event) => {
    if (newChatName) {
      const chatId = createNewChatId()
      const object = {
        'chatName': newChatName,
        'backgroundImage': '',
        'chatId': chatId,
        'chatLog': [
          {
            'authorName': 'system',
            'message': 'Добро пожаловать в новый чат',
            'timestamp': currentDateTime()
          }
        ]
      }
      const newChats = [...props.chats]
      newChats.push(object)
      props.setChats(newChats)
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
            <Form.Control type="text" className="border-0 rounded bg-transparent" placeholder="имя нового чата"
              value={newChatName} onChange={(event)=> setNewChatName(event.target.value)}
              />
              <Button variant="primary" type="submit" className="rounded border-0 ms-2">добавить</Button>
          </InputGroup>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default AddNewChatModal
