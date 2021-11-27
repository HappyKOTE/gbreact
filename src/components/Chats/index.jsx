import { Button, InputGroup, Form, Dropdown } from 'react-bootstrap'
import { dateOrTime } from '../../utils/dateOrTime'
import { currentDateTime } from '../../utils/currentDateTime'
import { findIndex } from '../../utils/findIndex'
import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { selectChats } from "../../store/chats/selectors"
import { selectActiveChatId } from "../../store/chats/selectors"
import { selectActiveChatLog } from "../../store/chats/selectors"
import { selectShowSpinner } from "../../store/chats/selectors"
import { changeActiveChatId } from "../../store/chats/actions"
import { addBotMessage } from "../../store/chats/actions"
import { deleteChat } from "../../store/chats/actions"
import { useParams } from "react-router-dom"
import './style.css'

function Chats(props) {
  const routeId = useParams().id
  const [message, setMessage] = useState('')
  const chats = useSelector(selectChats)
  const activeChatId = useSelector(selectActiveChatId)
  const activeChatLog = useSelector(selectActiveChatLog)
  const showSpinner = useSelector(selectShowSpinner)
  const dispatch = useDispatch()

  const deleteThis = () => {
    dispatch(deleteChat)
  }

  const onAddMessage = useCallback((payload) => {
    dispatch(addBotMessage(payload, activeChatId, chats[findIndex(activeChatId, chats)].bot))
  },
  [dispatch, activeChatId, chats])

  const saveMessage = (event) => {
    if (message) {
      const object = {
        'authorName': 'user',
        'message': message,
        'timestamp': currentDateTime()
      }
      onAddMessage(object)
      setMessage('')
    }
    event.preventDefault()
    props.messageInput.current?.focus()
  }

  useEffect(() => {
    if (findIndex(routeId, chats) >= 0) {
      dispatch(changeActiveChatId(routeId))
    }},
  [routeId, chats, dispatch])

  return (
    <>
    {(findIndex(routeId, chats) < 0 && routeId !== undefined) ?
    <div className="h-100 position-relative">
      <div className="position-absolute top-50 start-50 translate-middle">
        <i className="bi bi-exclamation-triangle text-danger"></i> чат не найден
      </div>
    </div> :
    <div className="h-100 d-flex flex-column overflow-hidden">
      <div className="border-bottom p-3 position-relative bg-light">
        <div className="fw-bold text-truncate">
          {chats[findIndex(activeChatId, chats)].chatName}
        </div>
        <div className="text-muted">
          {dateOrTime(activeChatLog[activeChatLog.length-1].timestamp)}
        </div>
          <div className="position-absolute top-50 end-0 translate-middle-y">
          <Dropdown>
            <Dropdown.Toggle variant="link" className="link-dark me-3" id="dropdown-basic">
              <i className="bi bi-three-dots-vertical"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as="button" onClick={deleteThis}>удалить чат</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div className="h-100 p-3 overflow-auto messages-list">
        {activeChatLog.map((value, idx) => (
          <div key={idx}>
            <div className={(value.authorName==='user') ? 'p-3 mb-2 rounded d-inline-block bg-primary bg-opacity-10 float-end' : 'p-3 mb-2 rounded d-inline-block bg-secondary bg-opacity-10'}>
              <div className="d-flex justify-content-between">
                <div className="fw-bold me-3">
                  {(value.authorName === 'bot') ? <i className="bi bi-robot"></i> : (value.authorName === 'user') ? 'вы' : value.authorName}
                </div>
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
            <Form.Control type="text" className="border-0 rounded bg-transparent" placeholder="написать сообщение" autoFocus value={message} onChange={(event)=> setMessage(event.target.value)} ref={props.messageInput} />
            <Button variant="primary" type="submit" className="rounded border-0 ms-2" title="отправить сообщение"><i className="bi bi-send"></i></Button>
          </InputGroup>
        </Form>
      </div>
    </div>
    }
    </>
  )
}

export default Chats
