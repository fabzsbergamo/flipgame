import axios from "axios";
import { useQuery } from "react-query";

export type AllEmojis = {
  categories: CategoryData[];
  emojis: Record<string, Emoji>;
};

interface CategoryData {
  id: string;
  name: string;
  emojis: Emoji[];
}

interface Emoji {
  id: string;
  name: string;
  keywords: string[];
  skins: EmojiSkin[];
  version: number;
}

interface EmojiSkin {
  unified: string;
  native: string;
}

const useEmojis = () => {
  const fetchEmojis = () =>
    axios
      .get<AllEmojis>("https://cdn.jsdelivr.net/npm/@emoji-mart/data")
      .then((res) => res.data);

  return useQuery<AllEmojis, Error>({
    queryKey: ["emojis"],
    queryFn: fetchEmojis,
  });
};

const EmojiList = () => {
  const { data, error, isLoading } = useEmojis();

  if (isLoading) return <p>isLoading...</p>;

  if (error) return <p>Error loading emojis: {error.message}</p>;

  return (
    <div>
      <h1>Emoji Skins</h1>
      <div>
        {Object.values(data?.emojis).flatMap((emoji) =>
          emoji.skins.map((skin, index) => (
            <img
              key={`${emoji.id}-${index}`}
              src={`https://twemoji.maxcdn.com/v/13.1.0/svg/${skin.unified}.svg`}
              alt={`${emoji.name} skin ${index + 1}`}
              style={{ width: "50px", height: "50px", margin: "5px" }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default EmojiList;