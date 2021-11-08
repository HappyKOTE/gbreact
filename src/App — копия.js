import React, { useState } from 'react'
import './App.css'
import { Message } from './components/message'
import { Button } from 'react-bootstrap'

function App() {
  const text = 'prop from App'
  const [clickCount, setClickCount] = useState(0)

  const handlerClick = () => {
    setClickCount(clickCount + 1)
  }

  return (
    <div>
      <div>message click count: {clickCount}</div>
      <Message message={text} onMessageClick={handlerClick} />
    </div>
  )
}

export default App
