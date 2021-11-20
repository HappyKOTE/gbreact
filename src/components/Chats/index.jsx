import { Button, InputGroup, Form, Dropdown } from 'react-bootstrap'
import './style.css'

function Chats(props) {

  return (
    <div className="h-100 d-flex flex-column overflow-hidden">
      <div className="border-bottom p-3 position-relative bg-light">
        <div className="fw-bold text-truncate">
          {props.chats[props.activeChat].chatName}
        </div>
        <div className="text-muted">
          {props.dateAndTime(props.chats[props.activeChat].chatLog[props.chats[props.activeChat].chatLog.length-1].timestamp)}
        </div>
          <div className="position-absolute top-50 end-0 translate-middle-y">
          <Dropdown>
            <Dropdown.Toggle variant="link" className="link-dark me-3" id="dropdown-basic">
              <i className="bi bi-three-dots-vertical"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as="button" onClick={props.deleteChat}>удалить чат</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div className="h-100 p-3 overflow-auto messages-list">

        {props.chats[props.activeChat].chatLog.map((value, idx) => (
          <div key={idx}>
            <div className={(value.authorName==='user') ? 'p-3 mb-2 rounded d-inline-block bg-primary bg-opacity-10 float-end' : 'p-3 mb-2 rounded d-inline-block bg-secondary bg-opacity-10'}>
              <div className="d-flex justify-content-between">
                <div className="fw-bold me-3">{(value.authorName === 'bot') ? <i className="bi bi-robot"></i> : (value.authorName === 'user') ? 'вы' : value.authorName}</div>
                <div>{value.message}</div>
                <div className="text-muted ms-3">{props.dateAndTime(value.timestamp)}</div>
              </div>
            </div>
            <div className="clearfix"></div>
          </div>
        ))}
        {props.showSpinner && <div className="p-3 mb-2 rounded d-inline-block bg-secondary bg-opacity-10"><div className="spinner-grow spinner-grow-sm" role="status"></div></div>}

      </div>
      <div className="border-top p-3 bg-light">
        <Form onSubmit={props.saveMessage}>
          <InputGroup>
            <Form.Control
              type="text"
              className="border-0 rounded bg-transparent" placeholder="написать сообщение"
              autoFocus
              value={props.message}
              onChange={(event)=> props.setMessage(event.target.value)}
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
