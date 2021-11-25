import React, { useState } from 'react'
import { Provider } from 'react-redux'
import { store } from "./store"
import { BrowserRouter, Link, Routes, Route, Navigate } from 'react-router-dom'
import { Button, Row, Col, ButtonGroup } from 'react-bootstrap'
import Chats from './components/Chats'
import AddNewChatModal from './components/AddNewChatModal'
import Profile from './components/Profile'
import ChatList from './components/ChatList'

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

  const [showAddChatModal, setShowAddChatModal] = useState(false)
  
  const messageInput = React.createRef()

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

            <AddNewChatModal 
              showAddChatModal={showAddChatModal} 
              setShowAddChatModal={setShowAddChatModal} 
              chats={chats} 
              setChats={setChats} 
            />

            <ChatList
              chats={chats}
              setActiveChat={setActiveChat}
              activeChat={activeChat}
              messageInput={messageInput}
            />

          </Col>

          <Col xs={8} className="vh-100 pt-4 pb-4">
            <div className="bg-white h-100 rounded">
              <Routes>
                <Route path="/" element={<Navigate replace to="chats" />} />
                <Route
                  path="chats/:id"
                  element={<Chats
                  chats={chats}
                  activeChat={activeChat}
                  setChats={setChats}
                  messageInput={messageInput}
                  />}
                />
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
