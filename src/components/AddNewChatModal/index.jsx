import React, { useRef, useState, useEffect } from 'react'
import { InputGroup, Form, Modal } from 'react-bootstrap'
import { currentDateTime } from '../../utils/currentDateTime'
import { useSelector, useDispatch } from "react-redux"
import { addChat } from "../../store/chats/actions"
import './style.css'

function AddNewChatModal(props) {
  const [newChatName, setNewChatName] = useState('')
  const [botFlag, setBotFlag] = useState(false)
  const chats = useSelector(state => state.chats.chats)
  const dispatch = useDispatch()
  const newChatsInput = useRef()

  const checkToggle = () => {
    setBotFlag(!botFlag)
  }

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
    if (props.showAddChatModal) {
      newChatsInput.current?.focus()
    }
  },
  // eslint-disable-next-line
  [props.showAddChatModal])

  const saveNewChat = (event) => {
    if (newChatName) {
      const chatId = createNewChatId()
      let authorName
      let message
      if (botFlag) {
        authorName = 'bot'
        message = 'Приветствую тебя, человек! Я настолько умный, что знаю 2 команды: "дата" или "время"'
      } else {
        authorName = 'system'
        message = 'Добро пожаловать в новый чат'
      }
      const object = {
        'chatName': newChatName,
        'id': chatId,
        'bot': botFlag,
        'chatLog': [
          {
            'authorName': authorName,
            'message': message,
            'timestamp': currentDateTime()
          }
        ]
      }
      dispatch(addChat(object))
      props.setShowAddChatModal(false)
      setNewChatName('')
      setBotFlag(false)
    }
    event.preventDefault()
  }

  return (
    <Modal show={props.showAddChatModal} onHide={()=> props.setShowAddChatModal(false)}>
      <Modal.Body className="p-3 m-0">
        <Form onSubmit={saveNewChat}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="имя нового чата"
              value={newChatName}
              onChange={(event)=> setNewChatName(event.target.value)}
              ref={newChatsInput}
            />
          </InputGroup>
          <Form.Group controlId="botFlag" className="mt-3">
            <Form.Check type="switch" checked={botFlag} onChange={checkToggle} label="чат для бота" />
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default AddNewChatModal
