export const CHANGE_ACTIVE_CHAT_ID = "CHATS::CHANGE_ACTIVE_CHAT_ID"
export const DELETE_CHAT = "CHATS::DELETE_CHAT"
export const ADD_CHAT = "CHATS::ADD_CHAT"
export const ADD_MESSAGE = "CHATS::ADD_MESSAGE"

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

export const addMessage = (newMessage) => ({
  type: ADD_MESSAGE,
  payload: newMessage
})