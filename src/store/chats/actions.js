export const CHANGE_ACTIVE_CHAT_ID = "CHATS::CHANGE_ACTIVE_CHAT_ID"

export const changeActiveChatId = (id) => ({
  type: CHANGE_ACTIVE_CHAT_ID,
  payload: {
    chatId: id,
  },
})