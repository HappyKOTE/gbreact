import { findIndex } from '../../utils/findIndex'

export const selectChats = (state) => state.chats.chats
export const selectActiveChatId = (state) => state.chats.activeChatId
export const selectActiveChatLog = (state) => {
  let index = findIndex(state.chats.activeChatId, state.chats.chats)
  return state.chats.chats[index].chatLog
}
export const selectShowSpinner = (state) => state.chats.showSpinner