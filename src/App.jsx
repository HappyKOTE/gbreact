import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'

function App() {
  const [chats, setChats] = useState([
    {
      'chatName': 'Чат с ботом',
      'backgroundImage': './img/chat1.png',
      'chatLog': [
        {
          'authorName': 'bot',
          'message': 'Приветствую тебя, человек!',
          'timestamp': ['07.11.2021', '12:00:00']
        }
      ]
    },
    {
      'chatName': 'Козьма Прутков',
      'backgroundImage': './img/chat2.png',
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
  ])
  const [activeChat, setActiveChat] = useState(0)
  const [message, setMessage] = useState('')
  const handleChange = (event) => {
    setMessage(event.target.value);
  }
  const saveMessage = () => {
    const now = [
      new Date().toLocaleDateString(),
      new Date().toLocaleTimeString()
    ]
    const object = {
      'authorName': 'user',
      'message': message,
      'timestamp': now
    }
    chats[activeChat].chatLog.push(object)
    setMessage('')
  }
  const dateAndTime = (value) => {
    const now = new Date().toLocaleDateString()
    if (value[0] === now) {
      return value[1]
    } else {
      return value[0]
    }
  }

  useEffect(() => {
    console.log('change')
  }, [chats])

  return (
    <div className="row">

      <aside className="col-4 vh-100 overflow-auto pb-2 pt-4">
        {chats.map((value, idx) => (
          <div
            key={idx}
            onClick={() => setActiveChat(idx)}
            className={(activeChat === idx) ? 'active rounded mb-2 p-3 chat-link' : 'rounded mb-2 p-3 chat-link'}
          >
            <div className="position-relative">
              <div className="d-flex justify-content-between">
                <div className="fw-bold text-truncate">{value.chatName}</div>
                <div className="text-muted">{dateAndTime(value.chatLog[value.chatLog.length-1].timestamp)}</div>
              </div>
              <div className="text-muted text-truncate">{value.chatLog[value.chatLog.length-1].message}</div>
              <div className="position-absolute top-50 start-0 translate-middle-y bg-secondary rounded-circle" style={{ backgroundImage: 'url(' + value.backgroundImage + ')'  }}></div>
            </div>
          </div>
        ))}
      </aside>

      <div className="col-8 vh-100 pt-4 pb-4">
        <div className="bg-white h-100 rounded d-flex flex-column overflow-hidden">
          <div className="border-bottom p-3 position-relative bg-light">
            <div className="fw-bold text-truncate">
            {chats[activeChat].chatName}
            </div>
            <div className="text-muted">
            {chats[activeChat].chatLog[chats[activeChat].chatLog.length-1].timestamp}
            </div>
            <div className="position-absolute top-50 end-0 translate-middle-y">
              <Button variant="link" className="link-dark me-3"><i className="bi bi-three-dots-vertical"></i></Button>
            </div>
          </div>
          <div className="h-100 p-3 overflow-auto">

          {chats[activeChat].chatLog.map((value, idx) => (
            <div key={idx}>
              <div className={(value.authorName === 'user') ? 'p-3 mb-2 alert alert-primary d-inline-block' : 'p-3 mb-2 alert alert-secondary d-inline-block'}>
                <div className="d-flex justify-content-between">
                  <div className="fw-bold me-3">{value.authorName}</div>
                  <div>{value.message}</div>
                  <div className="text-muted ms-3">{dateAndTime(value.timestamp)}</div>
                </div>
              </div>
            </div>
          ))}

          </div>
          <div className="border-top p-3 bg-light">
            <form className="m-0 p-0">
              <div className="input-group">
                <input type="text" className="form-control border-0 rounded bg-transparent" placeholder="написать сообщение" autoFocus value={message} onChange={handleChange}></input>
                <Button variant="primary" className="rounded-pill border-0 ms-2" onClick={saveMessage}><i className="bi bi-send"></i></Button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
  )
}

export default App
