import { Button, InputGroup, Form, Dropdown } from 'react-bootstrap'
import { dateOrTime } from '../../utils/dateOrTime'
import { currentDateTime } from '../../utils/currentDateTime'
import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux"
import './style.css'

function Chats(props) {
  const [message, setMessage] = useState('')
  const [showSpinner, setShowSpinner] = useState(false)

  const chatlist = useSelector(state => state.chats.chatList)
  const activeChatId = useSelector(state => state.chats.activeChatId)
  const messages = useSelector(state => state.chats.messages)

  const deleteChat = () => {
    const newChats = [...props.chats]
    newChats.splice(props.activeChat, 1)
    props.setActiveChat(0)
    props.setChats(newChats)
  }

  const pushMessage = (chatNumber, chatMessage) => {
    const newChats = [...props.chats]
    newChats[chatNumber].chatLog.push(chatMessage)
    props.setChats(newChats)
  }

  const saveMessage = (event) => {
    if (message) {
      const object = {
        'authorName': 'user',
        'message': message,
        'timestamp': currentDateTime()
      }
      pushMessage(props.activeChat, object)
      setMessage('')
    }
    event.preventDefault()
    props.messageInput.current.focus()
  }

  const findChatIndex = (id) => {
    for (let i = 0; i < chatlist.length; i++) {
      if (chatlist[i].id === id) {
        return i
      } else {
        return -1
      }
    }
  }

  useEffect(() => {
    if (props.chats.length > 0) {
      let chatIndex = findChatIndex('f5d9b29c')
      if (chatIndex >=0 && props.chats[chatIndex].chatLog[props.chats[chatIndex].chatLog.length - 1].authorName === 'user') {
        setShowSpinner(true)
        setTimeout(() => {
          const object = {
            'authorName': 'bot',
            'message': '',
            'timestamp': currentDateTime()
          }
          const now = currentDateTime()
          switch (props.chats[chatIndex].chatLog[props.chats[chatIndex].chatLog.length - 1].message.toLowerCase()) {
            case 'дата':
              object.message = 'Текущая дата ' + now[0]
              break
            case 'время':
              object.message = 'Текущее время ' + now[1]
              break
            default:
              object.message = 'А я упоминал, что знаю только 2 команды? "дата" или "время"'
              break
          }
          setShowSpinner(false)
          pushMessage(chatIndex, object)
        }, 1500)
      }
    }
  },
  // eslint-disable-next-line
  [props.chats])

  return (
    <div className="h-100 d-flex flex-column overflow-hidden">
      <div className="border-bottom p-3 position-relative bg-light">
        <div className="fw-bold text-truncate">
          {chatlist[findChatIndex(activeChatId)].chatName}
        </div>
        <div className="text-muted">
          {dateOrTime(messages[activeChatId][messages[activeChatId].length-1].timestamp)}
        </div>
          <div className="position-absolute top-50 end-0 translate-middle-y">
          <Dropdown>
            <Dropdown.Toggle variant="link" className="link-dark me-3" id="dropdown-basic">
              <i className="bi bi-three-dots-vertical"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as="button" onClick={deleteChat}>удалить чат</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div className="h-100 p-3 overflow-auto messages-list">

        {messages[activeChatId].map((value, idx) => (
          <div key={idx}>
            <div className={(value.authorName==='user') ? 'p-3 mb-2 rounded d-inline-block bg-primary bg-opacity-10 float-end' : 'p-3 mb-2 rounded d-inline-block bg-secondary bg-opacity-10'}>
              <div className="d-flex justify-content-between">
                <div className="fw-bold me-3">{(value.authorName === 'bot') ? <i className="bi bi-robot"></i> : (value.authorName === 'user') ? 'вы' : value.authorName}</div>
                <div>{value.message}</div>
                <div className="text-muted ms-3">{dateOrTime(value.timestamp)}</div>
              </div>
            </div>
            <div className="clearfix"></div>
          </div>
        ))}
        {showSpinner && <div className="p-3 mb-2 rounded d-inline-block bg-secondary bg-opacity-10"><div className="spinner-grow spinner-grow-sm" role="status"></div></div>}

      </div>
      <div className="border-top p-3 bg-light">
        <Form onSubmit={saveMessage}>
          <InputGroup>
            <Form.Control
              type="text"
              className="border-0 rounded bg-transparent" placeholder="написать сообщение"
              autoFocus
              value={message}
              onChange={(event)=> setMessage(event.target.value)}
              ref={props.messageInput}
            />
              <Button variant="primary" type="submit" className="rounded border-0 ms-2" title="отправить сообщение"><i className="bi bi-send"></i></Button>
          </InputGroup>
        </Form>
      </div>
    </div>
  )
}

export default Chats
