import React, { useState, useEffect } from 'react'
import { Provider } from 'react-redux'
import { store } from "./store"
import { BrowserRouter, Link, Routes, Route, Navigate } from 'react-router-dom'
import { Button, InputGroup, Form, Row, Col, Modal, ButtonGroup } from 'react-bootstrap'
import Chats from './components/Chats'
import Profile from './components/Profile'

function App() {
  const [chats, setChats] = useState([
    {
      'chatName': 'Чат с ботом',
      'backgroundImage': './img/chat1.png',
      'chatId': 'f5d9b29c',
      'chatLog': [
        {
          'authorName': 'bot',
          'message': 'Приветствую тебя, человек! Я настолько умный, что знаю 2 команды: "дата" или "время"',
          'timestamp': ['07.11.2021', '12:00:00']
        }
      ]
    },
    {
      'chatName': 'Козьма Прутков',
      'backgroundImage': './img/chat2.png',
      'chatId': 'f235a271',
      'chatLog': [
        {
          'authorName': 'Миловидов',
          'message': '(говорит мягким басом, плавно, важно, авторитетно) Итак, нашего Ивана Семеныча уже не существует!.. Все, что было  у  него приятного, исчезло вместе с ним!',
          'timestamp': ['07.11.2021', '12:00:00']
        },
        {
          'authorName': 'Кутило-Завалдайский',
          'message': '(со вздохом) Сколько у него было душ и десятин пахотной земли?',
          'timestamp': ['07.11.2021', '13:00:00']
        },
        {
          'authorName': 'Миловидов',
          'message': 'Главное его имение,  село  Курохвостово,  не  помню:  Астраханской  или Архангельской губернии? Душ  по  последней  ревизии  числилось  пятьсот;  по крайней мере, так выразился, говоря со мною, заседатель  гражданской  палаты Фирдин, Иван Петрович.',
          'timestamp': ['07.11.2021', '14:00:00']
        },
        {
          'authorName': 'Кн. Батог-Батыев',
          'message': '(с подвязанною щекою; говорит шепелявя и с присвистом) Фирдин?..  Какой  Фирдин?  Не  тот  ли,  который  ранен  был  на  дуэли ротмистром Кавтыревым?',
          'timestamp': ['07.11.2021', '15:00:00']
        },
        {
          'authorName': 'user',
          'message': 'Вы чего несёте?',
          'timestamp': ['07.11.2021', '16:00:00']
        }
      ]
    }
  ])

  const [activeChat, setActiveChat] = useState(0)
  const [message, setMessage] = useState('')
  const [newChatName, setNewChatName] = useState('')
  const [showSpinner, setShowSpinner] = useState(false)
  const [showAddChatModal, setShowAddChatModal] = useState(false)

  let now = [
    new Date().toLocaleDateString(),
    new Date().toLocaleTimeString()
  ]

  const findChatIndex = (id) => {
    for (let i = 0; i < chats.length; i++) {
      if (chats[i].chatId === id) {
        return i
      } else {
        return -1
      }
    }
  }

  const chatNameSpliter = (name) => {
    const words = name.split(' ')
    if (words.length > 1) {
      return words[0].slice(0,1) + words[1].slice(0,1)
    } else {
      return name.slice(0,2)
    }
  }

  const pushMessage = (chatNumber, chatMessage) => {
    const newChats = [...chats]
    newChats[chatNumber].chatLog.push(chatMessage)
    setChats(newChats)
  }

  const messageInput = React.createRef()

  const saveMessage = (event) => {
    if (message) {
      const object = {
        'authorName': 'user',
        'message': message,
        'timestamp': now
      }
      pushMessage(activeChat, object)
      setMessage('')
    }
    event.preventDefault()
    messageInput.current.focus()
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
            'timestamp': now
          }
        ]
      }
      const newChats = [...chats]
      newChats.push(object)
      setChats(newChats)
      setShowAddChatModal(false)
      setNewChatName('')
    }
    event.preventDefault()
  }

  const deleteChat = () => {
    const newChats = [...chats]
    newChats.splice(activeChat, 1)
    setActiveChat(0)
    setChats(newChats)
  }

  const dateAndTime = (value) => {
    if (value[0] === now[0]) {
      return value[1].substr(0,5)
    } else {
      return value[0]
    }
  }

  useEffect(() => {
    if (chats.length > 0) {
      let chatIndex = findChatIndex('f5d9b29c')
      if (chatIndex >=0 && chats[chatIndex].chatLog[chats[chatIndex].chatLog.length - 1].authorName === 'user') {
        setShowSpinner(true)
        setTimeout(() => {
          const object = {
            'authorName': 'bot',
            'message': '',
            'timestamp': now
          }
          switch (chats[chatIndex].chatLog[chats[chatIndex].chatLog.length - 1].message.toLowerCase()) {
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
  [chats])

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Row>

          <Col xs={4} className="vh-100 overflow-auto pb-2 pt-4">
            <div className="d-flex justify-content-between mb-4">
              <ButtonGroup>
                <Link to="chats" className="btn btn-light pe-1 bg-white border-0">чаты</Link>
                <Button variant="light" className="ps-1 bg-white border-0" onClick={() => setShowAddChatModal(true)}><i className="bi bi-plus-circle"></i></Button>
              </ButtonGroup>
              <div>
                <Link to="profile" className="btn btn-light bg-white border-0">профиль</Link>
              </div>
            </div>

            <Modal show={showAddChatModal} onHide={() => setShowAddChatModal(false)}>
              <Modal.Body>
                <Form onSubmit={saveNewChat}>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      className="border-0 rounded bg-transparent"
                      placeholder="имя нового чата"
                      value={newChatName}
                      onChange={(event) => setNewChatName(event.target.value)}
                    />
                    <Button variant="primary" type="submit" className="rounded border-0 ms-2">добавить</Button>
                  </InputGroup>
                </Form>
              </Modal.Body>
            </Modal>

            {(chats.length === 0) ? <div>список чатов пуст</div> :
            chats.map((value, idx) => (
              <Link
                key={idx}
                to='chats'
                onClick={() => {
                  setActiveChat(idx)
                  messageInput.current.focus()
                }}
                className={(activeChat === idx) ? 'active rounded mb-2 p-3 chat-link d-block text-decoration-none' : 'rounded mb-2 p-3 chat-link d-block text-decoration-none'}
              >
                <div className="position-relative">
                  <div className="d-flex justify-content-between">
                    <div className="fw-bold text-truncate text-dark">{value.chatName}</div>
                    <div className="text-muted">{dateAndTime(value.chatLog[value.chatLog.length-1].timestamp)}</div>
                  </div>
                  <div className="text-muted text-truncate">{value.chatLog[value.chatLog.length-1].message}</div>
                  <div className="position-absolute top-50 start-0 translate-middle-y bg-secondary text-white rounded-circle" style={{ backgroundImage: 'url(' + value.backgroundImage + ')' }}>
                    <div className="position-relative h-100">
                      <div className="position-absolute top-50 start-50 translate-middle fs-5 text-uppercase">
                        { (value.backgroundImage === '') ? chatNameSpliter(value.chatName) : null }
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </Col>

          <Col xs={8} className="vh-100 pt-4 pb-4">
            <div className="bg-white h-100 rounded">
              <Routes>
                <Route path="/" element={<Navigate replace to="chats" />} />
                {(chats.length > 0) &&
                  <Route path='chats'
                    element={
                      <Chats
                        chats={chats}
                        activeChat={activeChat}
                        setActiveChat={setActiveChat}
                        now={now}
                        showSpinner={showSpinner}
                        dateAndTime={dateAndTime}
                        message={message}
                        setMessage={setMessage}
                        saveMessage={saveMessage}
                        messageInput={messageInput}
                        deleteChat={deleteChat}
                        findChatIndex={findChatIndex}
                      />
                    }
                  />
                }
                <Route path="profile" element={<Profile />} />
                <Route path="*" element={<div className="p-3"><h1 className="p-0 m-0">404</h1></div>} />
              </Routes>
            </div>
          </Col>

        </Row>
      </BrowserRouter>
    </Provider>
  )
}

export default App
