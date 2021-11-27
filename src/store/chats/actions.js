import { currentDateTime } from '../../utils/currentDateTime'

export const CHANGE_ACTIVE_CHAT_ID = "CHATS::CHANGE_ACTIVE_CHAT_ID"
export const DELETE_CHAT = "CHATS::DELETE_CHAT"
export const ADD_CHAT = "CHATS::ADD_CHAT"
export const ADD_MESSAGE = "CHATS::ADD_MESSAGE"
export const SHOW_SPINNER = "CHATS::SHOW_SPINNER"

export const changeActiveChatId = (id) => ({
  type: CHANGE_ACTIVE_CHAT_ID,
  payload: id
})

export const deleteChat = () => ({
  type: DELETE_CHAT
})

export const addChat = (newChat) => ({
  type: ADD_CHAT,
  payload: newChat
})

export const addMessage = (message, chatId) => ({
  type: ADD_MESSAGE,
  payload: { message, chatId }
})

export const showSpinner = (boolean) => ({
  type: SHOW_SPINNER,
  payload: boolean
})

let timeout
export const addBotMessage = (message, chatId, botFlag) => (dispatch) => {
  dispatch(addMessage(message, chatId))
  if (message.authorName !== 'bot' && botFlag === true) {
    dispatch(showSpinner(true))
    if (timeout) { clearTimeout(timeout) }
    timeout = setTimeout(() => {
      const now = currentDateTime()
      const object = {
        'authorName': 'bot',
        'message': '',
        'timestamp': now
      }
      switch (message.message.toLowerCase()) {
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
      dispatch(addMessage(object, chatId))
      dispatch(showSpinner(false))
    }, 1500)
  }
}