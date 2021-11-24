import { chatNameSpliter } from '../../utils/chatNameSpliter'
import { dateOrTime } from '../../utils/dateOrTime'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { changeActiveChatId } from "../../store/chats/actions";
import './style.css'

function ChatList(props) {
  const chatlist = useSelector(state => state.chats.chatList)
  const activeChatId = useSelector(state => state.chats.activeChatId)
  const messages = useSelector(state => state.chats.messages)
  const dispatch = useDispatch();

  return (
    <>
      {(chatlist.length === 0) ? <div>список чатов пуст</div> :
        chatlist.map((value, idx) => (
          <Link key={value.id} to='chats' onClick={()=> {
              props.setActiveChat(idx)
              dispatch(changeActiveChatId(value.id))
              props.messageInput.current.focus()
            }}
            className={(activeChatId === value.id) ? 'active rounded mb-2 p-3 chat-link d-block text-decoration-none' : 'rounded mb-2 p-3 chat-link d-block text-decoration-none'}
          >
            <div className="position-relative">
              <div className="d-flex justify-content-between">
                <div className="fw-bold text-truncate text-dark">{value.chatName}</div>
                <div className="text-muted">
                  {dateOrTime(messages[value.id][messages[value.id].length-1].timestamp)}
                </div>
              </div>
              <div className="text-muted text-truncate">{messages[value.id][messages[value.id].length-1].message}</div>
              <div className="position-absolute top-50 start-0 translate-middle-y bg-secondary text-white rounded-circle"
                style={{ backgroundImage: 'url(' + value.backgroundImage + ')' }}>
                <div className="position-relative h-100">
                  <div className="position-absolute top-50 start-50 translate-middle fs-5 text-uppercase">
                    { (value.backgroundImage === '') && chatNameSpliter(value.chatName) }
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
