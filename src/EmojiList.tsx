import axios from "axios";
import { useQuery } from "react-query";

export type AllEmojis = {
  allEmojis: EmojiCategoryData[];
};

export interface Emoji {
  id: string;
  name: string;
  keywords: string[];
  skins: { src: string }[];
}

interface EmojiCategoryData {
  id: string;
  name: string;
  emojis: Emoji[];
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
  const { data: emojis, error, isLoading } = useEmojis();

  if (isLoading) return <p>isLoading...</p>;

  if (error) return <p>Error loading emojis: {error.message}</p>;

  return (
    <div>
      <h1>Emoji Skins</h1>
      <div>
        {emojis?.allEmojis.map((category) =>
          category.emojis.map((emoji) =>
            emoji.skins.map((skin, index) => (
              <img
                key={`${emoji.id}-${index}`}
                src={skin.src}
                alt={`${emoji.name} skin ${index + 1}`}
                style={{
                  width: "50px",
                  height: "50px",
                  margin: "5px",
                }}
              />
            ))
          )
        )}
      </div>
    </div>
  );
};

export default EmojiList;