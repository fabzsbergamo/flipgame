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
  const [isFlipped, setIsFlipped] = useState<boolean[]>([]);
  const [timerActive, setTimerActive] = useState(true);
  const [winRound, setWinRound] = useState(false)
  
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

      // Initialize flip state for each card
      const initialFlipStates = Array(firstRowEmojis.length * level).fill(true);
      setIsFlipped(initialFlipStates);

      const timer = setTimeout(() => {
        setIsFlipped(Array(firstRowEmojis.length * level).fill(false));
        setTimerActive(false); // Disable the timer
      }, 5000);
  
      return () => clearTimeout(timer);

    }
  }, [data, level]);

 const handleClick = (emoji: any, index: number) => {
  if (timerActive || winRound) return; // Disable click if timer is active or round is won
  
  if (!timerActive) {
      const unifiedEmoji = emoji.skins[0].unified;
      setIsFlipped((prevFlipStates) => {
        const newFlipStates = [...prevFlipStates];
        newFlipStates[index] = true;
        return newFlipStates;
      });

      if (unifiedEmoji !== selectedEmoji) {
        setTimeout(() => {
          setIsFlipped((prevFlipStates) => {
            const newFlipStates = [...prevFlipStates];
            newFlipStates[index] = false;
            return newFlipStates;
          });
        }, 1000);
      } else {
        // Check if all matching cards are flipped
        setWinRound((prevWinRound) => {
          const allMatchedFlipped = board.flat().every((emoji, i) => {
            const emojiUnified = emoji.skins[0].unified;
            return emojiUnified === selectedEmoji ? isFlipped[i] || i === index : true;
          });
          return allMatchedFlipped ? true : prevWinRound;
        });
      }
    }
  };
  

  const handleLevel = () => {
    setLevel((prevLevel) => prevLevel + 1);
    setBoard([]); // Reset the board
    setIsFlipped([]); // Reset the flip state
    setTimerActive(true); // Reset the timer
    setWinRound(false)
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
            {row.map((emoji: any, colIndex: number) => {
              const index = rowIndex * level + colIndex;
              return (
                <EmojiCard
                  key={`${rowIndex}-${colIndex}`}
                  emoji={emoji}
                  onClick={() => handleClick(emoji, index)}
                  isFlipped={!isFlipped[index]}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div className="card">
        <button onClick={handleLevel}>
        {!winRound ? `Level ${level - 1}` : 'Next Round'}
        </button>
        <p>
          {!winRound ? 'Find all the following emojis before the time runs out!' : 'You Win'}
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
