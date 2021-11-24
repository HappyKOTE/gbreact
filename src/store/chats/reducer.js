import { CHANGE_ACTIVE_CHAT_ID } from "./actions"

const initialState = {
  'chatList': [
    {
      'chatName': 'Чат с ботом',
      'backgroundImage': './img/chat1.png',
      'id': 'f5d9b29c'
    },
    {
      'chatName': 'Козьма Прутков',
      'backgroundImage': './img/chat2.png',
      'id': 'f235a271'
    }
  ],
  'messages': {
    'f5d9b29c': [
      {
        'authorName': 'bot',
        'message': 'Приветствую тебя, человек! Я настолько умный, что знаю 2 команды: "дата" или "время"',
        'timestamp': ['07.11.2021', '12:00:00']
      }
    ],
    'f235a271': [
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
  },
  'activeChatId': 'f5d9b29c'
}

export const chatsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_ACTIVE_CHAT_ID:
      return {
        ...state,
        activeChatId: action.payload.chatId
      }
    default:
      return state
  }
}