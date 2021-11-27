import { createStore, combineReducers } from "redux"

import { chatsReducer } from "./chats/reducer"
import { profileReducer } from "./profile/reducer"

export const store = createStore(
  combineReducers({
    profile: profileReducer,
    chats: chatsReducer
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)