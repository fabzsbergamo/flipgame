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
      .get<Emoji[]>("https://cdn.jsdelivr.net/npm/@emoji-mart/data")
      .then((res) => res.data);

  return useQuery<Emoji[], Error>({
    queryKey: ["emojis"],
    queryFn: fetchEmojis,
  });
};

export default useEmojis;
