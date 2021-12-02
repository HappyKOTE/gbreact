import React, { useState, useRef, useEffect } from 'react'
import { BrowserRouter, Link, Routes, Route, Navigate } from 'react-router-dom'
import { Button, Row, Col, ButtonGroup } from 'react-bootstrap'
import Chats from './components/Chats'
import AddNewChatModal from './components/AddNewChatModal'
import Profile from './components/Profile'
import ChatList from './components/ChatList'
import News from './components/News'

import { logIn } from "./services/firebase"
import { useDispatch, useSelector } from "react-redux"
import { auth, messagesRef } from "./services/firebase"
import { signIn, signOut } from "./store/profile/actions"
import { PrivateRoute } from "./components/PrivateRoute"
import { PublicOutlet, PublicRoute } from "./components/PublicRoute"
import { SignUp } from "./components/SignUp"
import { SignForm } from "./components/SignForm"

function App() {

  const [showAddChatModal, setShowAddChatModal] = useState(false)
  const messageInput = useRef()

  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(signIn())
      } else {
        dispatch(signOut())
      }
  })

    return () => unsubscribe()
  }, [])

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignIn = async (email, pass) => {
    setLoading(true)
    try {
      await logIn(email, pass)
    } catch (err) {
      console.warn(err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <BrowserRouter>
      <Row>

        <Col xs={4} className="vh-100 overflow-auto pb-2 pt-4">
          <div className="d-flex justify-content-between mb-4">
            <ButtonGroup>
              <Link to="chats" className="btn btn-light pe-1 bg-white border-0 fw-bold">чаты</Link>
              <Button variant="light" className="ps-1 bg-white border-0" onClick={() => setShowAddChatModal(true)}><i className="bi bi-plus-circle"></i></Button>
            </ButtonGroup>
            <div>
              <Link to="news" className="btn btn-light bg-white border-0 fw-bold">новости</Link>
            </div>
            <div>
              <Link to="signup">регистрация</Link>
            </div>
            <div>
              <Link to="profile" className="btn btn-light bg-white border-0 fw-bold">профиль</Link>
            </div>
          </div>
          <AddNewChatModal showAddChatModal={showAddChatModal} setShowAddChatModal={setShowAddChatModal} />
          <PrivateRoute><ChatList messageInput={messageInput} /></PrivateRoute>
          <SignForm onSubmit={handleSignIn} error={error} loading={loading} />
        </Col>

        <Col xs={8} className="vh-100 pt-4 pb-4">
          <div className="bg-white h-100 rounded overflow-hidden">
            <Routes>
              <Route path="/" element={<PublicOutlet />} />
              <Route path="/signup" element={<PublicOutlet />}>
                <Route path="" element={<SignUp />} />
              </Route>
              <Route path="chats" element={<PrivateRoute><Chats messageInput={messageInput} /></PrivateRoute>}>
                <Route path=":id" element={<PrivateRoute><Chats messageInput={messageInput} /></PrivateRoute>} />
              </Route>
              <Route path="profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
              <Route path="news" element={<News />} />
              <Route path="*" element={<div className="p-3"><h1 className="p-0 m-0">404</h1></div>} />
            </Routes>
          </div>
        </Col>

      </Row>
    </BrowserRouter>
  )
}

export default App
