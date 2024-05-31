import ReactCardFlip from "react-card-flip";

const EmojiCard = ({ emoji, isFlipped, onClick, key}:{emoji: any; isFlipped: boolean; onClick: () => void; key: string}) => {
  
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
      <div onClick={onClick} style={{ width: "50px", height: "50px", margin: "5px", border: 'solid black 1px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backgroundColor: 'black', }}>
        {/* This side is displayed when the card is flipped */}
        {key}
      </div>
    </ReactCardFlip>
  );
};

export default EmojiCard;
