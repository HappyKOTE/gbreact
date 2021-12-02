import { createStore, combineReducers, applyMiddleware, compose } from "redux"

import { chatsReducer } from "./chats/reducer"
import { profileReducer } from "./profile/reducer"
import { dataReducer } from "./news/reducer"

import thunk from 'redux-thunk'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const persistConfig = {
  key: 'gbChats',
  storage,
  blacklist: ['profile']
}

const rootReducer = combineReducers({
  profile: profileReducer,
  chats: chatsReducer,
  news: dataReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
)

export const persistor = persistStore(store)