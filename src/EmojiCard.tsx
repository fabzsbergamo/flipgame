import ReactCardFlip from "react-card-flip";

const EmojiCard = ({ emoji, isFlipped, onClick }:{emoji: any; isFlipped: boolean; onClick: () => void;}) => {
  
    const skin = emoji.skins[0]; // Assuming you want to use the first skin

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
      <div onClick={onClick} style={{ width: "50px", height: "50px", margin: "5px", border: 'solid black 1px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
        <img
          src={`https://twemoji.maxcdn.com/v/13.1.0/svg/${skin.unified}.svg`}
          alt={`${emoji.name} skin`}
          style={{ width: "50px", height: "50px" }}
        />
      </div>
      <div onClick={onClick} style={{ width: "50px", height: "50px", margin: "5px", border: 'solid black 1px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backgroundColor: '#f0f0f0' }}>
        {/* This side is displayed when the card is flipped */}
      </div>
    </ReactCardFlip>
  );
};

export default EmojiCard;
