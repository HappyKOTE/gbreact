import React, { useState, useRef } from 'react'
import { Provider } from 'react-redux'
import { store } from "./store"
import { BrowserRouter, Link, Routes, Route, Navigate } from 'react-router-dom'
import { Button, Row, Col, ButtonGroup } from 'react-bootstrap'
import Chats from './components/Chats'
import AddNewChatModal from './components/AddNewChatModal'
import Profile from './components/Profile'
import ChatList from './components/ChatList'

function App() {

  const [showAddChatModal, setShowAddChatModal] = useState(false)
  const messageInput = useRef()

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

            <AddNewChatModal showAddChatModal={showAddChatModal} setShowAddChatModal={setShowAddChatModal} />
            <ChatList messageInput={messageInput} />
          </Col>

          <Col xs={8} className="vh-100 pt-4 pb-4">
            <div className="bg-white h-100 rounded overflow-hidden">
              <Routes>
                <Route path="/" element={<Navigate replace to="chats" />} />
                <Route path="chats" element={<Chats messageInput={messageInput} />}>
                  <Route path=":id" element={<Chats messageInput={messageInput} />} />
                </Route>
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
