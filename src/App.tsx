import { useState, useEffect } from 'react';
import './App.css';
import useEmojis from './useEmojis';
import EmojiCard from './EmojiCard';

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
      const subsequentRows = Array.from({ length: level - 1 }, () =>
        shuffleArray(firstRowEmojis.slice())
      );
      setBoard((prevBoard) => [...prevBoard, ...subsequentRows]);
    }
  }, [data, level]);

  const handleLevel = () => {
    setLevel((prevLevel) => prevLevel + 1);
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
            {row.map((emoji: any, colIndex: number) => (
              <EmojiCard
                key={`${rowIndex}-${colIndex}`}
                emoji={emoji}
                onClick={() => console.log("Clicked:", rowIndex, colIndex)}
              />
            ))}
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
