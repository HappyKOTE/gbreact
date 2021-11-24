import { chatNameSpliter } from '../../utils/chatNameSpliter'
import { dateOrTime } from '../../utils/dateOrTime'
import { Link } from 'react-router-dom'
import './style.css'

function ChatList(props) {

  return (
    <>
    {(props.chats.length === 0) ? <div>список чатов пуст</div> :
      props.chats.map((value, idx) => (
      <Link key={idx} to='chats' onClick={()=> {
          props.setActiveChat(idx)
          props.messageInput.current.focus()
        }}
        className={(props.activeChat === idx) ? 'active rounded mb-2 p-3 chat-link d-block text-decoration-none' : 'rounded mb-2 p-3 chat-link d-block text-decoration-none'}
      >
      <div className="position-relative">
        <div className="d-flex justify-content-between">
          <div className="fw-bold text-truncate text-dark">{value.chatName}</div>
          <div className="text-muted">{dateOrTime(value.chatLog[value.chatLog.length-1].timestamp)}</div>
        </div>
        <div className="text-muted text-truncate">{value.chatLog[value.chatLog.length-1].message}</div>
        <div className="position-absolute top-50 start-0 translate-middle-y bg-secondary text-white rounded-circle"
          style={{ backgroundImage: 'url(' + value.backgroundImage + ')' }}>
          <div className="position-relative h-100">
            <div className="position-absolute top-50 start-50 translate-middle fs-5 text-uppercase">
              { (value.backgroundImage === '') ? chatNameSpliter(value.chatName) : null }
            </div>
          </div>
        </div>
      </div>
      </Link>
    ))}
    </>
  )
}

export default ChatList
