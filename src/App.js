import React, { useState } from 'react'
import './App.css'
import { Message } from './components/message'

function App() {
  const text = 'prop from App'
  const [clickCount, setClickCount] = useState(0)

  const handlerClick = () => {
    setClickCount(clickCount + 1)
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          message click count: {clickCount}
        </div>
        <Message message={text} onMessageClick={handlerClick} />
      </header>
    </div>
  )
}

export default App
