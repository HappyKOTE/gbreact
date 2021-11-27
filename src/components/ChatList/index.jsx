import { chatNameSpliter } from '../../utils/chatNameSpliter'
import { dateOrTime } from '../../utils/dateOrTime'
import { findIndex } from '../../utils/findIndex'
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux"
import { selectChats } from "../../store/chats/selectors"
import { selectActiveChatId } from "../../store/chats/selectors"
import './style.css'

function ChatList(props) {
  const chats = useSelector(selectChats)
  const activeChatId = useSelector(selectActiveChatId)

  return (
    <>
      {(chats.length === 0) ? <div>список чатов пуст</div> :
        chats.map((value, idx) => (
          <Link key={idx} to={`chats/${value.id}`} onClick={()=> {props.messageInput.current?.focus()}}
            className={(activeChatId === value.id) ? 'active rounded mb-2 p-3 chat-link d-block text-decoration-none' : 'rounded mb-2 p-3 chat-link d-block text-decoration-none'}
          >
            <div className="position-relative">
              <div className="d-flex justify-content-between">
                <div className="fw-bold text-truncate text-dark">
                  {value.chatName}
                </div>
                <div className="text-muted">
                  {dateOrTime(chats[findIndex(value.id, chats)].chatLog[chats[findIndex(value.id, chats)].chatLog.length-1].timestamp)}
                </div>
              </div>
              <div className="text-muted text-truncate">
                {chats[findIndex(value.id, chats)].chatLog[chats[findIndex(value.id, chats)].chatLog.length-1].message}
              </div>
              <div className="position-absolute top-50 start-0 translate-middle-y bg-secondary text-white rounded-circle">
                <div className="position-relative h-100">
                  <div className="position-absolute top-50 start-50 translate-middle fs-5 text-uppercase">
                    {chatNameSpliter(value.chatName)}
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
