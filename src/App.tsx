import { useState, useEffect } from 'react'
import './App.css'
import useEmojis from './useEmojis';
import { Emoji } from './types';



const generateBoard = (level: number, emojis: Emoji[]) => {
  const newboard = []
  for (let i = 0; i < level; i++) {
    newboard.push(emojis);
  }
  return newboard
}

// Function to shuffle an array using Fisher-Yates algorithm
const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

function App() {
  const [level, setLevel] = useState(2);
  const [board, setBoard] = useState<any[]>([]);
  const { data, error, isLoading } = useEmojis();

  useEffect(() => {
    if (data && data.emojis) {
      // Shuffle the array of emoji values
      const shuffledEmojis = shuffleArray(Object.values(data.emojis));
      // Set the first row emojis to a slice of the shuffled array
      const firstRowEmojis = shuffledEmojis.slice(0, level);
      // Generate the board using the shuffled emojis
      const newBoard = generateBoard(level, firstRowEmojis);
      setBoard(newBoard);
    }
  }, [data, level]);

  const handleLevel = () => {
    setLevel((prevLevel) => prevLevel + 1);
    if (data && data.emojis) {
      // Shuffle the array of emoji values
      const shuffledEmojis = shuffleArray(Object.values(data.emojis));
      // Set the first row emojis to a slice of the shuffled array
      const firstRowEmojis = shuffledEmojis.slice(0, level + 1);
      // Generate the board using the shuffled emojis
      const newBoard = generateBoard(level + 1, firstRowEmojis);
      setBoard(newBoard);
    }
  };

  const handleClick = (row: any, col: any) => {
    console.log("Clicked:", row, col);
    // Add your logic for handling clicks here
  };

  if (isLoading) return <p>isLoading...</p>;

  if (error) return <p>Error loading emojis: {error.message}</p>;

  return (
    <>
      <h1>Flip Game</h1>
      <div>
        {board.map((row, r) => (
          <div
            key={r}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {row.map((emoji: Emoji, c: number) => {
              const skin = emoji.skins[0]; // Assuming you want to use the first skin
              return (
                <img
                  key={`${r}-${c}`}
                  onClick={() => handleClick(r, c)}
                  src={`https://twemoji.maxcdn.com/v/13.1.0/svg/${skin.unified}.svg`}
                  alt={`${emoji.name} skin`}
                  style={{ width: "50px", height: "50px", margin: "5px", border: 'solid black 1px', }}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div className="card">
        <button onClick={handleLevel}>
          Level {level}
        </button>
        <p>
          Find all the following emojis before the time runs out!
        </p>
      </div>
    </>
  )
}

export default App;
