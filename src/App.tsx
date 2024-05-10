import { useState, useEffect } from 'react';
import './App.css';
import useEmojis from './useEmojis';

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
  const [selectedEmoji, setSelectedEmoji] = useState("");

  const { data, error, isLoading } = useEmojis();

  useEffect(() => {
    if (data && data.emojis) {
      const emojis = Object.values(data.emojis);
      // Set the first row with shuffled emojis
      const firstRowEmojis = shuffleArray(emojis).slice(0, level);
      setBoard([firstRowEmojis]);

      // Select a random emoji from the first row
      const randomEmojiIndex = Math.floor(Math.random() * firstRowEmojis.length);
      const randomEmoji = firstRowEmojis[randomEmojiIndex];
      const randomEmojiSkin = randomEmoji.skins[0]; // Assuming you want to use the first skin
      setSelectedEmoji(randomEmojiSkin.unified);

      // Generate subsequent rows with shuffled emojis based on the first row
      for (let i = 1; i < level; i++) {
        const shuffledRowEmojis = shuffleArray(firstRowEmojis.slice());
        setBoard((prevBoard) => [...prevBoard, shuffledRowEmojis]);
      }
    }
  }, [data, level]);

  const handleLevel = () => {
    setLevel((prevLevel) => prevLevel + 1);
  };

  const handleClick = (rowIndex: number, colIndex: number) => {
    console.log("Clicked:", rowIndex, colIndex);
    // Add your logic for handling clicks here
  };

  if (isLoading) return <p>isLoading...</p>;

  if (error) return <p>Error loading emojis: {error.message}</p>;

  return (
    <>
      <h1>Flip Game</h1>
      <div>
        {board.map((row, rowIndex) => (
          <div
            key={rowIndex}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {row.map((emoji: Emoji, colIndex: number) => {
              const skin = emoji.skins[0]; // Assuming you want to use the first skin
              return (
                <img
                  key={`${rowIndex}-${colIndex}`}
                  onClick={() => handleClick(rowIndex, colIndex)}
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
          Level {level -1}
        </button>
        <p>
          Find all the following emojis before the time runs out!
        </p>
        <div>
          <img
            key={`${selectedEmoji}`}
            src={`https://twemoji.maxcdn.com/v/13.1.0/svg/${selectedEmoji}.svg`}
            alt={`${selectedEmoji} skin`}
            style={{ width: "50px", height: "50px", margin: "5px", border: 'solid black 1px', }}
          />
        </div>
      </div>
    </>
  );
}

export default App;