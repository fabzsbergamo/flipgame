import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

const generateBoard = (level: number) => {
  const newboard = []
  for(let i = 0; i < level; i++){
    newboard.push([...Array(level)])
  }
  return newboard
}


function App() {

  const [level, setlevel] = useState (2)
  const [board, setBoard] = useState(generateBoard(level))


  const handleLevel = () => {
    setlevel((level) => level + 1)
    setBoard(generateBoard(level + 1))
  }
  const handleClick = (row: any, col: any) => {
    board[row][col] = 'x'
    setBoard([...board])
  }

  return (
    <>
    <h1>Flip Game</h1>
    <div>
      {board.map((row, r) => {
          return(
            <div 
              key={r} 
              style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              }}
            >
              {row.map((cell, c) => {
                return (
                  <div 
                    key={c}
                    onClick={() => handleClick(r,c)}
                    style={{
                    border: 'solid black 1px',
                    height: '50px',
                    width: '50px'
                    }}
                  >
                  {cell}
                  </div>
                )
              })}
              </div>
          )
        })
      }
    </div>
      <div className="card">
        <button onClick={handleLevel}>
          Level {level -1}
        </button>
        <p>
          Find all the following emojis before the time runs out!
        </p>
      </div>
    </>
  )
}

export default App
