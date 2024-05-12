import { useState } from "react";
import ReactCardFlip from "react-card-flip";

    const EmojiCard = ({ emoji, onClick }: { emoji: any; onClick: () => void; }) => {
    const [isFlipped, setIsFlipped] = useState(false);
  
    const handleClick = () => {
      setIsFlipped(!isFlipped);
      onClick();
    };
  
    const skin = emoji.skins[0]; // Assuming you want to use the first skin
  
    return (
      <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
        <img
          onClick={handleClick}
          src={`https://twemoji.maxcdn.com/v/13.1.0/svg/${skin.unified}.svg`}
          alt={`${emoji.name} skin`}
          style={{ width: "50px", height: "50px", margin: "5px", border: 'solid black 1px', }}
        />
        <div
          onClick={handleClick}
          style={{ width: "50px", height: "50px", margin: "5px", border: 'solid black 1px', }}
        />
      </ReactCardFlip>
    );
  };

export default EmojiCard;