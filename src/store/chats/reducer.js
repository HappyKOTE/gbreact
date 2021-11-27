import { CHANGE_ACTIVE_CHAT_ID, DELETE_CHAT, ADD_CHAT, ADD_MESSAGE } from "./actions"
import { findIndex } from '../../utils/findIndex'

const initialState = {
  'chats': [
    {
      'chatName': 'Чат с ботом',
      'id': 'f5d9b29c',
      'chatLog': [
        {
          'authorName': 'bot',
          'message': 'Приветствую тебя, человек! Я настолько умный, что знаю 2 команды: "дата" или "время"',
          'timestamp': ['07.11.2021', '12:00:00']
        }
      ]
    },
    {
      'chatName': 'Козьма Прутков',
      'id': 'f235a271',
      'chatLog': [
        {
          'authorName': 'Миловидов',
          'message': '(говорит мягким басом, плавно, важно, авторитетно) Итак, нашего Ивана Семеныча уже не существует!.. Все, что было  у  него приятного, исчезло вместе с ним!',
          'timestamp': ['07.11.2021', '12:00:00']
        },
        {
          'authorName': 'Кутило-Завалдайский',
          'message': '(со вздохом) Сколько у него было душ и десятин пахотной земли?',
          'timestamp': ['07.11.2021', '13:00:00']
        },
        {
          'authorName': 'Миловидов',
          'message': 'Главное его имение,  село  Курохвостово,  не  помню:  Астраханской  или Архангельской губернии? Душ  по  последней  ревизии  числилось  пятьсот;  по крайней мере, так выразился, говоря со мною, заседатель  гражданской  палаты Фирдин, Иван Петрович.',
          'timestamp': ['07.11.2021', '14:00:00']
        },
        {
          'authorName': 'Кн. Батог-Батыев',
          'message': '(с подвязанною щекою; говорит шепелявя и с присвистом) Фирдин?..  Какой  Фирдин?  Не  тот  ли,  который  ранен  был  на  дуэли ротмистром Кавтыревым?',
          'timestamp': ['07.11.2021', '15:00:00']
        },
        {
          'authorName': 'user',
          'message': 'Вы чего несёте?',
          'timestamp': ['07.11.2021', '16:00:00']
        }
      ]
    }
  ],
  'activeChatId': 'f5d9b29c'
}

export const chatsReducer = (state = initialState, action) => {
  let chatIndex = findIndex(state.activeChatId, state.chats)
  switch (action.type) {
    case CHANGE_ACTIVE_CHAT_ID:
      return {
        ...state,
        activeChatId: action.payload
      }
    case DELETE_CHAT:
      return {
        ...state,
        chats: state.chats.splice(chatIndex, 1)
      }
    case ADD_CHAT:
      return {
        ...state,
        chats: [...state.chats, action.payload]
      }
    case ADD_MESSAGE:
      let newState = []
      for (let i = 0; i < state.chats.length; i++) {
        if (state.activeChatId !== state.chats[i].id) {
          newState.push(state.chats[i])
        } else {
          let newObj = state.chats[i]
          newObj.chatLog.push(action.payload)
          newState.push(newObj)
        }
      }
      return {
        ...state,
        chats: newState
      }
    default:
      return state
  }
}